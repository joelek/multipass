import * as libcrypto from "crypto";
import * as jws from "./";

const PRIVATE_KEY = libcrypto.createPrivateKey(`
-----BEGIN RSA PRIVATE KEY-----
MIIBOwIBAAJBANqajvX0e7/wnenef61SwR20VURtve8dE5N6onEMr0D5SZUZWX8S
Luqfa928/MsXI4Ci55UreOXWC8of4cMu0e8CAwEAAQJBALHzIS8cfuRHVfT8F4kb
FXM9yi9y+is8yyPBr5xBTCShiFlAXpSkYkadmYyLi3sDn72y4moSZPI7QjkGYfuV
Y/ECIQDucHHYYH+d+WeeofidLk2bOhhuhbTHd/qroOkjsVYCdwIhAOq0Ii5fWonJ
naVsdTrvI+BmbelAbLFW+e0TNZrrklJJAiBcxmvFoWaGdTCYTLWLkySnLWesOWIp
6skiVq3gMXQh6QIgF7YdIew2PGdnCthbO5n/WONgRUlh8cSkuUPQjZcxECkCIQDQ
fah6lbBm4rufCWqw1QuNS0/IVXgOUovxLifhd/VhZQ==
-----END RSA PRIVATE KEY-----
`);

const PUBLIC_KEY = libcrypto.createPublicKey(`
-----BEGIN RSA PUBLIC KEY-----
MEgCQQDamo719Hu/8J3p3n+tUsEdtFVEbb3vHROTeqJxDK9A+UmVGVl/Ei7qn2vd
vPzLFyOAoueVK3jl1gvKH+HDLtHvAgMBAAE=
-----END RSA PUBLIC KEY-----
`);

(async () => {
	let blob = await jws.sign(PRIVATE_KEY, { food: `räksmörgås` }, `räksmörgås`);
	let observed = blob.protected;
	let expected = `eyJmb29kIjoicsOka3Ntw7ZyZ8OlcyIsImFsZyI6IlJTMjU2In0`;
	console.assert(observed === expected, `It should encode the protected section properly.`);
})();

(async () => {
	let blob = await jws.sign(PRIVATE_KEY, { food: `räksmörgås` }, `räksmörgås`);
	let observed = blob.payload;
	let expected = `InLDpGtzbcO2cmfDpXMi`;
	console.assert(observed === expected, `It should encode the payload section properly.`);
})();

(async () => {
	let blob = await jws.sign(PRIVATE_KEY, { food: `räksmörgås` }, `räksmörgås`);
	let observed = blob.signature;
	let expected = `cPl6tjXiYHgHC7uvUBe66VGD3zdg3GSm3v_tGWlkYfpVUGUcA7JQ7SF9u5mEPr3sI2sje8ycRi2Dm1qJl3U_hA`;
	console.assert(observed === expected, `It should sign the protected and payload sections properly.`);
})();

(async () => {
	let blob = await jws.sign(PRIVATE_KEY, { food: `räksmörgås` }, `räksmörgås`);
	let verification = await jws.verify(blob, PUBLIC_KEY);
	console.assert(verification, `It should verify the signature properly.`);
})();
