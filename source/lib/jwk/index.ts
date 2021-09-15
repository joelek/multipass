import * as libcrypto from "crypto";
import * as asn1 from "../asn1";
import * as schema from "./schema";

export * from "./schema";

export function getJWKInteger(string: string): string {
	let bufferASN1 = Buffer.from(string, "base64url");
	let bigint = asn1.decodeInteger(bufferASN1);
	let bufferJWK = asn1.encodeInteger(bigint, { paddedUnsigned: false });
	return bufferJWK.toString("base64url");
};

export function getASN1Integer(string: string): string {
	let bufferJWK = Buffer.from(string, "base64url");
	let bigint = asn1.decodeInteger(bufferJWK, { paddedUnsigned: false });
	let bufferASN1 = asn1.encodeInteger(bigint);
	return bufferASN1.toString("base64url");
};

export function getPublicKey(key: schema.AssymetricKey): schema.PublicKey {
	if (schema.RSAPublicKey.is(key)) {
		let { n, e } = key;
		return {
			kty: "RSA",
			n,
			e
		};
	}
	if (schema.ECPublicKey.is(key)) {
		let { crv, x, y } = key;
		return {
			kty: "EC",
			crv,
			x,
			y
		};
	}
	throw `Expected code to be unreachable!`;
};

export function computeThumbprint(key: schema.AssymetricKey): string {
	let hash = libcrypto.createHash("sha256");
	if (schema.RSAPublicKey.is(key)) {
		let { kty, n, e } = key;
		hash.update(Buffer.from(`{"e":"${e}","kty":"${kty}","n":"${n}"}`));
		let buffer = hash.digest();
		return buffer.toString("base64url");
	}
	if (schema.ECPublicKey.is(key)) {
		let { kty, crv, x, y } = key;
		hash.update(Buffer.from(`{"crv":"${crv}","kty":"${kty}","x":"${x}","y":"${y}"}`));
		let buffer = hash.digest();
		return buffer.toString("base64url");
	}
	throw `Expected code to be unreachable!`;
};
