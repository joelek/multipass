import * as libcrypto from "crypto";
import * as liburl from "url";
import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api";
import * as apiclient from "./api/client";
import * as jwk from "../jwk";
import * as jws from "../jws";

function makeClient(urlPrefix: string): apiclient.Client {
	let client = apiclient.makeClient({
		urlPrefix: urlPrefix,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		debugMode: true
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
	private client: apiclient.Client;
	private directory: api.Directory;
	private urlPrefix: string;
	private nextReplayNonce: string | undefined;

	private constructor(key: libcrypto.KeyObject, client: apiclient.Client, directory: api.Directory, urlPrefix: string) {
		this.key = key;
		this.client = client;
		this.directory = directory;
		this.urlPrefix = urlPrefix;
		this.nextReplayNonce = undefined;
	}

	async createAccount(payloadData: api.CreateAccountPayload): Promise<{ payload: api.Account, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let key = jwk.getPublicKey(this.key.export({ format: "jwk" }) as any);
		let protectedData: api.ProtectedWithJWK = {
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
		let url = response.headers()["location"];
		return {
			payload,
			url
		};
	}

	async createNonce(): Promise<void> {
		let response = await this.client.newNonce({
			options: {
				path: getUrlPath(this.directory.newNonce, this.urlPrefix)
			}
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
	}

	async createOrder(kid: string, payloadData: api.CreateOrderPayload): Promise<{ payload: api.Order, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: this.directory.newOrder
		};
		let response = await this.client.newOrder({
			options: {
				path: getUrlPath(this.directory.newOrder, this.urlPrefix)
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
		let url = response.headers()["location"];
		return {
			payload,
			url
		};
	}

	async finalizeChallenge(kid: string, url: string): Promise<{ payload: api.Challenge, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.finalizeChallenge({
			options: {
				path: getUrlPath(url, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData,
				payload: {}
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return {
			payload,
			url
		};
	}

	async finalizeOrder(kid: string, url: string, payloadData: api.FinalizeOrderPayload): Promise<{ payload: api.Order, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.finalizeOrder({
			options: {
				path: getUrlPath(url, this.urlPrefix)
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
		return {
			payload,
			url
		};
	}

	async getAccount(url: string): Promise<{ payload: api.Account, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: url,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.getAccount({
			options: {
				path: getUrlPath(url, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return {
			payload,
			url
		};
	}

	async getAuthorization(kid: string, url: string): Promise<{ payload: api.Authorization, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.getAuthorization({
			options: {
				path: getUrlPath(url, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return {
			payload,
			url
		};
	}

	async getChallenge(kid: string, url: string): Promise<{ payload: api.Challenge, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.getChallenge({
			options: {
				path: getUrlPath(url, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return {
			payload,
			url
		};
	}

	async getOrder(kid: string, url: string): Promise<{ payload: api.Order, url: string }> {
		if (this.nextReplayNonce == null) {
			throw `Expected next replay nonce to be set!`;
		}
		let protectedData: api.ProtectedWithKID = {
			kid: kid,
			nonce: this.nextReplayNonce,
			url: url
		};
		let response = await this.client.getOrder({
			options: {
				path: getUrlPath(url, this.urlPrefix)
			},
			headers: {
				"content-type": CONTENT_TYPE
			},
			payload: await jws.sign(this.key, {
				protected: protectedData
			})
		});
		this.nextReplayNonce = response.headers()["replay-nonce"];
		let payload = await response.payload();
		return {
			payload,
			url
		};
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
