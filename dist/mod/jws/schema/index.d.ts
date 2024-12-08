import * as autoguard from "@joelek/autoguard/dist/lib-shared";
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
    const Entries: readonly [{
        readonly key: "HS256";
        readonly value: 0;
    }, {
        readonly key: "HS384";
        readonly value: 1;
    }, {
        readonly key: "HS512";
        readonly value: 2;
    }, {
        readonly key: "RS256";
        readonly value: 3;
    }, {
        readonly key: "RS384";
        readonly value: 4;
    }, {
        readonly key: "RS512";
        readonly value: 5;
    }, {
        readonly key: "ES256";
        readonly value: 6;
    }, {
        readonly key: "ES384";
        readonly value: 7;
    }, {
        readonly key: "ES512";
        readonly value: 8;
    }, {
        readonly key: "PS256";
        readonly value: 9;
    }, {
        readonly key: "PS384";
        readonly value: 10;
    }, {
        readonly key: "PS512";
        readonly value: 11;
    }];
    const Keys: readonly ["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"];
    const Values: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const KeyToValueMap: {
        readonly HS256: 0;
        readonly HS384: 1;
        readonly HS512: 2;
        readonly RS256: 3;
        readonly RS384: 4;
        readonly RS512: 5;
        readonly ES256: 6;
        readonly ES384: 7;
        readonly ES512: 8;
        readonly PS256: 9;
        readonly PS384: 10;
        readonly PS512: 11;
    };
    const ValueToKeyMap: {
        readonly 0: "HS256";
        readonly 1: "HS384";
        readonly 2: "HS512";
        readonly 3: "RS256";
        readonly 4: "RS384";
        readonly 5: "RS512";
        readonly 6: "ES256";
        readonly 7: "ES384";
        readonly 8: "ES512";
        readonly 9: "PS256";
        readonly 10: "PS384";
        readonly 11: "PS512";
    };
    type Key = typeof Keys[number];
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Value = typeof Values[number];
    const Value: autoguard.serialization.MessageGuard<Value>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare const Protected: autoguard.serialization.MessageGuard<Protected>;
export type Protected = autoguard.guards.Object<{
    "alg": autoguard.guards.Reference<SignatureAlgorithm.Key>;
}, {}>;
export declare const Body: autoguard.serialization.MessageGuard<Body>;
export type Body = autoguard.guards.Object<{
    "protected": autoguard.guards.String;
    "payload": autoguard.guards.String;
    "signature": autoguard.guards.String;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Protected: autoguard.guards.ReferenceGuard<{
            alg: "ES256" | "ES384" | "ES512" | "RS256" | "RS384" | "RS512" | "HS256" | "HS384" | "HS512" | "PS256" | "PS384" | "PS512";
        }>;
        Body: autoguard.guards.ReferenceGuard<{
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
