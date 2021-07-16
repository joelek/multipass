import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as libfs from "fs";
import * as api from "./api/client";
import * as settings from "./settings";

export const CONFIG = settings.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));

export function makeDefaultHeaders(): Record<string, string> {
	let token = Buffer.from(`${CONFIG.username}:${CONFIG.password}`).toString("base64");
	return {
		"Authorization": `Basic ${token}`
	};
};

export function makeNodeClient() {
	let client = api.makeClient({
		urlPrefix: "https://api.glesys.com",
		requestHandler: autoguard.api.makeNodeRequestHandler()
	});
	return client;
};
