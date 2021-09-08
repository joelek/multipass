import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface CipherAlgorithm extends Algorithm {
	decrypt(ciphertext: Buffer, key: Buffer): Buffer;
	encrypt(plaintext: Buffer, key: Buffer): Buffer;
	getKeyLength(): number;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): CipherAlgorithm {
	try {
		return AES256CBCAlgorithm.fromIdentifier(node);
	} catch (error) {}
	throw `Expected cipher algorithm to be known!`;
};

export class AES256CBCAlgorithm implements CipherAlgorithm {
	private iv: Buffer;

	constructor(options?: Partial<{ iv: Buffer }>) {
		this.iv = options?.iv ?? libcrypto.randomBytes(16);
	}

	decrypt(ciphertext: Buffer, key: Buffer): Buffer {
		let decipher = libcrypto.createDecipheriv("aes-256-cbc", key, this.iv);
		let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
		return plaintext;
	}

	encrypt(plaintext: Buffer, key: Buffer): Buffer {
		let cipher = libcrypto.createCipheriv("aes-256-cbc", key, this.iv);
		let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
		return ciphertext;
	}

	getKeyLength(): number {
		return 32;
	}

	getIdentifier(): schema.AES256CBCIdentifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "YIZIAWUDBAEq"
				},
				{
					...asn1.OCTET_STRING,
					data: this.iv.toString("base64url")
				}
			]
		};
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): AES256CBCAlgorithm {
		if (schema.AES256CBCIdentifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			let iv = Buffer.from(optionsNode.data, "base64url");
			return new AES256CBCAlgorithm({
				iv
			});
		}
		throw ``;
	}
};
