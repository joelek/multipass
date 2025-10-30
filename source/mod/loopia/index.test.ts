import * as loopia from "./";
import * as libfs from "fs";

(async () => {
	let config = loopia.Config.as(JSON.parse(libfs.readFileSync("./private/config/loopia.json", "utf-8")));
	let client = loopia.makeClient({});
	let response = await client.getDomains({
		methodName: "getDomains",
		parameters: [
			config.username,
			config.password,
			config.account ?? ""
		]
	});
	console.log(JSON.stringify(response, null, "\t"));
})();
