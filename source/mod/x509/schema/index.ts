// This file was auto-generated by @joelek/autoguard. Edit at own risk.

import * as autoguard from "@joelek/autoguard/dist/lib-shared";
import { AlgorithmIdentifier } from "../../pkcs5";
import { BitString } from "../../asn1";
import { Boolean } from "../../asn1";
import { Extension } from "../../pkcs10";
import { Extensions } from "../../pkcs10";
import { Integer } from "../../asn1";
import { Name } from "../../pkcs10";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { PublicKeyInfo } from "../../pkcs8";
import { Sequence } from "../../asn1";
import { Set } from "../../asn1";
import { UTCTime } from "../../asn1";
import { UTF8String } from "../../asn1";

export const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString> = autoguard.guards.Reference.of(() => BitString);

export type ASN1BitString = autoguard.guards.Reference<BitString>;

export const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer> = autoguard.guards.Reference.of(() => Integer);

export type ASN1Integer = autoguard.guards.Reference<Integer>;

export const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null> = autoguard.guards.Reference.of(() => Null);

export type ASN1Null = autoguard.guards.Reference<Null>;

export const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node> = autoguard.guards.Reference.of(() => Node);

export type ASN1Node = autoguard.guards.Reference<Node>;

export const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier> = autoguard.guards.Reference.of(() => ObjectIdentifier);

export type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;

export const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString> = autoguard.guards.Reference.of(() => OctetString);

export type ASN1OctetString = autoguard.guards.Reference<OctetString>;

export const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence> = autoguard.guards.Reference.of(() => Sequence);

export type ASN1Sequence = autoguard.guards.Reference<Sequence>;

export const ASN1Set: autoguard.serialization.MessageGuard<ASN1Set> = autoguard.guards.Reference.of(() => Set);

export type ASN1Set = autoguard.guards.Reference<Set>;

export const ASN1UTF8String: autoguard.serialization.MessageGuard<ASN1UTF8String> = autoguard.guards.Reference.of(() => UTF8String);

export type ASN1UTF8String = autoguard.guards.Reference<UTF8String>;

export const ASN1UTCTime: autoguard.serialization.MessageGuard<ASN1UTCTime> = autoguard.guards.Reference.of(() => UTCTime);

export type ASN1UTCTime = autoguard.guards.Reference<UTCTime>;

export const ASN1Boolean: autoguard.serialization.MessageGuard<ASN1Boolean> = autoguard.guards.Reference.of(() => Boolean);

export type ASN1Boolean = autoguard.guards.Reference<Boolean>;

export const Version: autoguard.serialization.MessageGuard<Version> = autoguard.guards.Reference.of(() => ASN1Integer);

export type Version = autoguard.guards.Reference<ASN1Integer>;

export const CertificateSerialNumber: autoguard.serialization.MessageGuard<CertificateSerialNumber> = autoguard.guards.Reference.of(() => ASN1Integer);

export type CertificateSerialNumber = autoguard.guards.Reference<ASN1Integer>;

export const Validity: autoguard.serialization.MessageGuard<Validity> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1UTCTime),
			autoguard.guards.Reference.of(() => ASN1UTCTime)
		)
	}, {})
);

export type Validity = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1UTCTime>,
			autoguard.guards.Reference<ASN1UTCTime>
		]>
	}, {}>
]>;

export const SubjectKeyIdentifierExtension: autoguard.serialization.MessageGuard<SubjectKeyIdentifierExtension> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => Extension),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("2.5.29.14")
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type SubjectKeyIdentifierExtension = autoguard.guards.Intersection<[
	autoguard.guards.Reference<Extension>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"2.5.29.14">
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const AuthorityKeyIdentifierExtension: autoguard.serialization.MessageGuard<AuthorityKeyIdentifierExtension> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => Extension),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("2.5.29.35")
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type AuthorityKeyIdentifierExtension = autoguard.guards.Intersection<[
	autoguard.guards.Reference<Extension>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"2.5.29.35">
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const BasicConstraintsExtension: autoguard.serialization.MessageGuard<BasicConstraintsExtension> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => Extension),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("2.5.29.19")
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1Boolean),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type BasicConstraintsExtension = autoguard.guards.Intersection<[
	autoguard.guards.Reference<Extension>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"2.5.29.19">
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1Boolean>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const TBSCertificate: autoguard.serialization.MessageGuard<TBSCertificate> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Object.of({
				"kind": autoguard.guards.StringLiteral.of("CONTEXT"),
				"form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
				"type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
				"data": autoguard.guards.Tuple.of(
					autoguard.guards.Reference.of(() => Version)
				)
			}, {}),
			autoguard.guards.Reference.of(() => CertificateSerialNumber),
			autoguard.guards.Reference.of(() => AlgorithmIdentifier),
			autoguard.guards.Reference.of(() => Name),
			autoguard.guards.Reference.of(() => Validity),
			autoguard.guards.Reference.of(() => Name),
			autoguard.guards.Reference.of(() => PublicKeyInfo),
			autoguard.guards.Object.of({
				"kind": autoguard.guards.StringLiteral.of("CONTEXT"),
				"form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
				"type": autoguard.guards.StringLiteral.of("BIT_STRING"),
				"data": autoguard.guards.Tuple.of(
					autoguard.guards.Reference.of(() => Extensions)
				)
			}, {})
		)
	}, {})
);

export type TBSCertificate = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Object<{
				"kind": autoguard.guards.StringLiteral<"CONTEXT">,
				"form": autoguard.guards.StringLiteral<"CONSTRUCTED">,
				"type": autoguard.guards.StringLiteral<"END_OF_CONTENT">,
				"data": autoguard.guards.Tuple<[
					autoguard.guards.Reference<Version>
				]>
			}, {}>,
			autoguard.guards.Reference<CertificateSerialNumber>,
			autoguard.guards.Reference<AlgorithmIdentifier>,
			autoguard.guards.Reference<Name>,
			autoguard.guards.Reference<Validity>,
			autoguard.guards.Reference<Name>,
			autoguard.guards.Reference<PublicKeyInfo>,
			autoguard.guards.Object<{
				"kind": autoguard.guards.StringLiteral<"CONTEXT">,
				"form": autoguard.guards.StringLiteral<"CONSTRUCTED">,
				"type": autoguard.guards.StringLiteral<"BIT_STRING">,
				"data": autoguard.guards.Tuple<[
					autoguard.guards.Reference<Extensions>
				]>
			}, {}>
		]>
	}, {}>
]>;

export const Certificate: autoguard.serialization.MessageGuard<Certificate> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => TBSCertificate),
			autoguard.guards.Reference.of(() => AlgorithmIdentifier),
			autoguard.guards.Reference.of(() => ASN1BitString)
		)
	}, {})
);

export type Certificate = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<TBSCertificate>,
			autoguard.guards.Reference<AlgorithmIdentifier>,
			autoguard.guards.Reference<ASN1BitString>
		]>
	}, {}>
]>;

export namespace Autoguard {
	export const Guards = {
		"ASN1BitString": autoguard.guards.Reference.of(() => ASN1BitString),
		"ASN1Integer": autoguard.guards.Reference.of(() => ASN1Integer),
		"ASN1Null": autoguard.guards.Reference.of(() => ASN1Null),
		"ASN1Node": autoguard.guards.Reference.of(() => ASN1Node),
		"ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
		"ASN1OctetString": autoguard.guards.Reference.of(() => ASN1OctetString),
		"ASN1Sequence": autoguard.guards.Reference.of(() => ASN1Sequence),
		"ASN1Set": autoguard.guards.Reference.of(() => ASN1Set),
		"ASN1UTF8String": autoguard.guards.Reference.of(() => ASN1UTF8String),
		"ASN1UTCTime": autoguard.guards.Reference.of(() => ASN1UTCTime),
		"ASN1Boolean": autoguard.guards.Reference.of(() => ASN1Boolean),
		"Version": autoguard.guards.Reference.of(() => Version),
		"CertificateSerialNumber": autoguard.guards.Reference.of(() => CertificateSerialNumber),
		"Validity": autoguard.guards.Reference.of(() => Validity),
		"SubjectKeyIdentifierExtension": autoguard.guards.Reference.of(() => SubjectKeyIdentifierExtension),
		"AuthorityKeyIdentifierExtension": autoguard.guards.Reference.of(() => AuthorityKeyIdentifierExtension),
		"BasicConstraintsExtension": autoguard.guards.Reference.of(() => BasicConstraintsExtension),
		"TBSCertificate": autoguard.guards.Reference.of(() => TBSCertificate),
		"Certificate": autoguard.guards.Reference.of(() => Certificate)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
