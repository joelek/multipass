import * as libcrypto from "crypto";
import * as asn1 from "../asn1";
import * as der from "../der";
import * as parsing from "../parsing";
import * as schema from "./schema";

export * from "./schema";

export function deriveKey(keyDerivationAlgorithm: asn1.Node, passphrase: string, defaultKeyLength: number): Buffer {
	if (schema.PBKDF2AlgorithmIdentifier1.is(keyDerivationAlgorithm)) {
		if (asn1.OctetString.is(keyDerivationAlgorithm.data[1].data[0])) {
			let salt = Buffer.from(keyDerivationAlgorithm.data[1].data[0].data, "base64url");
			let iterations = Buffer.from(keyDerivationAlgorithm.data[1].data[1].data, "base64url");
			let keyLength = Buffer.from(keyDerivationAlgorithm.data[1].data[2].data, "base64url");
			let algorithm = keyDerivationAlgorithm.data[1].data[3];
			if (schema.HMACSHA256AlgorithmIdentifier.is(algorithm)) {
				return libcrypto.pbkdf2Sync(passphrase, salt, iterations.readUIntBE(0, iterations.length), keyLength.readUIntBE(0, keyLength.length), "sha256");
			}
			throw `Expected digestion algorithm to be known!`;
		}
	}
	if (schema.PBKDF2AlgorithmIdentifier2.is(keyDerivationAlgorithm)) {
		if (asn1.OctetString.is(keyDerivationAlgorithm.data[1].data[0])) {
			let salt = Buffer.from(keyDerivationAlgorithm.data[1].data[0].data, "base64url");
			let iterations = Buffer.from(keyDerivationAlgorithm.data[1].data[1].data, "base64url");
			let algorithm = keyDerivationAlgorithm.data[1].data[2];
			if (schema.HMACSHA256AlgorithmIdentifier.is(algorithm)) {
				return libcrypto.pbkdf2Sync(passphrase, salt, iterations.readUIntBE(0, iterations.length), defaultKeyLength, "sha256");
			}
			throw `Expected digestion algorithm to be known!`;
		}
	}
	throw `Expected derivation algorithm to be known!`;
};

export function decrypt(buffer: Buffer, passphrase: string): Buffer {
	let parser = new parsing.Parser(buffer);
	let node = schema.EncryptedPrivateKeyInfo.as(der.parseNode(parser));
	let wrappingAlgorithm = node.data[0];
	let ciphertext = Buffer.from(node.data[1].data, "base64url");
	if (schema.PBES2AlgorithmIdentifier.is(wrappingAlgorithm)) {
		let keyDerivationAlgorithm = wrappingAlgorithm.data[1].data[0];
		let cipherAlgorithm = wrappingAlgorithm.data[1].data[1];
		if (schema.AES256CBCAlgorithmIdentifier.is(cipherAlgorithm)) {
			let key = deriveKey(keyDerivationAlgorithm, passphrase, 32);
			let iv = Buffer.from(cipherAlgorithm.data[1].data, "base64url");
			let decipher = libcrypto.createDecipheriv("aes-256-cbc", key, iv);
			return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
		}
		throw `Expected cipher algorithm to be known!`;
	}
	throw `Expected wrapping algorithm to be known!`;
};

export function encrypt(buffer: Buffer, passphrase: string): Buffer {
	throw `Not yet implemented!`;
};
