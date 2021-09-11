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
	if (pkcs8.ECCurveSecp384r1.is(node)) {
		return "P-384";
	}
	if (pkcs8.ECCurveSecp521r1.is(node)) {
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
		let node: pkcs8.ECCurveSecp384r1 = {
			...asn1.OBJECT_IDENTIFER,
			data: "1.3.132.0.34"
		};
		return node;
	}
	if (curve === "P-521") {
		let node: pkcs8.ECCurveSecp521r1 = {
			...asn1.OBJECT_IDENTIFER,
			data: "1.3.132.0.35"
		};
		return node;
	}
	throw `Expected curve to be known!`;
};

export function parsePoint(node: asn1.BitString): { x: string, y: string } {
	let buffer = Buffer.from(node.data, "base64url");
	if (buffer[0] !== 0x00) {
		throw `Expected zero unused bits!`;
	}
	if (buffer[1] !== 0x04) {
		throw `Expected an uncompressed point!`;
	}
	buffer = buffer.slice(2);
	if ((buffer.length % 2) !== 0) {
		throw `Expected an even number of octets!`;
	}
	let xBuffer = buffer.slice(0, buffer.length / 2);
	let yBuffer = buffer.slice(buffer.length / 2);
	let xEncoded = asn1.encodeInteger(asn1.decodeInteger(xBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
	let yEncoded = asn1.encodeInteger(asn1.decodeInteger(yBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
	let x = xEncoded.toString("base64url");
	let y = yEncoded.toString("base64url");
	return {
		x,
		y
	};
};

export function serializePoint(x: string, y: string): asn1.BitString {
	let xBuffer = Buffer.from(x, "base64url");
	let yBuffer = Buffer.from(y, "base64url");
	let width = Math.max(xBuffer.length, yBuffer.length);
	let buffer = Buffer.alloc(2 + width + width);
	buffer[0] = 0x00;
	buffer[1] = 0x04;
	buffer.set(xBuffer, 2 + width - xBuffer.length);
	buffer.set(yBuffer, 2 + width + width - yBuffer.length);
	let data = buffer.toString("base64url");
	return {
		...asn1.BIT_STRING,
		data
	};
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
