import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const Status: autoguard.serialization.MessageGuard<{
    code: number;
    timestamp: string;
    text: string;
    transactionid?: any;
}>;
export declare type Status = ReturnType<typeof Status["as"]>;
export declare const Domain: autoguard.serialization.MessageGuard<{
    domainname: string;
    createtime: string;
    displayname: string;
    recordcount: number;
    resolvednameservers: string[];
    usingglesysnameserver: string;
    registrarinfo: {
        state: string;
        expire: string;
        autorenew: string;
        configurednameservers: string[];
    };
}>;
export declare type Domain = ReturnType<typeof Domain["as"]>;
export declare const DomainRecordHost: autoguard.serialization.MessageGuard<string>;
export declare type DomainRecordHost = ReturnType<typeof DomainRecordHost["as"]>;
export declare const DomainRecordType: autoguard.serialization.MessageGuard<string>;
export declare type DomainRecordType = ReturnType<typeof DomainRecordType["as"]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<{
    data: string;
    host: string;
    domainname: string;
    recordid: number;
    type: string;
    ttl: number;
}>;
export declare type DomainRecord = ReturnType<typeof DomainRecord["as"]>;
export declare namespace Autoguard {
    const Guards: {
        Status: autoguard.serialization.MessageGuard<{
            code: number;
            timestamp: string;
            text: string;
            transactionid?: any;
        }>;
        Domain: autoguard.serialization.MessageGuard<{
            domainname: string;
            createtime: string;
            displayname: string;
            recordcount: number;
            resolvednameservers: string[];
            usingglesysnameserver: string;
            registrarinfo: {
                state: string;
                expire: string;
                autorenew: string;
                configurednameservers: string[];
            };
        }>;
        DomainRecordHost: autoguard.serialization.MessageGuard<string>;
        DomainRecordType: autoguard.serialization.MessageGuard<string>;
        DomainRecord: autoguard.serialization.MessageGuard<{
            data: string;
            host: string;
            domainname: string;
            recordid: number;
            type: string;
            ttl: number;
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
            payload: {
                domainname: string;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        createDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                data: string;
                host: string;
                domainname: string;
                type: string;
                ttl?: number | undefined;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        updateDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                recordid: number;
                data?: string | undefined;
                host?: string | undefined;
                type?: string | undefined;
                ttl?: number | undefined;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        deleteDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                recordid: number;
            };
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        listDomains: autoguard.serialization.MessageGuard<{
            payload: {
                response: {
                    status: {
                        code: number;
                        timestamp: string;
                        text: string;
                        transactionid?: any;
                    };
                    domains: {
                        domainname: string;
                        createtime: string;
                        displayname: string;
                        recordcount: number;
                        resolvednameservers: string[];
                        usingglesysnameserver: string;
                        registrarinfo: {
                            state: string;
                            expire: string;
                            autorenew: string;
                            configurednameservers: string[];
                        };
                    }[];
                };
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        listDomainRecords: autoguard.serialization.MessageGuard<{
            payload: {
                response: {
                    status: {
                        code: number;
                        timestamp: string;
                        text: string;
                        transactionid?: any;
                    };
                    records: {
                        data: string;
                        host: string;
                        domainname: string;
                        recordid: number;
                        type: string;
                        ttl: number;
                    }[];
                };
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        createDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                response: {
                    status: {
                        code: number;
                        timestamp: string;
                        text: string;
                        transactionid?: any;
                    };
                    record: {
                        data: string;
                        host: string;
                        domainname: string;
                        recordid: number;
                        type: string;
                        ttl: number;
                    };
                };
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        updateDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                response: {
                    status: {
                        code: number;
                        timestamp: string;
                        text: string;
                        transactionid?: any;
                    };
                    record: {
                        data: string;
                        host: string;
                        domainname: string;
                        recordid: number;
                        type: string;
                        ttl: number;
                    };
                };
            };
            status?: number | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        deleteDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                response: {
                    status: {
                        code: number;
                        timestamp: string;
                        text: string;
                        transactionid?: any;
                    };
                };
            };
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
