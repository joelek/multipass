import * as libcrypto from "crypto";
import * as liburl from "url";
import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api";
import * as apiclient from "./api/client";
import * as jwk from "../jwk";
import * as jws from "../jws";

type Client = ReturnType<typeof apiclient.makeClient>;

function makeClient(urlPrefix: string): Client {
	let client = apiclient.makeClient({
		urlPrefix: urlPrefix,
		requestHandler: autoguard.api.makeNodeRequestHandler()
	});
	return client;
};

function getUrlPath(url: string, urlPrefix: string): Array<string> {
	if (!url.startsWith(urlPrefix)) {
		throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
	}
	url = url.slice(urlPrefix.length);
	let components = autoguard.api.splitComponents(url);
	return components.map((component) => decodeURIComponent(component));
};

const CONTENT_TYPE = "application/jose+json";

export class Handler {
	private key: libcrypto.KeyObject;
	private client: Client;
	private directory: api.Directory;
	private urlPrefix: string;
	private nextReplayNonce: string | undefined;

	private constructor(key: libcrypto.KeyObject, client: Client, directory: api.Directory, urlPrefix: string) {
		this.key = key;
		this.client = client;
		this.directory = directory;
		this.urlPrefix = urlPrefix;
		this.nextReplayNonce = undefined;
	}

	async createAccount(payloadData: api.CreateAccountPayload): Promise<api.Account> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let key = jwk.getPublicKey(this.key.export({ format: "jwk" }) as any);
		let protectedData: api.CreateAccountProtected = {
			jwk: key,
			nonce: this.nextReplayNonce,
			url: this.directory.newAccount
		};
		let response = await this.client.newAccount({
			options: {
				path: getUrlPath(this.directory.newAccount, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData,
				payload: payloadData
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return payload;
	}

	async createNonce(): Promise<string> {
		let response = await this.client.newNonce({
			options: {
				path: getUrlPath(this.directory.newNonce, this.urlPrefix)
			}
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		return this.nextReplayNonce;
	}

	static async make(url: string, key: libcrypto.KeyObject): Promise<Handler> {
		let urlPrefix = new liburl.URL(url).origin;
		let client = makeClient(urlPrefix);
		let response = await client.getDirectory({
			options: {
				path: getUrlPath(url, urlPrefix)
			}
		});
		let payload = await response.payload();
		return new Handler(key, client, payload, urlPrefix);
	};
};
