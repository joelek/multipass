import * as $rsa from "./";

(async () => {
	let private_key = await $rsa.generatePrivateKey();
	console.log(private_key);
})();
