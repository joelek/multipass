import * as jwk from "../jwk";
import * as pkcs1 from "./";

const RSA_PUBLIC_KEY_PKCS1 = Buffer.from(`
	MEgCQQC+YzD+wK/KGFy2q/fnw1IzFU6CEhgzjODlhOOVUsV7mixHQ9klQ9Vu+yjd
	w5vcCOUXVVu5MtcnWZYTa2p2/qiVAgMBAAE=
`, "base64");

const RSA_PRIVATE_KEY_PKCS1 = Buffer.from(`
	MIIBOQIBAAJBAL5jMP7Ar8oYXLar9+fDUjMVToISGDOM4OWE45VSxXuaLEdD2SVD
	1W77KN3Dm9wI5RdVW7ky1ydZlhNranb+qJUCAwEAAQJAMqNBSdDIMLFwH2n34t3R
	hCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y/H2FJQ4Qbuq0g2P8ewUWPT/q
	IQIhAPc9/05YqNP7xAsoRA7luG3S1bl4h0kGZA7iTs/DTZVpAiEAxSGiFQoPAyz6
	Q0YAdl8f0KBYQI72M0MZCrlOSOwz+E0CIAn2nKA6oGsSfT7522xCQ6FhWq2Dtufx
	cvzKj+R9eVXpAiAqJzz/fr0jErUZOZjTtxeYhxEYDPn8kDaEoodo9IlQaQIgGarT
	lyv2qmBZ7DNaYscVFR38zWQUWXpKh49Kw5WGt64=
`, "base64");

const RSA_PUBLIC_KEY_JWK: jwk.RSAPublicKey = {
	kty: "RSA",
	n: "AL5jMP7Ar8oYXLar9-fDUjMVToISGDOM4OWE45VSxXuaLEdD2SVD1W77KN3Dm9wI5RdVW7ky1ydZlhNranb-qJU",
	e: "AQAB"
};

const RSA_PRIVATE_KEY_JWK: jwk.RSAPrivateKey = {
	kty: "RSA",
	n: "AL5jMP7Ar8oYXLar9-fDUjMVToISGDOM4OWE45VSxXuaLEdD2SVD1W77KN3Dm9wI5RdVW7ky1ydZlhNranb-qJU",
	e: "AQAB",
	d: "MqNBSdDIMLFwH2n34t3RhCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y_H2FJQ4Qbuq0g2P8ewUWPT_qIQ",
	p: "APc9_05YqNP7xAsoRA7luG3S1bl4h0kGZA7iTs_DTZVp",
	q: "AMUhohUKDwMs-kNGAHZfH9CgWECO9jNDGQq5TkjsM_hN",
	dp: "CfacoDqgaxJ9PvnbbEJDoWFarYO25_Fy_MqP5H15Vek",
	dq: "Kic8_369IxK1GTmY07cXmIcRGAz5_JA2hKKHaPSJUGk",
	qi: "GarTlyv2qmBZ7DNaYscVFR38zWQUWXpKh49Kw5WGt64"
};

(async () => {
	let key = pkcs1.parseRSAPublicKey(RSA_PUBLIC_KEY_PKCS1);
	console.assert(true, `It should parse RSA public keys properly.`);
})();

(async () => {
	let observed = pkcs1.serializeRSAPublicKey(RSA_PUBLIC_KEY_JWK);
	console.assert(observed.equals(RSA_PUBLIC_KEY_PKCS1), `It should serialize RSA public keys properly.`);
})();

(async () => {
	let key = pkcs1.parseRSAPrivateKey(RSA_PRIVATE_KEY_PKCS1);
	console.assert(true, `It should parse RSA private keys properly.`);
})();

(async () => {
	let observed = pkcs1.serializeRSAPrivateKey(RSA_PRIVATE_KEY_JWK);
	console.assert(observed.equals(RSA_PRIVATE_KEY_PKCS1), `It should serialize RSA private keys properly.`);
})();
