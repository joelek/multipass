import * as libcrypto from "crypto";
import * as lib from "./";

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
	let blob = await lib.sign(privateKey, { horse: "hej" }, "testfolk");
	let verification = await lib.verify(blob, publicKey);
	console.log(verification);
})();
