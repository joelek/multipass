"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKey = exports.generatePrivateKeyDER = exports.generatePrivateKeyObject = void 0;
const libcrypto = require("crypto");
const pkcs1 = require("../pkcs1");
function generatePrivateKeyObject(options) {
    var _a;
    let modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 4096;
    let pair = libcrypto.generateKeyPairSync("rsa", {
        modulusLength: modulusLength
    });
    return pair.privateKey;
}
exports.generatePrivateKeyObject = generatePrivateKeyObject;
;
function generatePrivateKeyDER(options) {
    var _a, _b;
    let modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 4096;
    let type = (_b = options === null || options === void 0 ? void 0 : options.type) !== null && _b !== void 0 ? _b : "pkcs1";
    let pair = libcrypto.generateKeyPairSync("rsa", {
        modulusLength: modulusLength,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "der"
        },
        privateKeyEncoding: {
            type: type,
            format: "der"
        }
    });
    return pair.privateKey;
}
exports.generatePrivateKeyDER = generatePrivateKeyDER;
;
function generatePrivateKey() {
    let buffer = generatePrivateKeyDER({
        type: "pkcs1"
    });
    return pkcs1.parseRSAPrivateKey(buffer);
}
exports.generatePrivateKey = generatePrivateKey;
;
