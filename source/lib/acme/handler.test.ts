import * as libcrypto from "crypto";
import * as libdns from "dns";
import * as libfs from "fs";
import * as config from "../config";
import * as acme from "./";
import * as dynu from "../dynu";
import * as glesys from "../glesys";

const CONFIG = config.Options.as(JSON.parse(libfs.readFileSync("./private/config/config.json", "utf-8")));

const ACME_URL = "https://acme-staging-v02.api.letsencrypt.org/directory";

const EC_PRIVATE_KEY_SEC1 = Buffer.from(`
	MHcCAQEEIB4AKlzxRI2sTVxq7SCJ9l5MeaCyvUqeEQqoZDc3M0OvoAoGCCqGSM49
	AwEHoUQDQgAEQcfTwyj10DdQpZ/2ZBWTEYvhW+z2OKZcWI/CJGuiMgVjy5cCjg8P
	22yJzfRBXT/Mc33quG4nPynPbc8aUPCuxQ==
`, "base64");

const EC_KEY = libcrypto.createPrivateKey({
	key: EC_PRIVATE_KEY_SEC1,
	format: "der",
	type: "sec1"
});

interface Undoable {
	undo(): Promise<void>;
};

function getProviderDetails(hostname: string): { credentials: config.Credentials, domain: string, subdomain: string } {
	let hostnameParts = hostname.split(".").reverse();
	provider: for (let { domains, credentials } of CONFIG.providers ?? []) {
		domain: for (let domain of domains) {
			let domainParts = domain.split(".").reverse();
			for (let i = 0; i < domainParts.length; i++) {
				if (domainParts[i] !== hostnameParts[i]) {
					continue domain;
				}
			}
			let subdomain = hostnameParts.slice(domainParts.length).reverse().join(".");
			return {
				credentials,
				domain,
				subdomain
			};
		}
	}
	throw `Expected a provider!`;
};

async function provisionRecord(hostname: string, content: string): Promise<Undoable> {
	let details = getProviderDetails(hostname);
	if (config.DynuCredentials.is(details.credentials)) {
		let client = dynu.makeClient(details.credentials);
		let domains = await (await client.listDomains({})).payload();
		const domain = domains.domains.find((domain) => domain.name === details.domain);
		if (domain == null) {
			throw `Expected a domain!`;
		}
		let record = await (await client.createDomainRecord({
			options: {
				domainid: domain.id
			},
			payload: {
				nodeName: details.subdomain,
				recordType: "TXT",
				textData: content
			}
		})).payload();
		return {
			async undo() {
				client.deleteDomainRecord({
					options: {
						domainid: domain.id,
						recordid: record.id
					}
				})
			}
		};
	}
	if (config.GlesysCredentials.is(details.credentials)) {
		let client = glesys.makeClient(details.credentials);
		let record = await (await client.createDomainRecord({
			payload: {
				domainname: details.domain,
				host: details.subdomain || "@",
				type: "TXT",
				data: content
			}
		})).payload();
		return {
			async undo() {
				client.deleteDomainRecord({
					payload: {
						recordid: record.response.record.recordid
					}
				})
			}
		};
	}
	throw `Expected code to be unreachable!`;
};

async function getCanonicalName(hostname: string): Promise<string> {
	while (true) {
		let hostnames = new Array<string>();
		try {
			hostnames = await libdns.promises.resolveCname(hostname);
		} catch (error) {
			break;
		}
		if (hostnames.length !== 1) {
			throw `Expected exactly one hostname!`;
		}
		hostname = hostnames[0];
	}
	return hostname;
};

function makeProvisionHostname(hostname: string): string {
	if (hostname.startsWith("*.")) {
		return `_acme-challenge.${hostname.slice(2)}`;
	} else {
		return `_acme-challenge.${hostname}`;
	}
};

async function retryWithExponentialBackoff<A>(delay: number, attempts: number, handler: () => Promise<A>): Promise<A> {
	for (let i = 0; i < attempts; i++) {
		await new Promise((resolve, reject) => {
			console.log(`Delaying ${delay} ms...`);
			setTimeout(resolve, delay);
		});
		try {
			return await handler();
		} catch (error) {
			let factor = 1.5 + Math.random();
			delay *= factor;
		}
	}
	throw `Expected operation to succeed!`;
};

const HOSTNAMES = [
	"test.joelek.se"
];

(async () => {
	let undoables = new Array<Undoable>();
	try {
		let handler = await acme.handler.Handler.make(ACME_URL, EC_KEY);
		await handler.createNonce();
		let account = await handler.createAccount({
			termsOfServiceAgreed: true
		});
/* 		let account = await handler.getAccount("https://acme-staging-v02.api.letsencrypt.org/acme/acct/26566358"); */
		let order = await handler.createOrder(account.url, {
			identifiers: HOSTNAMES.map((hostname) => ({
				type: "dns",
				value: hostname
			}))
		});
/* 		let order = await handler.getOrder(account.url, "https://acme-staging-v02.api.letsencrypt.org/acme/order/26566358/537985198"); */
		if (order.payload.status === "pending") {
			for (let url of order.payload.authorizations) {
				let authorization = await handler.getAuthorization(account.url, url);
				if (authorization.payload.status === "pending") {
					let challenges = authorization.payload.challenges.filter((challenge): challenge is acme.api.ChallengeDNS01 => {
						return acme.api.ChallengeDNS01.is(challenge);
					});
					let challenge = challenges.pop();
					if (challenge == null) {
						throw `Expected a "dns-01" challenge!`;
					}
					if (challenge.status === "pending") {
						let hostname = await getCanonicalName(makeProvisionHostname(authorization.payload.identifier.value));
						let content = acme.computeKeyAuthorization(challenge.token, EC_KEY.export({ format: "jwk" }) as any);
						let undoable = await provisionRecord(hostname, content);
						undoables.push(undoable);
						await handler.finalizeChallenge(account.url, challenge.url);
						authorization = await retryWithExponentialBackoff(2000, 8, async () => {
							let updatedAuthorization = await handler.getAuthorization(account.url, url);
							if (updatedAuthorization.payload.status === "pending") {
								throw ``;
							}
							return updatedAuthorization;
						});
					}
				}
			}
			order = await retryWithExponentialBackoff(2000, 8, async () => {
				let updatedOrder = await handler.getOrder(account.url, order.url);
				if (updatedOrder.payload.status === "pending") {
					throw ``;
				}
				return updatedOrder;
			});
		}
		// send { csr: base64url of csr } to finalize
		// download cert
	} catch (error) {
		console.log(String(error));
		throw error;
	} finally {
		for (let undoable of undoables) {
			await undoable.undo();
		}
	}
})();
