import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const DomainPrice: autoguard.serialization.MessageGuard<DomainPrice>;
export declare type DomainPrice = autoguard.guards.Object<{
    "amount": autoguard.guards.Number;
    "currency": autoguard.guards.String;
    "years": autoguard.guards.Number;
}, {}>;
export declare const RegistrarInfo: autoguard.serialization.MessageGuard<RegistrarInfo>;
export declare type RegistrarInfo = autoguard.guards.Object<{
    "autorenew": autoguard.guards.String;
    "state": autoguard.guards.String;
}, {
    "statedescription": autoguard.guards.String;
    "expire": autoguard.guards.String;
    "tld": autoguard.guards.String;
    "invoicenumber": autoguard.guards.String;
}>;
export declare const Domain: autoguard.serialization.MessageGuard<Domain>;
export declare type Domain = autoguard.guards.Object<{
    "domainname": autoguard.guards.String;
}, {
    "available": autoguard.guards.Boolean;
    "createtime": autoguard.guards.String;
    "displayname": autoguard.guards.String;
    "expire": autoguard.guards.Number;
    "minimum": autoguard.guards.Number;
    "prices": autoguard.guards.Array<autoguard.guards.Reference<DomainPrice>>;
    "primarynameserver": autoguard.guards.String;
    "recordcount": autoguard.guards.Number;
    "refresh": autoguard.guards.Number;
    "registrarinfo": autoguard.guards.Reference<RegistrarInfo>;
    "responsibleperson": autoguard.guards.String;
    "retry": autoguard.guards.Number;
    "ttl": autoguard.guards.Number;
    "usingglesysnameserver": autoguard.guards.String;
}>;
export declare const DomainRecordHost: autoguard.serialization.MessageGuard<DomainRecordHost>;
export declare type DomainRecordHost = autoguard.guards.Union<[
    autoguard.guards.StringLiteral<"@">,
    autoguard.guards.String
]>;
export declare const DomainRecordType: autoguard.serialization.MessageGuard<DomainRecordType>;
export declare type DomainRecordType = autoguard.guards.Union<[
    autoguard.guards.StringLiteral<"A">,
    autoguard.guards.StringLiteral<"NS">,
    autoguard.guards.StringLiteral<"MX">,
    autoguard.guards.StringLiteral<"TXT">,
    autoguard.guards.String
]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<DomainRecord>;
export declare type DomainRecord = autoguard.guards.Object<{
    "domainname": autoguard.guards.String;
    "data": autoguard.guards.String;
    "host": autoguard.guards.Reference<DomainRecordHost>;
    "recordid": autoguard.guards.Number;
    "ttl": autoguard.guards.Number;
    "type": autoguard.guards.Reference<DomainRecordType>;
}, {}>;
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
            available?: boolean | undefined;
            createtime?: string | undefined;
            displayname?: string | undefined;
            expire?: number | undefined;
            minimum?: number | undefined;
            prices?: autoguard.guards.Array<{
                amount: number;
                currency: string;
                years: number;
            }> | undefined;
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
            domainname: string;
            data: string;
            host: string;
            recordid: number;
            ttl: number;
            type: string;
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
            payload: {
                domainname: string;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        createDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                domainname: string;
                data: string;
                host: string;
                type: string;
                ttl?: number | undefined;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            headers?: {
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
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            headers?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
        }>;
        deleteDomainRecord: autoguard.serialization.MessageGuard<{
            payload: {
                recordid: number;
            };
            options?: {
                [x: string]: autoguard.api.JSON;
            } | undefined;
            headers?: {
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
                    domains: autoguard.guards.Array<{
                        domainname: string;
                        available?: boolean | undefined;
                        createtime?: string | undefined;
                        displayname?: string | undefined;
                        expire?: number | undefined;
                        minimum?: number | undefined;
                        prices?: autoguard.guards.Array<{
                            amount: number;
                            currency: string;
                            years: number;
                        }> | undefined;
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
                    records: autoguard.guards.Array<{
                        domainname: string;
                        data: string;
                        host: string;
                        recordid: number;
                        ttl: number;
                        type: string;
                    }>;
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
                        domainname: string;
                        data: string;
                        host: string;
                        recordid: number;
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
                        domainname: string;
                        data: string;
                        host: string;
                        recordid: number;
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
