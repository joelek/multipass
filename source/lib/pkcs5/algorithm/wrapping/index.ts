import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as cipher from "../cipher";
import * as derivation from "../derivation";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface WrappingAlgorithm extends Algorithm {
	unwrap(ciphertext: Buffer, passhprase: string): Buffer;
	wrap(plaintext: Buffer, passhprase: string): Buffer;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): WrappingAlgorithm {
	try {
		return PBES2Algorithm.fromIdentifier(node);
	} catch (error) {}
	throw `Expected wrapping algorithm to be known!`;
};

export class PBES2Algorithm implements WrappingAlgorithm {
	private derivationAlgorithm: derivation.DerivationAlgorithm;
	private cipherAlgorithm: cipher.CipherAlgorithm;

	constructor(options?: Partial<{ derivationAlgorithm: derivation.DerivationAlgorithm, cipherAlgorithm: cipher.CipherAlgorithm }>) {
		this.derivationAlgorithm = options?.derivationAlgorithm ?? new derivation.PBKDF2Algorithm();
		this.cipherAlgorithm = options?.cipherAlgorithm ?? new cipher.AES256CBCAlgorithm();
	}

	unwrap(ciphertext: Buffer, passhprase: string): Buffer {
		let keyLength = this.cipherAlgorithm.getKeyLength();
		let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
		let plaintext = this.cipherAlgorithm.decrypt(ciphertext, key);
		return plaintext;
	}

	wrap(plaintext: Buffer, passhprase: string): Buffer {
		let keyLength = this.cipherAlgorithm.getKeyLength();
		let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
		let ciphertext = this.cipherAlgorithm.encrypt(plaintext, key);
		return ciphertext;
	}

	getIdentifier(): schema.PBES2Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "KoZIhvcNAQUN"
				},
				{
					...asn1.SEQUENCE,
					data: [
						{
							...this.derivationAlgorithm.getIdentifier()
						},
						{
							...this.cipherAlgorithm.getIdentifier()
						}
					]
				}
			]
		};
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): PBES2Algorithm {
		if (schema.PBES2Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			let [derivationNode, cipherNode] = optionsNode.data;
			let derivationAlgorithm = derivation.fromIdentifier(derivationNode)
			let cipherAlgorithm = cipher.fromIdentifier(cipherNode);
			return new PBES2Algorithm({
				derivationAlgorithm,
				cipherAlgorithm
			});
		}
		throw ``;
	}
};
