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
        Domain: autoguard.guards.ReferenceGuard<{
            id: number;
            name: string;
        }>;
        DomainRecordStubGeneric: autoguard.guards.ReferenceGuard<{
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        }>;
        DomainRecordStubTXT: autoguard.guards.ReferenceGuard<{
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecordStub: autoguard.guards.ReferenceGuard<{
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
        DomainRecordBase: autoguard.guards.ReferenceGuard<{
            id: number;
            domainId: number;
        }>;
        DomainRecordGeneric: autoguard.guards.ReferenceGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        }>;
        DomainRecordTXT: autoguard.guards.ReferenceGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecord: autoguard.guards.ReferenceGuard<{
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
        listDomains: autoguard.guards.ObjectGuard<import("@joelek/ts-stdlib/dist/lib/routing").MessageMap<unknown>, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
            };
        }, {
            headers: {
                [x: string]: autoguard.api.JSON;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: autoguard.api.JSON;
                domainid: number;
                recordid: number;
            };
        }, {
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
        listDomains: autoguard.guards.ObjectGuard<{
            payload: {
                domains: autoguard.guards.Array<{
                    id: number;
                    name: string;
                }>;
            };
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {};
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
