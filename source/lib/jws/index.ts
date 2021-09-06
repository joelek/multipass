import * as autoguard from "@joelek/ts-autoguard";
import * as libcrypto from "crypto";
import * as encoding from "../encoding";
import * as json from "../json";

export enum SignatureAlgorithm {
	"HS256",
	"HS384",
	"HS512",
	"RS256",
	"RS384",
	"RS512",
	"ES256",
	"ES384",
	"ES512",
	"PS256",
	"PS384",
	"PS512"
};

async function encode(json: json.Any): Promise<string> {
	return Promise.resolve(json)
		.then(encoding.convertJSONToString)
		.then(encoding.convertStringToUTF8Buffer)
		.then(encoding.convertBufferToBase64URLString);
};

export const Body = autoguard.guards.Object.of({
	protected: autoguard.guards.String,
	payload: autoguard.guards.String,
	signature: autoguard.guards.String,
});

export type Body = ReturnType<typeof Body["as"]>;

export async function sign(private_key: libcrypto.KeyLike, protected_json?: json.Object, payload_json?: json.Any): Promise<Body> {
	let protected_base64url = await encode({
		...protected_json,
		alg: `RS256`
	});
	let payload_base64url = (payload_json != null ? await encode(payload_json) : ``);
	let signer = libcrypto.createSign(`SHA256`);
	signer.update(`${protected_base64url}.${payload_base64url}`);
	let signature = signer.sign(private_key);
	let signature_base64url = await encoding.convertBufferToBase64URLString(signature);
	return {
		protected: protected_base64url,
		payload: payload_base64url,
		signature: signature_base64url
	};
};

export async function verify(blob: Body, public_key: libcrypto.KeyLike): Promise<boolean> {
	let verifier = libcrypto.createVerify(`SHA256`);
	verifier.update(`${blob.protected}.${blob.payload}`);
	let signature = await encoding.convertBase64URLStringToBuffer(blob.signature);
	return verifier.verify(public_key, signature);
};
