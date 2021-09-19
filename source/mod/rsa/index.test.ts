import * as rsa from "./";

(async () => {
	let key = rsa.generatePrivateKey();
	console.assert(true, `It should generate keys properly.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS1();
	console.assert(true, `It should generate keys using the PKCS1 format properly.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS8();
	console.assert(true, `It should generate keys using the PKCS8 format properly.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyJWK();
	console.assert(true, `It should generate keys using the JWK format properly.`);
})();
