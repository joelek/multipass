import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const Domain: autoguard.serialization.MessageGuard<{
    id: number;
    name: string;
}>;
export declare type Domain = ReturnType<typeof Domain["as"]>;
export declare const GenericRecord: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    state: boolean;
    recordType: string;
}>;
export declare type GenericRecord = ReturnType<typeof GenericRecord["as"]>;
export declare const TextRecord: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    state: boolean;
    recordType: "TXT";
    textData: string;
}>;
export declare type TextRecord = ReturnType<typeof TextRecord["as"]>;
export declare const Record: autoguard.serialization.MessageGuard<{
    id: number;
    domainId: number;
    nodeName: string;
    state: boolean;
    recordType: string;
} | {
    id: number;
    domainId: number;
    nodeName: string;
    state: boolean;
    recordType: "TXT";
    textData: string;
}>;
export declare type Record = ReturnType<typeof Record["as"]>;
export declare const GetDomainsResponse: autoguard.serialization.MessageGuard<{
    body: {
        domains: {
            id: number;
            name: string;
        }[];
    };
}>;
export declare type GetDomainsResponse = ReturnType<typeof GetDomainsResponse["as"]>;
export declare const GetRecordsResponse: autoguard.serialization.MessageGuard<{
    body: {
        dnsRecords: ({
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: string;
        } | {
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: "TXT";
            textData: string;
        })[];
    };
}>;
export declare type GetRecordsResponse = ReturnType<typeof GetRecordsResponse["as"]>;
export declare const CreateRecordResponse: autoguard.serialization.MessageGuard<{
    body: {
        id: number;
        domainId: number;
        nodeName: string;
        state: boolean;
        recordType: string;
    } | {
        id: number;
        domainId: number;
        nodeName: string;
        state: boolean;
        recordType: "TXT";
        textData: string;
    };
}>;
export declare type CreateRecordResponse = ReturnType<typeof CreateRecordResponse["as"]>;
export declare const UpdateRecordResponse: autoguard.serialization.MessageGuard<{
    body: {
        id: number;
        domainId: number;
        nodeName: string;
        state: boolean;
        recordType: string;
    } | {
        id: number;
        domainId: number;
        nodeName: string;
        state: boolean;
        recordType: "TXT";
        textData: string;
    };
}>;
export declare type UpdateRecordResponse = ReturnType<typeof UpdateRecordResponse["as"]>;
export declare const DeleteRecordResponse: autoguard.serialization.MessageGuard<{
    body: {};
}>;
export declare type DeleteRecordResponse = ReturnType<typeof DeleteRecordResponse["as"]>;
export declare namespace Autoguard {
    const Guards: {
        Domain: autoguard.serialization.MessageGuard<{
            id: number;
            name: string;
        }>;
        GenericRecord: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: string;
        }>;
        TextRecord: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: "TXT";
            textData: string;
        }>;
        Record: autoguard.serialization.MessageGuard<{
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: string;
        } | {
            id: number;
            domainId: number;
            nodeName: string;
            state: boolean;
            recordType: "TXT";
            textData: string;
        }>;
        GetDomainsResponse: autoguard.serialization.MessageGuard<{
            body: {
                domains: {
                    id: number;
                    name: string;
                }[];
            };
        }>;
        GetRecordsResponse: autoguard.serialization.MessageGuard<{
            body: {
                dnsRecords: ({
                    id: number;
                    domainId: number;
                    nodeName: string;
                    state: boolean;
                    recordType: string;
                } | {
                    id: number;
                    domainId: number;
                    nodeName: string;
                    state: boolean;
                    recordType: "TXT";
                    textData: string;
                })[];
            };
        }>;
        CreateRecordResponse: autoguard.serialization.MessageGuard<{
            body: {
                id: number;
                domainId: number;
                nodeName: string;
                state: boolean;
                recordType: string;
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                state: boolean;
                recordType: "TXT";
                textData: string;
            };
        }>;
        UpdateRecordResponse: autoguard.serialization.MessageGuard<{
            body: {
                id: number;
                domainId: number;
                nodeName: string;
                state: boolean;
                recordType: string;
            } | {
                id: number;
                domainId: number;
                nodeName: string;
                state: boolean;
                recordType: "TXT";
                textData: string;
            };
        }>;
        DeleteRecordResponse: autoguard.serialization.MessageGuard<{
            body: {};
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
