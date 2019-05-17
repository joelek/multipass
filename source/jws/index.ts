import * as libcrypto from "crypto";
import * as encoding from "../encoding";

type Structure = {
	protected: string;
	payload: string;
	signature: string;
};

async function encode(json: any): Promise<string> {
	return Promise.resolve(json)
		.then(encoding.convertJSONToString)
		.then(encoding.convertStringToUTF8Buffer)
		.then(encoding.convertBufferToBase64URLString);
}

async function sign(private_key: Buffer, protected_json: any, payload_json?: any): Promise<Structure> {
	let protected_base64url = await encode({
		...protected_json,
		alg: "RS256"
	});
	let payload_base64url = (payload_json != null ? await encode(payload_json) : "");
	let signer = libcrypto.createSign("SHA256");
	signer.update(`${protected_base64url}.${payload_base64url}`);
	let signature = signer.sign(private_key);
	let signature_base64url = await encoding.convertBufferToBase64URLString(signature);
	return {
		protected: protected_base64url,
		payload: payload_base64url,
		signature: signature_base64url
	};
}

export {
	Structure,
	sign
};
