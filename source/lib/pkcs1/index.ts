import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as schema from "./schema";
import * as parsing from "../parsing";

export * from "./schema";

export function parseRSAPublicKey(buffer: Buffer): jwk.RSAPublicKey {
	try {
		let { n, e } = parseRSAPrivateKey(buffer);
		return {
			kty: "RSA",
			n,
			e
		};
	} catch (error) {}
	let parser = new parsing.Parser(buffer);
	let node = schema.RSAPublicKey.as(der.parseNode(parser));
	let n = node.data[0].data;
	let e = node.data[1].data;
	return {
		kty: "RSA",
		n,
		e
	};
};

export function serializeRSAPublicKey(key: jwk.RSAPublicKey): Buffer {
	let { n, e } = key;
	let node: schema.RSAPublicKey = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.INTEGER,
				data: n
			},
			{
				...asn1.INTEGER,
				data: e
			}
		]
	};
	return der.serializeNode(node);
};

export function parseRSAPrivateKey(buffer: Buffer): jwk.RSAPrivateKey {
	let parser = new parsing.Parser(buffer);
	let node = schema.RSAPrivateKey.as(der.parseNode(parser));
	let n = node.data[1].data;
	let e = node.data[2].data;
	let d = node.data[3].data;
	let p = node.data[4].data;
	let q = node.data[5].data;
	let dp = node.data[6].data;
	let dq = node.data[7].data;
	let qi = node.data[8].data;
	let oth = node.data[9]?.data.map((node: schema.OtherPrimeInfo) => {
		let r = node.data[0].data;
		let d = node.data[1].data;
		let t = node.data[2].data;
		return {
			r,
			d,
			t
		};
	});
	return {
		kty: "RSA",
		n,
		e,
		d,
		p,
		q,
		dp,
		dq,
		qi,
		oth
	};
};

export function serializeRSAPrivateKey(key: jwk.RSAPrivateKey): Buffer {
	let { n, e, d, p, q, dp, dq, qi, oth } = key;
	if (p == null || q == null || dp == null || dq == null || qi == null) {
		throw `Expected a full RSA private key!`;
	}
	let node: schema.RSAPrivateKey = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.INTEGER,
				data: Buffer.of(0).toString("base64url")
			},
			{
				...asn1.INTEGER,
				data: n
			},
			{
				...asn1.INTEGER,
				data: e
			},
			{
				...asn1.INTEGER,
				data: d
			},
			{
				...asn1.INTEGER,
				data: p
			},
			{
				...asn1.INTEGER,
				data: q
			},
			{
				...asn1.INTEGER,
				data: dp
			},
			{
				...asn1.INTEGER,
				data: dq
			},
			{
				...asn1.INTEGER,
				data: qi
			}
		] as any
	};
	if (oth != null) {
		node.data.push({
			...asn1.SEQUENCE,
			data: oth.map((prime) => {
				return {
					...asn1.SEQUENCE,
					data: [
						{
							...asn1.INTEGER,
							data: prime.r
						},
						{
							...asn1.INTEGER,
							data: prime.d
						},
						{
							...asn1.INTEGER,
							data: prime.t
						}
					]
				}
			})
		});
	}
	return der.serializeNode(node);
};
