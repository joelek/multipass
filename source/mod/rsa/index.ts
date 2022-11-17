import * as libcrypto from "crypto";
import * as jwk from "../jwk";

const DEFAULT_CIPHER = libcrypto.getCiphers()[0];

export type RSAKeyOptions = {
	modulusLength?: number;
};

export type RSAExportOptionsPKCS1DER = {

};

export type RSAExportOptionsPKCS1PEM = {
	passphrase?: string;
	cipher?: string;
};

export type RSAExportOptionsPKCS1 = ({
	format: "der";
} & RSAExportOptionsPKCS1DER) | ({
	format: "pem";
} & RSAExportOptionsPKCS1PEM) | ({
	format?: undefined;
});

export type RSAExportOptionsPKCS8DER = {
	passphrase?: string;
	cipher?: string;
};

export type RSAExportOptionsPKCS8PEM = {
	passphrase?: string;
	cipher?: string;
};

export type RSAExportOptionsPKCS8 = ({
	format: "der";
} & RSAExportOptionsPKCS8DER) | ({
	format: "pem";
} & RSAExportOptionsPKCS8PEM) | ({
	format?: undefined;
});

export type RSAExportOptions = ({
	container: "pkcs1";
} & RSAExportOptionsPKCS1) | ({
	container: "pkcs8";
} & RSAExportOptionsPKCS8) | ({
	container?: undefined;
});

export type RSAOptions = RSAKeyOptions & RSAExportOptions;

export function generatePrivateKey(options?: RSAKeyOptions): libcrypto.KeyObject {
	let modulusLength = options?.modulusLength ?? 4096;
	let pair = libcrypto.generateKeyPairSync("rsa", {
		modulusLength: modulusLength
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS1DER(options?: RSAKeyOptions & RSAExportOptionsPKCS1DER): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		type: "pkcs1",
		format: "der"
	});
};

export function generatePrivateKeyPKCS1PEM(options?: RSAKeyOptions & RSAExportOptionsPKCS1PEM): Buffer {
	let key = generatePrivateKey(options);
	let passphrase = options?.passphrase;
	let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
	return Buffer.from(key.export({
		type: "pkcs1",
		format: "pem",
		passphrase: passphrase,
		cipher: cipher
	}));
};

export function generatePrivateKeyPKCS1(options?: RSAKeyOptions & RSAExportOptionsPKCS1): Buffer {
	if (options?.format === "der") {
		return generatePrivateKeyPKCS1DER(options);
	} else {
		return generatePrivateKeyPKCS1PEM(options);
	}
};

export function generatePrivateKeyPKCS8DER(options?: RSAKeyOptions & RSAExportOptionsPKCS8DER): Buffer {
	let key = generatePrivateKey(options);
	let passphrase = options?.passphrase;
	let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
	return key.export({
		type: "pkcs8",
		format: "der",
		passphrase: passphrase,
		cipher: cipher
	});
};

export function generatePrivateKeyPKCS8PEM(options?: RSAKeyOptions & RSAExportOptionsPKCS8PEM): Buffer {
	let key = generatePrivateKey(options);
	let passphrase = options?.passphrase;
	let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
	return Buffer.from(key.export({
		type: "pkcs8",
		format: "pem",
		passphrase: passphrase,
		cipher: cipher
	}));
};

export function generatePrivateKeyPKCS8(options?: RSAKeyOptions & RSAExportOptionsPKCS8): Buffer {
	if (options?.format === "der") {
		return generatePrivateKeyPKCS8DER(options);
	} else {
		return generatePrivateKeyPKCS8PEM(options);
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
		return generatePrivateKeyPKCS1(options);
	} else {
		return generatePrivateKeyPKCS8(options);
	}
};
