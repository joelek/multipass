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
const libcrypto = require("crypto");
const x509 = require("./");
const CERT = Buffer.from(`
	MIIBMDCB26ADAgECAgEBMA0GCSqGSIb3DQEBCwUAMBQxEjAQBgNVBAMMCW11bHR
	pcGFzczAeFw0wMDAxMDEwMDAwMDBaFw0wMDEyMzEyMzU5NTlaMBQxEjAQBgNVBA
	MMCWxvY2FsaG9zdDBcMA0GCSqGSIb3DQEBAQUAA0sAMEgCQQC+YzD+wK/KGFy2q
	/fnw1IzFU6CEhgzjODlhOOVUsV7mixHQ9klQ9Vu+yjdw5vcCOUXVVu5MtcnWZYT
	a2p2/qiVAgMBAAGjGDAWMBQGA1UdEQQNMAuCCWxvY2FsaG9zdDANBgkqhkiG9w0
	BAQsFAANBAKPWdjrQ+EyA1cdE0FBY8QCq8yPljao3MmONnanIsU2IK0WY9ZGMoP
	FxCStXbCN+sw8M5shO/mAhnVMPLftjgb8=
`, "base64");
const KEY = libcrypto.createPrivateKey({
    key: Buffer.from(`
		MIIBOQIBAAJBAL5jMP7Ar8oYXLar9+fDUjMVToISGDOM4OWE45VSxXuaLEdD2SVD
		1W77KN3Dm9wI5RdVW7ky1ydZlhNranb+qJUCAwEAAQJAMqNBSdDIMLFwH2n34t3R
		hCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y/H2FJQ4Qbuq0g2P8ewUWPT/q
		IQIhAPc9/05YqNP7xAsoRA7luG3S1bl4h0kGZA7iTs/DTZVpAiEAxSGiFQoPAyz6
		Q0YAdl8f0KBYQI72M0MZCrlOSOwz+E0CIAn2nKA6oGsSfT7522xCQ6FhWq2Dtufx
		cvzKj+R9eVXpAiAqJzz/fr0jErUZOZjTtxeYhxEYDPn8kDaEoodo9IlQaQIgGarT
		lyv2qmBZ7DNaYscVFR38zWQUWXpKh49Kw5WGt64=
	`, "base64"),
    format: "der",
    type: "pkcs1"
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = CERT;
    let observed = x509.generateSignedCertificate(["localhost"], KEY, KEY, {}, {
        notBefore: new Date("2000-01-01T00:00:00Z"),
        notAfter: new Date("2000-12-31T23:59:59Z")
    });
    console.assert(observed.equals(expected), `It should generate self-signed certificates.`);
}))();
