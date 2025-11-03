import * as autoguard from "@joelek/autoguard/dist/lib-client";
import * as shared from "./index";
export type Client = autoguard.api.Client<shared.Autoguard.Requests, shared.Autoguard.Responses>;
export declare const makeClient: (clientOptions?: autoguard.api.ClientOptions) => Client;
