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
        DomainPrice: autoguard.guards.ReferenceGuard<DomainPrice>;
        RegistrarInfo: autoguard.guards.ReferenceGuard<RegistrarInfo>;
        Domain: autoguard.guards.ReferenceGuard<Domain>;
        DomainRecordHost: autoguard.guards.ReferenceGuard<string>;
        DomainRecordType: autoguard.guards.ReferenceGuard<string>;
        DomainRecord: autoguard.guards.ReferenceGuard<DomainRecord>;
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
            payload: autoguard.guards.Object<{
                domainname: any;
            }, {}>;
        }, {
            options: {
                [x: string]: any;
            };
            headers: {
                [x: string]: any;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                domainname: any;
                data: any;
                host: any;
                type: any;
            }, {
                ttl: any;
            }>;
        }, {
            options: {
                [x: string]: any;
            };
            headers: {
                [x: string]: any;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                recordid: any;
            }, {
                data: any;
                host: any;
                type: any;
                ttl: any;
            }>;
        }, {
            options: {
                [x: string]: any;
            };
            headers: {
                [x: string]: any;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                recordid: any;
            }, {}>;
        }, {
            options: {
                [x: string]: any;
            };
            headers: {
                [x: string]: any;
            };
        }>;
    };
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {
        listDomains: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                response: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        listDomainRecords: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                response: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        createDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                response: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        updateDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                response: any;
            }, {}>;
        }, {
            status: number;
            headers: {
                [x: string]: any;
            };
        }>;
        deleteDomainRecord: autoguard.guards.ObjectGuard<{
            payload: autoguard.guards.Object<{
                response: any;
            }, {}>;
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
