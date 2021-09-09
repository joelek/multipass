import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as pkcs1 from "../pkcs1";
import * as schema from "./schema";
import * as parsing from "../parsing";

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
	let bufferPKCS1 = Buffer.from(node.data[1].data, "base64url");
	return pkcs1.parseRSAPublicKey(bufferPKCS1);
};

export function serializeRSAPublicKey(key: jwk.RSAPublicKey): Buffer {
	let bufferPKCS1 = pkcs1.serializeRSAPublicKey(key);
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
				data: bufferPKCS1.toString("base64url")
			}
		]
	};
	let bufferPKCS8 = der.node.serialize(node);
	return bufferPKCS8;
};

export function parseRSAPrivateKey(bufferPKCS8: Buffer): jwk.RSAPrivateKey {
	let parser = new parsing.Parser(bufferPKCS8);
	let node = schema.RSAPrivateKey.as(der.node.parse(parser));
	let bufferPKCS1 = Buffer.from(node.data[2].data, "base64url");
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
