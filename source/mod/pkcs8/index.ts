import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as parsing from "../parsing";
import * as pkcs1 from "../pkcs1";
import * as schema from "./schema";

export * from "./schema";

export function parseRSAPublicKey(bufferPKCS8: Buffer): jwk.RSAPublicKey {
	try {
		let { n, e } = parseRSAPrivateKey(bufferPKCS8);
		return {
			kty: "RSA",
			n,
			e
		};
	} catch (error) {}
	let parser = new parsing.Parser(bufferPKCS8);
	let node = schema.RSAPublicKey.as(der.node.parse(parser));
	let [algoNode, keyNode] = node.data;
	let bitstring = Buffer.from(keyNode.data, "base64url");
	if (bitstring[0] !== 0x00) {
		throw `Expected zero unused bits!`;
	}
	let bufferPKCS1 = bitstring.slice(1);
	return pkcs1.parseRSAPublicKey(bufferPKCS1);
};

export function serializeRSAPublicKey(key: jwk.RSAPublicKey): Buffer {
	let bufferPKCS1 = pkcs1.serializeRSAPublicKey(key);
	let bitstring = Buffer.alloc(bufferPKCS1.length + 1);
	bitstring[0] = 0x00;
	bitstring.set(bufferPKCS1, 1);
	let node: schema.RSAPublicKey = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.SEQUENCE,
				data: [
					{
						...asn1.OBJECT_IDENTIFER,
						data: "1.2.840.113549.1.1.1"
					},
					{
						...asn1.NULL,
						data: ""
					}
				]
			},
			{
				...asn1.BIT_STRING,
				data: bitstring.toString("base64url")
			}
		]
	};
	let bufferPKCS8 = der.node.serialize(node);
	return bufferPKCS8;
};

export function parseRSAPrivateKey(bufferPKCS8: Buffer): jwk.RSAPrivateKey {
	let parser = new parsing.Parser(bufferPKCS8);
	let node = schema.RSAPrivateKey.as(der.node.parse(parser));
	let [versionNode, algoNode, keyNode] = node.data;
	let bufferPKCS1 = Buffer.from(keyNode.data, "base64url");
	return pkcs1.parseRSAPrivateKey(bufferPKCS1);
};

export function serializeRSAPrivateKey(key: jwk.RSAPrivateKey): Buffer {
	let bufferPKCS1 = pkcs1.serializeRSAPrivateKey(key);
	let node: schema.RSAPrivateKey = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.INTEGER,
				data: Buffer.of(0).toString("base64url")
			},
			{
				...asn1.SEQUENCE,
				data: [
					{
						...asn1.OBJECT_IDENTIFER,
						data: "1.2.840.113549.1.1.1"
					},
					{
						...asn1.NULL,
						data: ""
					}
				]
			},
			{
				...asn1.OCTET_STRING,
				data: bufferPKCS1.toString("base64url")
			}
		]
	};
	let bufferPKCS8 = der.node.serialize(node);
	return bufferPKCS8;
};
