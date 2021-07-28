import * as libfs from "fs";
import * as dynu from "./";

async function test(): Promise<void> {
	let config = dynu.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf-8")));
	let client = dynu.makeClient(config);
	let domains = await (await client.listDomains({})).payload();
	let domain = domains.domains.find((domain) => domain.name === config.hostname);
	if (domain == null) {
		throw "Expected to find a matching domain id!";
	}
	console.log(JSON.stringify({ domain }, null, "\t"));
	let created = await (await client.createDomainRecord({
		options: {
			domainid: domain.id
		},
		payload: {
			nodeName: "_acme-challenge",
			recordType: "TXT",
			textData: "TBD1"
		}
	})).payload();
	console.log(JSON.stringify({ created }, null, "\t"));
	let updated = await (await client.updateDomainRecord({
		options: {
			domainid: domain.id,
			recordid: created.id
		},
		payload: {
			nodeName: "_acme-challenge",
			recordType: "TXT",
			textData: "TBD2"
		}
	})).payload();
	console.log(JSON.stringify({ updated }, null, "\t"));
	let deleted = await (await client.deleteDomainRecord({
		options: {
			domainid: domain.id,
			recordid: created.id
		}
	})).payload();
	console.log(JSON.stringify({ deleted }, null, "\t"));
}

test().catch((error) => console.log(String(error)));
