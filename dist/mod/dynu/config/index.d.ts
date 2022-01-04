import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare const Config: autoguard.serialization.MessageGuard<Config>;
export declare type Config = autoguard.guards.Object<{
    "key": autoguard.guards.String;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Config: autoguard.guards.ReferenceGuard<{
            key: string;
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
