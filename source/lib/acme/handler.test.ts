import * as libcrypto from "crypto";
import * as acme from "./";

const ACME_URL = "https://acme-staging-v02.api.letsencrypt.org/directory";

const EC_PRIVATE_KEY_SEC1 = Buffer.from(`
	MHcCAQEEIB4AKlzxRI2sTVxq7SCJ9l5MeaCyvUqeEQqoZDc3M0OvoAoGCCqGSM49
	AwEHoUQDQgAEQcfTwyj10DdQpZ/2ZBWTEYvhW+z2OKZcWI/CJGuiMgVjy5cCjg8P
	22yJzfRBXT/Mc33quG4nPynPbc8aUPCuxQ==
`, "base64");

const EC_KEY = libcrypto.createPrivateKey({
	key: EC_PRIVATE_KEY_SEC1,
	format: "der",
	type: "sec1"
});

(async () => {
	let handler = await acme.handler.Handler.make(ACME_URL, EC_KEY);
	await handler.createNonce();
	await handler.createAccount({
		termsOfServiceAgreed: true
	});
})().catch((error) => console.log(String(error)));
