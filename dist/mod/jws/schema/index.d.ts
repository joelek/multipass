import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare enum SignatureAlgorithm {
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
}
export declare namespace SignatureAlgorithm {
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
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
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
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
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare const Protected: autoguard.serialization.MessageGuard<Protected>;
export declare type Protected = autoguard.guards.Object<{
    "alg": autoguard.guards.Reference<SignatureAlgorithm.Key>;
}, {}>;
export declare const Body: autoguard.serialization.MessageGuard<Body>;
export declare type Body = autoguard.guards.Object<{
    "protected": autoguard.guards.String;
    "payload": autoguard.guards.String;
    "signature": autoguard.guards.String;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Protected: autoguard.serialization.MessageGuard<{
            alg: "ES256" | "ES384" | "ES512" | "RS256" | "RS384" | "RS512" | "HS256" | "HS384" | "HS512" | "PS256" | "PS384" | "PS512";
        }>;
        Body: autoguard.serialization.MessageGuard<{
            protected: string;
            payload: string;
            signature: string;
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
