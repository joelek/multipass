"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PBKDF2Algorithm = exports.fromIdentifier = void 0;
const libcrypto = require("crypto");
const asn1 = require("../../../asn1");
const digest = require("../digest");
const schema = require("../../schema");
;
function fromIdentifier(node) {
    try {
        return PBKDF2Algorithm.fromIdentifier(node);
    }
    catch (error) { }
    throw `Expected derivation algorithm to be known!`;
}
exports.fromIdentifier = fromIdentifier;
;
class PBKDF2Algorithm {
    constructor(options) {
        var _a, _b, _c;
        this.salt = (_a = options === null || options === void 0 ? void 0 : options.salt) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
        this.iterations = (_b = options === null || options === void 0 ? void 0 : options.iterations) !== null && _b !== void 0 ? _b : 2048;
        this.keyLength = options === null || options === void 0 ? void 0 : options.keyLength;
        this.digestAlgorithm = (_c = options === null || options === void 0 ? void 0 : options.digestAlgorithm) !== null && _c !== void 0 ? _c : new digest.HMACSHA256Algorithm();
    }
    deriveKey(passphrase, defaultKeyLength) {
        var _a;
        return libcrypto.pbkdf2Sync(passphrase, this.salt, this.iterations, (_a = this.keyLength) !== null && _a !== void 0 ? _a : defaultKeyLength, this.digestAlgorithm.getType());
    }
    getIdentifier() {
        if (this.keyLength == null) {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.12" }),
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.salt.toString("base64url") }),
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url") }),
                            Object.assign({}, this.digestAlgorithm.getIdentifier())
                        ] })
                ] });
        }
        else {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.12" }),
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.salt.toString("base64url") }),
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url") }),
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.keyLength)).toString("base64url") }),
                            Object.assign({}, this.digestAlgorithm.getIdentifier())
                        ] })
                ] });
        }
    }
    static fromIdentifier(node) {
        if (schema.PBKDF2Identifier1.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let [saltNode, iterationsNode, keyLengthNode, digestNode] = optionsNode.data;
            if (asn1.OctetString.is(saltNode)) {
                let salt = Buffer.from(saltNode.data, "base64url");
                let iterations = Buffer.from(iterationsNode.data, "base64url");
                let keyLength = Buffer.from(keyLengthNode.data, "base64url");
                let digestAlgorithm = digest.fromIdentifier(digestNode);
                return new PBKDF2Algorithm({
                    salt,
                    iterations: Number(asn1.decodeInteger(iterations)),
                    keyLength: Number(asn1.decodeInteger(keyLength)),
                    digestAlgorithm
                });
            }
        }
        if (schema.PBKDF2Identifier2.is(node)) {
            let [algorithmNode, optionsNode] = node.data;
            let [saltNode, iterationsNode, digestNode] = optionsNode.data;
            if (asn1.OctetString.is(saltNode)) {
                let salt = Buffer.from(saltNode.data, "base64url");
                let iterations = Buffer.from(iterationsNode.data, "base64url");
                let digestAlgorithm = digest.fromIdentifier(digestNode);
                return new PBKDF2Algorithm({
                    salt,
                    iterations: Number(asn1.decodeInteger(iterations)),
                    digestAlgorithm
                });
            }
        }
        throw ``;
    }
}
exports.PBKDF2Algorithm = PBKDF2Algorithm;
;
