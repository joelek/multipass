import * as jwk from "./";

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
	let observed = jwk.computeThumbprint(EC_PUBLIC_KEY_JWK);
	let expected = "UXyoANpMKPSd4Yfxr45vB3zkVRH-fI-WU0Gxq8jC0b4";
	console.assert(observed === expected, "It should compute thumbprints for EC public keys properly.");
})();

(async () => {
	let observed = jwk.computeThumbprint(EC_PRIVATE_KEY_JWK);
	let expected = "UXyoANpMKPSd4Yfxr45vB3zkVRH-fI-WU0Gxq8jC0b4";
	console.assert(observed === expected, "It should compute thumbprints for EC private keys properly.");
})();

(async () => {
	let observed = jwk.computeThumbprint(RSA_PUBLIC_KEY_JWK);
	let expected = "VMvTL6y4KSgmGZulvtcQAP2exTURZ3gVmRnQXlA2sgM";
	console.assert(observed === expected, "It should compute thumbprints for RSA public keys properly.");
})();

(async () => {
	let observed = jwk.computeThumbprint(RSA_PRIVATE_KEY_JWK);
	let expected = "VMvTL6y4KSgmGZulvtcQAP2exTURZ3gVmRnQXlA2sgM";
	console.assert(observed === expected, "It should compute thumbprints for RSA private keys properly.");
})();

(async () => {
	let observed = jwk.getJWKInteger(Buffer.of(0x00, 0xFF).toString("base64url"));
	let expected = Buffer.of(0xFF).toString("base64url");
	console.assert(observed === expected, "It should convert padded ASN1 integers to JWK integers properly.");
})();

(async () => {
	let observed = jwk.getJWKInteger(Buffer.of(0x7F).toString("base64url"));
	let expected = Buffer.of(0x7F).toString("base64url");
	console.assert(observed === expected, "It should convert unpadded ASN1 integers to JWK integers properly.");
})();

(async () => {
	let observed = jwk.getASN1Integer(Buffer.of(0x7F).toString("base64url"));
	let expected = Buffer.of(0x7F).toString("base64url");
	console.assert(observed === expected, "It should convert JWK integers to unpadded ASN1 integers properly.");
})();

(async () => {
	let observed = jwk.getASN1Integer(Buffer.of(0xFF).toString("base64url"));
	let expected = Buffer.of(0x00, 0xFF).toString("base64url");
	console.assert(observed === expected, "It should convert JWK integers to padded ASN1 integers properly.");
})();
