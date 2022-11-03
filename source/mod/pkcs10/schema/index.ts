// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { AlgorithmIdentifier } from "../../pkcs5";
import { BitString } from "../../asn1";
import { Boolean } from "../../asn1";
import { Integer } from "../../asn1";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { PublicKeyInfo } from "../../pkcs8";
import { Sequence } from "../../asn1";
import { Set } from "../../asn1";
import { UTF8String } from "../../asn1";

export const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString> = autoguard.guards.Reference.of(() => BitString);

export type ASN1BitString = autoguard.guards.Reference<BitString>;

export const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer> = autoguard.guards.Reference.of(() => Integer);

export type ASN1Integer = autoguard.guards.Reference<Integer>;

export const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null> = autoguard.guards.Reference.of(() => Null);

export type ASN1Null = autoguard.guards.Reference<Null>;

export const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node> = autoguard.guards.Reference.of(() => Node);

export type ASN1Node = autoguard.guards.Reference<Node>;

export const ASN1Set: autoguard.serialization.MessageGuard<ASN1Set> = autoguard.guards.Reference.of(() => Set);

export type ASN1Set = autoguard.guards.Reference<Set>;

export const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier> = autoguard.guards.Reference.of(() => ObjectIdentifier);

export type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;

export const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString> = autoguard.guards.Reference.of(() => OctetString);

export type ASN1OctetString = autoguard.guards.Reference<OctetString>;

export const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence> = autoguard.guards.Reference.of(() => Sequence);

export type ASN1Sequence = autoguard.guards.Reference<Sequence>;

export const ASN1UTF8String: autoguard.serialization.MessageGuard<ASN1UTF8String> = autoguard.guards.Reference.of(() => UTF8String);

export type ASN1UTF8String = autoguard.guards.Reference<UTF8String>;

export const ASN1Boolean: autoguard.serialization.MessageGuard<ASN1Boolean> = autoguard.guards.Reference.of(() => Boolean);

export type ASN1Boolean = autoguard.guards.Reference<Boolean>;

export const AttributeTypeAndValue: autoguard.serialization.MessageGuard<AttributeTypeAndValue> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
			autoguard.guards.Reference.of(() => ASN1Node)
		)
	}, {})
);

export type AttributeTypeAndValue = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1ObjectIdentifier>,
			autoguard.guards.Reference<ASN1Node>
		]>
	}, {}>
]>;

export const CommonName: autoguard.serialization.MessageGuard<CommonName> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AttributeTypeAndValue),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("2.5.4.3")
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1UTF8String)
		)
	}, {})
);

export type CommonName = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AttributeTypeAndValue>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"2.5.4.3">
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1UTF8String>
		]>
	}, {}>
]>;

export const RelativeDistinguishedName: autoguard.serialization.MessageGuard<RelativeDistinguishedName> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Set),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => AttributeTypeAndValue))
	}, {})
);

export type RelativeDistinguishedName = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Set>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Array<autoguard.guards.Reference<AttributeTypeAndValue>>
	}, {}>
]>;

export const RDNSequence: autoguard.serialization.MessageGuard<RDNSequence> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => RelativeDistinguishedName))
	}, {})
);

export type RDNSequence = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Array<autoguard.guards.Reference<RelativeDistinguishedName>>
	}, {}>
]>;

export const Name: autoguard.serialization.MessageGuard<Name> = autoguard.guards.Reference.of(() => RDNSequence);

export type Name = autoguard.guards.Reference<RDNSequence>;

export const CRIAttribute: autoguard.serialization.MessageGuard<CRIAttribute> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
			autoguard.guards.Reference.of(() => ASN1Set)
		)
	}, {})
);

export type CRIAttribute = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1ObjectIdentifier>,
			autoguard.guards.Reference<ASN1Set>
		]>
	}, {}>
]>;

export const Extension1: autoguard.serialization.MessageGuard<Extension1> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
			autoguard.guards.Reference.of(() => ASN1Boolean),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type Extension1 = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1ObjectIdentifier>,
			autoguard.guards.Reference<ASN1Boolean>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const Extension2: autoguard.serialization.MessageGuard<Extension2> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type Extension2 = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1ObjectIdentifier>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const SubjectAlternativeNameExtension: autoguard.serialization.MessageGuard<SubjectAlternativeNameExtension> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("2.5.29.17")
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type SubjectAlternativeNameExtension = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"2.5.29.17">
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const Extension: autoguard.serialization.MessageGuard<Extension> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => Extension1),
	autoguard.guards.Reference.of(() => Extension2)
);

export type Extension = autoguard.guards.Union<[
	autoguard.guards.Reference<Extension1>,
	autoguard.guards.Reference<Extension2>
]>;

export const Extensions: autoguard.serialization.MessageGuard<Extensions> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Extension))
	}, {})
);

export type Extensions = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Array<autoguard.guards.Reference<Extension>>
	}, {}>
]>;

export const ExtensionRequests: autoguard.serialization.MessageGuard<ExtensionRequests> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => CRIAttribute),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.9.14")
				}, {})
			),
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1Set),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Tuple.of(
						autoguard.guards.Reference.of(() => Extensions)
					)
				}, {})
			)
		)
	}, {})
);

export type ExtensionRequests = autoguard.guards.Intersection<[
	autoguard.guards.Reference<CRIAttribute>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.StringLiteral<"1.2.840.113549.1.9.14">
				}, {}>
			]>,
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1Set>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Tuple<[
						autoguard.guards.Reference<Extensions>
					]>
				}, {}>
			]>
		]>
	}, {}>
]>;

export const CertificationRequestInfo: autoguard.serialization.MessageGuard<CertificationRequestInfo> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1Integer),
			autoguard.guards.Reference.of(() => Name),
			autoguard.guards.Reference.of(() => PublicKeyInfo),
			autoguard.guards.Object.of({
				"kind": autoguard.guards.StringLiteral.of("CONTEXT"),
				"form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
				"type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
				"data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => CRIAttribute))
			}, {})
		)
	}, {})
);

export type CertificationRequestInfo = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1Integer>,
			autoguard.guards.Reference<Name>,
			autoguard.guards.Reference<PublicKeyInfo>,
			autoguard.guards.Object<{
				"kind": autoguard.guards.StringLiteral<"CONTEXT">,
				"form": autoguard.guards.StringLiteral<"CONSTRUCTED">,
				"type": autoguard.guards.StringLiteral<"END_OF_CONTENT">,
				"data": autoguard.guards.Array<autoguard.guards.Reference<CRIAttribute>>
			}, {}>
		]>
	}, {}>
]>;

export const CertificationRequest: autoguard.serialization.MessageGuard<CertificationRequest> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => CertificationRequestInfo),
			autoguard.guards.Reference.of(() => AlgorithmIdentifier),
			autoguard.guards.Reference.of(() => ASN1BitString)
		)
	}, {})
);

export type CertificationRequest = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<CertificationRequestInfo>,
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
		"ASN1Set": autoguard.guards.Reference.of(() => ASN1Set),
		"ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
		"ASN1OctetString": autoguard.guards.Reference.of(() => ASN1OctetString),
		"ASN1Sequence": autoguard.guards.Reference.of(() => ASN1Sequence),
		"ASN1UTF8String": autoguard.guards.Reference.of(() => ASN1UTF8String),
		"ASN1Boolean": autoguard.guards.Reference.of(() => ASN1Boolean),
		"AttributeTypeAndValue": autoguard.guards.Reference.of(() => AttributeTypeAndValue),
		"CommonName": autoguard.guards.Reference.of(() => CommonName),
		"RelativeDistinguishedName": autoguard.guards.Reference.of(() => RelativeDistinguishedName),
		"RDNSequence": autoguard.guards.Reference.of(() => RDNSequence),
		"Name": autoguard.guards.Reference.of(() => Name),
		"CRIAttribute": autoguard.guards.Reference.of(() => CRIAttribute),
		"Extension1": autoguard.guards.Reference.of(() => Extension1),
		"Extension2": autoguard.guards.Reference.of(() => Extension2),
		"SubjectAlternativeNameExtension": autoguard.guards.Reference.of(() => SubjectAlternativeNameExtension),
		"Extension": autoguard.guards.Reference.of(() => Extension),
		"Extensions": autoguard.guards.Reference.of(() => Extensions),
		"ExtensionRequests": autoguard.guards.Reference.of(() => ExtensionRequests),
		"CertificationRequestInfo": autoguard.guards.Reference.of(() => CertificationRequestInfo),
		"CertificationRequest": autoguard.guards.Reference.of(() => CertificationRequest)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
