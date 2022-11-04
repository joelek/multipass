import * as libcrypto from "crypto"
import * as asn1 from "../asn1";
import * as der from "../der";
import * as pkcs5 from "../pkcs5";
import * as pkcs10 from "../pkcs10";
import * as schema from "./schema";
import * as parsing from "../parsing";

const DEFAULT_VALIDITY_PERIOD_DAYS = 90;

export * from "./schema";

export function signCertificationRequest(buffer: Buffer, issuer: pkcs10.Name, key: libcrypto.KeyObject, options?: Partial<{
	serialNumber: bigint,
	signatureAlgorithm: pkcs5.signature.SignatureAlgorithm,
	validityPeriod: {
		notBefore: Date,
		notAfter: Date
	} | {
		days: number
	}
}>): Buffer {
	let serialNumber = options?.serialNumber ?? BigInt(1);
	let signatureAlgorithm = options?.signatureAlgorithm ?? pkcs10.getDefaultAlgorithm(key);
	let now = new Date();
	now.setUTCSeconds(0);
	now.setUTCMilliseconds(0);
	let notBefore = new Date(now);
	let notAfter = new Date(now);
	let validityPeriod = options?.validityPeriod;
	if (validityPeriod != null) {
		if ("days" in validityPeriod) {
			notAfter.setDate(notAfter.getDate() + validityPeriod.days);
		} else {
			notBefore = validityPeriod.notBefore;
			notAfter = validityPeriod.notAfter;
		}
	} else {
		notAfter.setDate(notAfter.getDate() + DEFAULT_VALIDITY_PERIOD_DAYS);
	}
	let cr = pkcs10.CertificationRequest.as(der.node.parse(new parsing.Parser(buffer)));
	let [cri, crSignatureAlgorithmIdentifier, crSignature] = cr.data;
	let [criVersion, criSubject, criSubjectPublicKeyInfo, criAttributes] = cri.data;
	let crSignatureAlgorithm = pkcs5.signature.fromIdentifier(crSignatureAlgorithmIdentifier);
	let crKey = libcrypto.createPublicKey({
		key: der.node.serialize(criSubjectPublicKeyInfo),
		format: "der",
		type: "spki"
	});
	if (!crSignatureAlgorithm.verify(der.node.serialize(cri), crKey, Buffer.from(crSignature.data, "base64url").slice(1))) {
		throw `Expected signature to match certification request info!`;
	}
	let validity: schema.Validity = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.UTC_TIME,
				data: Buffer.from(asn1.encodeUTCTime(notBefore)).toString("base64url")
			},
			{
				...asn1.UTC_TIME,
				data: Buffer.from(asn1.encodeUTCTime(notAfter)).toString("base64url")
			}
		]
	};
	let extensions: pkcs10.Extensions = {
		...asn1.SEQUENCE,
		data: []
	};
	for (let criAttribute of criAttributes.data) {
		if (pkcs10.ExtensionRequests.is(criAttribute)) {
			for (let extension of criAttribute.data[1].data[0].data) {
				if (pkcs10.SubjectAlternativeNameExtension.is(extension)) {
					extensions.data.push(extension);
				}
			}
		}
	}
	let tbsc: schema.TBSCertificate = {
		...asn1.SEQUENCE,
		data: [
			{
				kind: "CONTEXT",
				form: "CONSTRUCTED",
				type: "END_OF_CONTENT", // Context-specific type 0.
				data: [
					{
						...asn1.INTEGER,
						data: asn1.encodeInteger(BigInt(2)).toString("base64url")
					}
				]
			},
			{
				...asn1.INTEGER,
				data: asn1.encodeInteger(serialNumber).toString("base64url")
			},
			{
				...crSignatureAlgorithmIdentifier
			},
			{
				...issuer
			},
			{
				...validity
			},
			{
				...criSubject
			},
			{
				...criSubjectPublicKeyInfo,
			},
			{
				kind: "CONTEXT",
				form: "CONSTRUCTED",
				type: "BIT_STRING", // Context-specific type 3.
				data: [
					extensions
				]
			}
		]
	};
	let signature = Buffer.concat([Buffer.alloc(1), signatureAlgorithm.sign(der.node.serialize(tbsc), key)]);
	let certficate: schema.Certificate = {
		...asn1.SEQUENCE,
		data: [
			{
				...tbsc
			},
			{
				...signatureAlgorithm.getIdentifier()
			},
			{
				...asn1.BIT_STRING,
				data: signature.toString("base64url")
			}
		]
	};
	return der.node.serialize(certficate);
};

export function generateSelfSignedCertificate(
	hostnames: Array<string>,
	key: libcrypto.KeyObject,
	options?: Partial<{
		serialNumber: bigint,
		signatureAlgorithm: pkcs5.signature.SignatureAlgorithm,
		validityPeriod: {
			notBefore: Date,
			notAfter: Date
		} | {
			days: number
		}
	}>
): Buffer {
	let buffer = pkcs10.createCertificateRequest(hostnames, key, options);
	let commonName: pkcs10.CommonName = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.OBJECT_IDENTIFER,
				data: "2.5.4.3"
			},
			{
				...asn1.UTF8_STRING,
				data: Buffer.from("multipass").toString("base64url")
			}
		]
	};
	let issuer: pkcs10.Name = {
		...asn1.SEQUENCE,
		data: [
			{
				...asn1.SET,
				data: [
					commonName
				]
			}
		]
	};
	return signCertificationRequest(buffer, issuer, key, options);
};
