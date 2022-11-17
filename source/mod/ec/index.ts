import * as libcrypto from "crypto";
import * as jwk from "../jwk";

const DEFAULT_CIPHER = libcrypto.getCiphers()[0];

export type ECKeyOptions = {
	namedCurve?: "prime256v1" | "secp384r1" | "secp521r1" | string;
};

export type ECExportOptionsPKCS8DER = {
	passphrase?: string;
	cipher?: string;
};

export type ECExportOptionsPKCS8PEM = {
	passphrase?: string;
	cipher?: string;
};

export type ECExportOptionsPKCS8 = ({
	format: "der";
} & ECExportOptionsPKCS8DER) | ({
	format: "pem";
} & ECExportOptionsPKCS8PEM) | ({
	format?: undefined;
});

export type ECExportOptionsSEC1DER = {

};

export type ECExportOptionsSEC1PEM = {
	passphrase?: string;
	cipher?: string;
};

export type ECExportOptionsSEC1 = ({
	format: "der";
} & ECExportOptionsSEC1DER) | ({
	format: "pem";
} & ECExportOptionsSEC1PEM) | ({
	format?: undefined;
});

export type ECExportOptions = ({
	container: "pkcs8";
} & ECExportOptionsPKCS8) | ({
	container: "sec1";
} & ECExportOptionsSEC1) | ({
	container?: undefined;
});

export type ECOptions = ECKeyOptions & ECExportOptions;

export function generatePrivateKey(options?: ECKeyOptions): libcrypto.KeyObject {
	let namedCurve = options?.namedCurve ?? "prime256v1";
	let pair = libcrypto.generateKeyPairSync("ec", {
		namedCurve: namedCurve
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS8DER(options?: ECKeyOptions & ECExportOptionsPKCS8DER): Buffer {
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

export function generatePrivateKeyPKCS8PEM(options?: ECKeyOptions & ECExportOptionsPKCS8PEM): Buffer {
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

export function generatePrivateKeyPKCS8(options?: ECKeyOptions & ECExportOptionsPKCS8): Buffer {
	if (options?.format === "der") {
		return generatePrivateKeyPKCS8DER(options);
	} else {
		return generatePrivateKeyPKCS8PEM(options);
	}
};

export function generatePrivateKeySEC1DER(options?: ECKeyOptions & ECExportOptionsSEC1DER): Buffer {
	let key = generatePrivateKey(options);
	return key.export({
		type: "sec1",
		format: "der"
	});
};

export function generatePrivateKeySEC1PEM(options?: ECKeyOptions & ECExportOptionsSEC1PEM): Buffer {
	let key = generatePrivateKey(options);
	let passphrase = options?.passphrase;
	let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
	return Buffer.from(key.export({
		type: "sec1",
		format: "pem",
		passphrase: passphrase,
		cipher: cipher
	}));
};

export function generatePrivateKeySEC1(options?: ECKeyOptions & ECExportOptionsSEC1): Buffer {
	if (options?.format === "der") {
		return generatePrivateKeySEC1DER(options);
	} else {
		return generatePrivateKeySEC1PEM(options);
	}
};

export function generatePrivateKeyJWK(options?: ECKeyOptions): jwk.ECPrivateKey {
	let key = generatePrivateKey(options);
	let json = key.export({
		format: "jwk"
	});
	return jwk.ECPrivateKey.as(json);
};

export function generatePrivateKeyBuffer(options?: ECOptions): Buffer {
	if (options?.container === "sec1") {
		return generatePrivateKeySEC1(options);
	} else {
		return generatePrivateKeyPKCS8(options);
	}
};
