import * as libcrypto from "crypto";
import * as jwk from "../jwk";
import * as sec1 from "../sec1";

export function generatePrivateKeyDER(options?: Partial<{
	namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string,
	type: "pkcs8" | "sec1"
}>): Buffer {
	let namedCurve = options?.namedCurve ?? "prime256v1";
	let type = options?.type ?? "pkcs8";
	let pair = libcrypto.generateKeyPairSync("ec", {
		namedCurve: namedCurve,
		publicKeyEncoding: {
			type: "spki",
			format: "der"
		},
		privateKeyEncoding: {
			type: type,
			format: "der"
		}
	});
	return pair.privateKey;
};

export function generatePrivateKey(): jwk.ECPrivateKey {
	let buffer = generatePrivateKeyDER({
		type: "sec1"
	});
	return sec1.parseECPrivateKey(buffer);
};
