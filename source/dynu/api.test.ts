import * as $fs from "fs";
import * as $api from "./api";
import * as $config from "./config";

(async () => {
	let content = $fs.readFileSync("./private/config/dynu.json", "utf8");
	let config = $config.Config.as(JSON.parse(content));
	let api = await $api.getImplementation(config.api_key);
	let domain = await api.getDomainFromHostname(config.hostname);
	let created = await api.createRecord({
		id: 0,
		domainId: domain.id,
		nodeName: "",
		state: true,
		recordType: "TXT",
		textData: "TBD"
	});
	let updated = await api.updateRecord(created.body);
	let deleted = await api.deleteRecord(updated.body);
	console.log({
		domain,
		created,
		updated,
		deleted
	});
})();
