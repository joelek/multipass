"use strict";
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
exports.run = exports.loadConfig = exports.LETS_ENCRYPT = exports.LETS_ENCRYPT_STAGING = exports.config = void 0;
const libcrypto = require("crypto");
const libdns = require("dns");
const libfs = require("fs");
const libpath = require("path");
const config = require("./config");
const mod_1 = require("../mod");
const mod_2 = require("../mod");
const mod_3 = require("../mod");
const mod_4 = require("../mod");
exports.config = require("./config");
exports.LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
exports.LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";
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
    return `${d} days, ${h} hours, ${m} minutes, ${s} seconds`;
}
;
function delay(ms) {
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
;
;
function makeClient(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        if (config.ProviderDynu.is(credentials)) {
            let client = mod_1.dynu.makeClient(credentials);
            let domains = (yield (yield client.listDomains({})).payload()).domains;
            return {
                listDomains() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return domains.map((domain) => domain.name);
                    });
                },
                provisionTextRecord(details) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const domain = domains.find((domain) => domain.name === details.domain);
                        if (domain == null) {
                            throw `Expected a domain!`;
                        }
                        let record = yield (yield client.createDomainRecord({
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
                            undo() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    client.deleteDomainRecord({
                                        options: {
                                            domainid: domain.id,
                                            recordid: record.id
                                        }
                                    });
                                });
                            }
                        };
                    });
                }
            };
        }
        if (config.ProviderGlesys.is(credentials)) {
            let client = mod_1.glesys.makeClient(credentials);
            let domains = (yield (yield client.listDomains({})).payload()).response.domains;
            return {
                listDomains() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return domains.map((domain) => domain.domainname);
                    });
                },
                provisionTextRecord(details) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const domain = domains.find((domain) => domain.domainname === details.domain);
                        if (domain == null) {
                            throw `Expected a domain!`;
                        }
                        let record = yield (yield client.createDomainRecord({
                            payload: {
                                domainname: details.domain,
                                host: details.subdomain || "@",
                                type: "TXT",
                                data: details.content,
                                ttl: 60
                            }
                        })).payload();
                        return {
                            undo() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    client.deleteDomainRecord({
                                        payload: {
                                            recordid: record.response.record.recordid
                                        }
                                    });
                                });
                            }
                        };
                    });
                }
            };
        }
        throw `Expected code to be unreachable!`;
    });
}
;
function getCanonicalName(hostname) {
    return __awaiter(this, void 0, void 0, function* () {
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
            hostname = hostnames[0];
        }
        return hostname;
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
    throw `Expected a client!`;
}
;
function retryWithExponentialBackoff(seconds, attempts, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        let milliseconds = seconds * 1000;
        for (let i = 0; i < attempts; i++) {
            yield delay(milliseconds);
            try {
                return yield handler();
            }
            catch (error) {
                let factor = 1.5 + Math.random();
                milliseconds = Math.round(milliseconds * factor);
            }
        }
        throw `Expected operation to succeed!`;
    });
}
;
function getPrivateKey(path) {
    libfs.mkdirSync(libpath.dirname(path), { recursive: true });
    if (!libfs.existsSync(path)) {
        let key = mod_1.ec.generatePrivateKeyObject();
        let buffer = key.export({ format: "pem", type: "sec1" });
        libfs.writeFileSync(path, buffer);
        return key;
    }
    let buffer = libfs.readFileSync(path);
    try {
        return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "sec1" });
    }
    catch (error) { }
    try {
        return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs8" });
    }
    catch (error) { }
    try {
        return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs1" });
    }
    catch (error) { }
    throw `Expected a private key!`;
}
;
function processEntry(acmeUrl, entry, clients) {
    return __awaiter(this, void 0, void 0, function* () {
        let undoables = new Array();
        try {
            let accountKey = getPrivateKey(entry.account);
            let certificateKey = getPrivateKey(entry.key);
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
                            let hostname = yield getCanonicalName(makeProvisionHostname(authorization.payload.identifier.value));
                            let content = mod_1.acme.computeKeyAuthorization(challenge.token, accountKey.export({ format: "jwk" }));
                            let { client, domain, subdomain } = getClientDetails(hostname, clients);
                            let undoable = yield client.provisionTextRecord({
                                domain,
                                subdomain,
                                content
                            });
                            undoables.push(undoable);
                            yield retryWithExponentialBackoff(60, 3, () => __awaiter(this, void 0, void 0, function* () {
                                let records = (yield libdns.promises.resolveTxt(hostname)).map((hostname) => hostname.join(""));
                                if (!records.includes(content)) {
                                    throw ``;
                                }
                            }));
                            yield handler.finalizeChallenge(account.url, challenge.url);
                        }
                    }
                }
                order = yield retryWithExponentialBackoff(15, 4, () => __awaiter(this, void 0, void 0, function* () {
                    let updated = yield handler.getOrder(account.url, order.url);
                    if (updated.payload.status === "pending") {
                        throw ``;
                    }
                    return updated;
                }));
            }
            if (order.payload.status === "ready") {
                let csr = mod_1.pkcs10.createCertificateRequest(order.payload.identifiers.map((identifier) => identifier.value), certificateKey);
                yield handler.finalizeOrder(account.url, order.payload.finalize, {
                    csr: csr.toString("base64url")
                });
            }
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
        }
        finally {
            for (let undoable of undoables) {
                yield undoable.undo();
            }
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
    let document = mod_2.pem.parse(libfs.readFileSync(path, "utf-8"));
    let section = document.sections.find((section) => section.label === "CERTIFICATE");
    if (section == null) {
        throw `Expected a CERTIFICATE label!`;
    }
    let node = mod_4.der.node.parse(new mod_1.parsing.Parser(section.buffer));
    let datesNode = mod_3.asn1.Sequence.as(mod_3.asn1.Sequence.as(mod_3.asn1.Sequence.as(node).data[0]).data[4]);
    let notBeforeNode = mod_3.asn1.UTCTime.as(datesNode.data[0]);
    let notAfterNode = mod_3.asn1.UTCTime.as(datesNode.data[1]);
    let notBefore = parseUTCTime(notBeforeNode);
    let notAfter = parseUTCTime(notAfterNode);
    return {
        notBefore,
        notAfter
    };
}
;
function getDelayFromValidity(validity) {
    if (validity == null) {
        return 0;
    }
    let renewAfter = validity.notBefore + Math.round((validity.notAfter - validity.notBefore) * 0.75);
    let now = Date.now();
    return renewAfter - now;
}
;
function compareValidity(one, two) {
    if (one == null) {
        if (two != null) {
            return -1;
        }
        else {
            return 0;
        }
    }
    else {
        if (two == null) {
            return 1;
        }
    }
    return one.notAfter - two.notAfter;
}
;
function run(options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let acme = (_a = options.acme) !== null && _a !== void 0 ? _a : exports.LETS_ENCRYPT_STAGING;
        if (acme === "le") {
            acme = exports.LETS_ENCRYPT;
        }
        let clients = new Array();
        for (let credentials of options.providers) {
            let client = yield makeClient(credentials);
            let domains = yield client.listDomains();
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
            var _a;
            let hostnames = certificate.hostnames;
            let root = (_a = certificate.root) !== null && _a !== void 0 ? _a : "./";
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
                    let ms = getDelayFromValidity(entry.validity);
                    yield delay(ms);
                    yield processEntry(acme, entry, clients);
                    let validity = getValidityFromCertificate(entry.cert);
                    if (validity == null) {
                        // Do not retry entry until all other entries have been processed.
                        queue.push(entry);
                    }
                    else {
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
    });
}
exports.run = run;
;
