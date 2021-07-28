import * as libfs from "fs";
import * as glesys from "./";

async function test(): Promise<void> {
	let config = glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = glesys.makeClient(config);
	let domains = await (await client.listDomains({})).payload();
	let domain = domains.response.domains.find((domain) => domain.domainname === config.domainname);
	if (domain == null) {
		throw "Expected to find a matching domain id!";
	}
	console.log(JSON.stringify({ domain }, null, "\t"));
	let created = await (await client.createDomainRecord({
		payload: {
			domainname: domain.domainname,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD1"
		}
	})).payload();
	console.log(JSON.stringify({ created }, null, "\t"));
	let updated = await (await client.updateDomainRecord({
		payload: {
			recordid: created.response.record.recordid,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD2"
		}
	})).payload();
	console.log(JSON.stringify({ updated }, null, "\t"));
	let deleted = await (await client.deleteDomainRecord({
		payload: {
			recordid: created.response.record.recordid
		}
	})).payload();
	console.log(JSON.stringify({ deleted }, null, "\t"));
}

test().catch((error) => console.log(String(error)));
