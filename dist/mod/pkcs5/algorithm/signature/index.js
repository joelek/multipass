"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHA512WithRSAEncryption = exports.SHA384WithRSAEncryption = exports.SHA256WithRSAEncryption = exports.ECDSAWithSHA512 = exports.ECDSAWithSHA384 = exports.ECDSAWithSHA256 = exports.fromJoseType = exports.fromIdentifier = void 0;
const libcrypto = require("crypto");
const asn1 = require("../../../asn1");
const schema = require("../../schema");
;
function fromIdentifier(node) {
    try {
        return ECDSAWithSHA256.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return ECDSAWithSHA384.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return ECDSAWithSHA512.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return SHA256WithRSAEncryption.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return SHA384WithRSAEncryption.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return SHA512WithRSAEncryption.fromIdentifier(node);
    }
    catch (error) { }
    throw `Expected signature algorithm to be known!`;
}
exports.fromIdentifier = fromIdentifier;
;
function fromJoseType(joseType) {
    if (joseType === "ES256") {
        return new ECDSAWithSHA256();
    }
    if (joseType === "ES384") {
        return new ECDSAWithSHA384();
    }
    if (joseType === "ES512") {
        return new ECDSAWithSHA512();
    }
    if (joseType === "RS256") {
        return new SHA256WithRSAEncryption();
    }
    if (joseType === "RS384") {
        return new SHA384WithRSAEncryption();
    }
    if (joseType === "RS512") {
        return new SHA512WithRSAEncryption();
    }
    throw `Expected signature algorithm to be known!`;
}
exports.fromJoseType = fromJoseType;
;
class ECDSAWithSHA256 {
    constructor(options) {
        var _a;
        this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.2" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "ES256";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha256");
        sign.update(buffer);
        return sign.sign({
            key,
            dsaEncoding: this.format
        });
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha256");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.ECDSAWithSHA256.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new ECDSAWithSHA256();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.ECDSAWithSHA256 = ECDSAWithSHA256;
;
class ECDSAWithSHA384 {
    constructor(options) {
        var _a;
        this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.3" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "ES384";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha384");
        sign.update(buffer);
        return sign.sign({
            key,
            dsaEncoding: this.format
        });
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha384");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.ECDSAWithSHA384.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new ECDSAWithSHA384();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.ECDSAWithSHA384 = ECDSAWithSHA384;
;
class ECDSAWithSHA512 {
    constructor(options) {
        var _a;
        this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.4" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "ES512";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha512");
        sign.update(buffer);
        return sign.sign({
            key,
            dsaEncoding: this.format
        });
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha512");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.ECDSAWithSHA512.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new ECDSAWithSHA512();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.ECDSAWithSHA512 = ECDSAWithSHA512;
;
class SHA256WithRSAEncryption {
    constructor() {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.11" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "RS256";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha256");
        sign.update(buffer);
        return sign.sign(key);
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha256");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.SHA256WithRSAEncryption.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new SHA256WithRSAEncryption();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.SHA256WithRSAEncryption = SHA256WithRSAEncryption;
;
class SHA384WithRSAEncryption {
    constructor() {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.12" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "RS384";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha384");
        sign.update(buffer);
        return sign.sign(key);
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha384");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.SHA384WithRSAEncryption.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new SHA384WithRSAEncryption();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.SHA384WithRSAEncryption = SHA384WithRSAEncryption;
;
class SHA512WithRSAEncryption {
    constructor() {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.13" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getJoseType() {
        return "RS512";
    }
    sign(buffer, key) {
        let sign = libcrypto.createSign("sha512");
        sign.update(buffer);
        return sign.sign(key);
    }
    verify(buffer, key, signature) {
        let verify = libcrypto.createVerify("sha512");
        verify.update(buffer);
        return verify.verify(key, signature);
    }
    static fromIdentifier(node) {
        if (schema.SHA512WithRSAEncryption.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new SHA512WithRSAEncryption();
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.SHA512WithRSAEncryption = SHA512WithRSAEncryption;
;
