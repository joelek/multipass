import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api/client";
import * as config from "./config";

export * as config from "./config";

const URL_PREFIX = "https://api.dynu.com/v2";

export function makeClient(config: config.Config): api.Client {
	let client = api.makeClient({
		urlPrefix: URL_PREFIX,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		defaultHeaders: [
			["API-Key", config.key]
		]
	});
	return client;
};
