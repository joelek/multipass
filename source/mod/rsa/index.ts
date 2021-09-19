import * as libcrypto from "crypto";
import * as jwk from "../jwk";

export function generatePrivateKey(options?: Partial<{
	modulusLength: number
}>): libcrypto.KeyObject {
	let modulusLength = options?.modulusLength ?? 4096;
	let pair = libcrypto.generateKeyPairSync("rsa", {
		modulusLength: modulusLength
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS1(options?: Partial<{
	modulusLength: number
}>): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		format: "der",
		type: "pkcs1"
	});
};

export function generatePrivateKeyPKCS8(options?: Partial<{
	modulusLength: number
}>): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		format: "der",
		type: "pkcs8"
	});
};

export function generatePrivateKeyJWK(options?: Partial<{
	modulusLength: number
}>): jwk.RSAPrivateKey {
	let key = generatePrivateKey(options);
	let json = key.export({
		format: "jwk"
	});
	return jwk.RSAPrivateKey.as(json);
};
