"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKeyJWK = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKeyPKCS1 = exports.generatePrivateKey = void 0;
const libcrypto = require("crypto");
const jwk = require("../jwk");
function generatePrivateKey(options) {
    var _a;
    let modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 4096;
    let pair = libcrypto.generateKeyPairSync("rsa", {
        modulusLength: modulusLength
    });
    return pair.privateKey;
}
exports.generatePrivateKey = generatePrivateKey;
;
function generatePrivateKeyPKCS1(options) {
    let key = generatePrivateKey(options);
    return key.export({
        format: "der",
        type: "pkcs1"
    });
}
exports.generatePrivateKeyPKCS1 = generatePrivateKeyPKCS1;
;
function generatePrivateKeyPKCS8(options) {
    let key = generatePrivateKey(options);
    return key.export({
        format: "der",
        type: "pkcs8"
    });
}
exports.generatePrivateKeyPKCS8 = generatePrivateKeyPKCS8;
;
function generatePrivateKeyJWK(options) {
    let key = generatePrivateKey(options);
    let json = key.export({
        format: "jwk"
    });
    return jwk.RSAPrivateKey.as(json);
}
exports.generatePrivateKeyJWK = generatePrivateKeyJWK;
;
