import * as libcrypto from "crypto";
import * as jwk from "../jwk";

const DEFAULT_CIPHER = libcrypto.getCiphers()[0];

export type RSAKeyOptions = {
	modulusLength?: number;
};

export type RSAExportOptionsPKCS1 = {
	format: "der";
} | {
	format: "pem";
	passphrase?: string;
	cipher?: string;
};

export type RSAExportOptionsPKCS8 = {
	format: "der";
	passphrase?: string;
	cipher?: string;
} | {
	format: "pem";
	passphrase?: string;
	cipher?: string;
};

export type RSAExportOptions = ({
	container: "pkcs1";
} & RSAExportOptionsPKCS1) | ({
	container: "pkcs8";
} & RSAExportOptionsPKCS8);

export type RSAOptions = RSAKeyOptions & RSAExportOptions;

export function generatePrivateKey(options?: RSAKeyOptions): libcrypto.KeyObject {
	let modulusLength = options?.modulusLength ?? 4096;
	let pair = libcrypto.generateKeyPairSync("rsa", {
		modulusLength: modulusLength
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS1(options?: RSAKeyOptions & RSAExportOptionsPKCS1): Buffer {
	let key = generatePrivateKey(options);
	if (options?.format === "pem") {
		let passphrase = options.passphrase;
		let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
		return Buffer.from(key.export({
			format: "pem",
			type: "pkcs1",
			cipher: cipher,
			passphrase: passphrase
		}));
	} else {
		return key.export({
			format: "der",
			type: "pkcs1"
		});
	}
};

export function generatePrivateKeyPKCS8(options?: RSAKeyOptions & RSAExportOptionsPKCS8): Buffer {
	let key = generatePrivateKey(options);
	if (options?.format === "pem") {
		let passphrase = options?.passphrase;
		let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
		return Buffer.from(key.export({
			format: "pem",
			type: "pkcs8",
			cipher: cipher,
			passphrase: passphrase
		}));
	} else {
		let passphrase = options?.passphrase;
		let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
		return key.export({
			format: "der",
			type: "pkcs8",
			cipher: cipher,
			passphrase: passphrase
		});
	}
};

export function generatePrivateKeyJWK(options?: RSAKeyOptions): jwk.RSAPrivateKey {
	let key = generatePrivateKey(options);
	let json = key.export({
		format: "jwk"
	});
	return jwk.RSAPrivateKey.as(json);
};

export function generatePrivateKeyBuffer(options?: RSAOptions): Buffer {
	if (options?.container === "pkcs8") {
		return generatePrivateKeyPKCS8(options);
	} else {
		return generatePrivateKeyPKCS1({
			format: "pem",
			...options
		});
	}
};
