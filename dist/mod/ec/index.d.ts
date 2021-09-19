/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export declare function generatePrivateKey(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
}>): libcrypto.KeyObject;
export declare function generatePrivateKeyPKCS8(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
}>): Buffer;
export declare function generatePrivateKeySEC1(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
}>): Buffer;
export declare function generatePrivateKeyJWK(options?: Partial<{
    namedCurve: "prime256v1" | "secp384r1" | "secp521r1" | string;
}>): jwk.ECPrivateKey;
