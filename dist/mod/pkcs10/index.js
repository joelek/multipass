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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCertificateRequest = exports.createSANExtension = exports.getDefaultAlgorithm = void 0;
const libcrypto = require("crypto");
const asn1 = require("../asn1");
const der = require("../der");
const jwk = require("../jwk");
const parsing = require("../parsing");
const pkcs5 = require("../pkcs5");
const pkcs8 = require("../pkcs8");
__exportStar(require("./schema"), exports);
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
function createSANExtension(hostnames) {
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
exports.createSANExtension = createSANExtension;
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
    let extensionRequests = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.9.14" }),
            Object.assign(Object.assign({}, asn1.SET), { data: [
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.29.17" }),
                                    Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: createSANExtension(hostnames).toString("base64url") })
                                ] })
                        ] })
                ] })
        ] });
    let cri = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(0)).toString("base64url") }),
            Object.assign({}, subject),
            Object.assign({}, spki),
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "END_OF_CONTENT",
                data: [
                    extensionRequests
                ]
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
