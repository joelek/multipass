import * as der from "../der";
import * as jwk from "../jwk";
import * as pkcs1 from "../pkcs1";
import * as pkcs5 from "../pkcs5";
import * as pkcs8 from "../pkcs8";
import * as parsing from "../parsing";

export * from "./schema";

export function parseRSAPublicKey(buffer: Buffer, passphrase?: string): jwk.RSAPublicKey {
	try {
		let { n, e } = parseRSAPrivateKey(buffer, passphrase);
		return {
			kty: "RSA",
			n,
			e
		};
	} catch (error) {}
	let bufferPKCS8 = (passphrase != null) ? pkcs5.decrypt(buffer, passphrase) : buffer;
	let parser = new parsing.Parser(bufferPKCS8);
	let node = pkcs8.RSAPublicKey.as(der.parseNode(parser));
	let bufferPKCS1 = Buffer.from(node.data[1].data, "base64url");
	return pkcs1.parseRSAPublicKey(bufferPKCS1);
};

export function serializeRSAPublicKey(key: jwk.RSAPublicKey, passphrase?: string): Buffer {
	throw `Not yet implemented!`;
};

export function parseRSAPrivateKey(buffer: Buffer, passphrase?: string): jwk.RSAPrivateKey {
	let bufferPKCS8 = (passphrase != null) ? pkcs5.decrypt(buffer, passphrase) : buffer;
	let parser = new parsing.Parser(bufferPKCS8);
	let node = pkcs8.RSAPrivateKey.as(der.parseNode(parser));
	let bufferPKCS1 = Buffer.from(node.data[2].data, "base64url");
	return pkcs1.parseRSAPrivateKey(bufferPKCS1);
};

export function serializeRSAPrivateKey(key: jwk.RSAPrivateKey, passphrase?: string): Buffer {
	throw `Not yet implemented!`;
};
