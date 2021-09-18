import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as shared from "./index";
export declare type Server = autoguard.api.RequestListener;
export declare const makeServer: (routes: autoguard.api.Server<shared.Autoguard.Requests, shared.Autoguard.Responses>, serverOptions?: autoguard.api.ServerOptions | undefined) => Server;
