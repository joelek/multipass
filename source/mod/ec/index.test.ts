import * as ec from "./";

(async () => {
	let key = ec.generatePrivateKey();
	console.assert(true, `It should generate keys properly.`);
})();

(async () => {
	let key = ec.generatePrivateKeyPKCS8({
		format: "der"
	});
	console.assert(true, `It should generate keys using the PKCS8 container and the DER format.`);
})();

(async () => {
	let key = ec.generatePrivateKeyPKCS8({
		format: "der",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the PKCS8 container and the DER format.`);
})();

(async () => {
	let key = ec.generatePrivateKeyPKCS8({
		format: "pem"
	});
	console.assert(true, `It should generate keys using the PKCS8 container and the PEM format.`);
})();

(async () => {
	let key = ec.generatePrivateKeyPKCS8({
		format: "pem",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the PKCS8 container and the PEM format.`);
})();

(async () => {
	let key = ec.generatePrivateKeySEC1({
		format: "der"
	});
	console.assert(true, `It should generate keys using the SEC1 container and the DER format.`);
})();

(async () => {
	let key = ec.generatePrivateKeySEC1({
		format: "pem"
	});
	console.assert(true, `It should generate keys using the SEC1 container and the PEM format.`);
})();

(async () => {
	let key = ec.generatePrivateKeySEC1({
		format: "pem",
		passphrase: "test",
		cipher: "aes-256-cbc"
	});
	console.assert(true, `It should generate encrypted keys using the SEC1 container and the PEM format.`);
})();

(async () => {
	let key = ec.generatePrivateKeyJWK();
	console.assert(true, `It should generate keys using the JWK format properly.`);
})();
