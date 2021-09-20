import * as libfs from "fs";
import * as glesys from "./";

(async () => {
	let config = glesys.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = glesys.makeClient(config, {
		debugMode: true
	});
	let domains = await (await client.listDomains({})).payload();
	let domain = domains.response.domains.pop();
	if (domain == null) {
		throw "Expected a domain!";
	}
	let created = await (await client.createDomainRecord({
		payload: {
			domainname: domain.domainname,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD1",
			ttl: 60
		}
	})).payload();
	let updated = await (await client.updateDomainRecord({
		payload: {
			recordid: created.response.record.recordid,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD2",
			ttl: 60
		}
	})).payload();
	let deleted = await (await client.deleteDomainRecord({
		payload: {
			recordid: created.response.record.recordid
		}
	})).payload();
})();
