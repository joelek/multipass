import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare enum KeyType {
    "EC" = 0,
    "RSA" = 1,
    "oct" = 2
}
export declare namespace KeyType {
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"EC">,
        autoguard.guards.StringLiteral<"RSA">,
        autoguard.guards.StringLiteral<"oct">
    ]>;
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
        autoguard.guards.NumberLiteral<0>,
        autoguard.guards.NumberLiteral<1>,
        autoguard.guards.NumberLiteral<2>
    ]>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare enum Curve {
    "P-256" = 0,
    "P-384" = 1,
    "P-521" = 2
}
export declare namespace Curve {
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"P-256">,
        autoguard.guards.StringLiteral<"P-384">,
        autoguard.guards.StringLiteral<"P-521">
    ]>;
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
        autoguard.guards.NumberLiteral<0>,
        autoguard.guards.NumberLiteral<1>,
        autoguard.guards.NumberLiteral<2>
    ]>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare const Key: autoguard.serialization.MessageGuard<Key>;
export type Key = autoguard.guards.Object<{
    "kty": autoguard.guards.Reference<KeyType.Key>;
}, {}>;
export declare const AssymetricKey: autoguard.serialization.MessageGuard<AssymetricKey>;
export type AssymetricKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Key>,
    autoguard.guards.Object<{
        "kty": autoguard.guards.Union<[
            autoguard.guards.StringLiteral<"EC">,
            autoguard.guards.StringLiteral<"RSA">
        ]>;
    }, {}>
]>;
export declare const ECKey: autoguard.serialization.MessageGuard<ECKey>;
export type ECKey = autoguard.guards.Object<{
    "kty": autoguard.guards.StringLiteral<"EC">;
}, {}>;
export declare const ECPublicKey: autoguard.serialization.MessageGuard<ECPublicKey>;
export type ECPublicKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ECKey>,
    autoguard.guards.Object<{
        "crv": autoguard.guards.Reference<Curve.Key>;
        "x": autoguard.guards.String;
        "y": autoguard.guards.String;
    }, {}>
]>;
export declare const ECPrivateKey: autoguard.serialization.MessageGuard<ECPrivateKey>;
export type ECPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ECPublicKey>,
    autoguard.guards.Object<{
        "d": autoguard.guards.String;
    }, {}>
]>;
export declare const RSAKey: autoguard.serialization.MessageGuard<RSAKey>;
export type RSAKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AssymetricKey>,
    autoguard.guards.Object<{
        "kty": autoguard.guards.StringLiteral<"RSA">;
    }, {}>
]>;
export declare const RSAPublicKey: autoguard.serialization.MessageGuard<RSAPublicKey>;
export type RSAPublicKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<RSAKey>,
    autoguard.guards.Object<{
        "n": autoguard.guards.String;
        "e": autoguard.guards.String;
    }, {}>
]>;
export declare const RSAPrivateKey: autoguard.serialization.MessageGuard<RSAPrivateKey>;
export type RSAPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<RSAPublicKey>,
    autoguard.guards.Object<{
        "d": autoguard.guards.String;
    }, {
        "p": autoguard.guards.String;
        "q": autoguard.guards.String;
        "dp": autoguard.guards.String;
        "dq": autoguard.guards.String;
        "qi": autoguard.guards.String;
        "oth": autoguard.guards.Array<autoguard.guards.Object<{
            "r": autoguard.guards.String;
            "d": autoguard.guards.String;
            "t": autoguard.guards.String;
        }, {}>>;
    }>
]>;
export declare const PublicKey: autoguard.serialization.MessageGuard<PublicKey>;
export type PublicKey = autoguard.guards.Union<[
    autoguard.guards.Reference<ECPublicKey>,
    autoguard.guards.Reference<RSAPublicKey>
]>;
export declare const PrivateKey: autoguard.serialization.MessageGuard<PrivateKey>;
export type PrivateKey = autoguard.guards.Union<[
    autoguard.guards.Reference<ECPrivateKey>,
    autoguard.guards.Reference<RSAPrivateKey>
]>;
export declare namespace Autoguard {
    const Guards: {
        Key: autoguard.guards.ReferenceGuard<{
            kty: "EC" | "RSA" | "oct";
        }>;
        AssymetricKey: autoguard.guards.ReferenceGuard<{
            kty: "EC" | "RSA";
        }>;
        ECKey: autoguard.guards.ReferenceGuard<{
            kty: "EC";
        }>;
        ECPublicKey: autoguard.guards.ReferenceGuard<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
        }>;
        ECPrivateKey: autoguard.guards.ReferenceGuard<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
            d: string;
        }>;
        RSAKey: autoguard.guards.ReferenceGuard<{
            kty: "RSA";
        }>;
        RSAPublicKey: autoguard.guards.ReferenceGuard<{
            kty: "RSA";
            n: string;
            e: string;
        }>;
        RSAPrivateKey: autoguard.guards.ReferenceGuard<{
            kty: "RSA";
            n: string;
            e: string;
            d: string;
            p?: string | undefined;
            q?: string | undefined;
            dp?: string | undefined;
            dq?: string | undefined;
            qi?: string | undefined;
            oth?: autoguard.guards.Array<{
                r: string;
                d: string;
                t: string;
            }> | undefined;
        }>;
        PublicKey: autoguard.guards.ReferenceGuard<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
        } | {
            kty: "RSA";
            n: string;
            e: string;
        }>;
        PrivateKey: autoguard.guards.ReferenceGuard<{
            kty: "EC";
            crv: "P-256" | "P-384" | "P-521";
            x: string;
            y: string;
            d: string;
        } | {
            kty: "RSA";
            n: string;
            e: string;
            d: string;
            p?: string | undefined;
            q?: string | undefined;
            dp?: string | undefined;
            dq?: string | undefined;
            qi?: string | undefined;
            oth?: autoguard.guards.Array<{
                r: string;
                d: string;
                t: string;
            }> | undefined;
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
