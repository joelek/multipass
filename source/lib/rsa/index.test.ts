import * as rsa from "./";

(async () => {
	let private_key = rsa.generatePrivateKey();
	console.log(private_key);
})();
