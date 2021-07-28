// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export const AccountBase = autoguard.guards.Object.of({
	"contact": autoguard.guards.Union.of(
		autoguard.guards.Array.of(autoguard.guards.String),
		autoguard.guards.Undefined
	),
	"termsOfServiceAgreed": autoguard.guards.Union.of(
		autoguard.guards.Boolean,
		autoguard.guards.Undefined
	),
	"externalAccountBinding": autoguard.guards.Union.of(
		autoguard.guards.Object.of({}),
		autoguard.guards.Undefined
	)
});

export type AccountBase = ReturnType<typeof AccountBase["as"]>;

export const Account = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AccountBase),
	autoguard.guards.Object.of({
		"status": autoguard.guards.Union.of(
			autoguard.guards.StringLiteral.of("valid"),
			autoguard.guards.StringLiteral.of("deactivated"),
			autoguard.guards.StringLiteral.of("revoked")
		),
		"orders": autoguard.guards.String
	})
);

export type Account = ReturnType<typeof Account["as"]>;

export const NewAccountJWSPayload = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => AccountBase),
	autoguard.guards.Object.of({
		"onlyReturnExisting": autoguard.guards.Union.of(
			autoguard.guards.Boolean,
			autoguard.guards.Undefined
		)
	})
);

export type NewAccountJWSPayload = ReturnType<typeof NewAccountJWSPayload["as"]>;

export const GetDirectoryResponse = autoguard.guards.Object.of({
	"body": autoguard.guards.Object.of({
		"keyChange": autoguard.guards.String,
		"meta": autoguard.guards.Union.of(
			autoguard.guards.Object.of({
				"caaIdentities": autoguard.guards.Union.of(
					autoguard.guards.Array.of(autoguard.guards.String),
					autoguard.guards.Undefined
				),
				"externalAccountRequired": autoguard.guards.Union.of(
					autoguard.guards.Boolean,
					autoguard.guards.Undefined
				),
				"termsOfService": autoguard.guards.Union.of(
					autoguard.guards.String,
					autoguard.guards.Undefined
				),
				"website": autoguard.guards.Union.of(
					autoguard.guards.String,
					autoguard.guards.Undefined
				)
			}),
			autoguard.guards.Undefined
		),
		"newAccount": autoguard.guards.String,
		"newAuthz": autoguard.guards.Union.of(
			autoguard.guards.String,
			autoguard.guards.Undefined
		),
		"newNonce": autoguard.guards.String,
		"newOrder": autoguard.guards.String,
		"revokeCert": autoguard.guards.String
	})
});

export type GetDirectoryResponse = ReturnType<typeof GetDirectoryResponse["as"]>;

export const NewNonceResponse = autoguard.guards.Object.of({
	"status": autoguard.guards.NumberLiteral.of(200),
	"headers": autoguard.guards.Object.of({
		"Replay-Nonce": autoguard.guards.Tuple.of(
			autoguard.guards.String
		)
	})
});

export type NewNonceResponse = ReturnType<typeof NewNonceResponse["as"]>;

export const NewAccountResponse = autoguard.guards.Object.of({
	"status": autoguard.guards.NumberLiteral.of(201),
	"headers": autoguard.guards.Object.of({
		"Replay-Nonce": autoguard.guards.Tuple.of(
			autoguard.guards.String
		),
		"Location": autoguard.guards.Tuple.of(
			autoguard.guards.String
		)
	}),
	"body": autoguard.guards.Reference.of(() => Account)
});

export type NewAccountResponse = ReturnType<typeof NewAccountResponse["as"]>;

export namespace Autoguard {
	export const Guards = {
		"AccountBase": autoguard.guards.Reference.of(() => AccountBase),
		"Account": autoguard.guards.Reference.of(() => Account),
		"NewAccountJWSPayload": autoguard.guards.Reference.of(() => NewAccountJWSPayload),
		"GetDirectoryResponse": autoguard.guards.Reference.of(() => GetDirectoryResponse),
		"NewNonceResponse": autoguard.guards.Reference.of(() => NewNonceResponse),
		"NewAccountResponse": autoguard.guards.Reference.of(() => NewAccountResponse)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};