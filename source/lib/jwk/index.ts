import * as asno from "../der";
import * as encoding from "../encoding";
import * as $fs from "../fs";

type WebKey = {
	kty: "RSA",
	n: string,
	e: string
};

class Key {
	private private_key: Buffer;

	constructor(private_key: Buffer) {
		this.private_key = private_key;
	}

	async getWebKey(): Promise<WebKey> {
		let nodes = await asno.parse(this.private_key);
		let data = nodes[0].data;
		if (data instanceof Buffer) {
			return Promise.reject("Unexpected buffer!");
		}
		let n = (data[1] as any).data;
		if (!(n instanceof Buffer)) {
			return Promise.reject("Expected a buffer!");
		}
		let e = (data[2] as any).data;
		if (!(e instanceof Buffer)) {
			return Promise.reject("Expected a buffer!");
		}
		return {
			kty: "RSA",
			n: await encoding.convertBufferToBase64URLString(n),
			e: await encoding.convertBufferToBase64URLString(e)
		};
	}

	async save(path: string): Promise<void> {
		return $fs.writeBufferToFile(path, this.private_key);
	}

	static async load(path: string): Promise<Key> {
		return Promise.resolve(path)
			.then($fs.readFileToBuffer)
			.then((buffer) => {
				return new Key(buffer);
			});
	}
}

export {
	Key
};
