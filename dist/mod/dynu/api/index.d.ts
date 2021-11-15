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
        Domain: autoguard.guards.ReferenceGuard<Domain>;
        DomainRecordStubGeneric: autoguard.guards.ReferenceGuard<DomainRecordStubGeneric>;
        DomainRecordStubTXT: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecordStub: autoguard.guards.ReferenceGuard<DomainRecordStubGeneric | {
            [x: string]: any;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecordBase: autoguard.guards.ReferenceGuard<DomainRecordBase>;
        DomainRecordGeneric: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        }>;
        DomainRecordTXT: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            ttl?: number | undefined;
            state?: boolean | undefined;
            textData: string;
        }>;
        DomainRecord: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
            ttl?: number | undefined;
            state?: boolean | undefined;
        } | {
            [x: string]: any;
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
                [x: string]: any;
            };
            headers: {
                [x: string]: any;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: any;
                domainid: number;
            };
        }, {
            headers: {
                [x: string]: any;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: any;
                domainid: number;
            };
            payload: DomainRecordStubGeneric | {
                [x: string]: any;
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
        }, {
            headers: {
                [x: string]: any;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: any;
                domainid: number;
                recordid: number;
            };
            payload: DomainRecordStubGeneric | {
                [x: string]: any;
                nodeName: string;
                recordType: "TXT";
                ttl?: number | undefined;
                state?: boolean | undefined;
                textData: string;
            };
        }, {
            headers: {
                [x: string]: any;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            options: {
                [x: string]: any;
                domainid: number;
                recordid: number;
            };
        }, {
            headers: {
                [x: string]: any;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        listDomains: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                domains: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                dnsRecords: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                [x: string]: any;
                id: number;
                domainId: number;
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                [x: string]: any;
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
                [x: string]: any;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                [x: string]: any;
                id: number;
                domainId: number;
                nodeName: string;
                recordType: string;
                ttl?: number | undefined;
                state?: boolean | undefined;
            } | {
                [x: string]: any;
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
                [x: string]: any;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<import("@joelek/ts-stdlib/dist/lib/routing").MessageMap<unknown>, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
    };
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
