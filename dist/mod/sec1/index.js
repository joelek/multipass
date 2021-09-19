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
exports.serializeECPrivateKey = exports.parseECPrivateKey = exports.serializePoint = exports.parsePoint = exports.serializeCurve = exports.parseCurve = void 0;
const asn1 = require("../asn1");
const der = require("../der");
const jwk = require("../jwk");
const parsing = require("../parsing");
const pkcs8 = require("../pkcs8");
const schema = require("./schema");
__exportStar(require("./schema"), exports);
function parseCurve(node) {
    if (pkcs8.ECCurvePrime256v1.is(node)) {
        return "P-256";
    }
    if (pkcs8.ECCurveSecp384r1.is(node)) {
        return "P-384";
    }
    if (pkcs8.ECCurveSecp521r1.is(node)) {
        return "P-521";
    }
    throw `Expected curve to be known!`;
}
exports.parseCurve = parseCurve;
;
function serializeCurve(curve) {
    if (curve === "P-256") {
        let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.3.1.7" });
        return node;
    }
    if (curve === "P-384") {
        let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.3.132.0.34" });
        return node;
    }
    if (curve === "P-521") {
        let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.3.132.0.35" });
        return node;
    }
    throw `Expected curve to be known!`;
}
exports.serializeCurve = serializeCurve;
;
function parsePoint(node) {
    let buffer = Buffer.from(node.data, "base64url");
    if (buffer[0] !== 0x00) {
        throw `Expected zero unused bits!`;
    }
    if (buffer[1] !== 0x04) {
        throw `Expected an uncompressed point!`;
    }
    buffer = buffer.slice(2);
    if ((buffer.length % 2) !== 0) {
        throw `Expected an even number of octets!`;
    }
    let xBuffer = buffer.slice(0, buffer.length / 2);
    let yBuffer = buffer.slice(buffer.length / 2);
    let xEncoded = asn1.encodeInteger(asn1.decodeInteger(xBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
    let yEncoded = asn1.encodeInteger(asn1.decodeInteger(yBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
    let x = xEncoded.toString("base64url");
    let y = yEncoded.toString("base64url");
    return {
        x,
        y
    };
}
exports.parsePoint = parsePoint;
;
function serializePoint(x, y) {
    let xBuffer = Buffer.from(x, "base64url");
    let yBuffer = Buffer.from(y, "base64url");
    let width = Math.max(xBuffer.length, yBuffer.length);
    let buffer = Buffer.alloc(2 + width + width);
    buffer[0] = 0x00;
    buffer[1] = 0x04;
    buffer.set(xBuffer, 2 + width - xBuffer.length);
    buffer.set(yBuffer, 2 + width + width - yBuffer.length);
    let data = buffer.toString("base64url");
    return Object.assign(Object.assign({}, asn1.BIT_STRING), { data });
}
exports.serializePoint = serializePoint;
;
function parseECPrivateKey(buffer) {
    let parser = new parsing.Parser(buffer);
    let node = schema.ECPrivateKey.as(der.node.parse(parser));
    let [vNode, dNode, crvNode, xyNode] = node.data;
    let d = jwk.getJWKInteger(dNode.data);
    let crv = parseCurve(crvNode.data[0]);
    let { x, y } = parsePoint(xyNode.data[0]);
    return {
        kty: "EC",
        crv,
        x,
        y,
        d
    };
}
exports.parseECPrivateKey = parseECPrivateKey;
;
function serializeECPrivateKey(key) {
    let { crv, x, y, d } = key;
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(1).toString("base64url") }),
            Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: jwk.getASN1Integer(d) }),
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "END_OF_CONTENT",
                data: [
                    Object.assign({}, serializeCurve(crv))
                ]
            },
            {
                kind: "CONTEXT",
                form: "CONSTRUCTED",
                type: "BOOLEAN",
                data: [
                    Object.assign({}, serializePoint(x, y))
                ]
            }
        ] });
    return der.node.serialize(node);
}
exports.serializeECPrivateKey = serializeECPrivateKey;
;
