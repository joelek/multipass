import * as autoguard from "@joelek/autoguard/dist/lib-server";
import * as api from "./api/client";
import * as config from "./config";
import * as dns from "../dns";

export * from "./config";

const URL_PREFIX = "https://api.dynu.com/v2";

export function makeClient(config: config.Config, options?: autoguard.api.ClientOptions): api.Client {
	let client = api.makeClient({
		urlPrefix: URL_PREFIX,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		defaultHeaders: [
			["API-Key", config.key]
		],
		...options
	});
	return client;
};

export async function makeStandardClient(config: config.Config, options?: autoguard.api.ClientOptions): Promise<dns.Client> {
	let client = makeClient(config, options);
	let domains = (await (await client.listDomains({})).payload()).domains;
	return {
		async listDomains() {
			return domains.map((domain) => domain.name);
		},
		async provisionTextRecord(details) {
			const domain = domains.find((domain) => domain.name === details.domain);
			if (domain == null) {
				throw `Expected a domain matching "${details.domain}"!`;
			}
			let record = await (await client.createDomainRecord({
				options: {
					domainid: domain.id
				},
				payload: {
					nodeName: details.subdomain,
					recordType: "TXT",
					textData: details.content,
					ttl: 60,
					state: true
				}
			})).payload();
			return {
				async undo() {
					await client.deleteDomainRecord({
						options: {
							domainid: domain.id,
							recordid: record.id
						}
					})
				}
			};
		}
	};
};
