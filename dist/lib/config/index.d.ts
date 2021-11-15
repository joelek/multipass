import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const ProviderDynu: autoguard.serialization.MessageGuard<ProviderDynu>;
export declare type ProviderDynu = autoguard.guards.Object<{
    "type": autoguard.guards.StringLiteral<"dynu">;
    "key": autoguard.guards.String;
}, {}>;
export declare const ProviderGlesys: autoguard.serialization.MessageGuard<ProviderGlesys>;
export declare type ProviderGlesys = autoguard.guards.Object<{
    "type": autoguard.guards.StringLiteral<"glesys">;
    "account": autoguard.guards.String;
    "key": autoguard.guards.String;
}, {}>;
export declare const Provider: autoguard.serialization.MessageGuard<Provider>;
export declare type Provider = autoguard.guards.Union<[
    autoguard.guards.Reference<ProviderDynu>,
    autoguard.guards.Reference<ProviderGlesys>
]>;
export declare const Certificate: autoguard.serialization.MessageGuard<Certificate>;
export declare type Certificate = autoguard.guards.Object<{
    "hostnames": autoguard.guards.Array<autoguard.guards.String>;
}, {
    "root": autoguard.guards.String;
}>;
export declare const Options: autoguard.serialization.MessageGuard<Options>;
export declare type Options = autoguard.guards.Object<{
    "providers": autoguard.guards.Array<autoguard.guards.Reference<Provider>>;
    "certificates": autoguard.guards.Array<autoguard.guards.Reference<Certificate>>;
}, {
    "acme": autoguard.guards.String;
    "monitor": autoguard.guards.Boolean;
}>;
export declare namespace Autoguard {
    const Guards: {
        ProviderDynu: autoguard.guards.ReferenceGuard<ProviderDynu>;
        ProviderGlesys: autoguard.guards.ReferenceGuard<ProviderGlesys>;
        Provider: autoguard.guards.ReferenceGuard<ProviderDynu | ProviderGlesys>;
        Certificate: autoguard.guards.ReferenceGuard<Certificate>;
        Options: autoguard.guards.ReferenceGuard<Options>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {};
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {};
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
