"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeRSAPrivateKey = exports.parseRSAPrivateKey = exports.serializeRSAPublicKey = exports.parseRSAPublicKey = void 0;
const asn1 = require("../asn1");
const der = require("../der");
const pkcs1 = require("../pkcs1");
const schema = require("./schema");
const parsing = require("../parsing");
__exportStar(require("./schema"), exports);
function parseRSAPublicKey(bufferPKCS8) {
    try {
        let { n, e } = parseRSAPrivateKey(bufferPKCS8);
        return {
            kty: "RSA",
            n,
            e
        };
    }
    catch (error) { }
    let parser = new parsing.Parser(bufferPKCS8);
    let node = schema.RSAPublicKey.as(der.node.parse(parser));
    let [algoNode, keyNode] = node.data;
    let bitstring = Buffer.from(keyNode.data, "base64url");
    if (bitstring[0] !== 0x00) {
        throw `Expected zero unused bits!`;
    }
    let bufferPKCS1 = bitstring.slice(1);
    return pkcs1.parseRSAPublicKey(bufferPKCS1);
}
exports.parseRSAPublicKey = parseRSAPublicKey;
;
function serializeRSAPublicKey(key) {
    let bufferPKCS1 = pkcs1.serializeRSAPublicKey(key);
    let bitstring = Buffer.alloc(bufferPKCS1.length + 1);
    bitstring[0] = 0x00;
    bitstring.set(bufferPKCS1, 1);
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.1" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] }),
            Object.assign(Object.assign({}, asn1.BIT_STRING), { data: bitstring.toString("base64url") })
        ] });
    let bufferPKCS8 = der.node.serialize(node);
    return bufferPKCS8;
}
exports.serializeRSAPublicKey = serializeRSAPublicKey;
;
function parseRSAPrivateKey(bufferPKCS8) {
    let parser = new parsing.Parser(bufferPKCS8);
    let node = schema.RSAPrivateKey.as(der.node.parse(parser));
    let [versionNode, algoNode, keyNode] = node.data;
    let bufferPKCS1 = Buffer.from(keyNode.data, "base64url");
    return pkcs1.parseRSAPrivateKey(bufferPKCS1);
}
exports.parseRSAPrivateKey = parseRSAPrivateKey;
;
function serializeRSAPrivateKey(key) {
    let bufferPKCS1 = pkcs1.serializeRSAPrivateKey(key);
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(0).toString("base64url") }),
            Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.1" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] }),
            Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: bufferPKCS1.toString("base64url") })
        ] });
    let bufferPKCS8 = der.node.serialize(node);
    return bufferPKCS8;
}
exports.serializeRSAPrivateKey = serializeRSAPrivateKey;
;
