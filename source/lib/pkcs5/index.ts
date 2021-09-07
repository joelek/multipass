import * as libcrypto from "crypto";
import * as asn1 from "../asn1";
import * as der from "../der";
import * as parsing from "../parsing";
import * as schema from "./schema";

export * from "./schema";

export function encodeUnsignedInteger(number: number): Buffer {
	if (!Number.isInteger(number) || number < 0) {
		throw `Expected an unsigned integer!`;
	}
	let buffer = Buffer.alloc(4);
	buffer.writeUIntBE(number, 0, 4);
	let i = 0;
	for (; i < 4 - 1; i++) {
		if (buffer[i] !== 0) {
			break;
		}
	}
	return buffer.slice(i);
};

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
			throw `Expected digest algorithm to be known!`;
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
			throw `Expected digest algorithm to be known!`;
		}
	}
	throw `Expected key derivation algorithm to be known!`;
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
	throw `Expected key wrapping algorithm to be known!`;
};

export function makeDigestAlgorithmIdentifier(digestAlgorithm: "sha256"): schema.AlgorithmIdentifier {
	if (digestAlgorithm === "sha256") {
		let node: schema.HMACSHA256AlgorithmIdentifier = {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "KoZIhvcNAgk"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
		return node;
	}
	throw `Expected digest algorithm to be known!`;
};

export function makeKeyDerivationAlgorithmIdentifier(keyDerivationAlgorithm: "pbkdf2", digestAlgorithm: "sha256", salt: Buffer, iterations: number): schema.AlgorithmIdentifier {
	if (keyDerivationAlgorithm === "pbkdf2") {
		let node: schema.PBKDF2AlgorithmIdentifier2 = {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "KoZIhvcNAQUM"
				},
				{
					...asn1.SEQUENCE,
					data: [
						{
							...asn1.OCTET_STRING,
							data: salt.toString("base64url")
						},
						{
							...asn1.INTEGER,
							data: encodeUnsignedInteger(iterations).toString("base64url")
						},
						{
							...makeDigestAlgorithmIdentifier(digestAlgorithm)
						}
					]
				}
			]
		};
		return node;
	}
	throw `Expected key derivation algorithm to be known!`;
};

export function makeCipherAlgorithmIdentifier(cipherAlgorithm: "aes-256-cbc", iv: Buffer): schema.AlgorithmIdentifier {
	if (cipherAlgorithm === "aes-256-cbc") {
		let node: schema.AES256CBCAlgorithmIdentifier = {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "YIZIAWUDBAEq"
				},
				{
					...asn1.OCTET_STRING,
					data: iv.toString("base64url")
				}
			]
		};
		return node;
	}
	throw `Expected cipher algorithm to be known!`;
};

export function makeKeyWrappingAlgorithmIdentifier(keyWrappingAlgorithm: "pbes2", keyDerivationAlgorithm: "pbkdf2", digestAlgorithm: "sha256", salt: Buffer, iterations: number, cipherAlgorithm: "aes-256-cbc", iv: Buffer): schema.AlgorithmIdentifier {
	if (keyWrappingAlgorithm === "pbes2") {
		let node: schema.PBES2AlgorithmIdentifier = {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "KoZIhvcNAQUN"
				},
				{
					...asn1.SEQUENCE,
					data: [
						{
							...makeKeyDerivationAlgorithmIdentifier(keyDerivationAlgorithm, digestAlgorithm, salt, iterations)
						},
						{
							...makeCipherAlgorithmIdentifier(cipherAlgorithm, iv)
						}
					]
				}
			]
		};
		return node;
	}
	throw `Expected key wrapping algorithm to be known!`;
};

export function encrypt(plaintext: Buffer, passphrase: string, options?: Partial<{
	digestAlgorithm: "sha256",
	salt: Buffer,
	iterations: number,
	cipherAlgorithm: "aes-256-cbc",
	iv: Buffer
}>): Buffer {
	let cipherAlgorithm = options?.cipherAlgorithm ?? "aes-256-cbc";
	let { keyLength, ivLength } = { ...libcrypto.getCipherInfo(cipherAlgorithm) };
	if (keyLength == null || ivLength == null) {
		throw `Expected cipher algorithm "${cipherAlgorithm}" to be known!`;
	}
	let salt = options?.salt ?? libcrypto.randomBytes(8);
	let iterations = options?.iterations ?? 2048;
	let digestAlgorithm = options?.digestAlgorithm ?? "sha256";
	let key = libcrypto.pbkdf2Sync(passphrase, salt, iterations, keyLength, digestAlgorithm);
	let iv = options?.iv ?? libcrypto.randomBytes(ivLength);
	let cipher = libcrypto.createCipheriv(cipherAlgorithm, key, iv);
	let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
	let node: schema.EncryptedPrivateKeyInfo = {
		...asn1.SEQUENCE,
		data: [
			{
				...makeKeyWrappingAlgorithmIdentifier("pbes2", "pbkdf2", digestAlgorithm, salt, iterations, cipherAlgorithm, iv)
			},
			{
				...asn1.OCTET_STRING,
				data: ciphertext.toString("base64url")
			}
		]
	};
	return der.serializeNode(node);
};
