import * as $crypto from "crypto";
import * as $asno from "../der";
import * as $schema from "./schema";

export type PublicKey = {
	modulus: Buffer;
	public_exponent: Buffer;
};

export type PrivateKey = {
	version: Buffer;
	modulus: Buffer;
	public_exponent: Buffer;
	private_exponent: Buffer;
	prime_one: Buffer;
	prime_two: Buffer;
	exponent_one: Buffer;
	exponent_two: Buffer;
	coefficient: Buffer;
};

export async function generatePrivateKeyDer(): Promise<Buffer> {
	return new Promise<Buffer>((resolve, reject) => {
		$crypto.generateKeyPair("rsa", {
			modulusLength: 4096,
			publicExponent: 65537,
			publicKeyEncoding: {
				type: "pkcs1",
				format: "der"
			},
			privateKeyEncoding: {
				type: "pkcs1",
				format: "der"
			}
		}, (error, public_key, private_key) => {
			if (error != null) {
				return reject(error);
			}
			return resolve(private_key);
		});
	});
}

export async function generatePrivateKey(): Promise<PrivateKey> {
	let der = await generatePrivateKeyDer();
	let nodes = await $asno.parse(der);
	let private_key = $schema.PrivateKey.as(nodes);
	let components = private_key[0].data;
	let version = Buffer.from(components[0].data, "hex");
	let modulus = Buffer.from(components[1].data, "hex");
	let public_exponent = Buffer.from(components[2].data, "hex");
	let private_exponent = Buffer.from(components[3].data, "hex");
	let prime_one = Buffer.from(components[4].data, "hex");
	let prime_two = Buffer.from(components[5].data, "hex");
	let exponent_one = Buffer.from(components[6].data, "hex");
	let exponent_two = Buffer.from(components[7].data, "hex");
	let coefficient = Buffer.from(components[8].data, "hex");
	return {
		version,
		modulus,
		public_exponent,
		private_exponent,
		prime_one,
		prime_two,
		exponent_one,
		exponent_two,
		coefficient
	};
}
