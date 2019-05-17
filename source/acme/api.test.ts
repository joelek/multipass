import * as $fs from "fs";
import * as $api from "./api";
import * as $config from "./config";

(async () => {
	let content = $fs.readFileSync("./private/config/acme.json", "utf8");
	let config = $config.Config.as(JSON.parse(content));
	let api = await $api.getImplementation(config.directories.staging);
	let nonce = await api.newNonce();
	console.log(nonce);
})();
