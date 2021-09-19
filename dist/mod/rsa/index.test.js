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
const rsa = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = rsa.generatePrivateKey();
    console.assert(true, `It should generate keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = rsa.generatePrivateKeyPKCS1();
    console.assert(true, `It should generate keys using the PKCS1 format properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = rsa.generatePrivateKeyPKCS8();
    console.assert(true, `It should generate keys using the PKCS8 format properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = rsa.generatePrivateKeyJWK();
    console.assert(true, `It should generate keys using the JWK format properly.`);
}))();
