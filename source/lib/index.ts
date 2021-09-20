import * as libcrypto from "crypto";
import * as libdns from "dns";
import * as libfs from "fs";
import * as libpath from "path";
import * as config from "./config";
import { acme } from "../mod";
import { asn1 } from "../mod";
import { der } from "../mod";
import { dns } from "../mod";
import { dynu } from "../mod";
import { ec } from "../mod";
import { glesys } from "../mod";
import { parsing } from "../mod";
import { pem } from "../mod";
import { pkcs10 } from "../mod";

export * as config from "./config";

const LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
const LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";

export function loadConfig(value: string): config.Options {
	let string = libfs.readFileSync(value, "utf-8");
	let json = JSON.parse(string);
	return config.Options.as(json);
};

function getDurationFromMilliseconds(ms: number): string {
	let s = Math.floor(ms / 1000);
	ms -= s * 1000;
	let m = Math.floor(s / 60);
	s -= m * 60;
	let h = Math.floor(m / 60);
	m -= h * 60;
	let d = Math.floor(h / 24);
	h -= d * 24;
	return `${d} days, ${h} hours, ${m} minutes and ${s} seconds`;
};

async function wait(ms: number): Promise<void> {
	console.log(`Waiting ${getDurationFromMilliseconds(ms)}...`);
	while (ms > 0) {
		let current = Math.min(ms, 2147483647);
		await new Promise((resolve, reject) => {
			setTimeout(resolve, current);
		});
		ms -= current;
	}
};

async function makeClient(credentials: config.Provider): Promise<dns.Client> {
	if (config.ProviderDynu.is(credentials)) {
		return dynu.makeStandardClient(credentials);
	}
	if (config.ProviderGlesys.is(credentials)) {
		return glesys.makeStandardClient(credentials);
	}
	throw `Expected code to be unreachable!`;
};

async function getCanonicalName(hostname: string): Promise<string> {
	console.log(`Resolving canonical name for ${hostname}...`);
	let path = new Array<string>(hostname);
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
		console.log(`Found redirect between ${hostname} and ${hostnames[0]}.`);
		hostname = hostnames[0];
		if (path.includes(hostname)) {
			throw `Expected canonical name to resolve properly!`;
		}
		path.push(hostname);
	}
	console.log(`Canonical name is ${hostname}.`);
	return hostname;
};

async function makeResolver(hostname: string): Promise<libdns.promises.Resolver> {
	console.log(`Creating resolver for ${hostname}...`);
	let parts = hostname.split(".");
	for (let i = 0; i <= parts.length - 2; i++) {
		try {
			let hostname = parts.slice(i).join(".");
			console.log(`Attempting to locate nameserver for ${hostname}.`);
			let response = await libdns.promises.resolveSoa(hostname);
			console.log(`Primary nameserver is ${response.nsname}.`);
			let addresses = await libdns.promises.resolve4(response.nsname);
			for (let address of addresses) {
				console.log(`Primary nameserver can be reached through ${address}.`);
			}
			let resolver = new libdns.promises.Resolver();
			resolver.setServers(addresses);
			return resolver;
		} catch (error) {}
	}
	throw `Expected a primary nameserver!`;
};

async function getTextRecords(hostname: string, resolver: libdns.promises.Resolver): Promise<Array<string>> {
	let response = await resolver.resolveTxt(hostname);
	let records = response.map((parts) => parts.join(""));
	return records;
};

function makeProvisionHostname(hostname: string): string {
	if (hostname.startsWith("*.")) {
		return `_acme-challenge.${hostname.slice(2)}`;
	} else {
		return `_acme-challenge.${hostname}`;
	}
};

function getClientDetails(hostname: string, clients: Array<{ client: dns.Client, domains: Array<string> }>): { client: dns.Client, domain: string, subdomain: string } {
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
	throw `Expected to find a DNS client for "${hostname}"!`;
};

async function retryWithExponentialBackoff<A>(seconds: number, attempts: number, handler: () => Promise<A>): Promise<A> {
	let milliseconds = seconds * 1000;
	for (let i = 0; i < attempts; i++) {
		await wait(milliseconds);
		try {
			return await handler();
		} catch (error) {
			let randomness = 2.0 * Math.random() - 1.0;
			let factor = 2.0 + (0.5 * randomness);
			milliseconds = Math.round(milliseconds * factor);
		}
	}
	throw `Expected operation to succeed!`;
};

function getPrivateKey(path: string): libcrypto.KeyObject {
	libfs.mkdirSync(libpath.dirname(path), { recursive: true });
	if (!libfs.existsSync(path)) {
		let key = ec.generatePrivateKey();
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

async function processEntry(acmeUrl: string, entry: QueueEntry, clients: Array<{ client: dns.Client, domains: Array<string> }>): Promise<void> {
	console.log(`Processing entry...`);
	for (let hostname of entry.hostnames) {
		console.log(`Entry contains ${hostname}.`);
	}
	if (entry.validity != null) {
		let { notBefore, notAfter } = entry.validity;
		console.log(`Current certificate is valid between ${new Date(notBefore)} and ${new Date(notAfter)}.`);
	}
	if (entry.renewAfter > Date.now()) {
		console.log(`Process should start no sooner than ${new Date(entry.renewAfter)}.`);
		return;
	}
	console.log(`Starting certification process...`);
	let undoables = new Array<dns.Undoable>();
	try {
		let accountKey = getPrivateKey(entry.account);
		let certificateKey = getPrivateKey(entry.key);
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
						let hostnameToAuthorize = makeProvisionHostname(authorization.payload.identifier.value);
						console.log(`Proving authority over ${hostnameToAuthorize}...`);
						let hostname = await getCanonicalName(hostnameToAuthorize);
						let content = acme.computeKeyAuthorization(challenge.token, accountKey.export({ format: "jwk" }) as any);
						let { client, domain, subdomain } = getClientDetails(hostname, clients);
						let resolver = await makeResolver(hostname);
						console.log(`Provisioning record at ${hostname}...`);
						let undoable = await client.provisionTextRecord({
							domain,
							subdomain,
							content
						});
						undoables.push(undoable);
						console.log(`Waiting for record to propagate...`);
						await retryWithExponentialBackoff(60, 4, async () => {
							let records = await getTextRecords(hostname, resolver);
							if (!records.includes(content)) {
								throw ``;
							}
						});
						console.log(`Signaling that authority can be validated...`);
						await handler.finalizeChallenge(account.url, challenge.url);
					}
				}
			}
			console.log(`Waiting for authority to be proven...`);
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
			console.log(`Requesting certificate to be issued...`);
			await handler.finalizeOrder(account.url, order.payload.finalize, {
				csr: csr.toString("base64url")
			});
		}
		console.log(`Waiting for certificate to become ready...`);
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
		if (libfs.existsSync(entry.cert)) {
			libfs.renameSync(entry.cert, `${entry.cert}.old`);
		}
		libfs.mkdirSync(libpath.dirname(entry.cert), { recursive: true });
		libfs.writeFileSync(entry.cert, certificate);
		console.log(`Certificate successfully downloaded.`);
		entry.validity = getValidityFromCertificate(entry.cert);
		if (entry.validity != null) {
			let { notBefore, notAfter } = entry.validity;
			console.log(`Certificate is valid between ${new Date(notBefore)} and ${new Date(notAfter)}.`);
		}
		entry.renewAfter = getRenewAfter(entry.validity);
		console.log(`Certification process succeeded!`);
	} catch (error) {
		console.log(String(error));
		console.log(`Certification process failed!`);
		let randomness = 2.0 * Math.random() - 1.0;
		let factor = 1.0 + (0.5 * randomness);
		let msPerDay = 24 * 60 * 60 * 1000;
		entry.renewAfter = Date.now() + Math.round(msPerDay * factor);
		console.log(`Retry may be attempted no sooner than ${new Date(entry.renewAfter)}.`);
	}
	for (let undoable of undoables) {
		await undoable.undo();
	}
};

type Validity = {
	notBefore: number;
	notAfter: number;
};

function parseUTCTime(node: asn1.UTCTime): number {
	let string = Buffer.from(node.data, "base64url").toString();
	let parts = /^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/.exec(string);
	if (parts == null) {
		throw `Expected a valid UTC time!`;
	}
	let century = (Number.parseInt(string[0]) < 5) ? "20" : "19";
	let year = parts[1];
	let month = parts[2];
	let day = parts[3];
	let hour = parts[4];
	let minute = parts[5];
	let second = parts[6] ?? "00";
	let iso = `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
	return Date.parse(iso);
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
	let notBeforeNode = asn1.UTCTime.as(datesNode.data[0]);
	let notAfterNode = asn1.UTCTime.as(datesNode.data[1]);
	let notBefore = parseUTCTime(notBeforeNode);
	let notAfter = parseUTCTime(notAfterNode);
	return {
		notBefore,
		notAfter
	};
};

function getRenewAfter(validity: Validity | undefined): number {
	if (validity == null) {
		return 0;
	}
	let renewAfter = validity.notBefore + Math.round((validity.notAfter - validity.notBefore)*0.75);
	return renewAfter;
};

type QueueEntry = {
	hostnames: Array<string>;
	account: string,
	key: string;
	cert: string;
	validity?: Validity;
	renewAfter: number;
};

export async function run(options: config.Options): Promise<void> {
	let acme = options.acme ?? LETS_ENCRYPT_STAGING;
	if (acme === "le") {
		acme = LETS_ENCRYPT;
	}
	let clients = new Array<{
		client: dns.Client,
		domains: Array<string>
	}>();
	for (let credentials of options.providers) {
		let client = await makeClient(credentials);
		let domains = await client.listDomains();
		for (let domain of domains) {
			console.log(`Provisioning configured for ${domain}.`);
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
			let renewAfter = getRenewAfter(validity);
			return {
				hostnames,
				account,
				key,
				cert,
				validity,
				renewAfter
			};
		})
		.sort((one, two) => one.renewAfter - two.renewAfter);
	if (queue.length === 0) {
		return;
	}
	if (options.monitor) {
		while (true) {
			let entry = queue.shift();
			if (entry != null) {
				let duration = Math.max(0, entry.renewAfter - Date.now());
				await wait(duration);
				await processEntry(acme, entry, clients);
				let index = 0;
				for (; index < queue.length; index++) {
					if (entry.renewAfter < queue[index].renewAfter) {
						break;
					}
				}
				queue.splice(index, 0, entry);
			}
		}
	} else {
		for (let entry of queue) {
			await processEntry(acme, entry, clients);
		}
	}
};
