import * as autoguard from "@joelek/autoguard/dist/lib-shared";
export declare const Status: autoguard.serialization.MessageGuard<Status>;
export type Status = autoguard.guards.Union<[
    autoguard.guards.StringLiteral<"OK">,
    autoguard.guards.StringLiteral<"AUTH_ERROR">,
    autoguard.guards.StringLiteral<"DOMAIN_OCCUPIED">,
    autoguard.guards.StringLiteral<"RATE_LIMITED">,
    autoguard.guards.StringLiteral<"BAD_INDATA">,
    autoguard.guards.StringLiteral<"UNKNOWN_ERROR">,
    autoguard.guards.StringLiteral<"INSUFFICIENT_FUNDS">
]>;
export declare const Domain: autoguard.serialization.MessageGuard<Domain>;
export type Domain = autoguard.guards.Object<{
    "domain": autoguard.guards.String;
    "paid": autoguard.guards.Boolean;
    "registered": autoguard.guards.Boolean;
    "reference_no": autoguard.guards.Integer;
    "renewal_status": autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"NORMAL">,
        autoguard.guards.StringLiteral<"DEACTIVATED">,
        autoguard.guards.StringLiteral<"NOT_HANDLED_BY_LOOPIA">
    ]>;
    "expiration_date": autoguard.guards.String;
}, {}>;
export declare const getDomainsRequest: autoguard.serialization.MessageGuard<getDomainsRequest>;
export type getDomainsRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"getDomains">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String
    ]>;
}, {}>;
export declare const getDomainsResponse: autoguard.serialization.MessageGuard<getDomainsResponse>;
export type getDomainsResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Array<autoguard.guards.Reference<Domain>>
    ]>;
}, {}>;
export declare const getSubdomainsRequest: autoguard.serialization.MessageGuard<getSubdomainsRequest>;
export type getSubdomainsRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"getSubdomains">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String
    ]>;
}, {}>;
export declare const getSubdomainsResponse: autoguard.serialization.MessageGuard<getSubdomainsResponse>;
export type getSubdomainsResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Array<autoguard.guards.String>
    ]>;
}, {}>;
export declare const addSubdomainRequest: autoguard.serialization.MessageGuard<addSubdomainRequest>;
export type addSubdomainRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"addSubdomain">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String
    ]>;
}, {}>;
export declare const addSubdomainResponse: autoguard.serialization.MessageGuard<addSubdomainResponse>;
export type addSubdomainResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Reference<Status>
    ]>;
}, {}>;
export declare const removeSubdomainRequest: autoguard.serialization.MessageGuard<removeSubdomainRequest>;
export type removeSubdomainRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"removeSubdomain">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String
    ]>;
}, {}>;
export declare const removeSubdomainResponse: autoguard.serialization.MessageGuard<removeSubdomainResponse>;
export type removeSubdomainResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Reference<Status>
    ]>;
}, {}>;
export declare const Record: autoguard.serialization.MessageGuard<Record>;
export type Record = autoguard.guards.Object<{
    "type": autoguard.guards.String;
    "ttl": autoguard.guards.Integer;
    "priority": autoguard.guards.Integer;
    "rdata": autoguard.guards.String;
    "record_id": autoguard.guards.Integer;
}, {}>;
export declare const getZoneRecordsRequest: autoguard.serialization.MessageGuard<getZoneRecordsRequest>;
export type getZoneRecordsRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"getZoneRecords">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String
    ]>;
}, {}>;
export declare const getZoneRecordsResponse: autoguard.serialization.MessageGuard<getZoneRecordsResponse>;
export type getZoneRecordsResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Array<autoguard.guards.Reference<Record>>
    ]>;
}, {}>;
export declare const addZoneRecordRequest: autoguard.serialization.MessageGuard<addZoneRecordRequest>;
export type addZoneRecordRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"addZoneRecord">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.Reference<Record>
    ]>;
}, {}>;
export declare const addZoneRecordResponse: autoguard.serialization.MessageGuard<addZoneRecordResponse>;
export type addZoneRecordResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Reference<Status>
    ]>;
}, {}>;
export declare const updateZoneRecordRequest: autoguard.serialization.MessageGuard<updateZoneRecordRequest>;
export type updateZoneRecordRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"updateZoneRecord">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.Reference<Record>
    ]>;
}, {}>;
export declare const updateZoneRecordResponse: autoguard.serialization.MessageGuard<updateZoneRecordResponse>;
export type updateZoneRecordResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Reference<Status>
    ]>;
}, {}>;
export declare const removeZoneRecordRequest: autoguard.serialization.MessageGuard<removeZoneRecordRequest>;
export type removeZoneRecordRequest = autoguard.guards.Object<{
    "methodName": autoguard.guards.StringLiteral<"removeZoneRecord">;
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.String,
        autoguard.guards.Integer
    ]>;
}, {}>;
export declare const removeZoneRecordResponse: autoguard.serialization.MessageGuard<removeZoneRecordResponse>;
export type removeZoneRecordResponse = autoguard.guards.Object<{
    "parameters": autoguard.guards.Tuple<[
        autoguard.guards.Reference<Status>
    ]>;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Status: autoguard.guards.ReferenceGuard<"OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS">;
        Domain: autoguard.guards.ReferenceGuard<{
            domain: string;
            paid: boolean;
            registered: boolean;
            reference_no: number;
            renewal_status: "NORMAL" | "DEACTIVATED" | "NOT_HANDLED_BY_LOOPIA";
            expiration_date: string;
        }>;
        getDomainsRequest: autoguard.guards.ReferenceGuard<{
            methodName: "getDomains";
            parameters: [string, string, string];
        }>;
        getDomainsResponse: autoguard.guards.ReferenceGuard<{
            parameters: [autoguard.guards.Array<{
                domain: string;
                paid: boolean;
                registered: boolean;
                reference_no: number;
                renewal_status: "NORMAL" | "DEACTIVATED" | "NOT_HANDLED_BY_LOOPIA";
                expiration_date: string;
            }>];
        }>;
        getSubdomainsRequest: autoguard.guards.ReferenceGuard<{
            methodName: "getSubdomains";
            parameters: [string, string, string, string];
        }>;
        getSubdomainsResponse: autoguard.guards.ReferenceGuard<{
            parameters: [autoguard.guards.Array<string>];
        }>;
        addSubdomainRequest: autoguard.guards.ReferenceGuard<{
            methodName: "addSubdomain";
            parameters: [string, string, string, string, string];
        }>;
        addSubdomainResponse: autoguard.guards.ReferenceGuard<{
            parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
        }>;
        removeSubdomainRequest: autoguard.guards.ReferenceGuard<{
            methodName: "removeSubdomain";
            parameters: [string, string, string, string, string];
        }>;
        removeSubdomainResponse: autoguard.guards.ReferenceGuard<{
            parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
        }>;
        Record: autoguard.guards.ReferenceGuard<{
            type: string;
            ttl: number;
            priority: number;
            rdata: string;
            record_id: number;
        }>;
        getZoneRecordsRequest: autoguard.guards.ReferenceGuard<{
            methodName: "getZoneRecords";
            parameters: [string, string, string, string, string];
        }>;
        getZoneRecordsResponse: autoguard.guards.ReferenceGuard<{
            parameters: [autoguard.guards.Array<{
                type: string;
                ttl: number;
                priority: number;
                rdata: string;
                record_id: number;
            }>];
        }>;
        addZoneRecordRequest: autoguard.guards.ReferenceGuard<{
            methodName: "addZoneRecord";
            parameters: [string, string, string, string, string, {
                type: string;
                ttl: number;
                priority: number;
                rdata: string;
                record_id: number;
            }];
        }>;
        addZoneRecordResponse: autoguard.guards.ReferenceGuard<{
            parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
        }>;
        updateZoneRecordRequest: autoguard.guards.ReferenceGuard<{
            methodName: "updateZoneRecord";
            parameters: [string, string, string, string, string, {
                type: string;
                ttl: number;
                priority: number;
                rdata: string;
                record_id: number;
            }];
        }>;
        updateZoneRecordResponse: autoguard.guards.ReferenceGuard<{
            parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
        }>;
        removeZoneRecordRequest: autoguard.guards.ReferenceGuard<{
            methodName: "removeZoneRecord";
            parameters: [string, string, string, string, string, number];
        }>;
        removeZoneRecordResponse: autoguard.guards.ReferenceGuard<{
            parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
        }>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {
        sendRequest: autoguard.guards.ObjectGuard<import("@joelek/stdlib/dist/lib/routing").MessageMap<unknown>, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        sendRequest: autoguard.guards.ObjectGuard<import("@joelek/stdlib/dist/lib/routing").MessageMap<unknown>, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
