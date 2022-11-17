"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKeyBuffer = exports.generatePrivateKeyJWK = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKeyPKCS8PEM = exports.generatePrivateKeyPKCS8DER = exports.generatePrivateKeyPKCS1 = exports.generatePrivateKeyPKCS1PEM = exports.generatePrivateKeyPKCS1DER = exports.generatePrivateKey = void 0;
const libcrypto = require("crypto");
const jwk = require("../jwk");
const DEFAULT_CIPHER = libcrypto.getCiphers()[0];
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
function generatePrivateKeyPKCS1DER(options) {
    let key = generatePrivateKey(options);
    return key.export({
        type: "pkcs1",
        format: "der"
    });
}
exports.generatePrivateKeyPKCS1DER = generatePrivateKeyPKCS1DER;
;
function generatePrivateKeyPKCS1PEM(options) {
    var _a;
    let key = generatePrivateKey(options);
    let passphrase = options === null || options === void 0 ? void 0 : options.passphrase;
    let cipher = (_a = options === null || options === void 0 ? void 0 : options.cipher) !== null && _a !== void 0 ? _a : (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
    return Buffer.from(key.export({
        type: "pkcs1",
        format: "pem",
        passphrase: passphrase,
        cipher: cipher
    }));
}
exports.generatePrivateKeyPKCS1PEM = generatePrivateKeyPKCS1PEM;
;
function generatePrivateKeyPKCS1(options) {
    if ((options === null || options === void 0 ? void 0 : options.format) === "der") {
        return generatePrivateKeyPKCS1DER(options);
    }
    else {
        return generatePrivateKeyPKCS1PEM(options);
    }
}
exports.generatePrivateKeyPKCS1 = generatePrivateKeyPKCS1;
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
function generatePrivateKeyJWK(options) {
    let key = generatePrivateKey(options);
    let json = key.export({
        format: "jwk"
    });
    return jwk.RSAPrivateKey.as(json);
}
exports.generatePrivateKeyJWK = generatePrivateKeyJWK;
;
function generatePrivateKeyBuffer(options) {
    if ((options === null || options === void 0 ? void 0 : options.container) === "pkcs8") {
        return generatePrivateKeyPKCS1(options);
    }
    else {
        return generatePrivateKeyPKCS8(options);
    }
}
exports.generatePrivateKeyBuffer = generatePrivateKeyBuffer;
;
