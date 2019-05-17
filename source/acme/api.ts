import * as $api from "../api/";
import * as $messages from "./messages";

class Implementation {
	private directory: $messages.GetDirectoryResponse;

	constructor(directory: $messages.GetDirectoryResponse) {
		this.directory = directory;
	}

	async newAccount(account_private_key: Buffer): Promise<$messages.NewAccountResponse> {
		return $api.json.request({
			method: "POST",
			url: this.directory.body.newAccount,
			headers: {
				"Content-Type": ["application/jose+json"]
			},
			body: {}
		}, $messages.NewAccountResponse.as);
	}

	async newNonce(): Promise<$messages.NewNonceResponse> {
		return $api.json.request({
			method: "HEAD",
			url: this.directory.body.newNonce
		}, $messages.NewNonceResponse.as);
	}
}

async function getImplementation(directory_url: string): Promise<Implementation> {
	let response = await $api.json.request({
		method: "GET",
		url: directory_url
	}, $messages.GetDirectoryResponse.as);
	return new Implementation(response);
}

export {
	getImplementation
};
