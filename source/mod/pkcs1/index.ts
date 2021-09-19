import * as asn1 from "../asn1";
import * as der from "../der";
import * as jwk from "../jwk";
import * as parsing from "../parsing";
import * as schema from "./schema";

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
	let [nNode, eNode] = node.data;
	let n = jwk.getJWKInteger(nNode.data);
	let e = jwk.getJWKInteger(eNode.data);
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
	let [vNode, nNode, eNode, dNode, pNode, qNode, dpNode, dqNode, qiNode, othNode] = node.data;
	let n = jwk.getJWKInteger(nNode.data);
	let e = jwk.getJWKInteger(eNode.data);
	let d = jwk.getJWKInteger(dNode.data);
	let p = jwk.getJWKInteger(pNode.data);
	let q = jwk.getJWKInteger(qNode.data);
	let dp = jwk.getJWKInteger(dpNode.data);
	let dq = jwk.getJWKInteger(dqNode.data);
	let qi = jwk.getJWKInteger(qiNode.data);
	let oth = othNode?.data.map((node: schema.OtherPrimeInfo) => {
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
