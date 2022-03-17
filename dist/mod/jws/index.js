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
exports.verify = exports.sign = exports.getDefaultAlgorithm = void 0;
const jwk = require("../jwk");
const pkcs5 = require("../pkcs5");
const schema = require("./schema");
__exportStar(require("./schema"), exports);
function encode(json) {
    if (json === undefined) {
        return "";
    }
    let string = JSON.stringify(json);
    let buffer = Buffer.from(string);
    return buffer.toString("base64url");
}
;
function getDefaultAlgorithm(key) {
    let keyJwk = key.export({ format: "jwk" });
    if (jwk.RSAPublicKey.is(keyJwk)) {
        return new pkcs5.signature.SHA256WithRSAEncryption();
    }
    if (jwk.ECPublicKey.is(keyJwk)) {
        if (keyJwk.crv === "P-256") {
            return new pkcs5.signature.ECDSAWithSHA256();
        }
        if (keyJwk.crv === "P-384") {
            return new pkcs5.signature.ECDSAWithSHA384();
        }
        if (keyJwk.crv === "P-521") {
            return new pkcs5.signature.ECDSAWithSHA512();
        }
    }
    throw `Expected code to be unreachable!`;
}
exports.getDefaultAlgorithm = getDefaultAlgorithm;
;
function sign(key, options) {
    var _a;
    let signatureAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _a !== void 0 ? _a : getDefaultAlgorithm(key);
    let protected_base64url = encode(Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.protected), { alg: signatureAlgorithm.getJoseType() }));
    let payload_base64url = encode(options === null || options === void 0 ? void 0 : options.payload);
    let signature = signatureAlgorithm.sign(Buffer.from(`${protected_base64url}.${payload_base64url}`), key);
    let signature_base64url = signature.toString("base64url");
    return {
        protected: protected_base64url,
        payload: payload_base64url,
        signature: signature_base64url
    };
}
exports.sign = sign;
;
function verify(body, key) {
    let signature = Buffer.from(body.signature, "base64url");
    let joseType = schema.Protected.as(JSON.parse(Buffer.from(body.protected, "base64url").toString())).alg;
    let signatureAlgorithm = pkcs5.signature.fromJoseType(joseType);
    return signatureAlgorithm.verify(Buffer.from(`${body.protected}.${body.payload}`), key, signature);
}
exports.verify = verify;
;
