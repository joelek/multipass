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
exports.encrypt = exports.decrypt = void 0;
const algorithm = require("./algorithm");
const asn1 = require("../asn1");
const der = require("../der");
const parsing = require("../parsing");
const schema = require("./schema");
__exportStar(require("./algorithm"), exports);
__exportStar(require("./schema"), exports);
function decrypt(buffer, passphrase) {
    let parser = new parsing.Parser(buffer);
    let node = der.node.parse(parser);
    if (schema.EncryptedPrivateKeyInfo.is(node)) {
        let [wrappingNode, ciphertextNode] = node.data;
        let wrappingAlgorithm = algorithm.wrapping.fromIdentifier(wrappingNode);
        let ciphertext = Buffer.from(ciphertextNode.data, "base64url");
        let plaintext = wrappingAlgorithm.unwrap(ciphertext, passphrase);
        return plaintext;
    }
    throw `Expected an encrypted buffer!`;
}
exports.decrypt = decrypt;
;
function encrypt(plaintext, passphrase, options) {
    var _a;
    let wrappingAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.wrappingAlgorithm) !== null && _a !== void 0 ? _a : new algorithm.wrapping.PBES2Algorithm();
    let ciphertext = wrappingAlgorithm.wrap(plaintext, passphrase);
    let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
            Object.assign({}, wrappingAlgorithm.getIdentifier()),
            Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: ciphertext.toString("base64url") })
        ] });
    return der.node.serialize(node);
}
exports.encrypt = encrypt;
;
