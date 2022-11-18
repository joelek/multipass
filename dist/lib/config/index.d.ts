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
export declare const Filenames: autoguard.serialization.MessageGuard<Filenames>;
export declare type Filenames = autoguard.guards.Object<{}, {
    "account_key": autoguard.guards.String;
    "certificate_key": autoguard.guards.String;
    "certificate": autoguard.guards.String;
}>;
export declare const Passphrases: autoguard.serialization.MessageGuard<Passphrases>;
export declare type Passphrases = autoguard.guards.Object<{}, {
    "account_pass": autoguard.guards.String;
    "certificate_pass": autoguard.guards.String;
}>;
export declare const Options: autoguard.serialization.MessageGuard<Options>;
export declare type Options = autoguard.guards.Object<{
    "providers": autoguard.guards.Array<autoguard.guards.Reference<Provider>>;
    "certificates": autoguard.guards.Array<autoguard.guards.Reference<Certificate>>;
}, {
    "acme": autoguard.guards.String;
    "monitor": autoguard.guards.Boolean;
    "filenames": autoguard.guards.Reference<Filenames>;
    "passphrases": autoguard.guards.Reference<Passphrases>;
}>;
export declare namespace Autoguard {
    const Guards: {
        ProviderDynu: autoguard.guards.ReferenceGuard<{
            type: "dynu";
            key: string;
        }>;
        ProviderGlesys: autoguard.guards.ReferenceGuard<{
            type: "glesys";
            account: string;
            key: string;
        }>;
        Provider: autoguard.guards.ReferenceGuard<{
            type: "dynu";
            key: string;
        } | {
            type: "glesys";
            account: string;
            key: string;
        }>;
        Certificate: autoguard.guards.ReferenceGuard<{
            hostnames: autoguard.guards.Array<string>;
            root?: string | undefined;
        }>;
        Filenames: autoguard.guards.ReferenceGuard<{
            account_key?: string | undefined;
            certificate_key?: string | undefined;
            certificate?: string | undefined;
        }>;
        Passphrases: autoguard.guards.ReferenceGuard<{
            account_pass?: string | undefined;
            certificate_pass?: string | undefined;
        }>;
        Options: autoguard.guards.ReferenceGuard<{
            providers: autoguard.guards.Array<{
                type: "dynu";
                key: string;
            } | {
                type: "glesys";
                account: string;
                key: string;
            }>;
            certificates: autoguard.guards.Array<{
                hostnames: autoguard.guards.Array<string>;
                root?: string | undefined;
            }>;
            acme?: string | undefined;
            monitor?: boolean | undefined;
            filenames?: {
                account_key?: string | undefined;
                certificate_key?: string | undefined;
                certificate?: string | undefined;
            } | undefined;
            passphrases?: {
                account_pass?: string | undefined;
                certificate_pass?: string | undefined;
            } | undefined;
        }>;
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
