/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export declare function generatePrivateKeyObject(options?: Partial<{
    modulusLength: number;
}>): libcrypto.KeyObject;
export declare function generatePrivateKeyDER(options?: Partial<{
    modulusLength: number;
    type: "pkcs1" | "pkcs8";
}>): Buffer;
export declare function generatePrivateKey(): jwk.RSAPrivateKey;
