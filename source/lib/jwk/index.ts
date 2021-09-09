import * as asn1 from "../asn1";

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
