import * as libcrypto from "crypto";
import * as encoding from "../encoding";
import * as json from "../json";
import * as jwk from "../jwk";
import * as pkcs5 from "../pkcs5";
import * as schema from "./schema";

export * from "./schema";

async function encode(json: json.Any): Promise<string> {
	return Promise.resolve(json)
		.then(encoding.convertJSONToString)
		.then(encoding.convertStringToUTF8Buffer)
		.then(encoding.convertBufferToBase64URLString);
};

export function getDefaultAlgorithm(key: libcrypto.KeyObject): pkcs5.signature.SignatureAlgorithm {
	let keyJwk = key.export({ format: "jwk" });
	if (jwk.RSAPublicKey.is(keyJwk)) {
		return new pkcs5.signature.SHA256WithRSAEncryption();
	}
	if (jwk.ECPublicKey.is(keyJwk)) {
		if (keyJwk.crv === "P-256") {
			return new pkcs5.signature.ECDSAWithSHA256();
		}
		if (keyJwk.crv === "P-384") {
			return new pkcs5.signature.ECDSAWithSHA384();
		}
		if (keyJwk.crv === "P-521") {
			return new pkcs5.signature.ECDSAWithSHA512();
		}
	}
	throw `Expected code to be unreachable!`;
};

export async function sign(key: libcrypto.KeyObject, options?: Partial<{
	protected: json.Object,
	payload: json.Any,
	signatureAlgorithm: pkcs5.signature.SignatureAlgorithm
}>): Promise<schema.Body> {
	let signatureAlgorithm = options?.signatureAlgorithm ?? getDefaultAlgorithm(key);
	let protected_base64url = await encode({
		...options?.protected,
		alg: signatureAlgorithm.getJoseType()
	});
	let payload_base64url = (options?.payload != null ? await encode(options.payload) : "");
	let signature = signatureAlgorithm.sign(Buffer.from(`${protected_base64url}.${payload_base64url}`), key);
	let signature_base64url = await encoding.convertBufferToBase64URLString(signature);
	return {
		protected: protected_base64url,
		payload: payload_base64url,
		signature: signature_base64url
	};
};

export async function verify(body: schema.Body, key: libcrypto.KeyObject): Promise<boolean> {
	let signature = await encoding.convertBase64URLStringToBuffer(body.signature);
	let joseType = schema.Protected.as(JSON.parse(Buffer.from(body.protected, "base64url").toString())).alg;
	let signatureAlgorithm = pkcs5.signature.fromJoseType(joseType);
	return signatureAlgorithm.verify(Buffer.from(`${body.protected}.${body.payload}`), key, signature);
};
