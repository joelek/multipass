import * as libcrypto from "crypto";
import * as libfs from "fs";
import * as libpath from "path";
import * as ec from "../ec";
import * as rsa from "../rsa";

export type KeyOptions = ({
	type: "ec";
} & ec.ECOptions) | ({
	type: "rsa";
} & rsa.RSAOptions);

export function generatePrivateKey(options?: KeyOptions): Buffer {
	if (options?.type === "rsa") {
		return rsa.generatePrivateKeyBuffer(options);
	} else {
		return ec.generatePrivateKeyBuffer(options);
	}
};

export type ConstructOptions = {
	passphrase?: string;
};

export function constructPrivateKey(buffer: Buffer, options?: ConstructOptions): libcrypto.KeyObject {
	return libcrypto.createPrivateKey({ key: buffer, passphrase: options?.passphrase });
};

export function generateOrConstructPrivateKey(path: string, options?: KeyOptions & ConstructOptions): libcrypto.KeyObject {
	libfs.mkdirSync(libpath.dirname(path), { recursive: true });
	if (!libfs.existsSync(path)) {
		let buffer = generatePrivateKey(options);
		libfs.writeFileSync(path, buffer);
	}
	let buffer = libfs.readFileSync(path);
	return constructPrivateKey(buffer, {
		passphrase: options?.passphrase
	});
};
