import * as autoguard from "@joelek/ts-autoguard/dist/lib-client";
import * as shared from "./index";
export declare const makeClient: (clientOptions?: autoguard.api.MakeClientOptions | undefined) => autoguard.api.Client<shared.Autoguard.Requests, shared.Autoguard.Responses>;
