import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api/client";
import * as config from "./config";
import * as dns from "../dns";
export * from "./config";
export declare function makeClient(config: config.Config, options?: autoguard.api.ClientOptions): api.Client;
export declare function makeStandardClient(config: config.Config, options?: autoguard.api.ClientOptions): Promise<dns.Client>;
