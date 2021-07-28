export declare const CONFIG: {
    domainname: string;
    username: string;
    password: string;
};
export declare function makeNodeClient(): import("@joelek/ts-autoguard/dist/lib-client/api").Client<import("./api").Autoguard.Requests, import("./api").Autoguard.Responses>;
