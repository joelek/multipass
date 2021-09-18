/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export declare function generatePrivateKeyObject(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
}>): libcrypto.KeyObject;
export declare function generatePrivateKeyDER(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
    type: "pkcs8" | "sec1";
}>): Buffer;
export declare function generatePrivateKey(): jwk.ECPrivateKey;
