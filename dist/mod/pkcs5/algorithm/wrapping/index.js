"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBES2Algorithm = exports.fromIdentifier = void 0;
const asn1 = require("../../../asn1");
const cipher = require("../cipher");
const derivation = require("../derivation");
const schema = require("../../schema");
;
function fromIdentifier(node) {
    try {
        return PBES2Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    throw `Expected wrapping algorithm to be known!`;
}
exports.fromIdentifier = fromIdentifier;
;
class PBES2Algorithm {
    constructor(options) {
        var _a, _b;
        this.derivationAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.derivationAlgorithm) !== null && _a !== void 0 ? _a : new derivation.PBKDF2Algorithm();
        this.cipherAlgorithm = (_b = options === null || options === void 0 ? void 0 : options.cipherAlgorithm) !== null && _b !== void 0 ? _b : new cipher.AES256CBCAlgorithm();
    }
    unwrap(ciphertext, passhprase) {
        let keyLength = this.cipherAlgorithm.getKeyLength();
        let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
        let plaintext = this.cipherAlgorithm.decrypt(ciphertext, key);
        return plaintext;
    }
    wrap(plaintext, passhprase) {
        let keyLength = this.cipherAlgorithm.getKeyLength();
        let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
        let ciphertext = this.cipherAlgorithm.encrypt(plaintext, key);
        return ciphertext;
    }
    getIdentifier() {
        return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.13" }),
                Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign({}, this.derivationAlgorithm.getIdentifier()),
                        Object.assign({}, this.cipherAlgorithm.getIdentifier())
                    ] })
            ] });
    }
    static fromIdentifier(node) {
        if (schema.PBES2Identifier.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let [derivationNode, cipherNode] = optionsNode.data;
            let derivationAlgorithm = derivation.fromIdentifier(derivationNode);
            let cipherAlgorithm = cipher.fromIdentifier(cipherNode);
            return new PBES2Algorithm({
                derivationAlgorithm,
                cipherAlgorithm
            });
        }
        throw `Expected the algorithm expressed using ASN1 syntax!`;
    }
}
exports.PBES2Algorithm = PBES2Algorithm;
;
