import * as libcrypto from "crypto";
import * as jws from "./";

(async () => {
	let { privateKey, publicKey } = libcrypto.generateKeyPairSync(`rsa`, {
		modulusLength: 4096,
		publicExponent: 65537,
		publicKeyEncoding: {
			type: `pkcs1`,
			format: `pem`
		},
		privateKeyEncoding: {
			type: `pkcs1`,
			format: `pem`
		}
	});
	let blob = await jws.sign(privateKey, { food: "räksmörgås" }, "räksmörgås");
	let verification = await jws.verify(blob, publicKey);
	console.log(verification);
})();
