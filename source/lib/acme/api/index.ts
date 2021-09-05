// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export const Account: autoguard.serialization.MessageGuard<Account> = autoguard.guards.Object.of({
	"orders": autoguard.guards.String,
	"status": autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("valid"),
		autoguard.guards.StringLiteral.of("deactivated"),
		autoguard.guards.StringLiteral.of("revoked")
	)
}, {
	"contact": autoguard.guards.Array.of(autoguard.guards.String),
	"externalAccountBinding": autoguard.guards.Object.of({}, {}),
	"termsOfServiceAgreed": autoguard.guards.Boolean
});

export type Account = autoguard.guards.Object<{
	"orders": autoguard.guards.String,
	"status": autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"valid">,
		autoguard.guards.StringLiteral<"deactivated">,
		autoguard.guards.StringLiteral<"revoked">
	]>
}, {
	"contact": autoguard.guards.Array<autoguard.guards.String>,
	"externalAccountBinding": autoguard.guards.Object<{}, {}>,
	"termsOfServiceAgreed": autoguard.guards.Boolean
}>;

export const Authorization: autoguard.serialization.MessageGuard<Authorization> = autoguard.guards.Object.of({
	"identifier": autoguard.guards.Reference.of(() => Identifier),
	"status": autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("pending"),
		autoguard.guards.StringLiteral.of("valid"),
		autoguard.guards.StringLiteral.of("invalid"),
		autoguard.guards.StringLiteral.of("deactivated"),
		autoguard.guards.StringLiteral.of("expired"),
		autoguard.guards.StringLiteral.of("revoked")
	),
	"challenges": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Challenge))
}, {
	"expires": autoguard.guards.String,
	"wildcard": autoguard.guards.Boolean
});

export type Authorization = autoguard.guards.Object<{
	"identifier": autoguard.guards.Reference<Identifier>,
	"status": autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"pending">,
		autoguard.guards.StringLiteral<"valid">,
		autoguard.guards.StringLiteral<"invalid">,
		autoguard.guards.StringLiteral<"deactivated">,
		autoguard.guards.StringLiteral<"expired">,
		autoguard.guards.StringLiteral<"revoked">
	]>,
	"challenges": autoguard.guards.Array<autoguard.guards.Reference<Challenge>>
}, {
	"expires": autoguard.guards.String,
	"wildcard": autoguard.guards.Boolean
}>;

export const Challenge: autoguard.serialization.MessageGuard<Challenge> = autoguard.guards.Object.of({
	"status": autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("pending"),
		autoguard.guards.StringLiteral.of("processing"),
		autoguard.guards.StringLiteral.of("valid"),
		autoguard.guards.StringLiteral.of("invalid")
	),
	"type": autoguard.guards.String,
	"url": autoguard.guards.String
}, {
	"error": autoguard.guards.Object.of({}, {}),
	"validated": autoguard.guards.String
});

export type Challenge = autoguard.guards.Object<{
	"status": autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"pending">,
		autoguard.guards.StringLiteral<"processing">,
		autoguard.guards.StringLiteral<"valid">,
		autoguard.guards.StringLiteral<"invalid">
	]>,
	"type": autoguard.guards.String,
	"url": autoguard.guards.String
}, {
	"error": autoguard.guards.Object<{}, {}>,
	"validated": autoguard.guards.String
}>;

export const Directory: autoguard.serialization.MessageGuard<Directory> = autoguard.guards.Object.of({
	"keyChange": autoguard.guards.String,
	"newAccount": autoguard.guards.String,
	"newNonce": autoguard.guards.String,
	"newOrder": autoguard.guards.String,
	"revokeCert": autoguard.guards.String
}, {
	"meta": autoguard.guards.Object.of({}, {
		"caaIdentities": autoguard.guards.Array.of(autoguard.guards.String),
		"externalAccountRequired": autoguard.guards.Boolean,
		"termsOfService": autoguard.guards.String,
		"website": autoguard.guards.String
	}),
	"newAuthz": autoguard.guards.String
});

export type Directory = autoguard.guards.Object<{
	"keyChange": autoguard.guards.String,
	"newAccount": autoguard.guards.String,
	"newNonce": autoguard.guards.String,
	"newOrder": autoguard.guards.String,
	"revokeCert": autoguard.guards.String
}, {
	"meta": autoguard.guards.Object<{}, {
		"caaIdentities": autoguard.guards.Array<autoguard.guards.String>,
		"externalAccountRequired": autoguard.guards.Boolean,
		"termsOfService": autoguard.guards.String,
		"website": autoguard.guards.String
	}>,
	"newAuthz": autoguard.guards.String
}>;

export const Identifier: autoguard.serialization.MessageGuard<Identifier> = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("dns"),
	"value": autoguard.guards.String
}, {});

export type Identifier = autoguard.guards.Object<{
	"type": autoguard.guards.StringLiteral<"dns">,
	"value": autoguard.guards.String
}, {}>;

export const Order: autoguard.serialization.MessageGuard<Order> = autoguard.guards.Object.of({
	"authorizations": autoguard.guards.Array.of(autoguard.guards.String),
	"finalize": autoguard.guards.String,
	"identifiers": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Identifier)),
	"status": autoguard.guards.Union.of(
		autoguard.guards.StringLiteral.of("pending"),
		autoguard.guards.StringLiteral.of("ready"),
		autoguard.guards.StringLiteral.of("processing"),
		autoguard.guards.StringLiteral.of("valid"),
		autoguard.guards.StringLiteral.of("invalid")
	)
}, {
	"certificate": autoguard.guards.String,
	"error": autoguard.guards.Object.of({}, {}),
	"expires": autoguard.guards.String,
	"notBefore": autoguard.guards.String,
	"notAfter": autoguard.guards.String
});

export type Order = autoguard.guards.Object<{
	"authorizations": autoguard.guards.Array<autoguard.guards.String>,
	"finalize": autoguard.guards.String,
	"identifiers": autoguard.guards.Array<autoguard.guards.Reference<Identifier>>,
	"status": autoguard.guards.Union<[
		autoguard.guards.StringLiteral<"pending">,
		autoguard.guards.StringLiteral<"ready">,
		autoguard.guards.StringLiteral<"processing">,
		autoguard.guards.StringLiteral<"valid">,
		autoguard.guards.StringLiteral<"invalid">
	]>
}, {
	"certificate": autoguard.guards.String,
	"error": autoguard.guards.Object<{}, {}>,
	"expires": autoguard.guards.String,
	"notBefore": autoguard.guards.String,
	"notAfter": autoguard.guards.String
}>;

export namespace Autoguard {
	export const Guards = {
		"Account": autoguard.guards.Reference.of(() => Account),
		"Authorization": autoguard.guards.Reference.of(() => Authorization),
		"Challenge": autoguard.guards.Reference.of(() => Challenge),
		"Directory": autoguard.guards.Reference.of(() => Directory),
		"Identifier": autoguard.guards.Reference.of(() => Identifier),
		"Order": autoguard.guards.Reference.of(() => Order)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {
		"getDirectory": autoguard.guards.Object.of({}, {
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {
					"path": autoguard.guards.Array.of(autoguard.guards.String)
				}),
				autoguard.api.Options
			),
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			),
			"payload": autoguard.api.Binary
		}),
		"newNonce": autoguard.guards.Object.of({}, {
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {
					"path": autoguard.guards.Array.of(autoguard.guards.String)
				}),
				autoguard.api.Options
			),
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			),
			"payload": autoguard.api.Binary
		})
	};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {
		"getDirectory": autoguard.guards.Object.of({
			"payload": autoguard.guards.Reference.of(() => Directory)
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"newNonce": autoguard.guards.Object.of({
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({
					"replay-nonce": autoguard.guards.String
				}, {}),
				autoguard.api.Headers
			)
		}, {
			"status": autoguard.guards.Number,
			"payload": autoguard.api.Binary
		})
	};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
