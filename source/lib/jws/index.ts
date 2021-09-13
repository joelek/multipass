import * as libcrypto from "crypto";
import * as encoding from "../encoding";
import * as json from "../json";
import * as schema from "./schema";

export * from "./schema";

async function encode(json: json.Any): Promise<string> {
	return Promise.resolve(json)
		.then(encoding.convertJSONToString)
		.then(encoding.convertStringToUTF8Buffer)
		.then(encoding.convertBufferToBase64URLString);
};

export async function sign(private_key: libcrypto.KeyObject, protected_json?: json.Object, payload_json?: json.Any): Promise<schema.Body> {
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

export async function verify(body: schema.Body, public_key: libcrypto.KeyObject): Promise<boolean> {
	let verifier = libcrypto.createVerify(`SHA256`);
	verifier.update(`${body.protected}.${body.payload}`);
	let signature = await encoding.convertBase64URLStringToBuffer(body.signature);
	return verifier.verify(public_key, signature);
};
