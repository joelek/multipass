"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKeyJWK = exports.generatePrivateKeySEC1 = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKey = void 0;
const libcrypto = require("crypto");
const jwk = require("../jwk");
function generatePrivateKey(options) {
    var _a;
    let namedCurve = (_a = options === null || options === void 0 ? void 0 : options.namedCurve) !== null && _a !== void 0 ? _a : "prime256v1";
    let pair = libcrypto.generateKeyPairSync("ec", {
        namedCurve: namedCurve
    });
    return pair.privateKey;
}
exports.generatePrivateKey = generatePrivateKey;
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
function generatePrivateKeySEC1(options) {
    let key = generatePrivateKey(options);
    return key.export({
        format: "der",
        type: "sec1"
    });
}
exports.generatePrivateKeySEC1 = generatePrivateKeySEC1;
;
function generatePrivateKeyJWK(options) {
    let key = generatePrivateKey(options);
    let json = key.export({
        format: "jwk"
    });
    return jwk.ECPrivateKey.as(json);
}
exports.generatePrivateKeyJWK = generatePrivateKeyJWK;
;
