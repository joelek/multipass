import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { AssymetricKey } from "../../jwk";
import { Body } from "../../jws";
export declare const Account: autoguard.serialization.MessageGuard<Account>;
export declare type Account = autoguard.guards.Object<{
    "status": autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"valid">,
        autoguard.guards.StringLiteral<"deactivated">,
        autoguard.guards.StringLiteral<"revoked">
    ]>;
}, {
    "contact": autoguard.guards.Array<autoguard.guards.String>;
    "externalAccountBinding": autoguard.guards.Object<{}, {}>;
    "orders": autoguard.guards.String;
    "termsOfServiceAgreed": autoguard.guards.Boolean;
}>;
export declare const Authorization: autoguard.serialization.MessageGuard<Authorization>;
export declare type Authorization = autoguard.guards.Object<{
    "identifier": autoguard.guards.Reference<Identifier>;
    "status": autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"pending">,
        autoguard.guards.StringLiteral<"valid">,
        autoguard.guards.StringLiteral<"invalid">,
        autoguard.guards.StringLiteral<"deactivated">,
        autoguard.guards.StringLiteral<"expired">,
        autoguard.guards.StringLiteral<"revoked">
    ]>;
    "challenges": autoguard.guards.Array<autoguard.guards.Reference<Challenge>>;
}, {
    "expires": autoguard.guards.String;
    "wildcard": autoguard.guards.Boolean;
}>;
export declare const Challenge: autoguard.serialization.MessageGuard<Challenge>;
export declare type Challenge = autoguard.guards.Object<{
    "status": autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"pending">,
        autoguard.guards.StringLiteral<"processing">,
        autoguard.guards.StringLiteral<"valid">,
        autoguard.guards.StringLiteral<"invalid">
    ]>;
    "type": autoguard.guards.String;
    "url": autoguard.guards.String;
}, {
    "error": autoguard.guards.Object<{}, {}>;
    "validated": autoguard.guards.String;
}>;
export declare const ChallengeHTTP01: autoguard.serialization.MessageGuard<ChallengeHTTP01>;
export declare type ChallengeHTTP01 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Challenge>,
    autoguard.guards.Object<{
        "type": autoguard.guards.StringLiteral<"http-01">;
        "token": autoguard.guards.String;
    }, {}>
]>;
export declare const ChallengeDNS01: autoguard.serialization.MessageGuard<ChallengeDNS01>;
export declare type ChallengeDNS01 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Challenge>,
    autoguard.guards.Object<{
        "type": autoguard.guards.StringLiteral<"dns-01">;
        "token": autoguard.guards.String;
    }, {}>
]>;
export declare const ChallengeTLSALPN01: autoguard.serialization.MessageGuard<ChallengeTLSALPN01>;
export declare type ChallengeTLSALPN01 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Challenge>,
    autoguard.guards.Object<{
        "type": autoguard.guards.StringLiteral<"tls-alpn-01">;
        "token": autoguard.guards.String;
    }, {}>
]>;
export declare const Directory: autoguard.serialization.MessageGuard<Directory>;
export declare type Directory = autoguard.guards.Object<{
    "keyChange": autoguard.guards.String;
    "newAccount": autoguard.guards.String;
    "newNonce": autoguard.guards.String;
    "newOrder": autoguard.guards.String;
    "revokeCert": autoguard.guards.String;
}, {
    "meta": autoguard.guards.Object<{}, {
        "caaIdentities": autoguard.guards.Array<autoguard.guards.String>;
        "externalAccountRequired": autoguard.guards.Boolean;
        "termsOfService": autoguard.guards.String;
        "website": autoguard.guards.String;
    }>;
    "newAuthz": autoguard.guards.String;
}>;
export declare const Identifier: autoguard.serialization.MessageGuard<Identifier>;
export declare type Identifier = autoguard.guards.Object<{
    "type": autoguard.guards.StringLiteral<"dns">;
    "value": autoguard.guards.String;
}, {}>;
export declare const Order: autoguard.serialization.MessageGuard<Order>;
export declare type Order = autoguard.guards.Object<{
    "authorizations": autoguard.guards.Array<autoguard.guards.String>;
    "finalize": autoguard.guards.String;
    "identifiers": autoguard.guards.Array<autoguard.guards.Reference<Identifier>>;
    "status": autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"pending">,
        autoguard.guards.StringLiteral<"ready">,
        autoguard.guards.StringLiteral<"processing">,
        autoguard.guards.StringLiteral<"valid">,
        autoguard.guards.StringLiteral<"invalid">
    ]>;
}, {
    "certificate": autoguard.guards.String;
    "error": autoguard.guards.Object<{}, {}>;
    "expires": autoguard.guards.String;
    "notBefore": autoguard.guards.String;
    "notAfter": autoguard.guards.String;
}>;
export declare const Protected: autoguard.serialization.MessageGuard<Protected>;
export declare type Protected = autoguard.guards.Object<{
    "nonce": autoguard.guards.String;
    "url": autoguard.guards.String;
}, {}>;
export declare const ProtectedWithJWK: autoguard.serialization.MessageGuard<ProtectedWithJWK>;
export declare type ProtectedWithJWK = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Protected>,
    autoguard.guards.Object<{
        "jwk": autoguard.guards.Reference<AssymetricKey>;
    }, {}>
]>;
export declare const ProtectedWithKID: autoguard.serialization.MessageGuard<ProtectedWithKID>;
export declare type ProtectedWithKID = autoguard.guards.Intersection<[
    autoguard.guards.Reference<Protected>,
    autoguard.guards.Object<{
        "kid": autoguard.guards.String;
    }, {}>
]>;
export declare const CreateAccountPayload: autoguard.serialization.MessageGuard<CreateAccountPayload>;
export declare type CreateAccountPayload = autoguard.guards.Object<{}, {
    "contact": autoguard.guards.Array<autoguard.guards.String>;
    "termsOfServiceAgreed": autoguard.guards.Boolean;
    "onlyReturnExisting": autoguard.guards.Boolean;
    "externalAccountBinding": autoguard.guards.Object<{}, {}>;
}>;
export declare const CreateOrderPayload: autoguard.serialization.MessageGuard<CreateOrderPayload>;
export declare type CreateOrderPayload = autoguard.guards.Object<{
    "identifiers": autoguard.guards.Array<autoguard.guards.Reference<Identifier>>;
}, {
    "notBefore": autoguard.guards.String;
    "notAfter": autoguard.guards.String;
}>;
export declare const FinalizeOrderPayload: autoguard.serialization.MessageGuard<FinalizeOrderPayload>;
export declare type FinalizeOrderPayload = autoguard.guards.Object<{
    "csr": autoguard.guards.String;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Account: autoguard.guards.ReferenceGuard<Account>;
        Authorization: autoguard.guards.ReferenceGuard<Authorization>;
        Challenge: autoguard.guards.ReferenceGuard<Challenge>;
        ChallengeHTTP01: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            status: "valid" | "pending" | "invalid" | "processing";
            type: "http-01";
            url: string;
            error?: autoguard.guards.Object<{}, {}> | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        ChallengeDNS01: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            status: "valid" | "pending" | "invalid" | "processing";
            type: "dns-01";
            url: string;
            error?: autoguard.guards.Object<{}, {}> | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        ChallengeTLSALPN01: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            status: "valid" | "pending" | "invalid" | "processing";
            type: "tls-alpn-01";
            url: string;
            error?: autoguard.guards.Object<{}, {}> | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        Directory: autoguard.guards.ReferenceGuard<Directory>;
        Identifier: autoguard.guards.ReferenceGuard<Identifier>;
        Order: autoguard.guards.ReferenceGuard<Order>;
        Protected: autoguard.guards.ReferenceGuard<Protected>;
        ProtectedWithJWK: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            nonce: string;
            url: string;
            jwk: {
                [x: string]: any;
                kty: "EC" | "RSA";
            };
        }>;
        ProtectedWithKID: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            nonce: string;
            url: string;
            kid: string;
        }>;
        CreateAccountPayload: autoguard.guards.ReferenceGuard<CreateAccountPayload>;
        CreateOrderPayload: autoguard.guards.ReferenceGuard<CreateOrderPayload>;
        FinalizeOrderPayload: autoguard.guards.ReferenceGuard<FinalizeOrderPayload>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {
        downloadCertificate: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        finalizeChallenge: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        finalizeOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        getAccount: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        getAuthorization: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        getChallenge: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        getDirectory: autoguard.guards.ObjectGuard<import("@joelek/ts-stdlib/dist/lib/routing").MessageMap<unknown>, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
            headers: {
                [x: string]: any;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        getOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        newAccount: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
        newNonce: autoguard.guards.ObjectGuard<import("@joelek/ts-stdlib/dist/lib/routing").MessageMap<unknown>, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
            headers: {
                [x: string]: any;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        newOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "content-type": string;
            };
            payload: Body;
        }, {
            options: {
                [x: string]: any;
                path?: autoguard.guards.Array<string> | undefined;
            };
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        downloadCertificate: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
        }, {
            status: number;
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        finalizeChallenge: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Challenge;
        }, {
            status: number;
        }>;
        finalizeOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Order;
        }, {
            status: number;
        }>;
        getAccount: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Account;
        }, {
            status: number;
        }>;
        getAuthorization: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Authorization;
        }, {
            status: number;
        }>;
        getChallenge: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Challenge;
        }, {
            status: number;
        }>;
        getDirectory: autoguard.guards.ObjectGuard<{
            payload: Directory;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        getOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
            payload: Order;
        }, {
            status: number;
        }>;
        newAccount: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
                location: string;
            };
            payload: Account;
        }, {
            status: number;
        }>;
        newNonce: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
            };
        }, {
            status: number;
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        newOrder: autoguard.guards.ObjectGuard<{
            headers: {
                [x: string]: any;
                "replay-nonce": string;
                location: string;
            };
            payload: Order;
        }, {
            status: number;
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
