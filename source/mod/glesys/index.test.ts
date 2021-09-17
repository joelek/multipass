import * as libfs from "fs";
import * as glesys from "./";

async function test(): Promise<void> {
	let config = glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
	let client = glesys.makeClient(config);
	let domains = await (await client.listDomains({})).payload();
	let domain = domains.response.domains.pop();
	if (domain == null) {
		throw "Expected a domain!";
	}
	console.log(JSON.stringify({ domain }, null, "\t"));
	let created = await (await client.createDomainRecord({
		payload: {
			domainname: domain.domainname,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD1",
			ttl: 60
		}
	})).payload();
	console.log(JSON.stringify({ created }, null, "\t"));
	let updated = await (await client.updateDomainRecord({
		payload: {
			recordid: created.response.record.recordid,
			host: "_acme-challenge",
			type: "TXT",
			data: "TBD2",
			ttl: 60
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
