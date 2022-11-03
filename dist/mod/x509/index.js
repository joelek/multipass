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
exports.generateSignedCertificate = exports.signCertificationRequest = void 0;
const libcrypto = require("crypto");
const asn1 = require("../asn1");
const der = require("../der");
const pkcs5 = require("../pkcs5");
const pkcs10 = require("../pkcs10");
const parsing = require("../parsing");
const DEFAULT_VALIDITY_PERIOD_DAYS = 90;
__exportStar(require("./schema"), exports);
function signCertificationRequest(buffer, issuer, key, options) {
    var _a, _b;
    let serialNumber = (_a = options === null || options === void 0 ? void 0 : options.serialNumber) !== null && _a !== void 0 ? _a : BigInt(1);
    let signatureAlgorithm = (_b = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _b !== void 0 ? _b : pkcs10.getDefaultAlgorithm(key);
    let now = new Date();
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);
    let notBefore = options === null || options === void 0 ? void 0 : options.notBefore;
    if (notBefore == null) {
        notBefore = new Date(now);
    }
    let notAfter = options === null || options === void 0 ? void 0 : options.notAfter;
    if (notAfter == null) {
        notAfter = new Date(now);
        notAfter.setDate(notAfter.getDate() + DEFAULT_VALIDITY_PERIOD_DAYS);
    }
    let cr = pkcs10.CertificationRequest.as(der.node.parse(new parsing.Parser(buffer)));
    let [cri, crSignatureAlgorithmIdentifier, crSignature] = cr.data;
    let [criVersion, criSubject, criSubjectPublicKeyInfo, criAttributes] = cri.data;
    let crSignatureAlgorithm = pkcs5.signature.fromIdentifier(crSignatureAlgorithmIdentifier);
    let crKey = libcrypto.createPublicKey({
        key: der.node.serialize(criSubjectPublicKeyInfo),
        format: "der",
        type: "spki"
    });
    if (!crSignatureAlgorithm.verify(der.node.serialize(cri), crKey, Buffer.from(crSignature.data, "base64url").slice(1))) {
        throw `Expected signature to match certification request info!`;
    }
    let validity = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.UTC_TIME), { data: Buffer.from(asn1.encodeUTCTime(notBefore)).toString("base64url") }),
            Object.assign(Object.assign({}, asn1.UTC_TIME), { data: Buffer.from(asn1.encodeUTCTime(notAfter)).toString("base64url") })
        ] });
    let extensions = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [] });
    for (let criAttribute of criAttributes.data) {
        if (pkcs10.ExtensionRequests.is(criAttribute)) {
            for (let extension of criAttribute.data[1].data[0].data) {
                if (pkcs10.SubjectAlternativeNameExtension.is(extension)) {
                    extensions.data.push(extension);
                }
            }
        }
    }
    let tbsc = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "END_OF_CONTENT",
                data: [
                    Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(2)).toString("base64url") })
                ]
            },
            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(serialNumber).toString("base64url") }),
            Object.assign({}, crSignatureAlgorithmIdentifier),
            Object.assign({}, issuer),
            Object.assign({}, validity),
            Object.assign({}, criSubject),
            Object.assign({}, criSubjectPublicKeyInfo),
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "BIT_STRING",
                data: [
                    extensions
                ]
            }
        ] });
    let signature = Buffer.concat([Buffer.alloc(1), signatureAlgorithm.sign(der.node.serialize(tbsc), key)]);
    let certficate = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign({}, tbsc),
            Object.assign({}, signatureAlgorithm.getIdentifier()),
            Object.assign(Object.assign({}, asn1.BIT_STRING), { data: signature.toString("base64url") })
        ] });
    return der.node.serialize(certficate);
}
exports.signCertificationRequest = signCertificationRequest;
;
function generateSignedCertificate(hostnames, subjectKey, issuerKey, csrOptions, options) {
    let buffer = pkcs10.createCertificateRequest(hostnames, subjectKey, csrOptions);
    let commonName = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.4.3" }),
            Object.assign(Object.assign({}, asn1.UTF8_STRING), { data: Buffer.from("multipass").toString("base64url") })
        ] });
    let issuer = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.SET), { data: [
                    commonName
                ] })
        ] });
    return signCertificationRequest(buffer, issuer, issuerKey, options);
}
exports.generateSignedCertificate = generateSignedCertificate;
;
