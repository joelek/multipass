import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const PrivateKey: autoguard.serialization.MessageGuard<[{
    data: [{
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }, {
        data: string;
    }];
}]>;
export declare type PrivateKey = ReturnType<typeof PrivateKey["as"]>;
export declare namespace Autoguard {
    const Guards: {
        PrivateKey: autoguard.serialization.MessageGuard<[{
            data: [{
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }, {
                data: string;
            }];
        }]>;
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
