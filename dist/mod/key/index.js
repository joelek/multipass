"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrConstructPrivateKey = exports.constructPrivateKey = exports.generatePrivateKey = void 0;
const libcrypto = require("crypto");
const libfs = require("fs");
const libpath = require("path");
const ec = require("../ec");
const rsa = require("../rsa");
function generatePrivateKey(options) {
    if ((options === null || options === void 0 ? void 0 : options.type) === "rsa") {
        return rsa.generatePrivateKeyBuffer(options);
    }
    else {
        return ec.generatePrivateKeyBuffer(options);
    }
}
exports.generatePrivateKey = generatePrivateKey;
;
function constructPrivateKey(buffer, options) {
    return libcrypto.createPrivateKey({ key: buffer, passphrase: options === null || options === void 0 ? void 0 : options.passphrase });
}
exports.constructPrivateKey = constructPrivateKey;
;
function generateOrConstructPrivateKey(path, options) {
    libfs.mkdirSync(libpath.dirname(path), { recursive: true });
    if (!libfs.existsSync(path)) {
        let buffer = generatePrivateKey(options);
        libfs.writeFileSync(path, buffer);
    }
    let buffer = libfs.readFileSync(path);
    return constructPrivateKey(buffer, {
        passphrase: options.passphrase
    });
}
exports.generateOrConstructPrivateKey = generateOrConstructPrivateKey;
;
