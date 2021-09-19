import * as ec from "./";

(async () => {
	let key = ec.generatePrivateKey();
	console.assert(true, `It should generate keys properly.`);
})();

(async () => {
	let key = ec.generatePrivateKeyPKCS8();
	console.assert(true, `It should generate keys using the PKCS8 format properly.`);
})();

(async () => {
	let key = ec.generatePrivateKeySEC1();
	console.assert(true, `It should generate keys using the SEC1 format properly.`);
})();

(async () => {
	let key = ec.generatePrivateKeyJWK();
	console.assert(true, `It should generate keys using the JWK format properly.`);
})();
