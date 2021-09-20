import * as libfs from "fs";
import * as dynu from "./";

(async () => {
	let config = dynu.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf-8")));
	let client = dynu.makeClient(config, {
		debugMode: true
	});
	let domains = await (await client.listDomains({})).payload();
	let domain = domains.domains.pop();
	if (domain == null) {
		throw "Expected a domain!";
	}
	let created = await (await client.createDomainRecord({
		options: {
			domainid: domain.id
		},
		payload: {
			nodeName: "_acme-challenge",
			recordType: "TXT",
			textData: "TBD1",
			ttl: 60,
			state: false
		}
	})).payload();
	let updated = await (await client.updateDomainRecord({
		options: {
			domainid: domain.id,
			recordid: created.id
		},
		payload: {
			nodeName: "_acme-challenge",
			recordType: "TXT",
			textData: "TBD2",
			ttl: 60,
			state: true
		}
	})).payload();
	let deleted = await (await client.deleteDomainRecord({
		options: {
			domainid: domain.id,
			recordid: created.id
		}
	})).payload();
})();
