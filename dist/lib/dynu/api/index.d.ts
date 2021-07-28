import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const Domain: autoguard.serialization.MessageGuard<{
    id: number;
    name: string;
}>;
export declare type Domain = ReturnType<typeof Domain["as"]>;
export declare const DomainRecordStubGeneric: autoguard.serialization.MessageGuard<{
    nodeName: string;
    recordType: string;
}>;
export declare type DomainRecordStubGeneric = ReturnType<typeof DomainRecordStubGeneric["as"]>;
export declare const DomainRecordStubTXT: autoguard.serialization.MessageGuard<{
    nodeName: string;
    recordType: "TXT";
    textData: string;
}>;
export declare type DomainRecordStubTXT = ReturnType<typeof DomainRecordStubTXT["as"]>;
export declare const DomainRecordStub: autoguard.serialization.MessageGuard<{
    nodeName: string;
    recordType: string;
} | {
    nodeName: string;
    recordType: "TXT";
    textData: string;
}>;
export declare type DomainRecordStub = ReturnType<typeof DomainRecordStub["as"]>;
export declare const DomainRecordBase: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
}>;
export declare type DomainRecordBase = ReturnType<typeof DomainRecordBase["as"]>;
export declare const DomainRecordGeneric: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    recordType: string;
}>;
export declare type DomainRecordGeneric = ReturnType<typeof DomainRecordGeneric["as"]>;
export declare const DomainRecordTXT: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    recordType: "TXT";
    textData: string;
}>;
export declare type DomainRecordTXT = ReturnType<typeof DomainRecordTXT["as"]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    recordType: string;
} | {
    id: number;
    domainId: number;
    nodeName: string;
    recordType: "TXT";
    textData: string;
}>;
export declare type DomainRecord = ReturnType<typeof DomainRecord["as"]>;
export declare namespace Autoguard {
    const Guards: {
        Domain: autoguard.serialization.MessageGuard<{
            id: number;
            name: string;
        }>;
        DomainRecordStubGeneric: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: string;
        }>;
        DomainRecordStubTXT: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: "TXT";
            textData: string;
        }>;
        DomainRecordStub: autoguard.serialization.MessageGuard<{
            nodeName: string;
            recordType: string;
        } | {
            nodeName: string;
            recordType: "TXT";
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
        }>;
        DomainRecordTXT: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            textData: string;
        }>;
        DomainRecord: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            recordType: string;
        } | {
            id: number;
            domainId: number;
            nodeName: string;
            recordType: "TXT";
            textData: string;
        }>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {
        listDomains: autoguard.serialization.MessageGuard<{
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            options?: {
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
            } | {
                nodeName: string;
                recordType: "TXT";
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
            } | {
                nodeName: string;
                recordType: "TXT";
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
                domains: {
                    id: number;
                    name: string;
                }[];
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        listDomainRecords: autoguard.serialization.MessageGuard<{
            payload: {
                dnsRecords: ({
                    id: number;
                    domainId: number;
                    nodeName: string;
                    recordType: string;
                } | {
                    id: number;
                    domainId: number;
                    nodeName: string;
                    recordType: "TXT";
                    textData: string;
                })[];
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
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: "TXT";
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
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                recordType: "TXT";
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
