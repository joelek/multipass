import * as libcrypto from "crypto";
import * as asno from "../asno";
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

export function generatePrivateKeyPKCS1(options?: Partial<{
	modulusLength: number
}>): Buffer {
	let modulusLength = options?.modulusLength ?? 4096;
	let pair = libcrypto.generateKeyPairSync(`rsa`, {
		modulusLength: modulusLength,
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
	let node = asno.expect(der.parseNode(parser), {
		kind: `UNIVERSAL`,
		form: `CONSTRUCTED`,
		type: `SEQUENCE`
	});
	let children = der.parse(new parsing.Parser(node.data));
	if (children.length < 9) {
		throw `Expected at least 9 nodes!`;
	}
	let version = asno.expect(children[0], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let modulus = asno.expect(children[1], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let public_exponent = asno.expect(children[2], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let private_exponent = asno.expect(children[3], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let prime_one = asno.expect(children[4], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let prime_two = asno.expect(children[5], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let exponent_one = asno.expect(children[6], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let exponent_two = asno.expect(children[7], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let coefficient = asno.expect(children[8], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
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
