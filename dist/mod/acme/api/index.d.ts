import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { AssymetricKey } from "../../jwk";
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
        Account: autoguard.serialization.MessageGuard<{
            status: "valid" | "deactivated" | "revoked";
            contact?: autoguard.guards.Array<string> | undefined;
            externalAccountBinding?: {} | undefined;
            orders?: string | undefined;
            termsOfServiceAgreed?: boolean | undefined;
        }>;
        Authorization: autoguard.serialization.MessageGuard<{
            identifier: {
                type: "dns";
                value: string;
            };
            status: "valid" | "deactivated" | "revoked" | "pending" | "invalid" | "expired";
            challenges: autoguard.guards.Array<{
                status: "valid" | "pending" | "invalid" | "processing";
                type: string;
                url: string;
                error?: {} | undefined;
                validated?: string | undefined;
            }>;
            expires?: string | undefined;
            wildcard?: boolean | undefined;
        }>;
        Challenge: autoguard.serialization.MessageGuard<{
            status: "valid" | "pending" | "invalid" | "processing";
            type: string;
            url: string;
            error?: {} | undefined;
            validated?: string | undefined;
        }>;
        ChallengeHTTP01: autoguard.serialization.MessageGuard<{
            status: "valid" | "pending" | "invalid" | "processing";
            type: "http-01";
            url: string;
            error?: {} | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        ChallengeDNS01: autoguard.serialization.MessageGuard<{
            status: "valid" | "pending" | "invalid" | "processing";
            type: "dns-01";
            url: string;
            error?: {} | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        ChallengeTLSALPN01: autoguard.serialization.MessageGuard<{
            status: "valid" | "pending" | "invalid" | "processing";
            type: "tls-alpn-01";
            url: string;
            error?: {} | undefined;
            validated?: string | undefined;
            token: string;
        }>;
        Directory: autoguard.serialization.MessageGuard<{
            keyChange: string;
            newAccount: string;
            newNonce: string;
            newOrder: string;
            revokeCert: string;
            meta?: {
                caaIdentities?: autoguard.guards.Array<string> | undefined;
                externalAccountRequired?: boolean | undefined;
                termsOfService?: string | undefined;
                website?: string | undefined;
            } | undefined;
            newAuthz?: string | undefined;
        }>;
        Identifier: autoguard.serialization.MessageGuard<{
            type: "dns";
            value: string;
        }>;
        Order: autoguard.serialization.MessageGuard<{
            authorizations: autoguard.guards.Array<string>;
            finalize: string;
            identifiers: autoguard.guards.Array<{
                type: "dns";
                value: string;
            }>;
            status: "valid" | "pending" | "invalid" | "processing" | "ready";
            certificate?: string | undefined;
            error?: {} | undefined;
            expires?: string | undefined;
            notBefore?: string | undefined;
            notAfter?: string | undefined;
        }>;
        Protected: autoguard.serialization.MessageGuard<{
            nonce: string;
            url: string;
        }>;
        ProtectedWithJWK: autoguard.serialization.MessageGuard<{
            nonce: string;
            url: string;
            jwk: {
                kty: "EC" | "RSA";
            };
        }>;
        ProtectedWithKID: autoguard.serialization.MessageGuard<{
            nonce: string;
            url: string;
            kid: string;
        }>;
        CreateAccountPayload: autoguard.serialization.MessageGuard<{
            contact?: autoguard.guards.Array<string> | undefined;
            termsOfServiceAgreed?: boolean | undefined;
            onlyReturnExisting?: boolean | undefined;
            externalAccountBinding?: {} | undefined;
        }>;
        CreateOrderPayload: autoguard.serialization.MessageGuard<{
            identifiers: autoguard.guards.Array<{
                type: "dns";
                value: string;
            }>;
            notBefore?: string | undefined;
            notAfter?: string | undefined;
        }>;
        FinalizeOrderPayload: autoguard.serialization.MessageGuard<{
            csr: string;
        }>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {
        downloadCertificate: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        finalizeChallenge: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        finalizeOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        getAccount: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        getAuthorization: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        getChallenge: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        getDirectory: autoguard.serialization.MessageGuard<{
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        getOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        newAccount: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
        newNonce: autoguard.serialization.MessageGuard<{
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        newOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "content-type": string;
            };
            payload: {
                protected: string;
                payload: string;
                signature: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
                path?: autoguard.guards.Array<string> | undefined;
            } | undefined;
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        downloadCertificate: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            status?: number | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        finalizeChallenge: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                status: "valid" | "pending" | "invalid" | "processing";
                type: string;
                url: string;
                error?: {} | undefined;
                validated?: string | undefined;
            };
            status?: number | undefined;
        }>;
        finalizeOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                authorizations: autoguard.guards.Array<string>;
                finalize: string;
                identifiers: autoguard.guards.Array<{
                    type: "dns";
                    value: string;
                }>;
                status: "valid" | "pending" | "invalid" | "processing" | "ready";
                certificate?: string | undefined;
                error?: {} | undefined;
                expires?: string | undefined;
                notBefore?: string | undefined;
                notAfter?: string | undefined;
            };
            status?: number | undefined;
        }>;
        getAccount: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                status: "valid" | "deactivated" | "revoked";
                contact?: autoguard.guards.Array<string> | undefined;
                externalAccountBinding?: {} | undefined;
                orders?: string | undefined;
                termsOfServiceAgreed?: boolean | undefined;
            };
            status?: number | undefined;
        }>;
        getAuthorization: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                identifier: {
                    type: "dns";
                    value: string;
                };
                status: "valid" | "deactivated" | "revoked" | "pending" | "invalid" | "expired";
                challenges: autoguard.guards.Array<{
                    status: "valid" | "pending" | "invalid" | "processing";
                    type: string;
                    url: string;
                    error?: {} | undefined;
                    validated?: string | undefined;
                }>;
                expires?: string | undefined;
                wildcard?: boolean | undefined;
            };
            status?: number | undefined;
        }>;
        getChallenge: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                status: "valid" | "pending" | "invalid" | "processing";
                type: string;
                url: string;
                error?: {} | undefined;
                validated?: string | undefined;
            };
            status?: number | undefined;
        }>;
        getDirectory: autoguard.serialization.MessageGuard<{
            payload: {
                keyChange: string;
                newAccount: string;
                newNonce: string;
                newOrder: string;
                revokeCert: string;
                meta?: {
                    caaIdentities?: autoguard.guards.Array<string> | undefined;
                    externalAccountRequired?: boolean | undefined;
                    termsOfService?: string | undefined;
                    website?: string | undefined;
                } | undefined;
                newAuthz?: string | undefined;
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        getOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            payload: {
                authorizations: autoguard.guards.Array<string>;
                finalize: string;
                identifiers: autoguard.guards.Array<{
                    type: "dns";
                    value: string;
                }>;
                status: "valid" | "pending" | "invalid" | "processing" | "ready";
                certificate?: string | undefined;
                error?: {} | undefined;
                expires?: string | undefined;
                notBefore?: string | undefined;
                notAfter?: string | undefined;
            };
            status?: number | undefined;
        }>;
        newAccount: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
                location: string;
            };
            payload: {
                status: "valid" | "deactivated" | "revoked";
                contact?: autoguard.guards.Array<string> | undefined;
                externalAccountBinding?: {} | undefined;
                orders?: string | undefined;
                termsOfServiceAgreed?: boolean | undefined;
            };
            status?: number | undefined;
        }>;
        newNonce: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
            };
            status?: number | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        newOrder: autoguard.serialization.MessageGuard<{
            headers: {
                [x: string]: autoguard.api.JSON;
                "replay-nonce": string;
                location: string;
            };
            payload: {
                authorizations: autoguard.guards.Array<string>;
                finalize: string;
                identifiers: autoguard.guards.Array<{
                    type: "dns";
                    value: string;
                }>;
                status: "valid" | "pending" | "invalid" | "processing" | "ready";
                certificate?: string | undefined;
                error?: {} | undefined;
                expires?: string | undefined;
                notBefore?: string | undefined;
                notAfter?: string | undefined;
            };
            status?: number | undefined;
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
