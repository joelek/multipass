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
	let node = schema.RSAPublicKey.as(der.node.parse(parser));
	let n = jwk.getJWKInteger(node.data[0].data);
	let e = jwk.getJWKInteger(node.data[1].data);
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
				data: jwk.getASN1Integer(n)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(e)
			}
		]
	};
	return der.node.serialize(node);
};

export function parseRSAPrivateKey(buffer: Buffer): jwk.RSAPrivateKey {
	let parser = new parsing.Parser(buffer);
	let node = schema.RSAPrivateKey.as(der.node.parse(parser));
	let n = jwk.getJWKInteger(node.data[1].data);
	let e = jwk.getJWKInteger(node.data[2].data);
	let d = jwk.getJWKInteger(node.data[3].data);
	let p = jwk.getJWKInteger(node.data[4].data);
	let q = jwk.getJWKInteger(node.data[5].data);
	let dp = jwk.getJWKInteger(node.data[6].data);
	let dq = jwk.getJWKInteger(node.data[7].data);
	let qi = jwk.getJWKInteger(node.data[8].data);
	let oth = node.data[9]?.data.map((node: schema.OtherPrimeInfo) => {
		let r = jwk.getJWKInteger(node.data[0].data);
		let d = jwk.getJWKInteger(node.data[1].data);
		let t = jwk.getJWKInteger(node.data[2].data);
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
				data: jwk.getASN1Integer(n)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(e)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(d)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(p)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(q)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(dp)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(dq)
			},
			{
				...asn1.INTEGER,
				data: jwk.getASN1Integer(qi)
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
							data: jwk.getASN1Integer(prime.r)
						},
						{
							...asn1.INTEGER,
							data: jwk.getASN1Integer(prime.d)
						},
						{
							...asn1.INTEGER,
							data: jwk.getASN1Integer(prime.t)
						}
					]
				}
			})
		});
	}
	return der.node.serialize(node);
};
