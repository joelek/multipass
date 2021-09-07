import * as libcrypto from "crypto";
import * as der from "../der";
import * as jwk from "../jwk";
import * as pkcs1 from "../pkcs1";
import * as pkcs5 from "../pkcs5";
import * as pkcs8 from "../pkcs8";
import * as parsing from "../parsing";

export function generateDerPrivateKey(options?: Partial<{
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

export function parsePKCS8(buffer: Buffer, passphrase?: string): jwk.RSAPrivateKey {
	if (passphrase != null) {
		buffer = pkcs5.decrypt(buffer, passphrase);
	}
	let parser = new parsing.Parser(buffer);
	let node = pkcs8.PrivateKeyInfo.as(der.parseNode(parser));
	let keyPkcs1 = Buffer.from(node.data[2].data, "base64url");
	return pkcs1.parseRSAPrivateKey(keyPkcs1);
};

export function generatePrivateKey(): jwk.RSAPrivateKey {
	let buffer = generateDerPrivateKey({
		type: "pkcs8"
	});
	return parsePKCS8(buffer);
};
