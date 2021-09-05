import * as acme from "./";

const URL_PREFIX = "https://acme-staging-v02.api.letsencrypt.org";

(async () => {
	let handler = await acme.handler.Handler.make(URL_PREFIX);
	let nonce = await handler.newNonce({});
	console.log(nonce.headers()["replay-nonce"]);
})().catch((error) => console.log(String(error)));
