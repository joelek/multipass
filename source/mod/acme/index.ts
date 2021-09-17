import * as libcrypto from "crypto";
import * as jwk from "../jwk";

export * as api from "./api";
export * as config from "./config";
export * as handler from "./handler";

export function computeKeyAuthorization(token: string, key: jwk.AssymetricKey): string {
	let thumbprint = jwk.computeThumbprint(key);
	let hash = libcrypto.createHash("sha256");
	hash.update(Buffer.from(`${token}.${thumbprint}`));
	let buffer = hash.digest();
	return buffer.toString("base64url");
};
