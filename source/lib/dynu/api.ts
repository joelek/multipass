import * as $api from "../api/";
import * as $messages from "./messages";

const api_url = "https://api.dynu.com/v2/dns";

class Implementation {
	private api_key: string;

	constructor(api_key: string) {
		this.api_key = api_key;
	}

	async getDomains(): Promise<$messages.GetDomainsResponse> {
		return $api.json.request({
			headers: {
				"Accept": ["application/json"],
				"API-Key": [this.api_key]
			},
			method: "GET",
			url: `${api_url}/`
		}, $messages.GetDomainsResponse.as);
	}

	async getDomainFromHostname(hostname: string): Promise<$messages.Domain> {
		let response = await this.getDomains();
		let domain = response.body.domains.find((domain) => {
			return domain.name === hostname;
		});
		if (domain == null) {
			throw "Expected a domain with a matching hostname!";
		}
		return domain;
	}

	async getRecords(domain: $messages.Domain): Promise<$messages.GetRecordsResponse> {
		return $api.json.request({
			headers: {
				"Accept": ["application/json"],
				"API-Key": [this.api_key]
			},
			method: "GET",
			url: `${api_url}/${domain.id}/record`
		}, $messages.GetRecordsResponse.as);
	}

	async createRecord(record: $messages.Record): Promise<$messages.CreateRecordResponse> {
		return $api.json.request({
			body: record,
			headers: {
				"Accept": ["application/json"],
				"API-Key": [this.api_key]
			},
			method: "POST",
			url: `${api_url}/${record.domainId}/record`
		}, $messages.CreateRecordResponse.as);
	}

	async deleteRecord(record: $messages.Record): Promise<$messages.DeleteRecordResponse> {
		return $api.json.request({
			headers: {
				"Accept": ["application/json"],
				"API-Key": [this.api_key]
			},
			method: "DELETE",
			url: `${api_url}/${record.domainId}/record/${record.id}`
		}, $messages.DeleteRecordResponse.as);
	}

	async updateRecord(record: $messages.Record): Promise<$messages.UpdateRecordResponse> {
		return $api.json.request({
			body: record,
			headers: {
				"Accept": ["application/json"],
				"API-Key": [this.api_key]
			},
			method: "POST",
			url: `${api_url}/${record.domainId}/record/${record.id}`
		}, $messages.UpdateRecordResponse.as);
	}
}

async function getImplementation(api_key: string): Promise<Implementation> {
	return new Implementation(api_key);
}

export {
	getImplementation
};
