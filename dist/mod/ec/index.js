"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKeyBuffer = exports.generatePrivateKeyJWK = exports.generatePrivateKeySEC1 = exports.generatePrivateKeySEC1PEM = exports.generatePrivateKeySEC1DER = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKeyPKCS8PEM = exports.generatePrivateKeyPKCS8DER = exports.generatePrivateKey = void 0;
const libcrypto = require("crypto");
const jwk = require("../jwk");
const DEFAULT_CIPHER = libcrypto.getCiphers()[0];
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
function generatePrivateKeyPKCS8DER(options) {
    var _a;
    let key = generatePrivateKey(options);
    let passphrase = options === null || options === void 0 ? void 0 : options.passphrase;
    let cipher = (_a = options === null || options === void 0 ? void 0 : options.cipher) !== null && _a !== void 0 ? _a : (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
    return key.export({
        type: "pkcs8",
        format: "der",
        passphrase: passphrase,
        cipher: cipher
    });
}
exports.generatePrivateKeyPKCS8DER = generatePrivateKeyPKCS8DER;
;
function generatePrivateKeyPKCS8PEM(options) {
    var _a;
    let key = generatePrivateKey(options);
    let passphrase = options === null || options === void 0 ? void 0 : options.passphrase;
    let cipher = (_a = options === null || options === void 0 ? void 0 : options.cipher) !== null && _a !== void 0 ? _a : (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
    return Buffer.from(key.export({
        type: "pkcs8",
        format: "pem",
        passphrase: passphrase,
        cipher: cipher
    }));
}
exports.generatePrivateKeyPKCS8PEM = generatePrivateKeyPKCS8PEM;
;
function generatePrivateKeyPKCS8(options) {
    if ((options === null || options === void 0 ? void 0 : options.format) === "der") {
        return generatePrivateKeyPKCS8DER(options);
    }
    else {
        return generatePrivateKeyPKCS8PEM(options);
    }
}
exports.generatePrivateKeyPKCS8 = generatePrivateKeyPKCS8;
;
function generatePrivateKeySEC1DER(options) {
    let key = generatePrivateKey(options);
    return key.export({
        type: "sec1",
        format: "der"
    });
}
exports.generatePrivateKeySEC1DER = generatePrivateKeySEC1DER;
;
function generatePrivateKeySEC1PEM(options) {
    var _a;
    let key = generatePrivateKey(options);
    let passphrase = options === null || options === void 0 ? void 0 : options.passphrase;
    let cipher = (_a = options === null || options === void 0 ? void 0 : options.cipher) !== null && _a !== void 0 ? _a : (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
    return Buffer.from(key.export({
        type: "sec1",
        format: "pem",
        passphrase: passphrase,
        cipher: cipher
    }));
}
exports.generatePrivateKeySEC1PEM = generatePrivateKeySEC1PEM;
;
function generatePrivateKeySEC1(options) {
    if ((options === null || options === void 0 ? void 0 : options.format) === "der") {
        return generatePrivateKeySEC1DER(options);
    }
    else {
        return generatePrivateKeySEC1PEM(options);
    }
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
function generatePrivateKeyBuffer(options) {
    if ((options === null || options === void 0 ? void 0 : options.container) === "sec1") {
        return generatePrivateKeySEC1(options);
    }
    else {
        return generatePrivateKeyPKCS8(options);
    }
}
exports.generatePrivateKeyBuffer = generatePrivateKeyBuffer;
;
