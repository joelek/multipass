import * as libcrypto from "crypto";
import * as libdns from "dns";
import * as libfs from "fs";
import * as libpath from "path";
import * as config from "./config";
import { acme, ec, dynu, glesys, pkcs10, rsa, parsing } from "../mod";
import { pem } from "../mod";
import { asn1 } from "../mod";
import { der } from "../mod";

export * as config from "./config";

export const LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
export const LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";

export function loadConfig(value: string): config.Options {
	let string = libfs.readFileSync(value, "utf-8");
	let json = JSON.parse(string);
	return config.Options.as(json);
};

async function delay(ms: number): Promise<void> {
	while (ms > 0) {
		let current = Math.min(ms, 2147483647);
		await new Promise((resolve, reject) => {
			setTimeout(resolve, current);
		});
		ms -= current;
	}
};

interface Undoable {
	undo(): Promise<void>;
};

interface Client {
	listDomains(): Promise<Array<string>>;
	provisionTextRecord(details: { domain: string, subdomain: string, content: string }): Promise<Undoable>;
};

async function makeClient(credentials: config.Provider): Promise<Client> {
	if (config.ProviderDynu.is(credentials)) {
		let client = dynu.makeClient(credentials);
		let domains = (await (await client.listDomains({})).payload()).domains;
		return {
			async listDomains() {
				return domains.map((domain) => domain.name);
			},
			async provisionTextRecord(details) {
				const domain = domains.find((domain) => domain.name === details.domain);
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
						textData: details.content,
						ttl: 60
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
		};
	}
	if (config.ProviderGlesys.is(credentials)) {
		let client = glesys.makeClient(credentials);
		let domains = (await (await client.listDomains({})).payload()).response.domains;
		return {
			async listDomains() {
				return domains.map((domain) => domain.domainname);
			},
			async provisionTextRecord(details) {
				const domain = domains.find((domain) => domain.domainname === details.domain);
				if (domain == null) {
					throw `Expected a domain!`;
				}
				let record = await (await client.createDomainRecord({
					payload: {
						domainname: details.domain,
						host: details.subdomain || "@",
						type: "TXT",
						data: details.content,
						ttl: 60
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

function getClientDetails(hostname: string, clients: Array<{ client: Client, domains: Array<string> }>): { client: Client, domain: string, subdomain: string } {
	let hostnameParts = hostname.split(".").reverse();
	provider: for (let { client, domains } of clients) {
		domain: for (let domain of domains) {
			let domainParts = domain.split(".").reverse();
			for (let i = 0; i < domainParts.length; i++) {
				if (domainParts[i] !== hostnameParts[i]) {
					continue domain;
				}
			}
			let subdomain = hostnameParts.slice(domainParts.length).reverse().join(".");
			return {
				client,
				domain,
				subdomain
			};
		}
	}
	throw `Expected a client!`;
};

async function retryWithExponentialBackoff<A>(seconds: number, attempts: number, handler: () => Promise<A>): Promise<A> {
	let milliseconds = seconds * 1000;
	for (let i = 0; i < attempts; i++) {
		await delay(milliseconds);
		try {
			return await handler();
		} catch (error) {
			let factor = 1.5 + Math.random();
			milliseconds = Math.round(milliseconds * factor);
		}
	}
	throw `Expected operation to succeed!`;
};

function getPrivateKey(path: string): libcrypto.KeyObject {
	if (!libfs.existsSync(path)) {
		let key = ec.generatePrivateKeyObject();
		let buffer = key.export({ format: "pem", type: "sec1" });
		libfs.writeFileSync(path, buffer);
		return key;
	}
	let buffer = libfs.readFileSync(path);
	try {
		return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "sec1" });
	} catch (error) {}
	try {
		return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs8" });
	} catch (error) {}
	try {
		return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs1" });
	} catch (error) {}
	throw `Expected a private key!`;
};

async function processEntry(acmeUrl: string, entry: QueueEntry, clients: Array<{ client: Client, domains: Array<string> }>): Promise<void> {
	let accountKey = getPrivateKey(entry.account);
	let certificateKey = getPrivateKey(entry.cert);
	let undoables = new Array<Undoable>();
	try {
		let handler = await acme.handler.Handler.make(acmeUrl, accountKey);
		await handler.createNonce();
		let account = await handler.createAccount({
			termsOfServiceAgreed: true
		});
		let order = await handler.createOrder(account.url, {
			identifiers: entry.hostnames.map((hostname) => ({
				type: "dns",
				value: hostname
			}))
		});
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
						let content = acme.computeKeyAuthorization(challenge.token, accountKey.export({ format: "jwk" }) as any);
						let { client, domain, subdomain } = getClientDetails(hostname, clients);
						let undoable = await client.provisionTextRecord({
							domain,
							subdomain,
							content
						});
						undoables.push(undoable);
						await retryWithExponentialBackoff(60, 3, async () => {
							let records = (await libdns.promises.resolveTxt(hostname)).map((hostname) => hostname.join(""));
							if (!records.includes(content)) {
								throw ``;
							}
						});
						await handler.finalizeChallenge(account.url, challenge.url);
					}
				}
			}
			order = await retryWithExponentialBackoff(15, 4, async () => {
				let updated = await handler.getOrder(account.url, order.url);
				if (updated.payload.status === "pending") {
					throw ``;
				}
				return updated;
			});
		}
		if (order.payload.status === "ready") {
			let csr = pkcs10.createCertificateRequest(order.payload.identifiers.map((identifier) => identifier.value), certificateKey);
			await handler.finalizeOrder(account.url, order.payload.finalize, {
				csr: csr.toString("base64url")
			});
		}
		order = await retryWithExponentialBackoff(15, 4, async () => {
			let updated = await handler.getOrder(account.url, order.url);
			if (updated.payload.status === "processing") {
				throw ``;
			}
			return updated;
		});
		let url = order.payload.certificate;
		if (url == null) {
			throw `Expected a certificate url!`;
		}
		let certificate = await handler.downloadCertificate(account.url, url);
		console.log(certificate.toString());
	} finally {
		for (let undoable of undoables) {
			await undoable.undo();
		}
	}
};

type Validity = {
	notBefore: number;
	notAfter: number;
};

function getValidityFromCertificate(path: string): Validity | undefined {
	if (!libfs.existsSync(path)) {
		return;
	}
	let document = pem.parse(libfs.readFileSync(path, "utf-8"));
	let section = document.sections.find((section) => section.label === "CERTIFICATE");
	if (section == null) {
		throw `Expected a CERTIFICATE label!`;
	}
	let node = der.node.parse(new parsing.Parser(section.buffer));
	let datesNode = asn1.Sequence.as(asn1.Sequence.as(asn1.Sequence.as(node).data[0]).data[4]);
	let notBeforeNode = asn1.Date.as(datesNode.data[0]);
	let notAfterNode = asn1.Date.as(datesNode.data[1]);
	let notBefore = Date.parse(Buffer.from(notBeforeNode.data, "base64url").toString()).valueOf();
	let notAfter = Date.parse(Buffer.from(notAfterNode.data, "base64url").toString()).valueOf();
	return {
		notBefore,
		notAfter
	};
};

type QueueEntry = {
	hostnames: Array<string>;
	account: string,
	key: string;
	cert: string;
	validity?: Validity;
};

function compareValidity(one: Validity | undefined, two: Validity | undefined): number {
	if (one == null) {
		if (two != null) {
			return -1
		} else {
			return 0;
		}
	} else {
		if (two == null) {
			return 1;
		}
	}
	return one.notAfter - two.notAfter;
};

export async function run(options: config.Options): Promise<void> {
	let acme = options.acme ?? LETS_ENCRYPT_STAGING;
	if (acme === "le") {
		acme = LETS_ENCRYPT;
	}
	let clients = new Array<{
		client: Client,
		domains: Array<string>
	}>();
	for (let credentials of options.providers) {
		let client = await makeClient(credentials);
		let domains = await client.listDomains();
		for (let domain of domains) {
			console.log(`Credentials accepted for "${domain}"`);
		}
		clients.push({
			client,
			domains
		});
	}
	let queue = options.certificates
		.filter((certificate) => certificate.hostnames.length > 0)
		.map((certificate) => {
			let hostnames = certificate.hostnames;
			let root = certificate.root ?? "./";
			let account = libpath.join(root, "account_key.pem");
			let key = libpath.join(root, "certificate_key.pem");
			let cert = libpath.join(root, "full_chain.pem");
			let validity = getValidityFromCertificate(cert);
			return {
				hostnames,
				account,
				key,
				cert,
				validity
			};
		})
		.sort((one, two) => compareValidity(one.validity, two.validity));
	if (queue.length > 0) {
		do {
			let entry = queue.shift();
			if (entry != null) {
				console.log(`Processing certificate...`);
				for (let hostname of entry.hostnames) {
					console.log(`\t${hostname}`);
				}
				try {
					await processEntry(acme, entry, clients);
					console.log(`\tsuccess!`);
				} catch (error) {
					console.log(`\tfailure!`);
				}
				let validity = getValidityFromCertificate(entry.cert);
				if (validity == null) {
					// Do not retry entry until all other entries have been processed.
					queue.push(entry);
				} else {
					let index = 0;
					for (; index < queue.length; index++) {
						let comparison = compareValidity(validity, queue[index].validity);
						if (comparison < 0) {
							break;
						}
					}
					queue.splice(index, 0, entry);
				}
			}
		} while (options.monitor);
	}
};
