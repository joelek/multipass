/// <reference types="node" />
import * as libcrypto from "crypto";
import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as api from "./api";
export declare class Handler {
    private key;
    private client;
    private directory;
    private urlPrefix;
    private nextReplayNonce;
    private constructor();
    createAccount(payloadData: api.CreateAccountPayload): Promise<{
        payload: api.Account;
        url: string;
    }>;
    createNonce(): Promise<void>;
    createOrder(kid: string, payloadData: api.CreateOrderPayload): Promise<{
        payload: api.Order;
        url: string;
    }>;
    downloadCertificate(kid: string, url: string): Promise<Buffer>;
    finalizeChallenge(kid: string, url: string): Promise<void>;
    finalizeOrder(kid: string, url: string, payloadData: api.FinalizeOrderPayload): Promise<void>;
    getAccount(url: string): Promise<{
        payload: api.Account;
        url: string;
    }>;
    getAuthorization(kid: string, url: string): Promise<{
        payload: api.Authorization;
        url: string;
    }>;
    getChallenge(kid: string, url: string): Promise<{
        payload: api.Challenge;
        url: string;
    }>;
    getOrder(kid: string, url: string): Promise<{
        payload: api.Order;
        url: string;
    }>;
    static make(url: string, key: libcrypto.KeyObject, clientOptions?: autoguard.api.ClientOptions): Promise<Handler>;
}
