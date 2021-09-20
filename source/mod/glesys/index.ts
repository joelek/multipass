import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api/client";
import * as config from "./config";
import * as dns from "../dns";

export * from "./config";

const URL_PREFIX = "https://api.glesys.com";

export function makeClient(config: config.Config, options?: autoguard.api.ClientOptions): api.Client {
	let token = Buffer.from(`${config.account}:${config.key}`).toString("base64");
	let client = api.makeClient({
		urlPrefix: URL_PREFIX,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		defaultHeaders: [
			["Authorization", `Basic ${token}`]
		],
		...options
	});
	return client;
};

export async function makeStandardClient(config: config.Config, options?: autoguard.api.ClientOptions): Promise<dns.Client> {
	let client = makeClient(config, options);
	let domains = (await (await client.listDomains({})).payload()).response.domains;
	return {
		async listDomains() {
			return domains.map((domain) => domain.domainname);
		},
		async provisionTextRecord(details) {
			const domain = domains.find((domain) => domain.domainname === details.domain);
			if (domain == null) {
				throw `Expected a domain!`;
			}
			let record = await (await client.createDomainRecord({
				payload: {
					domainname: details.domain,
					host: details.subdomain || "@",
					type: "TXT",
					data: details.content,
					ttl: 60
				}
			})).payload();
			return {
				async undo() {
					await client.deleteDomainRecord({
						payload: {
							recordid: record.response.record.recordid
						}
					})
				}
			};
		}
	};
};
