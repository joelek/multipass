// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export enum SignatureAlgorithm {
	"HS256" = 0,
	"HS384" = 1,
	"HS512" = 2,
	"RS256" = 3,
	"RS384" = 4,
	"RS512" = 5,
	"ES256" = 6,
	"ES384" = 7,
	"ES512" = 8,
	"PS256" = 9,
	"PS384" = 10,
	"PS512" = 11
};

export namespace SignatureAlgorithm {
	export const Key: autoguard.serialization.MessageGuard<Key> = autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("HS256"),
		autoguard.guards.StringLiteral.of("HS384"),
		autoguard.guards.StringLiteral.of("HS512"),
		autoguard.guards.StringLiteral.of("RS256"),
		autoguard.guards.StringLiteral.of("RS384"),
		autoguard.guards.StringLiteral.of("RS512"),
		autoguard.guards.StringLiteral.of("ES256"),
		autoguard.guards.StringLiteral.of("ES384"),
		autoguard.guards.StringLiteral.of("ES512"),
		autoguard.guards.StringLiteral.of("PS256"),
		autoguard.guards.StringLiteral.of("PS384"),
		autoguard.guards.StringLiteral.of("PS512")
	);

	export type Key = autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"HS256">,
		autoguard.guards.StringLiteral<"HS384">,
		autoguard.guards.StringLiteral<"HS512">,
		autoguard.guards.StringLiteral<"RS256">,
		autoguard.guards.StringLiteral<"RS384">,
		autoguard.guards.StringLiteral<"RS512">,
		autoguard.guards.StringLiteral<"ES256">,
		autoguard.guards.StringLiteral<"ES384">,
		autoguard.guards.StringLiteral<"ES512">,
		autoguard.guards.StringLiteral<"PS256">,
		autoguard.guards.StringLiteral<"PS384">,
		autoguard.guards.StringLiteral<"PS512">
	]>;

	export const Value: autoguard.serialization.MessageGuard<Value> = autoguard.guards.Union.of(
		autoguard.guards.NumberLiteral.of(0),
		autoguard.guards.NumberLiteral.of(1),
		autoguard.guards.NumberLiteral.of(2),
		autoguard.guards.NumberLiteral.of(3),
		autoguard.guards.NumberLiteral.of(4),
		autoguard.guards.NumberLiteral.of(5),
		autoguard.guards.NumberLiteral.of(6),
		autoguard.guards.NumberLiteral.of(7),
		autoguard.guards.NumberLiteral.of(8),
		autoguard.guards.NumberLiteral.of(9),
		autoguard.guards.NumberLiteral.of(10),
		autoguard.guards.NumberLiteral.of(11)
	);

	export type Value = autoguard.guards.Union<[
		autoguard.guards.NumberLiteral<0>,
		autoguard.guards.NumberLiteral<1>,
		autoguard.guards.NumberLiteral<2>,
		autoguard.guards.NumberLiteral<3>,
		autoguard.guards.NumberLiteral<4>,
		autoguard.guards.NumberLiteral<5>,
		autoguard.guards.NumberLiteral<6>,
		autoguard.guards.NumberLiteral<7>,
		autoguard.guards.NumberLiteral<8>,
		autoguard.guards.NumberLiteral<9>,
		autoguard.guards.NumberLiteral<10>,
		autoguard.guards.NumberLiteral<11>
	]>;

	export function keyFromValue(value: number): Key {
		return Key.as(SignatureAlgorithm[Value.as(value)]);
	};

	export function valueFromKey(key: string): Value {
		return Value.as(SignatureAlgorithm[Key.as(key)]);
	};
};

export const Protected: autoguard.serialization.MessageGuard<Protected> = autoguard.guards.Object.of({
	"alg": autoguard.guards.Reference.of(() => SignatureAlgorithm.Key)
}, {});

export type Protected = autoguard.guards.Object<{
	"alg": autoguard.guards.Reference<SignatureAlgorithm.Key>
}, {}>;

export const Body: autoguard.serialization.MessageGuard<Body> = autoguard.guards.Object.of({
	"protected": autoguard.guards.String,
	"payload": autoguard.guards.String,
	"signature": autoguard.guards.String
}, {});

export type Body = autoguard.guards.Object<{
	"protected": autoguard.guards.String,
	"payload": autoguard.guards.String,
	"signature": autoguard.guards.String
}, {}>;

export namespace Autoguard {
	export const Guards = {
		"Protected": autoguard.guards.Reference.of(() => Protected),
		"Body": autoguard.guards.Reference.of(() => Body)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
