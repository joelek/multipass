import * as libcrypto from "crypto";
import * as acme from "./";

const ACME_URL = "https://acme-staging-v02.api.letsencrypt.org/directory";

const RSA_PRIVATE_KEY_PKCS8 = Buffer.from(`
	MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAvmMw/sCvyhhctqv3
	58NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tq
	dv6olQIDAQABAkAyo0FJ0MgwsXAfaffi3dGEIruh3twvAd5jTYgWlFBQQkgpTM2T
	dBaqac8TbrL8fYUlDhBu6rSDY/x7BRY9P+ohAiEA9z3/Tlio0/vECyhEDuW4bdLV
	uXiHSQZkDuJOz8NNlWkCIQDFIaIVCg8DLPpDRgB2Xx/QoFhAjvYzQxkKuU5I7DP4
	TQIgCfacoDqgaxJ9PvnbbEJDoWFarYO25/Fy/MqP5H15VekCIConPP9+vSMStRk5
	mNO3F5iHERgM+fyQNoSih2j0iVBpAiAZqtOXK/aqYFnsM1pixxUVHfzNZBRZekqH
	j0rDlYa3rg==
`, "base64");

const KEY = libcrypto.createPrivateKey({
	key: RSA_PRIVATE_KEY_PKCS8,
	format: "der",
	type: "pkcs8"
});

(async () => {
	let handler = await acme.handler.Handler.make(ACME_URL, KEY);
	await handler.createNonce();
	await handler.createAccount({
		onlyReturnExisting: true
	});
})().catch((error) => console.log(String(error)));
