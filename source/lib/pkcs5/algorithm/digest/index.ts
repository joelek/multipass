import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface DigestAlgorithm extends Algorithm {
	getType(): string;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): DigestAlgorithm {
	try {
		return HMACSHA256Algorithm.fromIdentifier(node);
	} catch (error) {}
	throw `Expected digest algorithm to be known!`;
};

export class HMACSHA256Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA256Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "KoZIhvcNAgk"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha256";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA256Algorithm {
		if (schema.HMACSHA256Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA256Algorithm();
		}
		throw ``;
	}
};
