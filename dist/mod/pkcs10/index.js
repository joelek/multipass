"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCertificateRequest = exports.createExtension = exports.getDefaultAlgorithm = exports.schema = void 0;
const libcrypto = require("crypto");
const asn1 = require("../asn1");
const der = require("../der");
const jwk = require("../jwk");
const pkcs5 = require("../pkcs5");
const pkcs8 = require("../pkcs8");
const parsing = require("../parsing");
exports.schema = require("./schema");
function getDefaultAlgorithm(key) {
    let keyJwk = key.export({ format: "jwk" });
    if (jwk.RSAPublicKey.is(keyJwk)) {
        return new pkcs5.signature.SHA256WithRSAEncryption();
    }
    if (jwk.ECPublicKey.is(keyJwk)) {
        if (keyJwk.crv === "P-256") {
            return new pkcs5.signature.ECDSAWithSHA256({ format: "der" });
        }
        if (keyJwk.crv === "P-384") {
            return new pkcs5.signature.ECDSAWithSHA384({ format: "der" });
        }
        if (keyJwk.crv === "P-521") {
            return new pkcs5.signature.ECDSAWithSHA512({ format: "der" });
        }
    }
    throw `Expected code to be unreachable!`;
}
exports.getDefaultAlgorithm = getDefaultAlgorithm;
;
function createExtension(hostnames) {
    if (hostnames.length === 0) {
        throw `Expected at least one hostname!`;
    }
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: hostnames.map((hostname) => {
            let buffer = Buffer.from(hostname);
            return {
                kind: "CONTEXT",
                form: "PRIMITIVE",
                type: "INTEGER",
                data: buffer.toString("base64url")
            };
        }) });
    return der.node.serialize(node);
}
exports.createExtension = createExtension;
;
function createCertificateRequest(hostnames, key, options) {
    var _a;
    if (hostnames.length === 0) {
        throw `Expected at least one hostname!`;
    }
    let signatureAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _a !== void 0 ? _a : getDefaultAlgorithm(key);
    let subject = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.SET), { data: [
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.4.3" }),
                            Object.assign(Object.assign({}, asn1.UTF8_STRING), { data: Buffer.from(hostnames[0]).toString("base64url") })
                        ] })
                ] })
        ] });
    let spki = pkcs8.PublicKeyInfo.as(der.node.parse(new parsing.Parser(libcrypto.createPublicKey(key).export({ format: "der", type: "spki" }))));
    let extensions = new Array(Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.9.14" }),
            Object.assign(Object.assign({}, asn1.SET), { data: [
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.29.17" }),
                                    Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: createExtension(hostnames).toString("base64url") })
                                ] })
                        ] })
                ] })
        ] }));
    let cri = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(0)).toString("base64url") }),
            Object.assign({}, subject),
            Object.assign({}, spki),
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "END_OF_CONTENT",
                data: extensions
            }
        ] });
    let signature = Buffer.concat([Buffer.alloc(1), signatureAlgorithm.sign(der.node.serialize(cri), key)]);
    let cr = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign({}, cri),
            Object.assign({}, signatureAlgorithm.getIdentifier()),
            Object.assign(Object.assign({}, asn1.BIT_STRING), { data: signature.toString("base64url") })
        ] });
    return der.node.serialize(cr);
}
exports.createCertificateRequest = createCertificateRequest;
;
