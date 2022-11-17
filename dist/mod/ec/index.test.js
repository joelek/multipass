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
const ec = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKey();
    console.assert(true, `It should generate keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeyPKCS8({
        format: "der"
    });
    console.assert(true, `It should generate keys using the PKCS8 container and the DER format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeyPKCS8({
        format: "der",
        passphrase: "test",
        cipher: "aes-256-cbc"
    });
    console.assert(true, `It should generate encrypted keys using the PKCS8 container and the DER format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeyPKCS8({
        format: "pem"
    });
    console.assert(true, `It should generate keys using the PKCS8 container and the PEM format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeyPKCS8({
        format: "pem",
        passphrase: "test",
        cipher: "aes-256-cbc"
    });
    console.assert(true, `It should generate encrypted keys using the PKCS8 container and the PEM format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeySEC1({
        format: "der"
    });
    console.assert(true, `It should generate keys using the SEC1 container and the DER format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeySEC1({
        format: "pem"
    });
    console.assert(true, `It should generate keys using the SEC1 container and the PEM format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeySEC1({
        format: "pem",
        passphrase: "test",
        cipher: "aes-256-cbc"
    });
    console.assert(true, `It should generate encrypted keys using the SEC1 container and the PEM format.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = ec.generatePrivateKeyJWK();
    console.assert(true, `It should generate keys using the JWK format properly.`);
}))();
