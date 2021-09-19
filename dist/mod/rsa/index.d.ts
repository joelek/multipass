/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export declare function generatePrivateKey(options?: Partial<{
    modulusLength: number;
}>): libcrypto.KeyObject;
export declare function generatePrivateKeyPKCS1(options?: Partial<{
    modulusLength: number;
}>): Buffer;
export declare function generatePrivateKeyPKCS8(options?: Partial<{
    modulusLength: number;
}>): Buffer;
export declare function generatePrivateKeyJWK(options?: Partial<{
    modulusLength: number;
}>): jwk.RSAPrivateKey;
