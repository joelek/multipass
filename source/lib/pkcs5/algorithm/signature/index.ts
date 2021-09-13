import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface SignatureAlgorithm extends Algorithm {
	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
};

export function fromIdentifier(node: schema.AlgorithmIdentifier): SignatureAlgorithm {
	try {
		return ECDSAWithSHA256.fromIdentifier(node);
	} catch (error) {}
	try {
		return ECDSAWithSHA384.fromIdentifier(node);
	} catch (error) {}
	try {
		return ECDSAWithSHA512.fromIdentifier(node);
	} catch (error) {}
	try {
		return SHA256WithRSAEncryption.fromIdentifier(node);
	} catch (error) {}
	try {
		return SHA384WithRSAEncryption.fromIdentifier(node);
	} catch (error) {}
	try {
		return SHA512WithRSAEncryption.fromIdentifier(node);
	} catch (error) {}
	throw `Expected signature algorithm to be known!`;
};

export class ECDSAWithSHA256 implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.ECDSAWithSHA256 {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.10045.4.3.2"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha256");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA256 {
		if (schema.ECDSAWithSHA256.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA256();
		}
		throw ``;
	}
};

export class ECDSAWithSHA384 implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.ECDSAWithSHA384 {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.10045.4.3.3"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha384");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA384 {
		if (schema.ECDSAWithSHA384.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA384();
		}
		throw ``;
	}
};

export class ECDSAWithSHA512 implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.ECDSAWithSHA512 {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.10045.4.3.4"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha512");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA512 {
		if (schema.ECDSAWithSHA512.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA512();
		}
		throw ``;
	}
};

export class SHA256WithRSAEncryption implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.SHA256WithRSAEncryption {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.1.1.11"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha256");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA256WithRSAEncryption {
		if (schema.SHA256WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA256WithRSAEncryption();
		}
		throw ``;
	}
};

export class SHA384WithRSAEncryption implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.SHA384WithRSAEncryption {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.1.1.12"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha384");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA384WithRSAEncryption {
		if (schema.SHA384WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA384WithRSAEncryption();
		}
		throw ``;
	}
};

export class SHA512WithRSAEncryption implements SignatureAlgorithm {
	constructor() {

	}

	getIdentifier(): schema.SHA512WithRSAEncryption {
		return {
			...asn1.SEQUENCE,
			data: [
				{
					...asn1.OBJECT_IDENTIFER,
					data: "1.2.840.113549.1.1.13"
				},
				{
					...asn1.NULL,
					data: ""
				}
			]
		};
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha512");
		sign.update(buffer);
		return sign.sign(key);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA512WithRSAEncryption {
		if (schema.SHA512WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA512WithRSAEncryption();
		}
		throw ``;
	}
};
