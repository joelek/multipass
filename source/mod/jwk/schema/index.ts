// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export enum KeyType {
	"EC" = 0,
	"RSA" = 1,
	"oct" = 2
};

export namespace KeyType {
	export const Key: autoguard.serialization.MessageGuard<Key> = autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("EC"),
		autoguard.guards.StringLiteral.of("RSA"),
		autoguard.guards.StringLiteral.of("oct")
	);

	export type Key = autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"EC">,
		autoguard.guards.StringLiteral<"RSA">,
		autoguard.guards.StringLiteral<"oct">
	]>;

	export const Value: autoguard.serialization.MessageGuard<Value> = autoguard.guards.Union.of(
		autoguard.guards.NumberLiteral.of(0),
		autoguard.guards.NumberLiteral.of(1),
		autoguard.guards.NumberLiteral.of(2)
	);

	export type Value = autoguard.guards.Union<[
		autoguard.guards.NumberLiteral<0>,
		autoguard.guards.NumberLiteral<1>,
		autoguard.guards.NumberLiteral<2>
	]>;

	export function keyFromValue(value: number): Key {
		return Key.as(KeyType[Value.as(value)]);
	};

	export function valueFromKey(key: string): Value {
		return Value.as(KeyType[Key.as(key)]);
	};
};

export enum Curve {
	"P-256" = 0,
	"P-384" = 1,
	"P-521" = 2
};

export namespace Curve {
	export const Key: autoguard.serialization.MessageGuard<Key> = autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("P-256"),
		autoguard.guards.StringLiteral.of("P-384"),
		autoguard.guards.StringLiteral.of("P-521")
	);

	export type Key = autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"P-256">,
		autoguard.guards.StringLiteral<"P-384">,
		autoguard.guards.StringLiteral<"P-521">
	]>;

	export const Value: autoguard.serialization.MessageGuard<Value> = autoguard.guards.Union.of(
		autoguard.guards.NumberLiteral.of(0),
		autoguard.guards.NumberLiteral.of(1),
		autoguard.guards.NumberLiteral.of(2)
	);

	export type Value = autoguard.guards.Union<[
		autoguard.guards.NumberLiteral<0>,
		autoguard.guards.NumberLiteral<1>,
		autoguard.guards.NumberLiteral<2>
	]>;

	export function keyFromValue(value: number): Key {
		return Key.as(Curve[Value.as(value)]);
	};

	export function valueFromKey(key: string): Value {
		return Value.as(Curve[Key.as(key)]);
	};
};

export const Key: autoguard.serialization.MessageGuard<Key> = autoguard.guards.Object.of({
	"kty": autoguard.guards.Reference.of(() => KeyType.Key)
}, {});

export type Key = autoguard.guards.Object<{
	"kty": autoguard.guards.Reference<KeyType.Key>
}, {}>;

export const AssymetricKey: autoguard.serialization.MessageGuard<AssymetricKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => Key),
	autoguard.guards.Object.of({
		"kty": autoguard.guards.Union.of(
			autoguard.guards.StringLiteral.of("EC"),
			autoguard.guards.StringLiteral.of("RSA")
		)
	}, {})
);

export type AssymetricKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<Key>,
	autoguard.guards.Object<{
		"kty": autoguard.guards.Union<[
			autoguard.guards.StringLiteral<"EC">,
			autoguard.guards.StringLiteral<"RSA">
		]>
	}, {}>
]>;

export const ECKey: autoguard.serialization.MessageGuard<ECKey> = autoguard.guards.Object.of({
	"kty": autoguard.guards.StringLiteral.of("EC")
}, {});

export type ECKey = autoguard.guards.Object<{
	"kty": autoguard.guards.StringLiteral<"EC">
}, {}>;

export const ECPublicKey: autoguard.serialization.MessageGuard<ECPublicKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ECKey),
	autoguard.guards.Object.of({
		"crv": autoguard.guards.Reference.of(() => Curve.Key),
		"x": autoguard.guards.String,
		"y": autoguard.guards.String
	}, {})
);

export type ECPublicKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ECKey>,
	autoguard.guards.Object<{
		"crv": autoguard.guards.Reference<Curve.Key>,
		"x": autoguard.guards.String,
		"y": autoguard.guards.String
	}, {}>
]>;

export const ECPrivateKey: autoguard.serialization.MessageGuard<ECPrivateKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => ECPublicKey),
	autoguard.guards.Object.of({
		"d": autoguard.guards.String
	}, {})
);

export type ECPrivateKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<ECPublicKey>,
	autoguard.guards.Object<{
		"d": autoguard.guards.String
	}, {}>
]>;

export const RSAKey: autoguard.serialization.MessageGuard<RSAKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AssymetricKey),
	autoguard.guards.Object.of({
		"kty": autoguard.guards.StringLiteral.of("RSA")
	}, {})
);

export type RSAKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<AssymetricKey>,
	autoguard.guards.Object<{
		"kty": autoguard.guards.StringLiteral<"RSA">
	}, {}>
]>;

export const RSAPublicKey: autoguard.serialization.MessageGuard<RSAPublicKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => RSAKey),
	autoguard.guards.Object.of({
		"n": autoguard.guards.String,
		"e": autoguard.guards.String
	}, {})
);

export type RSAPublicKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<RSAKey>,
	autoguard.guards.Object<{
		"n": autoguard.guards.String,
		"e": autoguard.guards.String
	}, {}>
]>;

export const RSAPrivateKey: autoguard.serialization.MessageGuard<RSAPrivateKey> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => RSAPublicKey),
	autoguard.guards.Object.of({
		"d": autoguard.guards.String
	}, {
		"p": autoguard.guards.String,
		"q": autoguard.guards.String,
		"dp": autoguard.guards.String,
		"dq": autoguard.guards.String,
		"qi": autoguard.guards.String,
		"oth": autoguard.guards.Array.of(autoguard.guards.Object.of({
			"r": autoguard.guards.String,
			"d": autoguard.guards.String,
			"t": autoguard.guards.String
		}, {}))
	})
);

export type RSAPrivateKey = autoguard.guards.Intersection<[
	autoguard.guards.Reference<RSAPublicKey>,
	autoguard.guards.Object<{
		"d": autoguard.guards.String
	}, {
		"p": autoguard.guards.String,
		"q": autoguard.guards.String,
		"dp": autoguard.guards.String,
		"dq": autoguard.guards.String,
		"qi": autoguard.guards.String,
		"oth": autoguard.guards.Array<autoguard.guards.Object<{
			"r": autoguard.guards.String,
			"d": autoguard.guards.String,
			"t": autoguard.guards.String
		}, {}>>
	}>
]>;

export const PublicKey: autoguard.serialization.MessageGuard<PublicKey> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => ECPublicKey),
	autoguard.guards.Reference.of(() => RSAPublicKey)
);

export type PublicKey = autoguard.guards.Union<[
	autoguard.guards.Reference<ECPublicKey>,
	autoguard.guards.Reference<RSAPublicKey>
]>;

export const PrivateKey: autoguard.serialization.MessageGuard<PrivateKey> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => ECPrivateKey),
	autoguard.guards.Reference.of(() => RSAPrivateKey)
);

export type PrivateKey = autoguard.guards.Union<[
	autoguard.guards.Reference<ECPrivateKey>,
	autoguard.guards.Reference<RSAPrivateKey>
]>;

export namespace Autoguard {
	export const Guards = {
		"Key": autoguard.guards.Reference.of(() => Key),
		"AssymetricKey": autoguard.guards.Reference.of(() => AssymetricKey),
		"ECKey": autoguard.guards.Reference.of(() => ECKey),
		"ECPublicKey": autoguard.guards.Reference.of(() => ECPublicKey),
		"ECPrivateKey": autoguard.guards.Reference.of(() => ECPrivateKey),
		"RSAKey": autoguard.guards.Reference.of(() => RSAKey),
		"RSAPublicKey": autoguard.guards.Reference.of(() => RSAPublicKey),
		"RSAPrivateKey": autoguard.guards.Reference.of(() => RSAPrivateKey),
		"PublicKey": autoguard.guards.Reference.of(() => PublicKey),
		"PrivateKey": autoguard.guards.Reference.of(() => PrivateKey)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};