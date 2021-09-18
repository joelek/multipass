"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKey = exports.generatePrivateKeyDER = exports.generatePrivateKeyObject = void 0;
const libcrypto = require("crypto");
const sec1 = require("../sec1");
function generatePrivateKeyObject(options) {
    var _a;
    let namedCurve = (_a = options === null || options === void 0 ? void 0 : options.namedCurve) !== null && _a !== void 0 ? _a : "prime256v1";
    let pair = libcrypto.generateKeyPairSync("ec", {
        namedCurve: namedCurve
    });
    return pair.privateKey;
}
exports.generatePrivateKeyObject = generatePrivateKeyObject;
;
function generatePrivateKeyDER(options) {
    var _a, _b;
    let namedCurve = (_a = options === null || options === void 0 ? void 0 : options.namedCurve) !== null && _a !== void 0 ? _a : "prime256v1";
    let type = (_b = options === null || options === void 0 ? void 0 : options.type) !== null && _b !== void 0 ? _b : "pkcs8";
    let pair = libcrypto.generateKeyPairSync("ec", {
        namedCurve: namedCurve,
        publicKeyEncoding: {
            type: "spki",
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
        type: "sec1"
    });
    return sec1.parseECPrivateKey(buffer);
}
exports.generatePrivateKey = generatePrivateKey;
;
