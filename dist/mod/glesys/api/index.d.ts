import * as autoguard from "@joelek/autoguard/dist/lib-shared";
export declare const DomainPrice: autoguard.serialization.MessageGuard<DomainPrice>;
export type DomainPrice = autoguard.guards.Object<{
    "amount": autoguard.guards.Number;
    "currency": autoguard.guards.String;
    "years": autoguard.guards.Number;
}, {}>;
export declare const RegistrarInfo: autoguard.serialization.MessageGuard<RegistrarInfo>;
export type RegistrarInfo = autoguard.guards.Object<{
    "autorenew": autoguard.guards.String;
    "state": autoguard.guards.String;
}, {
    "statedescription": autoguard.guards.String;
    "expire": autoguard.guards.String;
    "tld": autoguard.guards.String;
    "invoicenumber": autoguard.guards.String;
}>;
export declare const Domain: autoguard.serialization.MessageGuard<Domain>;
export type Domain = autoguard.guards.Object<{
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
    "registrarinfo": autoguard.guards.Union<[
        autoguard.guards.Reference<RegistrarInfo>,
        autoguard.guards.Null
    ]>;
    "responsibleperson": autoguard.guards.String;
    "retry": autoguard.guards.Number;
    "ttl": autoguard.guards.Number;
    "usingglesysnameserver": autoguard.guards.String;
}>;
export declare const DomainRecordHost: autoguard.serialization.MessageGuard<DomainRecordHost>;
export type DomainRecordHost = autoguard.guards.Union<[
    autoguard.guards.StringLiteral<"@">,
    autoguard.guards.String
]>;
export declare const DomainRecordType: autoguard.serialization.MessageGuard<DomainRecordType>;
export type DomainRecordType = autoguard.guards.Union<[
    autoguard.guards.StringLiteral<"A">,
    autoguard.guards.StringLiteral<"NS">,
    autoguard.guards.StringLiteral<"MX">,
    autoguard.guards.StringLiteral<"TXT">,
    autoguard.guards.String
]>;
export declare const DomainRecord: autoguard.serialization.MessageGuard<DomainRecord>;
export type DomainRecord = autoguard.guards.Object<{
    "domainname": autoguard.guards.String;
    "data": autoguard.guards.String;
    "host": autoguard.guards.Reference<DomainRecordHost>;
    "recordid": autoguard.guards.Number;
    "ttl": autoguard.guards.Number;
    "type": autoguard.guards.Reference<DomainRecordType>;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        DomainPrice: autoguard.guards.ReferenceGuard<{
            amount: number;
            currency: string;
            years: number;
        }>;
        RegistrarInfo: autoguard.guards.ReferenceGuard<{
            autorenew: string;
            state: string;
            statedescription?: string | undefined;
            expire?: string | undefined;
            tld?: string | undefined;
            invoicenumber?: string | undefined;
        }>;
        Domain: autoguard.guards.ReferenceGuard<{
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
            } | null | undefined;
            responsibleperson?: string | undefined;
            retry?: number | undefined;
            ttl?: number | undefined;
            usingglesysnameserver?: string | undefined;
        }>;
        DomainRecordHost: autoguard.guards.ReferenceGuard<string>;
        DomainRecordType: autoguard.guards.ReferenceGuard<string>;
        DomainRecord: autoguard.guards.ReferenceGuard<{
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
        listDomains: autoguard.guards.ObjectGuard<import("@joelek/stdlib/dist/lib/routing").MessageMap<unknown>, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
            payload: autoguard.api.AsyncBinary | autoguard.api.SyncBinary;
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
            payload: {
                domainname: string;
            };
        }, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                domainname: string;
                data: string;
                host: string;
                type: string;
                ttl?: number | undefined;
            };
        }, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                recordid: number;
                data?: string | undefined;
                host?: string | undefined;
                type?: string | undefined;
                ttl?: number | undefined;
            };
        }, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                recordid: number;
            };
        }, {
            options: {
                [x: string]: autoguard.api.JSON;
            };
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        listDomains: autoguard.guards.ObjectGuard<{
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
                        } | null | undefined;
                        responsibleperson?: string | undefined;
                        retry?: number | undefined;
                        ttl?: number | undefined;
                        usingglesysnameserver?: string | undefined;
                    }>;
                };
            };
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
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
        }, {
            status: number;
            headers: {
                [x: string]: autoguard.api.JSON;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: {
                response: {};
            };
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
