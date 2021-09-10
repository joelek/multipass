import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as pkcs8 from "../pkcs8";
import * as parsing from "../parsing";
import * as schema from "./schema";

export * from "./schema";

export function parseCurve(node: asn1.ObjectIdentifier): "P-256" | "P-384" | "P-521" {
	if (pkcs8.ECCurvePrime256v1.is(node)) {
		return "P-256";
	}
	if (pkcs8.ECCurveAnsip384r1.is(node)) {
		return "P-384";
	}
	if (pkcs8.ECCurveAnsip521r1.is(node)) {
		return "P-521";
	}
	throw `Expected curve to be known!`;
};

export function serializeCurve(curve: "P-256" | "P-384" | "P-521"): pkcs8.ECCurve {
	if (curve === "P-256") {
		let node: pkcs8.ECCurvePrime256v1 = {
			...asn1.OBJECT_IDENTIFER,
			data: "1.2.840.10045.3.1.7"
		};
		return node;
	}
	if (curve === "P-384") {
		let node: pkcs8.ECCurveAnsip384r1 = {
			...asn1.OBJECT_IDENTIFER,
			data: "1.3.132.0.34"
		};
		return node;
	}
	if (curve === "P-521") {
		let node: pkcs8.ECCurveAnsip521r1 = {
			...asn1.OBJECT_IDENTIFER,
			data: "1.3.132.0.35"
		};
		return node;
	}
	throw `Expected curve to be known!`;
};

export function parsePoint(node: asn1.BitString): { x: string, y: string } {
	/*
	bit string of 66 bytes, 0 unused bits leads to 65 bytes left, first byte is 4 which means uncompressed
	007b68900be859b316ddd7a977444ab82bc19a647e0f6ebd387d0ad5cb5fdb21239770e20141eacfebedb110f24952185c99eaea4ce56485aa5352015a
	3d22a64f4800d83332ccf006c4d32af31590cd423691f4b26a001377f12debce1c4518f6f58f34a7b5a96651da40ff843a550f7209e32bf7c901f94689
	*/
	throw `TODO`;
};

export function serializePoint(x: string, y: string): asn1.BitString {
	throw `TODO`;
};

export function parseECPrivateKey(buffer: Buffer): jwk.ECPrivateKey {
	let parser = new parsing.Parser(buffer);
	let node = schema.ECPrivateKey.as(der.node.parse(parser));
	let [vNode, dNode, crvNode, xyNode] = node.data;
	let d = jwk.getJWKInteger(dNode.data);
	let crv = parseCurve(crvNode.data[0]);
	let { x, y } = parsePoint(xyNode.data[0]);
	return {
		kty: "EC",
		crv,
		x,
		y,
		d
	};
};

export function serializeECPrivateKey(key: jwk.ECPrivateKey): Buffer {
	let { crv, x, y, d } = key;
	let node: schema.ECPrivateKey = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.INTEGER,
				data: Buffer.of(1).toString("base64url")
			},
			{
				...asn1.OCTET_STRING,
				data: jwk.getASN1Integer(d)
			},
			{
				kind: "CONTEXT",
				form: "CONSTRUCTED",
				type: "END_OF_CONTENT",
				data: [
					{
						...serializeCurve(crv)
					}
				]
			},
			{
				kind: "CONTEXT",
				form: "CONSTRUCTED",
				type: "BOOLEAN",
				data: [
					{
						...serializePoint(x, y)
					}
				]
			}
		]
	};
	return der.node.serialize(node);
};
