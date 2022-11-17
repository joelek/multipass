import * as rsa from "./";

(async () => {
	let key = rsa.generatePrivateKey();
	console.assert(true, `It should generate keys properly.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS1({
		format: "der"
	});
	console.assert(true, `It should generate keys using the PKCS1 container and the DER format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS1({
		format: "pem"
	});
	console.assert(true, `It should generate keys using the PKCS1 container and the PEM format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS1({
		format: "pem",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the PKCS1 container and the PEM format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS8({
		format: "der"
	});
	console.assert(true, `It should generate keys using the PKCS8 container and the DER format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS8({
		format: "der",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the PKCS8 container and the DER format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS8({
		format: "pem"
	});
	console.assert(true, `It should generate keys using the PKCS8 container and the PEM format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyPKCS8({
		format: "pem",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the PKCS8 container and the PEM format.`);
})();

(async () => {
	let key = rsa.generatePrivateKeyJWK();
	console.assert(true, `It should generate keys using the JWK format properly.`);
})();
