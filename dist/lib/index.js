"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.loadConfig = void 0;
const libdns = require("dns");
const libfs = require("fs");
const libpath = require("path");
const config = require("./config");
const mod_1 = require("../mod");
const mod_2 = require("../mod");
const mod_3 = require("../mod");
const mod_4 = require("../mod");
const mod_5 = require("../mod");
const mod_6 = require("../mod");
const mod_7 = require("../mod");
const mod_8 = require("../mod");
const mod_9 = require("../mod");
__exportStar(require("./config"), exports);
const LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
const LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";
function loadConfig(value) {
    let string = libfs.readFileSync(value, "utf-8");
    let json = JSON.parse(string);
    return config.Options.as(json);
}
exports.loadConfig = loadConfig;
;
function getDurationFromMilliseconds(ms) {
    let s = Math.floor(ms / 1000);
    ms -= s * 1000;
    let m = Math.floor(s / 60);
    s -= m * 60;
    let h = Math.floor(m / 60);
    m -= h * 60;
    let d = Math.floor(h / 24);
    h -= d * 24;
    return `${d} days, ${h} hours, ${m} minutes and ${s} seconds`;
}
;
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Waiting ${getDurationFromMilliseconds(ms)}...`);
        while (ms > 0) {
            let current = Math.min(ms, 2147483647);
            yield new Promise((resolve, reject) => {
                setTimeout(resolve, current);
            });
            ms -= current;
        }
    });
}
;
function makeClient(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.ProviderDynu.is(credentials)) {
            return mod_4.dynu.makeStandardClient(credentials);
        }
        if (config.ProviderGlesys.is(credentials)) {
            return mod_6.glesys.makeStandardClient(credentials);
        }
        throw `Expected code to be unreachable!`;
    });
}
;
function getCanonicalName(hostname) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Resolving canonical name for "${hostname}"...`);
        let path = new Array(hostname);
        while (true) {
            let hostnames = new Array();
            try {
                hostnames = yield libdns.promises.resolveCname(hostname);
            }
            catch (error) {
                break;
            }
            if (hostnames.length !== 1) {
                throw `Expected exactly one hostname!`;
            }
            console.log(`Found redirect between "${hostname}" and "${hostnames[0]}".`);
            hostname = hostnames[0];
            if (path.includes(hostname)) {
                throw `Expected canonical name to resolve properly!`;
            }
            path.push(hostname);
        }
        console.log(`Canonical name is "${hostname}".`);
        return hostname;
    });
}
;
function makeResolver(hostname) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Creating resolver for ${hostname}...`);
        let parts = hostname.split(".");
        for (let i = 0; i <= parts.length - 2; i++) {
            try {
                let hostname = parts.slice(i).join(".");
                console.log(`Attempting to locate nameserver for "${hostname}".`);
                let response = yield libdns.promises.resolveSoa(hostname);
                console.log(`Primary nameserver is "${response.nsname}".`);
                let addresses = yield libdns.promises.resolve4(response.nsname);
                for (let address of addresses) {
                    console.log(`Primary nameserver can be reached through ${address}.`);
                }
                let resolver = new libdns.promises.Resolver();
                resolver.setServers(addresses);
                return resolver;
            }
            catch (error) { }
        }
        throw `Expected a primary nameserver!`;
    });
}
;
function getTextRecords(hostname, resolver) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield resolver.resolveTxt(hostname);
        let records = response.map((parts) => parts.join(""));
        return records;
    });
}
;
function makeProvisionHostname(hostname) {
    if (hostname.startsWith("*.")) {
        return `_acme-challenge.${hostname.slice(2)}`;
    }
    else {
        return `_acme-challenge.${hostname}`;
    }
}
;
function getClientDetails(hostname, clients) {
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
}
;
function retryWithExponentialBackoff(seconds, attempts, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        let milliseconds = seconds * 1000;
        for (let i = 0; i < attempts; i++) {
            yield wait(milliseconds);
            try {
                return yield handler();
            }
            catch (error) {
                let randomness = 2.0 * Math.random() - 1.0;
                let factor = 2.0 + (0.5 * randomness);
                milliseconds = Math.round(milliseconds * factor);
            }
        }
        throw `Expected operation to succeed!`;
    });
}
;
function processEntry(acmeUrl, entry, clients) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Processing entry...`);
        for (let hostname of entry.hostnames) {
            console.log(`Entry contains hostname "${hostname}".`);
        }
        if (entry.validity != null) {
            let { notBefore, notAfter } = entry.validity;
            console.log(`Current certificate is valid between ${new Date(notBefore).toLocaleString()} and ${new Date(notAfter).toLocaleString()}.`);
        }
        if (entry.renewAfter > Date.now()) {
            console.log(`Process should start no sooner than ${new Date(entry.renewAfter).toLocaleString()}.`);
            return;
        }
        console.log(`Starting certification process...`);
        let undoables = new Array();
        try {
            let accountKey = mod_5.key.generateOrConstructPrivateKey(entry.account, {
                type: "ec",
                passphrase: entry.account_pass
            });
            let certificateKey = mod_5.key.generateOrConstructPrivateKey(entry.key, {
                type: "ec",
                passphrase: entry.key_pass
            });
            let handler = yield mod_1.acme.handler.Handler.make(acmeUrl, accountKey);
            yield handler.createNonce();
            let account = yield handler.createAccount({
                termsOfServiceAgreed: true
            });
            let order = yield handler.createOrder(account.url, {
                identifiers: entry.hostnames.map((hostname) => ({
                    type: "dns",
                    value: hostname
                }))
            });
            if (order.payload.status === "pending") {
                for (let url of order.payload.authorizations) {
                    let authorization = yield handler.getAuthorization(account.url, url);
                    if (authorization.payload.status === "pending") {
                        let challenges = authorization.payload.challenges.filter((challenge) => {
                            return mod_1.acme.api.ChallengeDNS01.is(challenge);
                        });
                        let challenge = challenges.pop();
                        if (challenge == null) {
                            throw `Expected a "dns-01" challenge!`;
                        }
                        if (challenge.status === "pending") {
                            let hostnameToAuthorize = makeProvisionHostname(authorization.payload.identifier.value);
                            console.log(`Proving authority over "${authorization.payload.identifier.value}" through "${hostnameToAuthorize}"...`);
                            let hostname = yield getCanonicalName(hostnameToAuthorize);
                            let content = mod_1.acme.computeKeyAuthorization(challenge.token, accountKey.export({ format: "jwk" }));
                            let { client, domain, subdomain } = getClientDetails(hostname, clients);
                            let resolver = yield makeResolver(hostname);
                            console.log(`Provisioning record at "${hostname}"...`);
                            let undoable = yield client.provisionTextRecord({
                                domain,
                                subdomain,
                                content
                            });
                            undoables.push(undoable);
                            console.log(`Waiting for record to propagate...`);
                            yield retryWithExponentialBackoff(60, 4, () => __awaiter(this, void 0, void 0, function* () {
                                let records = yield getTextRecords(hostname, resolver);
                                if (!records.includes(content)) {
                                    throw ``;
                                }
                            }));
                            console.log(`Signaling that authority can be validated...`);
                            yield handler.finalizeChallenge(account.url, challenge.url);
                        }
                    }
                }
                console.log(`Waiting for authority to be validated...`);
                order = yield retryWithExponentialBackoff(15, 4, () => __awaiter(this, void 0, void 0, function* () {
                    let updated = yield handler.getOrder(account.url, order.url);
                    if (updated.payload.status === "pending") {
                        throw ``;
                    }
                    return updated;
                }));
            }
            if (order.payload.status === "ready") {
                let csr = mod_9.pkcs10.createCertificateRequest(order.payload.identifiers.map((identifier) => identifier.value), certificateKey);
                console.log(`Requesting certificate to be issued...`);
                yield handler.finalizeOrder(account.url, order.payload.finalize, {
                    csr: csr.toString("base64url")
                });
            }
            console.log(`Waiting for certificate to become ready...`);
            order = yield retryWithExponentialBackoff(15, 4, () => __awaiter(this, void 0, void 0, function* () {
                let updated = yield handler.getOrder(account.url, order.url);
                if (updated.payload.status === "processing") {
                    throw ``;
                }
                return updated;
            }));
            let url = order.payload.certificate;
            if (url == null) {
                throw `Expected a certificate url!`;
            }
            let certificate = yield handler.downloadCertificate(account.url, url);
            if (libfs.existsSync(entry.cert)) {
                libfs.renameSync(entry.cert, `${entry.cert}.old`);
            }
            libfs.mkdirSync(libpath.dirname(entry.cert), { recursive: true });
            libfs.writeFileSync(entry.cert, certificate);
            console.log(`Certificate successfully downloaded.`);
            entry.validity = getValidityFromCertificate(entry.cert);
            if (entry.validity != null) {
                let { notBefore, notAfter } = entry.validity;
                console.log(`Certificate is valid between ${new Date(notBefore).toLocaleString()} and ${new Date(notAfter).toLocaleString()}.`);
            }
            entry.renewAfter = getRenewAfter(entry.validity);
            console.log(`Certification process successful!`);
        }
        catch (error) {
            console.log(String(error));
            console.log(`Certification process failed!`);
            let randomness = 2.0 * Math.random() - 1.0;
            let factor = 1.0 + (0.5 * randomness);
            let msPerDay = 24 * 60 * 60 * 1000;
            entry.renewAfter = Date.now() + Math.round(msPerDay * factor);
            console.log(`Retry may be attempted no sooner than ${new Date(entry.renewAfter).toLocaleString()}.`);
        }
        for (let undoable of undoables) {
            yield undoable.undo();
        }
    });
}
;
function parseUTCTime(node) {
    var _a;
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
    let second = (_a = parts[6]) !== null && _a !== void 0 ? _a : "00";
    let iso = `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    return Date.parse(iso);
}
;
function getValidityFromCertificate(path) {
    if (!libfs.existsSync(path)) {
        return;
    }
    let document = mod_8.pem.parse(libfs.readFileSync(path, "utf-8"));
    let section = document.sections.find((section) => section.label === "CERTIFICATE");
    if (section == null) {
        throw `Expected a CERTIFICATE label!`;
    }
    let node = mod_3.der.node.parse(new mod_7.parsing.Parser(section.buffer));
    let datesNode = mod_2.asn1.Sequence.as(mod_2.asn1.Sequence.as(mod_2.asn1.Sequence.as(node).data[0]).data[4]);
    let notBeforeNode = mod_2.asn1.UTCTime.as(datesNode.data[0]);
    let notAfterNode = mod_2.asn1.UTCTime.as(datesNode.data[1]);
    let notBefore = parseUTCTime(notBeforeNode);
    let notAfter = parseUTCTime(notAfterNode);
    return {
        notBefore,
        notAfter
    };
}
;
function getRenewAfter(validity) {
    if (validity == null) {
        return 0;
    }
    let renewAfter = validity.notBefore + Math.round((validity.notAfter - validity.notBefore) * 2 / 3);
    return renewAfter;
}
;
function run(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function* () {
        let acme = (_a = options.acme) !== null && _a !== void 0 ? _a : LETS_ENCRYPT_STAGING;
        if (acme === "le") {
            acme = LETS_ENCRYPT;
        }
        let clients = new Array();
        for (let credentials of options.providers) {
            let client = yield makeClient(credentials);
            let domains = yield client.listDomains();
            for (let domain of domains) {
                console.log(`Provisioning configured for "${domain}".`);
            }
            clients.push({
                client,
                domains
            });
        }
        let account_key = (_c = (_b = options.filenames) === null || _b === void 0 ? void 0 : _b.account_key) !== null && _c !== void 0 ? _c : "account_key";
        let certificate_key = (_e = (_d = options.filenames) === null || _d === void 0 ? void 0 : _d.certificate_key) !== null && _e !== void 0 ? _e : "certificate_key";
        let certificate = (_g = (_f = options.filenames) === null || _f === void 0 ? void 0 : _f.certificate) !== null && _g !== void 0 ? _g : "full_chain";
        let account_pass = (_h = options.passphrases) === null || _h === void 0 ? void 0 : _h.account_pass;
        let key_pass = (_j = options.passphrases) === null || _j === void 0 ? void 0 : _j.certificate_pass;
        let queue = options.certificates
            .filter((certificate) => certificate.hostnames.length > 0)
            .map((certificate) => {
            var _a;
            let hostnames = certificate.hostnames;
            let root = (_a = certificate.root) !== null && _a !== void 0 ? _a : "./";
            let account = libpath.join(root, `${account_key}.pem`);
            let key = libpath.join(root, `${certificate_key}.pem`);
            let cert = libpath.join(root, `${certificate}.pem`);
            let validity = getValidityFromCertificate(cert);
            let renewAfter = getRenewAfter(validity);
            return {
                hostnames,
                account,
                account_pass,
                key,
                key_pass,
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
                    yield wait(duration);
                    yield processEntry(acme, entry, clients);
                    let index = 0;
                    for (; index < queue.length; index++) {
                        if (entry.renewAfter < queue[index].renewAfter) {
                            break;
                        }
                    }
                    queue.splice(index, 0, entry);
                }
            }
        }
        else {
            for (let entry of queue) {
                yield processEntry(acme, entry, clients);
            }
        }
    });
}
exports.run = run;
;
