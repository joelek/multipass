import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const DomainPrice: autoguard.serialization.MessageGuard<{
    amount: number;
    currency: string;
    years: number;
}>;
export declare type DomainPrice = ReturnType<typeof DomainPrice["as"]>;
export declare const RegistrarInfo: autoguard.serialization.MessageGuard<{
    autorenew: string;
    state: string;
    statedescription?: string | undefined;
    expire?: string | undefined;
    tld?: string | undefined;
    invoicenumber?: string | undefined;
}>;
export declare type RegistrarInfo = ReturnType<typeof RegistrarInfo["as"]>;
export declare const Domain: autoguard.serialization.MessageGuard<{
    domainname: string;
    expire?: number | undefined;
    available?: boolean | undefined;
    createtime?: string | undefined;
    displayname?: string | undefined;
    minimum?: number | undefined;
    prices?: {
        amount: number;
        currency: string;
        years: number;
    }[] | undefined;
    primarynameserver?: string | undefined;
    recordcount?: number | undefined;
    refresh?: number | undefined;
    registrarinfo?: {
        autorenew: string;
        state: string;
        statedescription?: string | undefined;
        expire?: string | undefined;
        tld?: string | undefined;
        invoicenumber?: string | undefined;
    } | undefined;
    responsibleperson?: string | undefined;
    retry?: number | undefined;
    ttl?: number | undefined;
    usingglesysnameserver?: string | undefined;
}>;
export declare type Domain = ReturnType<typeof Domain["as"]>;
export declare const DomainRecordHost: autoguard.serialization.MessageGuard<string>;
export declare type DomainRecordHost = ReturnType<typeof DomainRecordHost["as"]>;
export declare const DomainRecordType: autoguard.serialization.MessageGuard<string>;
export declare type DomainRecordType = ReturnType<typeof DomainRecordType["as"]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<{
    data: string;
    host: string;
    recordid: number;
    domainname: string;
    ttl: number;
    type: string;
}>;
export declare type DomainRecord = ReturnType<typeof DomainRecord["as"]>;
export declare namespace Autoguard {
    const Guards: {
        DomainPrice: autoguard.serialization.MessageGuard<{
            amount: number;
            currency: string;
            years: number;
        }>;
        RegistrarInfo: autoguard.serialization.MessageGuard<{
            autorenew: string;
            state: string;
            statedescription?: string | undefined;
            expire?: string | undefined;
            tld?: string | undefined;
            invoicenumber?: string | undefined;
        }>;
        Domain: autoguard.serialization.MessageGuard<{
            domainname: string;
            expire?: number | undefined;
            available?: boolean | undefined;
            createtime?: string | undefined;
            displayname?: string | undefined;
            minimum?: number | undefined;
            prices?: {
                amount: number;
                currency: string;
                years: number;
            }[] | undefined;
            primarynameserver?: string | undefined;
            recordcount?: number | undefined;
            refresh?: number | undefined;
            registrarinfo?: {
                autorenew: string;
                state: string;
                statedescription?: string | undefined;
                expire?: string | undefined;
                tld?: string | undefined;
                invoicenumber?: string | undefined;
            } | undefined;
            responsibleperson?: string | undefined;
            retry?: number | undefined;
            ttl?: number | undefined;
            usingglesysnameserver?: string | undefined;
        }>;
        DomainRecordHost: autoguard.serialization.MessageGuard<string>;
        DomainRecordType: autoguard.serialization.MessageGuard<string>;
        DomainRecord: autoguard.serialization.MessageGuard<{
            data: string;
            host: string;
            recordid: number;
            domainname: string;
            ttl: number;
            type: string;
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
                ttl?: number | undefined;
                type?: string | undefined;
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
                    domains: {
                        domainname: string;
                        expire?: number | undefined;
                        available?: boolean | undefined;
                        createtime?: string | undefined;
                        displayname?: string | undefined;
                        minimum?: number | undefined;
                        prices?: {
                            amount: number;
                            currency: string;
                            years: number;
                        }[] | undefined;
                        primarynameserver?: string | undefined;
                        recordcount?: number | undefined;
                        refresh?: number | undefined;
                        registrarinfo?: {
                            autorenew: string;
                            state: string;
                            statedescription?: string | undefined;
                            expire?: string | undefined;
                            tld?: string | undefined;
                            invoicenumber?: string | undefined;
                        } | undefined;
                        responsibleperson?: string | undefined;
                        retry?: number | undefined;
                        ttl?: number | undefined;
                        usingglesysnameserver?: string | undefined;
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
                    records: {
                        data: string;
                        host: string;
                        recordid: number;
                        domainname: string;
                        ttl: number;
                        type: string;
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
                    record: {
                        data: string;
                        host: string;
                        recordid: number;
                        domainname: string;
                        ttl: number;
                        type: string;
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
                    record: {
                        data: string;
                        host: string;
                        recordid: number;
                        domainname: string;
                        ttl: number;
                        type: string;
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
                response: {};
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
