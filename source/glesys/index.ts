import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as libfs from "fs";
import * as api from "./api/client";
import * as settings from "./settings";

function makeAuthorizationHeader(username: string, password: string): string {
	let token = Buffer.from(`${username}:${password}`).toString("base64");
	return `Basic ${token}`;
};

async function run(): Promise<void> {
	let config = settings.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = api.makeClient({
		urlPrefix: "https://api.glesys.com",
		requestHandler: autoguard.api.makeNodeRequestHandler()
	});
	let response = await client.listDomains({
		headers: {
			"Authorization": makeAuthorizationHeader(config.username, config.password)
		}
	});
	let payload = await response.payload();
	console.log(JSON.stringify(payload, null, "\t"));
};

run().catch((error) => console.log(String(error)));
