import * as libcrypto from "crypto";
import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as pkcs1 from "../pkcs1";
import * as pkcs5 from "../pkcs5";
import * as pkcs8 from "../pkcs8";
import * as parsing from "../parsing";

export function generateDerPrivateKey(options?: Partial<{
	modulusLength: number,
	type: `pkcs1` | `pkcs8`
}>): Buffer {
	let modulusLength = options?.modulusLength ?? 4096;
	let type = options?.type ?? `pkcs1`;
	let pair = libcrypto.generateKeyPairSync(`rsa`, {
		modulusLength: modulusLength,
		publicKeyEncoding: {
			type: `pkcs1`,
			format: `der`
		},
		privateKeyEncoding: {
			type: type,
			format: `der`
		}
	});
	return pair.privateKey;
};

export function deriveKey(keyDerivationAlgorithm: asn1.Node, passphrase: string, keyLength: number): Buffer {
	if (pkcs5.PBKDF2AlgorithmIdentifier2.is(keyDerivationAlgorithm)) {
		if (asn1.OctetString.is(keyDerivationAlgorithm.data[1].data[0])) {
			let salt = Buffer.from(keyDerivationAlgorithm.data[1].data[0].data, "base64url");
			let iterations = Buffer.from(keyDerivationAlgorithm.data[1].data[1].data, "base64url");
			let algorithm = keyDerivationAlgorithm.data[1].data[2];
			if (pkcs5.HMACSHA256AlgorithmIdentifier.is(algorithm)) {
				return libcrypto.pbkdf2Sync(passphrase, salt, iterations.readUIntBE(0, iterations.length), keyLength, "sha256");
			}
			throw `Expected digestion algorithm to be known!`;
		}
	}
	throw `Expected derivation algorithm to be known!`;
};

export function decryptBuffer(cipherAlgorithm: asn1.Node, key: Buffer, ciphertext: Buffer): Buffer {
	if (pkcs5.AES256CBCAlgorithmIdentifier.is(cipherAlgorithm)) {
		let iv = Buffer.from(cipherAlgorithm.data[1].data, "base64url");
		let decipher = libcrypto.createDecipheriv("aes-256-cbc", key, iv);
		return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
	}
	throw `Expected cipher algorithm to be known!`;
};

export function unwrapKey(wrappingAlgorithm: asn1.Node, passphrase: string, ciphertext: Buffer): Buffer {
	if (pkcs5.PBES2AlgorithmIdentifier.is(wrappingAlgorithm)) {
		let key = deriveKey(wrappingAlgorithm.data[1].data[0], passphrase, 32);
		let pkcs8 = decryptBuffer(wrappingAlgorithm.data[1].data[1], key, ciphertext);
		return pkcs8;
	}
	throw `Expected wrapping algorithm to be known!`;
};

export function parsePKCS8(parser: parsing.Parser, passphrase?: string): jwk.RSAPrivateKey {
	if (passphrase != null) {
		let node = pkcs8.EncryptedPrivateKeyInfo.as(der.parseNode(parser));
		let wrappingAlgorithm = node.data[0];
		let ciphertext = Buffer.from(node.data[1].data, "base64url");
		let buffer = unwrapKey(wrappingAlgorithm, passphrase, ciphertext);
		return parsePKCS8(new parsing.Parser(buffer));
	} else {
		let node = pkcs8.PrivateKeyInfo.as(der.parseNode(parser));
		let buffer = Buffer.from(node.data[2].data, `base64url`);
		return pkcs1.parseRSAPrivateKey(buffer);
	}
};

export function generatePrivateKey(): jwk.RSAPrivateKey {
	let buffer = generateDerPrivateKey({
		type: `pkcs8`
	});
	let parser = new parsing.Parser(buffer);
	return parsePKCS8(parser);
};
