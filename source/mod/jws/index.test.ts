import * as libcrypto from "crypto";
import * as jws from "./";

const PRIVATE_KEY = libcrypto.createPrivateKey({
	key: Buffer.from(`
		MIIBOwIBAAJBANqajvX0e7/wnenef61SwR20VURtve8dE5N6onEMr0D5SZUZWX8S
		Luqfa928/MsXI4Ci55UreOXWC8of4cMu0e8CAwEAAQJBALHzIS8cfuRHVfT8F4kb
		FXM9yi9y+is8yyPBr5xBTCShiFlAXpSkYkadmYyLi3sDn72y4moSZPI7QjkGYfuV
		Y/ECIQDucHHYYH+d+WeeofidLk2bOhhuhbTHd/qroOkjsVYCdwIhAOq0Ii5fWonJ
		naVsdTrvI+BmbelAbLFW+e0TNZrrklJJAiBcxmvFoWaGdTCYTLWLkySnLWesOWIp
		6skiVq3gMXQh6QIgF7YdIew2PGdnCthbO5n/WONgRUlh8cSkuUPQjZcxECkCIQDQ
		fah6lbBm4rufCWqw1QuNS0/IVXgOUovxLifhd/VhZQ==
	`, "base64"),
	format: "der",
	type: "pkcs1"
});

const PUBLIC_KEY = libcrypto.createPublicKey({
	key: Buffer.from(`
		MEgCQQDamo719Hu/8J3p3n+tUsEdtFVEbb3vHROTeqJxDK9A+UmVGVl/Ei7qn2vd
		vPzLFyOAoueVK3jl1gvKH+HDLtHvAgMBAAE=
	`, "base64"),
	format: "der",
	type: "pkcs1"
});

(async () => {
	let body = jws.sign(PRIVATE_KEY, {
		protected: {
			food: "räksmörgås"
		},
		payload: "räksmörgås"
	});
	let observed = body.protected;
	let expected = "eyJmb29kIjoicsOka3Ntw7ZyZ8OlcyIsImFsZyI6IlJTMjU2In0";
	console.assert(observed === expected, "It should encode the protected section properly.");
})();

(async () => {
	let body = jws.sign(PRIVATE_KEY, {
		protected: {
			food: "räksmörgås"
		},
		payload: "räksmörgås"
	});
	let observed = body.payload;
	let expected = "InLDpGtzbcO2cmfDpXMi";
	console.assert(observed === expected, "It should encode the payload section properly.");
})();

(async () => {
	let body = jws.sign(PRIVATE_KEY, {
		protected: {
			food: "räksmörgås"
		},
		payload: "räksmörgås"
	});
	let observed = body.signature;
	let expected = "cPl6tjXiYHgHC7uvUBe66VGD3zdg3GSm3v_tGWlkYfpVUGUcA7JQ7SF9u5mEPr3sI2sje8ycRi2Dm1qJl3U_hA";
	console.assert(observed === expected, "It should sign the protected and payload sections properly.");
})();

(async () => {
	let body = jws.sign(PRIVATE_KEY, {
		protected: {
			food: "räksmörgås"
		},
		payload: "räksmörgås"
	});
	let verification = jws.verify(body, PUBLIC_KEY);
	console.assert(verification, "It should verify the signature properly.");
})();
