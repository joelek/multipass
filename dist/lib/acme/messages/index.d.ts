import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const AccountBase: autoguard.serialization.MessageGuard<{
    contact?: string[] | undefined;
    termsOfServiceAgreed?: boolean | undefined;
    externalAccountBinding?: {} | undefined;
}>;
export declare type AccountBase = ReturnType<typeof AccountBase["as"]>;
export declare const Account: autoguard.serialization.MessageGuard<{
    contact?: string[] | undefined;
    termsOfServiceAgreed?: boolean | undefined;
    externalAccountBinding?: {} | undefined;
    status: "valid" | "deactivated" | "revoked";
    orders: string;
}>;
export declare type Account = ReturnType<typeof Account["as"]>;
export declare const NewAccountJWSPayload: autoguard.serialization.MessageGuard<{
    contact?: string[] | undefined;
    termsOfServiceAgreed?: boolean | undefined;
    externalAccountBinding?: {} | undefined;
    onlyReturnExisting?: boolean | undefined;
}>;
export declare type NewAccountJWSPayload = ReturnType<typeof NewAccountJWSPayload["as"]>;
export declare const GetDirectoryResponse: autoguard.serialization.MessageGuard<{
    body: {
        keyChange: string;
        newAccount: string;
        newNonce: string;
        newOrder: string;
        revokeCert: string;
        meta?: {
            caaIdentities?: string[] | undefined;
            externalAccountRequired?: boolean | undefined;
            termsOfService?: string | undefined;
            website?: string | undefined;
        } | undefined;
        newAuthz?: string | undefined;
    };
}>;
export declare type GetDirectoryResponse = ReturnType<typeof GetDirectoryResponse["as"]>;
export declare const NewNonceResponse: autoguard.serialization.MessageGuard<{
    status: 200;
    headers: {
        "Replay-Nonce": [string];
    };
}>;
export declare type NewNonceResponse = ReturnType<typeof NewNonceResponse["as"]>;
export declare const NewAccountResponse: autoguard.serialization.MessageGuard<{
    status: 201;
    body: {
        contact?: string[] | undefined;
        termsOfServiceAgreed?: boolean | undefined;
        externalAccountBinding?: {} | undefined;
        status: "valid" | "deactivated" | "revoked";
        orders: string;
    };
    headers: {
        "Replay-Nonce": [string];
        Location: [string];
    };
}>;
export declare type NewAccountResponse = ReturnType<typeof NewAccountResponse["as"]>;
export declare namespace Autoguard {
    const Guards: {
        AccountBase: autoguard.serialization.MessageGuard<{
            contact?: string[] | undefined;
            termsOfServiceAgreed?: boolean | undefined;
            externalAccountBinding?: {} | undefined;
        }>;
        Account: autoguard.serialization.MessageGuard<{
            contact?: string[] | undefined;
            termsOfServiceAgreed?: boolean | undefined;
            externalAccountBinding?: {} | undefined;
            status: "valid" | "deactivated" | "revoked";
            orders: string;
        }>;
        NewAccountJWSPayload: autoguard.serialization.MessageGuard<{
            contact?: string[] | undefined;
            termsOfServiceAgreed?: boolean | undefined;
            externalAccountBinding?: {} | undefined;
            onlyReturnExisting?: boolean | undefined;
        }>;
        GetDirectoryResponse: autoguard.serialization.MessageGuard<{
            body: {
                keyChange: string;
                newAccount: string;
                newNonce: string;
                newOrder: string;
                revokeCert: string;
                meta?: {
                    caaIdentities?: string[] | undefined;
                    externalAccountRequired?: boolean | undefined;
                    termsOfService?: string | undefined;
                    website?: string | undefined;
                } | undefined;
                newAuthz?: string | undefined;
            };
        }>;
        NewNonceResponse: autoguard.serialization.MessageGuard<{
            status: 200;
            headers: {
                "Replay-Nonce": [string];
            };
        }>;
        NewAccountResponse: autoguard.serialization.MessageGuard<{
            status: 201;
            body: {
                contact?: string[] | undefined;
                termsOfServiceAgreed?: boolean | undefined;
                externalAccountBinding?: {} | undefined;
                status: "valid" | "deactivated" | "revoked";
                orders: string;
            };
            headers: {
                "Replay-Nonce": [string];
                Location: [string];
            };
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
