import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as digest from "../digest";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface DerivationAlgorithm extends Algorithm {
	deriveKey(passphrase: string, defaultKeyLength: number): Buffer;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): DerivationAlgorithm {
	try {
		return PBKDF2Algorithm.fromIdentifier(node);
	} catch (error) {}
	throw `Expected derivation algorithm to be known!`;
};

export class PBKDF2Algorithm implements DerivationAlgorithm {
	private salt: Buffer;
	private iterations: number;
	private keyLength?: number;
	private digestAlgorithm: digest.DigestAlgorithm;

	constructor(options?: Partial<{ salt: Buffer, iterations: number, keyLength: number, digestAlgorithm: digest.DigestAlgorithm }>) {
		this.salt = options?.salt ?? libcrypto.randomBytes(16);
		this.iterations = options?.iterations ?? 2048;
		this.keyLength = options?.keyLength;
		this.digestAlgorithm = options?.digestAlgorithm ?? new digest.HMACSHA256Algorithm();
	}

	deriveKey(passphrase: string, defaultKeyLength: number): Buffer {
		return libcrypto.pbkdf2Sync(passphrase, this.salt, this.iterations, this.keyLength ?? defaultKeyLength, this.digestAlgorithm.getType());
	}

	getIdentifier(): schema.PBKDF2Identifier {
		if (this.keyLength == null) {
			return {
				...asn1.SEQUENCE,
				data: [
					{
						...asn1.OBJECT_IDENTIFER,
						data: "1.2.840.113549.1.5.12"
					},
					{
						...asn1.SEQUENCE,
						data: [
							{
								...asn1.OCTET_STRING,
								data: this.salt.toString("base64url")
							},
							{
								...asn1.INTEGER,
								data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url")
							},
							{
								...this.digestAlgorithm.getIdentifier()
							}
						]
					}
				]
			};
		} else {
			return {
				...asn1.SEQUENCE,
				data: [
					{
						...asn1.OBJECT_IDENTIFER,
						data: "1.2.840.113549.1.5.12"
					},
					{
						...asn1.SEQUENCE,
						data: [
							{
								...asn1.OCTET_STRING,
								data: this.salt.toString("base64url")
							},
							{
								...asn1.INTEGER,
								data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url")
							},
							{
								...asn1.INTEGER,
								data: asn1.encodeInteger(BigInt(this.keyLength)).toString("base64url")
							},
							{
								...this.digestAlgorithm.getIdentifier()
							}
						]
					}
				]
			};
		}
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): PBKDF2Algorithm {
		if (schema.PBKDF2Identifier1.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			let [saltNode, iterationsNode, keyLengthNode, digestNode] = optionsNode.data;
			if (asn1.OctetString.is(saltNode)) {
				let salt = Buffer.from(saltNode.data, "base64url");
				let iterations = Buffer.from(iterationsNode.data, "base64url");
				let keyLength = Buffer.from(keyLengthNode.data, "base64url");
				let digestAlgorithm = digest.fromIdentifier(digestNode);
				return new PBKDF2Algorithm({
					salt,
					iterations: Number(asn1.decodeInteger(iterations)),
					keyLength: Number(asn1.decodeInteger(keyLength)),
					digestAlgorithm
				});
			}
		}
		if (schema.PBKDF2Identifier2.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			let [saltNode, iterationsNode, digestNode] = optionsNode.data;
			if (asn1.OctetString.is(saltNode)) {
				let salt = Buffer.from(saltNode.data, "base64url");
				let iterations = Buffer.from(iterationsNode.data, "base64url");
				let digestAlgorithm = digest.fromIdentifier(digestNode);
				return new PBKDF2Algorithm({
					salt,
					iterations: Number(asn1.decodeInteger(iterations)),
					digestAlgorithm
				});
			}
		}
		throw ``;
	}
};
