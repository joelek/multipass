import * as libcrypto from "crypto";
import * as der from "../der";
import * as parsing from "../parsing";
import * as schema from "./schema";

export type PublicKey = {
	modulus: Buffer;
	public_exponent: Buffer;
};

export type PrivateKey = PublicKey & {
	private_exponent: Buffer;
	prime_one: Buffer;
	prime_two: Buffer;
	exponent_one: Buffer;
	exponent_two: Buffer;
	coefficient: Buffer;
};

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

export function parsePKCS1(parser: parsing.Parser): PrivateKey {
	let node = schema.RSAPrivateKey.as(der.parseNode(parser));
	let modulus = Buffer.from(node.data[1].data, `base64`);
	let public_exponent = Buffer.from(node.data[2].data, `base64`);
	let private_exponent = Buffer.from(node.data[3].data, `base64`);
	let prime_one = Buffer.from(node.data[4].data, `base64`);
	let prime_two = Buffer.from(node.data[5].data, `base64`);
	let exponent_one = Buffer.from(node.data[6].data, `base64`);
	let exponent_two = Buffer.from(node.data[7].data, `base64`);
	let coefficient = Buffer.from(node.data[8].data, `base64`);
	return {
		modulus,
		public_exponent,
		private_exponent,
		prime_one,
		prime_two,
		exponent_one,
		exponent_two,
		coefficient
	};
};

export function parsePKCS8(parser: parsing.Parser): PrivateKey {
	let node = schema.PrivateKeyInfo.as(der.parseNode(parser));
	let pkcs1 = Buffer.from(node.data[2].data, `base64`);
	return parsePKCS1(new parsing.Parser(pkcs1));
};

export function generatePrivateKey(): PrivateKey {
	let buffer = generateDerPrivateKey({
		type: `pkcs8`
	});
	let parser = new parsing.Parser(buffer);
	return parsePKCS8(parser);
};
