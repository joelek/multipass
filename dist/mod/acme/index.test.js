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
const acme = require("./");
const EC_PUBLIC_KEY_JWK = {
    kty: "EC",
    crv: "P-256",
    x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
    y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU"
};
const EC_PRIVATE_KEY_JWK = {
    kty: "EC",
    crv: "P-256",
    x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
    y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU",
    d: "HgAqXPFEjaxNXGrtIIn2Xkx5oLK9Sp4RCqhkNzczQ68"
};
const RSA_PUBLIC_KEY_JWK = {
    kty: "RSA",
    n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
    e: "AQAB"
};
const RSA_PRIVATE_KEY_JWK = {
    kty: "RSA",
    n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
    e: "AQAB",
    d: "MqNBSdDIMLFwH2n34t3RhCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y_H2FJQ4Qbuq0g2P8ewUWPT_qIQ"
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = acme.computeKeyAuthorization("1234", EC_PUBLIC_KEY_JWK);
    let expected = "8zAzmuVdA5Cwc97l2kmGZxKGN2cBMy4JJTPzto2CFGo";
    console.assert(observed === expected, "It should compute key authorizations for EC public keys properly.");
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = acme.computeKeyAuthorization("1234", EC_PRIVATE_KEY_JWK);
    let expected = "8zAzmuVdA5Cwc97l2kmGZxKGN2cBMy4JJTPzto2CFGo";
    console.assert(observed === expected, "It should compute key authorizations for EC private keys properly.");
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = acme.computeKeyAuthorization("1234", RSA_PUBLIC_KEY_JWK);
    let expected = "ReOM7UTJhOJ0uRH_Nb9uew535zl3PxxTxxmf2G8N9hE";
    console.assert(observed === expected, "It should compute key authorizations for RSA public keys properly.");
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = acme.computeKeyAuthorization("1234", RSA_PRIVATE_KEY_JWK);
    let expected = "ReOM7UTJhOJ0uRH_Nb9uew535zl3PxxTxxmf2G8N9hE";
    console.assert(observed === expected, "It should compute key authorizations for RSA private keys properly.");
}))();
