// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { Integer } from "../../asn1";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { Sequence } from "../../asn1";

export const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer> = autoguard.guards.Reference.of(() => Integer);

export type ASN1Integer = autoguard.guards.Reference<Integer>;

export const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node> = autoguard.guards.Reference.of(() => Node);

export type ASN1Node = autoguard.guards.Reference<Node>;

export const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null> = autoguard.guards.Reference.of(() => Null);

export type ASN1Null = autoguard.guards.Reference<Null>;

export const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier> = autoguard.guards.Reference.of(() => ObjectIdentifier);

export type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;

export const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString> = autoguard.guards.Reference.of(() => OctetString);

export type ASN1OctetString = autoguard.guards.Reference<OctetString>;

export const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence> = autoguard.guards.Reference.of(() => Sequence);

export type ASN1Sequence = autoguard.guards.Reference<Sequence>;

export const AlgorithmIdentifier: autoguard.serialization.MessageGuard<AlgorithmIdentifier> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
			autoguard.guards.Reference.of(() => ASN1Node)
		)
	}, {})
);

export type AlgorithmIdentifier = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<ASN1ObjectIdentifier>,
			autoguard.guards.Reference<ASN1Node>
		]>
	}, {}>
]>;

export const AES256CBCAlgorithmIdentifier: autoguard.serialization.MessageGuard<AES256CBCAlgorithmIdentifier> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AlgorithmIdentifier),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Union.of(
						autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.42"),
						autoguard.guards.StringLiteral.of("YIZIAWUDBAEq")
					)
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type AES256CBCAlgorithmIdentifier = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AlgorithmIdentifier>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Union<[
						autoguard.guards.StringLiteral<"2.16.840.1.101.3.4.1.42">,
						autoguard.guards.StringLiteral<"YIZIAWUDBAEq">
					]>
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export const HMACSHA256AlgorithmIdentifier: autoguard.serialization.MessageGuard<HMACSHA256AlgorithmIdentifier> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AlgorithmIdentifier),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Union.of(
						autoguard.guards.StringLiteral.of("1.2.840.113549.2.9"),
						autoguard.guards.StringLiteral.of("KoZIhvcNAgk")
					)
				}, {})
			),
			autoguard.guards.Reference.of(() => ASN1Null)
		)
	}, {})
);

export type HMACSHA256AlgorithmIdentifier = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AlgorithmIdentifier>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Union<[
						autoguard.guards.StringLiteral<"1.2.840.113549.2.9">,
						autoguard.guards.StringLiteral<"KoZIhvcNAgk">
					]>
				}, {}>
			]>,
			autoguard.guards.Reference<ASN1Null>
		]>
	}, {}>
]>;

export const PBKDF2AlgorithmIdentifier1: autoguard.serialization.MessageGuard<PBKDF2AlgorithmIdentifier1> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AlgorithmIdentifier),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Union.of(
						autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12"),
						autoguard.guards.StringLiteral.of("KoZIhvcNAQUM")
					)
				}, {})
			),
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1Sequence),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Tuple.of(
						autoguard.guards.Union.of(
							autoguard.guards.Reference.of(() => ASN1OctetString),
							autoguard.guards.Reference.of(() => AlgorithmIdentifier)
						),
						autoguard.guards.Reference.of(() => ASN1Integer),
						autoguard.guards.Reference.of(() => ASN1Integer),
						autoguard.guards.Reference.of(() => AlgorithmIdentifier)
					)
				}, {})
			)
		)
	}, {})
);

export type PBKDF2AlgorithmIdentifier1 = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AlgorithmIdentifier>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Union<[
						autoguard.guards.StringLiteral<"1.2.840.113549.1.5.12">,
						autoguard.guards.StringLiteral<"KoZIhvcNAQUM">
					]>
				}, {}>
			]>,
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1Sequence>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Tuple<[
						autoguard.guards.Union<[
							autoguard.guards.Reference<ASN1OctetString>,
							autoguard.guards.Reference<AlgorithmIdentifier>
						]>,
						autoguard.guards.Reference<ASN1Integer>,
						autoguard.guards.Reference<ASN1Integer>,
						autoguard.guards.Reference<AlgorithmIdentifier>
					]>
				}, {}>
			]>
		]>
	}, {}>
]>;

export const PBKDF2AlgorithmIdentifier2: autoguard.serialization.MessageGuard<PBKDF2AlgorithmIdentifier2> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AlgorithmIdentifier),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Union.of(
						autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12"),
						autoguard.guards.StringLiteral.of("KoZIhvcNAQUM")
					)
				}, {})
			),
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1Sequence),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Tuple.of(
						autoguard.guards.Union.of(
							autoguard.guards.Reference.of(() => ASN1OctetString),
							autoguard.guards.Reference.of(() => AlgorithmIdentifier)
						),
						autoguard.guards.Reference.of(() => ASN1Integer),
						autoguard.guards.Reference.of(() => AlgorithmIdentifier)
					)
				}, {})
			)
		)
	}, {})
);

export type PBKDF2AlgorithmIdentifier2 = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AlgorithmIdentifier>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Union<[
						autoguard.guards.StringLiteral<"1.2.840.113549.1.5.12">,
						autoguard.guards.StringLiteral<"KoZIhvcNAQUM">
					]>
				}, {}>
			]>,
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1Sequence>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Tuple<[
						autoguard.guards.Union<[
							autoguard.guards.Reference<ASN1OctetString>,
							autoguard.guards.Reference<AlgorithmIdentifier>
						]>,
						autoguard.guards.Reference<ASN1Integer>,
						autoguard.guards.Reference<AlgorithmIdentifier>
					]>
				}, {}>
			]>
		]>
	}, {}>
]>;

export const PBES2AlgorithmIdentifier: autoguard.serialization.MessageGuard<PBES2AlgorithmIdentifier> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AlgorithmIdentifier),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Union.of(
						autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.13"),
						autoguard.guards.StringLiteral.of("KoZIhvcNAQUN")
					)
				}, {})
			),
			autoguard.guards.Intersection.of(
				autoguard.guards.Reference.of(() => ASN1Sequence),
				autoguard.guards.Object.of({
					"data": autoguard.guards.Tuple.of(
						autoguard.guards.Reference.of(() => AlgorithmIdentifier),
						autoguard.guards.Reference.of(() => AlgorithmIdentifier)
					)
				}, {})
			)
		)
	}, {})
);

export type PBES2AlgorithmIdentifier = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AlgorithmIdentifier>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1ObjectIdentifier>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Union<[
						autoguard.guards.StringLiteral<"1.2.840.113549.1.5.13">,
						autoguard.guards.StringLiteral<"KoZIhvcNAQUN">
					]>
				}, {}>
			]>,
			autoguard.guards.Intersection<[
				autoguard.guards.Reference<ASN1Sequence>,
				autoguard.guards.Object<{
					"data": autoguard.guards.Tuple<[
						autoguard.guards.Reference<AlgorithmIdentifier>,
						autoguard.guards.Reference<AlgorithmIdentifier>
					]>
				}, {}>
			]>
		]>
	}, {}>
]>;

export const EncryptedPrivateKeyInfo: autoguard.serialization.MessageGuard<EncryptedPrivateKeyInfo> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ASN1Sequence),
	autoguard.guards.Object.of({
		"data": autoguard.guards.Tuple.of(
			autoguard.guards.Reference.of(() => AlgorithmIdentifier),
			autoguard.guards.Reference.of(() => ASN1OctetString)
		)
	}, {})
);

export type EncryptedPrivateKeyInfo = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ASN1Sequence>,
	autoguard.guards.Object<{
		"data": autoguard.guards.Tuple<[
			autoguard.guards.Reference<AlgorithmIdentifier>,
			autoguard.guards.Reference<ASN1OctetString>
		]>
	}, {}>
]>;

export namespace Autoguard {
	export const Guards = {
		"ASN1Integer": autoguard.guards.Reference.of(() => ASN1Integer),
		"ASN1Node": autoguard.guards.Reference.of(() => ASN1Node),
		"ASN1Null": autoguard.guards.Reference.of(() => ASN1Null),
		"ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => ASN1ObjectIdentifier),
		"ASN1OctetString": autoguard.guards.Reference.of(() => ASN1OctetString),
		"ASN1Sequence": autoguard.guards.Reference.of(() => ASN1Sequence),
		"AlgorithmIdentifier": autoguard.guards.Reference.of(() => AlgorithmIdentifier),
		"AES256CBCAlgorithmIdentifier": autoguard.guards.Reference.of(() => AES256CBCAlgorithmIdentifier),
		"HMACSHA256AlgorithmIdentifier": autoguard.guards.Reference.of(() => HMACSHA256AlgorithmIdentifier),
		"PBKDF2AlgorithmIdentifier1": autoguard.guards.Reference.of(() => PBKDF2AlgorithmIdentifier1),
		"PBKDF2AlgorithmIdentifier2": autoguard.guards.Reference.of(() => PBKDF2AlgorithmIdentifier2),
		"PBES2AlgorithmIdentifier": autoguard.guards.Reference.of(() => PBES2AlgorithmIdentifier),
		"EncryptedPrivateKeyInfo": autoguard.guards.Reference.of(() => EncryptedPrivateKeyInfo)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};