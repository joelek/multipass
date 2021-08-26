import * as libcrypto from "crypto";
import * as der from "../der";
import * as parsing from "../parsing";

export type PublicKey = {
	modulus: Buffer;
	public_exponent: Buffer;
};

export type PrivateKey = {
	version: Buffer;
	modulus: Buffer;
	public_exponent: Buffer;
	private_exponent: Buffer;
	prime_one: Buffer;
	prime_two: Buffer;
	exponent_one: Buffer;
	exponent_two: Buffer;
	coefficient: Buffer;
};

export function generatePrivateKeyPKCS1(): Buffer {
	let pair = libcrypto.generateKeyPairSync(`rsa`, {
		modulusLength: 4096,
		publicExponent: 65537,
		publicKeyEncoding: {
			type: `pkcs1`,
			format: `der`
		},
		privateKeyEncoding: {
			type: `pkcs1`,
			format: `der`
		}
	});
	return pair.privateKey;
};

export function parsePKCS1(parser: parsing.Parser): PrivateKey {
	let node = der.assertNode(der.parseNode(parser), {
		kind: "UNIVERSAL",
		form: "CONSTRUCTED",
		type: "SEQUENCE"
	});
	let children = der.parse(new parsing.Parser(node.data));
	if (children.length < 9) {
		throw `Expected at least 9 child nodes!`;
	}
	let version = der.assertNode(children[0], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let modulus = der.assertNode(children[1], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let public_exponent = der.assertNode(children[2], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let private_exponent = der.assertNode(children[3], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let prime_one = der.assertNode(children[4], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let prime_two = der.assertNode(children[5], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let exponent_one = der.assertNode(children[6], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let exponent_two = der.assertNode(children[7], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	let coefficient = der.assertNode(children[8], {
		kind: "UNIVERSAL",
		form: "PRIMITIVE",
		type: "INTEGER"
	}).data;
	return {
		version,
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

export function generatePrivateKey(): PrivateKey {
	let buffer = generatePrivateKeyPKCS1();
	let parser = new parsing.Parser(buffer);
	return parsePKCS1(parser);
};
