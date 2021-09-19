import * as libcrypto from "crypto";
import * as asn1 from "../../../asn1";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";

export interface SignatureAlgorithm extends Algorithm {
	getJoseType(): string;
	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
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

export function fromJoseType(joseType: string): SignatureAlgorithm {
	if (joseType === "ES256") {
		return new ECDSAWithSHA256();
	}
	if (joseType === "ES384") {
		return new ECDSAWithSHA384();
	}
	if (joseType === "ES512") {
		return new ECDSAWithSHA512();
	}
	if (joseType === "RS256") {
		return new SHA256WithRSAEncryption();
	}
	if (joseType === "RS384") {
		return new SHA384WithRSAEncryption();
	}
	if (joseType === "RS512") {
		return new SHA512WithRSAEncryption();
	}
	throw `Expected signature algorithm to be known!`;
};

export class ECDSAWithSHA256 implements SignatureAlgorithm {
	private format: "ieee-p1363" | "der";

	constructor(options?: Partial<{ format: "ieee-p1363" | "der" }>) {
		this.format = options?.format ?? "ieee-p1363";
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

	getJoseType(): string {
		return "ES256";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha256");
		sign.update(buffer);
		return sign.sign({
			key,
			dsaEncoding: this.format
		});
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha256");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA256 {
		if (schema.ECDSAWithSHA256.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA256();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
	}
};

export class ECDSAWithSHA384 implements SignatureAlgorithm {
	private format: "ieee-p1363" | "der";

	constructor(options?: Partial<{ format: "ieee-p1363" | "der" }>) {
		this.format = options?.format ?? "ieee-p1363";
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

	getJoseType(): string {
		return "ES384";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha384");
		sign.update(buffer);
		return sign.sign({
			key,
			dsaEncoding: this.format
		});
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha384");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA384 {
		if (schema.ECDSAWithSHA384.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA384();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
	}
};

export class ECDSAWithSHA512 implements SignatureAlgorithm {
	private format: "ieee-p1363" | "der";

	constructor(options?: Partial<{ format: "ieee-p1363" | "der" }>) {
		this.format = options?.format ?? "ieee-p1363";
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

	getJoseType(): string {
		return "ES512";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha512");
		sign.update(buffer);
		return sign.sign({
			key,
			dsaEncoding: this.format
		});
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha512");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA512 {
		if (schema.ECDSAWithSHA512.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new ECDSAWithSHA512();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
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

	getJoseType(): string {
		return "RS256";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha256");
		sign.update(buffer);
		return sign.sign(key);
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha256");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA256WithRSAEncryption {
		if (schema.SHA256WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA256WithRSAEncryption();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
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

	getJoseType(): string {
		return "RS384";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha384");
		sign.update(buffer);
		return sign.sign(key);
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha384");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA384WithRSAEncryption {
		if (schema.SHA384WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA384WithRSAEncryption();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
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

	getJoseType(): string {
		return "RS512";
	}

	sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer {
		let sign = libcrypto.createSign("sha512");
		sign.update(buffer);
		return sign.sign(key);
	}

	verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean {
		let verify = libcrypto.createVerify("sha512");
		verify.update(buffer);
		return verify.verify(key, signature);
	}

	static fromIdentifier(node: schema.AlgorithmIdentifier): SHA512WithRSAEncryption {
		if (schema.SHA512WithRSAEncryption.is(node)) {
			let [algorithmNode, optionsNode] = node.data;
			return new SHA512WithRSAEncryption();
		}
		throw `Expected the algorithm expressed using ASN1 syntax!`;
	}
};
