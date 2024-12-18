// This file was auto-generated by @joelek/autoguard. Edit at own risk.

import * as autoguard from "@joelek/autoguard/dist/lib-shared";

export const ProviderDynu: autoguard.serialization.MessageGuard<ProviderDynu> = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("dynu"),
	"key": autoguard.guards.String
}, {});

export type ProviderDynu = autoguard.guards.Object<{
	"type": autoguard.guards.StringLiteral<"dynu">,
	"key": autoguard.guards.String
}, {}>;

export const ProviderGlesys: autoguard.serialization.MessageGuard<ProviderGlesys> = autoguard.guards.Object.of({
	"type": autoguard.guards.StringLiteral.of("glesys"),
	"account": autoguard.guards.String,
	"key": autoguard.guards.String
}, {});

export type ProviderGlesys = autoguard.guards.Object<{
	"type": autoguard.guards.StringLiteral<"glesys">,
	"account": autoguard.guards.String,
	"key": autoguard.guards.String
}, {}>;

export const Provider: autoguard.serialization.MessageGuard<Provider> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => ProviderDynu),
	autoguard.guards.Reference.of(() => ProviderGlesys)
);

export type Provider = autoguard.guards.Union<[
	autoguard.guards.Reference<ProviderDynu>,
	autoguard.guards.Reference<ProviderGlesys>
]>;

export const Certificate: autoguard.serialization.MessageGuard<Certificate> = autoguard.guards.Object.of({
	"hostnames": autoguard.guards.Array.of(autoguard.guards.String)
}, {
	"root": autoguard.guards.String,
	"account_key": autoguard.guards.String,
	"account_pass": autoguard.guards.String,
	"certificate_key": autoguard.guards.String,
	"certificate_pass": autoguard.guards.String,
	"certificate": autoguard.guards.String
});

export type Certificate = autoguard.guards.Object<{
	"hostnames": autoguard.guards.Array<autoguard.guards.String>
}, {
	"root": autoguard.guards.String,
	"account_key": autoguard.guards.String,
	"account_pass": autoguard.guards.String,
	"certificate_key": autoguard.guards.String,
	"certificate_pass": autoguard.guards.String,
	"certificate": autoguard.guards.String
}>;

export const Options: autoguard.serialization.MessageGuard<Options> = autoguard.guards.Object.of({
	"providers": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Provider)),
	"certificates": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Certificate))
}, {
	"acme": autoguard.guards.String,
	"monitor": autoguard.guards.Boolean
});

export type Options = autoguard.guards.Object<{
	"providers": autoguard.guards.Array<autoguard.guards.Reference<Provider>>,
	"certificates": autoguard.guards.Array<autoguard.guards.Reference<Certificate>>
}, {
	"acme": autoguard.guards.String,
	"monitor": autoguard.guards.Boolean
}>;

export namespace Autoguard {
	export const Guards = {
		"ProviderDynu": autoguard.guards.Reference.of(() => ProviderDynu),
		"ProviderGlesys": autoguard.guards.Reference.of(() => ProviderGlesys),
		"Provider": autoguard.guards.Reference.of(() => Provider),
		"Certificate": autoguard.guards.Reference.of(() => Certificate),
		"Options": autoguard.guards.Reference.of(() => Options)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
