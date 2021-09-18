"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HMACSHA512256Algorithm = exports.HMACSHA512224Algorithm = exports.HMACSHA512Algorithm = exports.HMACSHA384Algorithm = exports.HMACSHA256Algorithm = exports.HMACSHA224Algorithm = exports.HMACSHA1Algorithm = exports.fromIdentifier = void 0;
const asn1 = require("../../../asn1");
const schema = require("../../schema");
;
function fromIdentifier(node) {
    try {
        return HMACSHA1Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA224Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA256Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA384Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA512Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA512224Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    try {
        return HMACSHA512256Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    throw `Expected digest algorithm to be known!`;
}
exports.fromIdentifier = fromIdentifier;
;
class HMACSHA1Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.7" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha1";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA1Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA1Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA1Algorithm = HMACSHA1Algorithm;
;
class HMACSHA224Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.8" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha224";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA224Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA224Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA224Algorithm = HMACSHA224Algorithm;
;
class HMACSHA256Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.9" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha256";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA256Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA256Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA256Algorithm = HMACSHA256Algorithm;
;
class HMACSHA384Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.10" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha384";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA384Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA384Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA384Algorithm = HMACSHA384Algorithm;
;
class HMACSHA512Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.11" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha512";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA512Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA512Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA512Algorithm = HMACSHA512Algorithm;
;
class HMACSHA512224Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.12" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha512-224";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA512224Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA512224Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA512224Algorithm = HMACSHA512224Algorithm;
;
class HMACSHA512256Algorithm {
    constructor(options) {
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.13" }),
                Object.assign(Object.assign({}, asn1.NULL), { data: "" })
            ] });
    }
    getType() {
        return "sha512-256";
    }
    static fromIdentifier(node) {
        if (schema.HMACSHA512256Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            return new HMACSHA512256Algorithm();
        }
        throw ``;
    }
}
exports.HMACSHA512256Algorithm = HMACSHA512256Algorithm;
;
