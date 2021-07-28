import * as libfs from "fs";
import * as glesys from "./";

async function test(): Promise<void> {
	let config = glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = glesys.makeClient(config);
	let response = await client.listDomains({});
	let payload = await response.payload();
	console.log(JSON.stringify(payload, null, "\t"));
}

test().catch((error) => console.log(String(error)));
