"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AES256CBCAlgorithm = exports.AES192CBCAlgorithm = exports.AES128CBCAlgorithm = exports.fromIdentifier = void 0;
const libcrypto = require("crypto");
const asn1 = require("../../../asn1");
const schema = require("../../schema");
;
function fromIdentifier(node) {
    try {
        return AES128CBCAlgorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return AES192CBCAlgorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return AES256CBCAlgorithm.fromIdentifier(node);
    }
    catch (error) { }
    throw `Expected cipher algorithm to be known!`;
}
exports.fromIdentifier = fromIdentifier;
;
class AES128CBCAlgorithm {
    constructor(options) {
        var _a;
        this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
    }
    decrypt(ciphertext, key) {
        let decipher = libcrypto.createDecipheriv("aes-128-cbc", key, this.iv);
        let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext;
    }
    encrypt(plaintext, key) {
        let cipher = libcrypto.createCipheriv("aes-128-cbc", key, this.iv);
        let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
        return ciphertext;
    }
    getKeyLength() {
        return 16;
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.2" }),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
            ] });
    }
    static fromIdentifier(node) {
        if (schema.AES128CBCIdentifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let iv = Buffer.from(optionsNode.data, "base64url");
            return new AES128CBCAlgorithm({
                iv
            });
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.AES128CBCAlgorithm = AES128CBCAlgorithm;
;
class AES192CBCAlgorithm {
    constructor(options) {
        var _a;
        this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
    }
    decrypt(ciphertext, key) {
        let decipher = libcrypto.createDecipheriv("aes-192-cbc", key, this.iv);
        let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext;
    }
    encrypt(plaintext, key) {
        let cipher = libcrypto.createCipheriv("aes-192-cbc", key, this.iv);
        let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
        return ciphertext;
    }
    getKeyLength() {
        return 24;
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.22" }),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
            ] });
    }
    static fromIdentifier(node) {
        if (schema.AES192CBCIdentifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let iv = Buffer.from(optionsNode.data, "base64url");
            return new AES192CBCAlgorithm({
                iv
            });
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.AES192CBCAlgorithm = AES192CBCAlgorithm;
;
class AES256CBCAlgorithm {
    constructor(options) {
        var _a;
        this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
    }
    decrypt(ciphertext, key) {
        let decipher = libcrypto.createDecipheriv("aes-256-cbc", key, this.iv);
        let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext;
    }
    encrypt(plaintext, key) {
        let cipher = libcrypto.createCipheriv("aes-256-cbc", key, this.iv);
        let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
        return ciphertext;
    }
    getKeyLength() {
        return 32;
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.42" }),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
            ] });
    }
    static fromIdentifier(node) {
        if (schema.AES256CBCIdentifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let iv = Buffer.from(optionsNode.data, "base64url");
            return new AES256CBCAlgorithm({
                iv
            });
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.AES256CBCAlgorithm = AES256CBCAlgorithm;
;
