import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const Domain: autoguard.serialization.MessageGuard<Domain>;
export declare type Domain = autoguard.guards.Object<{
    "id": autoguard.guards.Number;
    "name": autoguard.guards.String;
}, {}>;
export declare const DomainRecordStubGeneric: autoguard.serialization.MessageGuard<DomainRecordStubGeneric>;
export declare type DomainRecordStubGeneric = autoguard.guards.Object<{
    "nodeName": autoguard.guards.String;
    "recordType": autoguard.guards.String;
}, {
    "ttl": autoguard.guards.Number;
    "state": autoguard.guards.Boolean;
}>;
export declare const DomainRecordStubTXT: autoguard.serialization.MessageGuard<DomainRecordStubTXT>;
export declare type DomainRecordStubTXT = autoguard.guards.Intersection<[
    autoguard.guards.Reference<DomainRecordStubGeneric>,
    autoguard.guards.Object<{
        "recordType": autoguard.guards.StringLiteral<"TXT">;
        "textData": autoguard.guards.String;
    }, {}>
]>;
export declare const DomainRecordStub: autoguard.serialization.MessageGuard<DomainRecordStub>;
export declare type DomainRecordStub = autoguard.guards.Union<[
    autoguard.guards.Reference<DomainRecordStubGeneric>,
    autoguard.guards.Reference<DomainRecordStubTXT>
]>;
export declare const DomainRecordBase: autoguard.serialization.MessageGuard<DomainRecordBase>;
export declare type DomainRecordBase = autoguard.guards.Object<{
    "id": autoguard.guards.Number;
    "domainId": autoguard.guards.Number;
}, {}>;
export declare const DomainRecordGeneric: autoguard.serialization.MessageGuard<DomainRecordGeneric>;
export declare type DomainRecordGeneric = autoguard.guards.Intersection<[
    autoguard.guards.Reference<DomainRecordBase>,
    autoguard.guards.Reference<DomainRecordStubGeneric>
]>;
export declare const DomainRecordTXT: autoguard.serialization.MessageGuard<DomainRecordTXT>;
export declare type DomainRecordTXT = autoguard.guards.Intersection<[
    autoguard.guards.Reference<DomainRecordBase>,
    autoguard.guards.Reference<DomainRecordStubTXT>
]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<DomainRecord>;
export declare type DomainRecord = autoguard.guards.Union<[
    autoguard.guards.Reference<DomainRecordGeneric>,
    autoguard.guards.Reference<DomainRecordTXT>
]>;
export declare namespace Autoguard {
    const Guards: {
        Domain: autoguard.serialization.MessageGuard<{
            id: number;
            name: string;
        }>;
        DomainRecordStubGeneric: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        }>;
        DomainRecordStubTXT: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecordStub: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        } | {
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecordBase: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
        }>;
        DomainRecordGeneric: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        }>;
        DomainRecordTXT: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecord: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        } | {
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {
        listDomains: autoguard.serialization.MessageGuard<{
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        listDomainRecords: autoguard.serialization.MessageGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
        createDomainRecord: autoguard.serialization.MessageGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
            };
            payload: {
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        updateDomainRecord: autoguard.serialization.MessageGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
                recordid: number;
            };
            payload: {
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        deleteDomainRecord: autoguard.serialization.MessageGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
                recordid: number;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            payload?: autoguard.api.AsyncBinary | autoguard.api.SyncBinary | undefined;
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        listDomains: autoguard.serialization.MessageGuard<{
            payload: {
                domains: autoguard.guards.Array<{
                    id: number;
                    name: string;
                }>;
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        listDomainRecords: autoguard.serialization.MessageGuard<{
            payload: {
                dnsRecords: autoguard.guards.Array<{
                    id: number;
                    domainId: number;
                    nodeName: string;
                    recordType: string;
                    ttl?: number | undefined;
                    state?: boolean | undefined;
                } | {
                    id: number;
                    domainId: number;
                    nodeName: string;
                    recordType: "TXT";
                    ttl?: number | undefined;
                    state?: boolean | undefined;
                    textData: string;
                }>;
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        createDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        updateDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        deleteDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {};
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
