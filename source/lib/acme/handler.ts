import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api";
import * as apiclient from "./api/client";

type Client = ReturnType<typeof apiclient.makeClient>;

function makeClient(urlPrefix: string): Client {
	let client = apiclient.makeClient({
		urlPrefix: urlPrefix,
		requestHandler: autoguard.api.makeNodeRequestHandler()
	});
	return client;
};

type Directory = {
	keyChange: Array<string>;
	newAccount: Array<string>;
	newNonce: Array<string>;
	newOrder: Array<string>;
	revokeCert: Array<string>;
};

function getUrlPath(url: string, urlPrefix: string): Array<string> {
	if (!url.startsWith(urlPrefix)) {
		throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
	}
	url = url.slice(urlPrefix.length);
	let components = autoguard.api.splitComponents(url);
	return components.map((component) => decodeURIComponent(component));
};

export class Handler {
	private client: Client;
	private directory: Directory;
	private nonce: string | undefined;

	private constructor(client: Client, directory: Directory) {
		this.client = client;
		this.directory = directory;
		this.nonce = undefined;
	}

	createAccount(...[request]: Parameters<Client["createAccount"]>): ReturnType<Client["createAccount"]> {
		return this.client.createAccount({
			...request,
			options: {
				...request.options,
				path: this.directory.newAccount
			}
		});
	}

	newNonce(...[request]: Parameters<Client["newNonce"]>): ReturnType<Client["newNonce"]> {
		return this.client.newNonce({
			...request,
			options: {
				...request.options,
				path: this.directory.newNonce
			}
		});
	}

	static async make(urlPrefix: string, options?: Partial<{ path: Array<string> }>): Promise<Handler> {
		let path = options?.path ?? ["directory"];
		let client = makeClient(urlPrefix);
		let response = await client.getDirectory({
			options: {
				path
			}
		});
		let payload = await response.payload();
		let keyChange = getUrlPath(payload.keyChange, urlPrefix);
		let newAccount = getUrlPath(payload.newAccount, urlPrefix);
		let newNonce = getUrlPath(payload.newNonce, urlPrefix);
		let newOrder = getUrlPath(payload.newOrder, urlPrefix);
		let revokeCert = getUrlPath(payload.revokeCert, urlPrefix);
		let directory: Directory = {
			keyChange,
			newAccount,
			newNonce,
			newOrder,
			revokeCert
		};
		return new Handler(client, directory);
	};
};
