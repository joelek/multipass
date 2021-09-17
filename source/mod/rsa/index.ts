import * as libcrypto from "crypto";
import * as jwk from "../jwk";
import * as pkcs1 from "../pkcs1";

export function generatePrivateKeyDER(options?: Partial<{
	modulusLength: number,
	type: "pkcs1" | "pkcs8"
}>): Buffer {
	let modulusLength = options?.modulusLength ?? 4096;
	let type = options?.type ?? "pkcs1";
	let pair = libcrypto.generateKeyPairSync("rsa", {
		modulusLength: modulusLength,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "der"
		},
		privateKeyEncoding: {
			type: type,
			format: "der"
		}
	});
	return pair.privateKey;
};

export function generatePrivateKey(): jwk.RSAPrivateKey {
	let buffer = generatePrivateKeyDER({
		type: "pkcs1"
	});
	return pkcs1.parseRSAPrivateKey(buffer);
};
