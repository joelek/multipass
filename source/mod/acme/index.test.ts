import * as acme from "./";
import * as jwk from "../jwk";

const EC_PUBLIC_KEY_JWK: jwk.ECPublicKey = {
	kty: "EC",
	crv: "P-256",
	x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
	y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU"
};

const EC_PRIVATE_KEY_JWK: jwk.ECPrivateKey = {
	kty: "EC",
	crv: "P-256",
	x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
	y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU",
	d: "HgAqXPFEjaxNXGrtIIn2Xkx5oLK9Sp4RCqhkNzczQ68"
};

const RSA_PUBLIC_KEY_JWK: jwk.RSAPublicKey = {
	kty: "RSA",
	n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
	e: "AQAB"
};

const RSA_PRIVATE_KEY_JWK: jwk.RSAPrivateKey = {
	kty: "RSA",
	n: "vmMw_sCvyhhctqv358NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tqdv6olQ",
	e: "AQAB",
	d: "MqNBSdDIMLFwH2n34t3RhCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y_H2FJQ4Qbuq0g2P8ewUWPT_qIQ"
};

(async () => {
	let observed = acme.computeKeyAuthorization("1234", EC_PUBLIC_KEY_JWK);
	let expected = "8zAzmuVdA5Cwc97l2kmGZxKGN2cBMy4JJTPzto2CFGo";
	console.assert(observed === expected, "It should compute key authorizations for EC public keys properly.");
})();

(async () => {
	let observed = acme.computeKeyAuthorization("1234", EC_PRIVATE_KEY_JWK);
	let expected = "8zAzmuVdA5Cwc97l2kmGZxKGN2cBMy4JJTPzto2CFGo";
	console.assert(observed === expected, "It should compute key authorizations for EC private keys properly.");
})();

(async () => {
	let observed = acme.computeKeyAuthorization("1234", RSA_PUBLIC_KEY_JWK);
	let expected = "ReOM7UTJhOJ0uRH_Nb9uew535zl3PxxTxxmf2G8N9hE";
	console.assert(observed === expected, "It should compute key authorizations for RSA public keys properly.");
})();

(async () => {
	let observed = acme.computeKeyAuthorization("1234", RSA_PRIVATE_KEY_JWK);
	let expected = "ReOM7UTJhOJ0uRH_Nb9uew535zl3PxxTxxmf2G8N9hE";
	console.assert(observed === expected, "It should compute key authorizations for RSA private keys properly.");
})();
