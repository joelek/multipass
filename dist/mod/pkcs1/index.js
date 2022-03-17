"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const jwk = require("../jwk");
const parsing = require("../parsing");
const schema = require("./schema");
__exportStar(require("./schema"), exports);
function parseRSAPublicKey(buffer) {
    try {
        let { n, e } = parseRSAPrivateKey(buffer);
        return {
            kty: "RSA",
            n,
            e
        };
    }
    catch (error) { }
    let parser = new parsing.Parser(buffer);
    let node = schema.RSAPublicKey.as(der.node.parse(parser));
    let [nNode, eNode] = node.data;
    let n = jwk.getJWKInteger(nNode.data);
    let e = jwk.getJWKInteger(eNode.data);
    return {
        kty: "RSA",
        n,
        e
    };
}
exports.parseRSAPublicKey = parseRSAPublicKey;
;
function serializeRSAPublicKey(key) {
    let { n, e } = key;
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(n) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(e) })
        ] });
    return der.node.serialize(node);
}
exports.serializeRSAPublicKey = serializeRSAPublicKey;
;
function parseRSAPrivateKey(buffer) {
    let parser = new parsing.Parser(buffer);
    let node = schema.RSAPrivateKey.as(der.node.parse(parser));
    let [vNode, nNode, eNode, dNode, pNode, qNode, dpNode, dqNode, qiNode, othNode] = node.data;
    let n = jwk.getJWKInteger(nNode.data);
    let e = jwk.getJWKInteger(eNode.data);
    let d = jwk.getJWKInteger(dNode.data);
    let p = jwk.getJWKInteger(pNode.data);
    let q = jwk.getJWKInteger(qNode.data);
    let dp = jwk.getJWKInteger(dpNode.data);
    let dq = jwk.getJWKInteger(dqNode.data);
    let qi = jwk.getJWKInteger(qiNode.data);
    let oth = othNode === null || othNode === void 0 ? void 0 : othNode.data.map((node) => {
        let r = jwk.getJWKInteger(node.data[0].data);
        let d = jwk.getJWKInteger(node.data[1].data);
        let t = jwk.getJWKInteger(node.data[2].data);
        return {
            r,
            d,
            t
        };
    });
    return {
        kty: "RSA",
        n,
        e,
        d,
        p,
        q,
        dp,
        dq,
        qi,
        oth
    };
}
exports.parseRSAPrivateKey = parseRSAPrivateKey;
;
function serializeRSAPrivateKey(key) {
    let { n, e, d, p, q, dp, dq, qi, oth } = key;
    if (p == null || q == null || dp == null || dq == null || qi == null) {
        throw `Expected a full RSA private key!`;
    }
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(0).toString("base64url") }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(n) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(e) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(d) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(p) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(q) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(dp) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(dq) }),
            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(qi) })
        ] });
    if (oth != null) {
        node.data.push(Object.assign(Object.assign({}, asn1.SEQUENCE), { data: oth.map((prime) => {
                return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.r) }),
                        Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.d) }),
                        Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.t) })
                    ] });
            }) }));
    }
    return der.node.serialize(node);
}
exports.serializeRSAPrivateKey = serializeRSAPrivateKey;
;
