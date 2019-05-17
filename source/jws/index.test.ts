import * as index from "./index";


(async () => {
	let private_key =
	let jws = await index.sign(private_key, {});
	console.log(jws);
})();
