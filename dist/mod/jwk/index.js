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
exports.computeThumbprint = exports.getPublicKey = exports.getASN1Integer = exports.getJWKInteger = void 0;
const libcrypto = require("crypto");
const asn1 = require("../asn1");
const schema = require("./schema");
__exportStar(require("./schema"), exports);
function getJWKInteger(string) {
    let bufferASN1 = Buffer.from(string, "base64url");
    let bigint = asn1.decodeInteger(bufferASN1);
    let bufferJWK = asn1.encodeInteger(bigint, { paddedUnsigned: false });
    return bufferJWK.toString("base64url");
}
exports.getJWKInteger = getJWKInteger;
;
function getASN1Integer(string) {
    let bufferJWK = Buffer.from(string, "base64url");
    let bigint = asn1.decodeInteger(bufferJWK, { paddedUnsigned: false });
    let bufferASN1 = asn1.encodeInteger(bigint);
    return bufferASN1.toString("base64url");
}
exports.getASN1Integer = getASN1Integer;
;
function getPublicKey(key) {
    if (schema.RSAPublicKey.is(key)) {
        let { n, e } = key;
        return {
            kty: "RSA",
            n,
            e
        };
    }
    if (schema.ECPublicKey.is(key)) {
        let { crv, x, y } = key;
        return {
            kty: "EC",
            crv,
            x,
            y
        };
    }
    throw `Expected code to be unreachable!`;
}
exports.getPublicKey = getPublicKey;
;
function computeThumbprint(key) {
    let hash = libcrypto.createHash("sha256");
    if (schema.RSAPublicKey.is(key)) {
        let { kty, n, e } = key;
        hash.update(Buffer.from(`{"e":"${e}","kty":"${kty}","n":"${n}"}`));
        let buffer = hash.digest();
        return buffer.toString("base64url");
    }
    if (schema.ECPublicKey.is(key)) {
        let { kty, crv, x, y } = key;
        hash.update(Buffer.from(`{"crv":"${crv}","kty":"${kty}","x":"${x}","y":"${y}"}`));
        let buffer = hash.digest();
        return buffer.toString("base64url");
    }
    throw `Expected code to be unreachable!`;
}
exports.computeThumbprint = computeThumbprint;
;
