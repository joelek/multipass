import * as libcrypto from "crypto";
import * as asno from "../asno";
import * as der from "../der";
import * as oid from "../oid";
import * as parsing from "../parsing";

export const RSA_OID = `1.2.840.113549.1.1.1`;

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
	let node = asno.expect(der.parseNode(parser), {
		kind: `UNIVERSAL`,
		form: `CONSTRUCTED`,
		type: `SEQUENCE`
	});
	let children = der.parse(new parsing.Parser(node.data));
	if (children.length < 9) {
		throw `Expected at least 9 children!`;
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

export function parsePKCS8(parser: parsing.Parser): PrivateKey {
	let node = asno.expect(der.parseNode(parser), {
		kind: `UNIVERSAL`,
		form: `CONSTRUCTED`,
		type: `SEQUENCE`
	});
	let children = der.parse(new parsing.Parser(node.data));
	if (children.length < 3) {
		throw `Expected at least 3 children!`;
	}
	let version = asno.expect(children[0], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `INTEGER`
	}).data;
	let algorithms = der.parse(new parsing.Parser(asno.expect(children[1], {
		kind: `UNIVERSAL`,
		form: `CONSTRUCTED`,
		type: `SEQUENCE`
	}).data));
	if (algorithms.length < 2) {
		throw `Expected at least 2 algorithms!`;
	}
	let rsa = oid.parse(new parsing.Parser(asno.expect(algorithms[0], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `OBJECT_IDENTIFIER`
	}).data)).join(`.`);
	if (rsa !== RSA_OID) {
		throw `Expected an RSA object identifier!`;
	}
	let terminator = asno.expect(algorithms[1], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `NULL`
	}).data;
	let private_key = asno.expect(children[2], {
		kind: `UNIVERSAL`,
		form: `PRIMITIVE`,
		type: `OCTET_STRING`
	}).data;
	return parsePKCS1(new parsing.Parser(private_key));
};

export function generatePrivateKey(): PrivateKey {
	let buffer = generateDerPrivateKey({
		type: `pkcs8`
	});
	let parser = new parsing.Parser(buffer);
	return parsePKCS8(parser);
};
