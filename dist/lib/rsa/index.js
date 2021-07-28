"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateKey = exports.generatePrivateKeyDer = void 0;
const $crypto = require("crypto");
const $asno = require("../der");
const $schema = require("./schema");
function generatePrivateKeyDer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            $crypto.generateKeyPair("rsa", {
                modulusLength: 4096,
                publicExponent: 65537,
                publicKeyEncoding: {
                    type: "pkcs1",
                    format: "der"
                },
                privateKeyEncoding: {
                    type: "pkcs1",
                    format: "der"
                }
            }, (error, public_key, private_key) => {
                if (error != null) {
                    return reject(error);
                }
                return resolve(private_key);
            });
        });
    });
}
exports.generatePrivateKeyDer = generatePrivateKeyDer;
function generatePrivateKey() {
    return __awaiter(this, void 0, void 0, function* () {
        let der = yield generatePrivateKeyDer();
        let nodes = yield $asno.parse(der);
        let private_key = $schema.PrivateKey.as(nodes);
        let components = private_key[0].data;
        let version = Buffer.from(components[0].data, "hex");
        let modulus = Buffer.from(components[1].data, "hex");
        let public_exponent = Buffer.from(components[2].data, "hex");
        let private_exponent = Buffer.from(components[3].data, "hex");
        let prime_one = Buffer.from(components[4].data, "hex");
        let prime_two = Buffer.from(components[5].data, "hex");
        let exponent_one = Buffer.from(components[6].data, "hex");
        let exponent_two = Buffer.from(components[7].data, "hex");
        let coefficient = Buffer.from(components[8].data, "hex");
        return {
            version,
            modulus,
            public_exponent,
            private_exponent,
            prime_one,
            prime_two,
            exponent_one,
            exponent_two,
            coefficient
        };
    });
}
exports.generatePrivateKey = generatePrivateKey;
