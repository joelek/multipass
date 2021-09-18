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
const pkcs8 = require("./");
const RSA_PUBLIC_KEY_PKCS8 = Buffer.from(`
	MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAL5jMP7Ar8oYXLar9+fDUjMVToISGDOM
	4OWE45VSxXuaLEdD2SVD1W77KN3Dm9wI5RdVW7ky1ydZlhNranb+qJUCAwEAAQ==
`, "base64");
const RSA_PUBLIC_KEY_JWK = {
    kty: "RSA",
    n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
    e: "AQAB"
};
const RSA_PRIVATE_KEY_PKCS8 = Buffer.from(`
	MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAvmMw/sCvyhhctqv3
	58NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tq
	dv6olQIDAQABAkAyo0FJ0MgwsXAfaffi3dGEIruh3twvAd5jTYgWlFBQQkgpTM2T
	dBaqac8TbrL8fYUlDhBu6rSDY/x7BRY9P+ohAiEA9z3/Tlio0/vECyhEDuW4bdLV
	uXiHSQZkDuJOz8NNlWkCIQDFIaIVCg8DLPpDRgB2Xx/QoFhAjvYzQxkKuU5I7DP4
	TQIgCfacoDqgaxJ9PvnbbEJDoWFarYO25/Fy/MqP5H15VekCIConPP9+vSMStRk5
	mNO3F5iHERgM+fyQNoSih2j0iVBpAiAZqtOXK/aqYFnsM1pixxUVHfzNZBRZekqH
	j0rDlYa3rg==
`, "base64");
const RSA_PRIVATE_KEY_JWK = {
    kty: "RSA",
    n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
    e: "AQAB",
    d: "MqNBSdDIMLFwH2n34t3RhCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y_H2FJQ4Qbuq0g2P8ewUWPT_qIQ",
    p: "9z3_Tlio0_vECyhEDuW4bdLVuXiHSQZkDuJOz8NNlWk",
    q: "xSGiFQoPAyz6Q0YAdl8f0KBYQI72M0MZCrlOSOwz-E0",
    dp: "CfacoDqgaxJ9PvnbbEJDoWFarYO25_Fy_MqP5H15Vek",
    dq: "Kic8_369IxK1GTmY07cXmIcRGAz5_JA2hKKHaPSJUGk",
    qi: "GarTlyv2qmBZ7DNaYscVFR38zWQUWXpKh49Kw5WGt64"
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = pkcs8.parseRSAPublicKey(RSA_PUBLIC_KEY_PKCS8);
    console.assert(true, `It should parse RSA public keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pkcs8.serializeRSAPublicKey(RSA_PUBLIC_KEY_JWK);
    console.assert(observed.equals(RSA_PUBLIC_KEY_PKCS8), `It should serialize RSA public keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = pkcs8.parseRSAPrivateKey(RSA_PRIVATE_KEY_PKCS8);
    console.assert(true, `It should parse RSA private keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pkcs8.serializeRSAPrivateKey(RSA_PRIVATE_KEY_JWK);
    console.assert(observed.equals(RSA_PRIVATE_KEY_PKCS8), `It should serialize RSA private keys properly.`);
}))();
