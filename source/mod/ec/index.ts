import * as libcrypto from "crypto";
import * as jwk from "../jwk";

const DEFAULT_CIPHER = libcrypto.getCiphers()[0];

export type ECKeyOptions = {
	namedCurve?: "prime256v1" | "secp384r1" | "secp521r1" | string;
};

export type ECExportOptionsPKCS8 = {
	format: "der";
	passphrase?: string;
	cipher?: string;
} | {
	format: "pem";
	passphrase?: string;
	cipher?: string;
};

export type ECExportOptionsSEC1 = {
	format: "der";
} | {
	format: "pem";
	passphrase?: string;
	cipher?: string;
};

export type ECExportOptions = ({
	container: "pkcs8";
} & ECExportOptionsPKCS8) | ({
	container: "sec1";
} & ECExportOptionsSEC1);

export type ECOptions = ECKeyOptions & ECExportOptions;

export function generatePrivateKey(options?: ECKeyOptions): libcrypto.KeyObject {
	let namedCurve = options?.namedCurve ?? "prime256v1";
	let pair = libcrypto.generateKeyPairSync("ec", {
		namedCurve: namedCurve
	});
	return pair.privateKey;
};

export function generatePrivateKeyPKCS8(options?: ECKeyOptions & ECExportOptionsPKCS8): Buffer {
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

export function generatePrivateKeySEC1(options?: ECKeyOptions & ECExportOptionsSEC1): Buffer {
	let key = generatePrivateKey(options);
	if (options?.format === "pem") {
		let passphrase = options?.passphrase;
		let cipher = options?.cipher ?? (typeof passphrase === "undefined" ? undefined : DEFAULT_CIPHER);
		return Buffer.from(key.export({
			format: "pem",
			type: "sec1",
			cipher: cipher,
			passphrase: passphrase
		}));
	} else {
		return key.export({
			format: "der",
			type: "sec1"
		});
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
	if (options?.container === "pkcs8") {
		return generatePrivateKeyPKCS8(options);
	} else {
		return generatePrivateKeySEC1({
			format: "pem",
			...options
		});
	}
};
