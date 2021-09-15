import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api/client";
import * as config from "./config";

export * as config from "./config";

const URL_PREFIX = "https://api.glesys.com";

export function makeClient(config: config.Config): api.Client {
	let token = Buffer.from(`${config.username}:${config.password}`).toString("base64");
	let client = api.makeClient({
		urlPrefix: URL_PREFIX,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		defaultHeaders: [
			["Authorization", `Basic ${token}`]
		]
	});
	return client;
};
