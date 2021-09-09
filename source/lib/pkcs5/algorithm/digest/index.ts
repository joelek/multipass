import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface DigestAlgorithm extends Algorithm {
	getType(): string;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): DigestAlgorithm {
	try {
		return HMACSHA1Algorithm.fromIdentifier(node);
	} catch (error) {}
	try {
		return HMACSHA224Algorithm.fromIdentifier(node);
	} catch (error) {}
	try {
		return HMACSHA256Algorithm.fromIdentifier(node);
	} catch (error) {}
	throw `Expected digest algorithm to be known!`;
};

export class HMACSHA1Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA1Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.7"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha1";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA1Algorithm {
		if (schema.HMACSHA1Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA1Algorithm();
		}
		throw ``;
	}
};

export class HMACSHA224Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA224Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.8"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha224";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA224Algorithm {
		if (schema.HMACSHA224Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA224Algorithm();
		}
		throw ``;
	}
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
					data: "1.2.840.113549.2.9"
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
