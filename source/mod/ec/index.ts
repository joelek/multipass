import * as libcrypto from "crypto";
import * as jwk from "../jwk";

export function generatePrivateKey(options?: Partial<{
	namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string
}>): libcrypto.KeyObject {
	let namedCurve = options?.namedCurve ?? "prime256v1";
	let pair = libcrypto.generateKeyPairSync("ec", {
		namedCurve: namedCurve
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS8(options?: Partial<{
	namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string
}>): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		format: "der",
		type: "pkcs8"
	});
};

export function generatePrivateKeySEC1(options?: Partial<{
	namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string
}>): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		format: "der",
		type: "sec1"
	});
};

export function generatePrivateKeyJWK(options?: Partial<{
	namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string
}>): jwk.ECPrivateKey {
	let key = generatePrivateKey(options);
	let json = key.export({
		format: "jwk"
	});
	return jwk.ECPrivateKey.as(json);
};
