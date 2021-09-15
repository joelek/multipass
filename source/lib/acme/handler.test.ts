import * as libcrypto from "crypto";
import * as libfs from "fs";
import * as acme from "./";
import * as glesys from "../glesys";

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

async function makeDNSHandler(): Promise<DNSHandler> {
	let config = glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = glesys.makeClient(config);
	return {
		create() {

		},
		delete() {

		}
	};
};

interface DNSHandler {
	create(): Promise<void>;
	delete(): Promise<void>;
};

(async () => {
	let dnsHandler = await makeDNSHandler();
	let handler = await acme.handler.Handler.make(ACME_URL, EC_KEY);
	await handler.createNonce();
/* 	let account = await handler.createAccount({
		termsOfServiceAgreed: true
	}); */
/* 	let order = await handler.createOrder(account.location, {
		identifiers: [
			{
				type: "dns",
				value: "test.joelek.se"
			}
		]
	}); */
	let account = await handler.getAccount("https://acme-staging-v02.api.letsencrypt.org/acme/acct/26566358");
	let order = await handler.getOrder(account.url, "https://acme-staging-v02.api.letsencrypt.org/acme/order/26566358/537985198");
	for (let url of order.payload.authorizations) {
		let authorization = await handler.getAuthorization(account.url, url);
		let challenge = authorization.payload.challenges.filter((challenge): challenge is acme.api.ChallengeDNS01 => acme.api.ChallengeDNS01.is(challenge)).pop();
		if (challenge == null) {
			throw `Expected a "dns-01" challenge!`;
		}
		// provision using api
		// send {} to challenge url
		// "www.example.org" => _acme-challenge.www.example.org
	}
	// poll authorization status
	// send { csr: base64url of csr } to finalize
	// download cert
	// remove all provisioned dns records
})().catch((error) => console.log(String(error)));
