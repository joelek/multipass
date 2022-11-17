import { key } from "..";

(async () => {
	let buffer = key.generatePrivateKey();
	key.constructPrivateKey(buffer);
	console.assert(true, `It should generate and construct keys.`);
})();

(async () => {
	let buffer = key.generatePrivateKey({
		type: "ec"
	});
	key.constructPrivateKey(buffer);
	console.assert(true, `It should generate and construct EC keys.`);
})();

(async () => {
	let buffer = key.generatePrivateKey({
		type: "ec",
		passphrase: "test"
	});
	key.constructPrivateKey(buffer, {
		passphrase: "test"
	});
	console.assert(true, `It should generate and construct encrypted EC keys.`);
})();

(async () => {
	let buffer = key.generatePrivateKey({
		type: "rsa"
	});
	key.constructPrivateKey(buffer);
	console.assert(true, `It should generate and construct RSA keys.`);
})();

(async () => {
	let buffer = key.generatePrivateKey({
		type: "rsa",
		passphrase: "test"
	});
	key.constructPrivateKey(buffer, {
		passphrase: "test"
	});
	console.assert(true, `It should generate and construct encrypted RSA keys.`);
})();
