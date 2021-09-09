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
	try {
		return HMACSHA384Algorithm.fromIdentifier(node);
	} catch (error) {}
	try {
		return HMACSHA512Algorithm.fromIdentifier(node);
	} catch (error) {}
	try {
		return HMACSHA512224Algorithm.fromIdentifier(node);
	} catch (error) {}
	try {
		return HMACSHA512256Algorithm.fromIdentifier(node);
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

export class HMACSHA384Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA384Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.10"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha384";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA384Algorithm {
		if (schema.HMACSHA384Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA384Algorithm();
		}
		throw ``;
	}
};

export class HMACSHA512Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA512Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.11"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha512";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512Algorithm {
		if (schema.HMACSHA512Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA512Algorithm();
		}
		throw ``;
	}
};

export class HMACSHA512224Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA512224Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.12"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha512-224";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512224Algorithm {
		if (schema.HMACSHA512224Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA512224Algorithm();
		}
		throw ``;
	}
};

export class HMACSHA512256Algorithm implements DigestAlgorithm {
	constructor(options?: Partial<{}>) {

	}

	getIdentifier(): schema.HMACSHA512256Identifier {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.2.13"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	getType(): string {
		return "sha512-256";
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512256Algorithm {
		if (schema.HMACSHA512256Identifier.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new HMACSHA512256Algorithm();
		}
		throw ``;
	}
};
