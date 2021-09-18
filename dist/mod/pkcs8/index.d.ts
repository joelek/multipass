/// <reference types="node" />
import * as jwk from "../jwk";
export * from "./schema";
export declare function parseRSAPublicKey(bufferPKCS8: Buffer): jwk.RSAPublicKey;
export declare function serializeRSAPublicKey(key: jwk.RSAPublicKey): Buffer;
export declare function parseRSAPrivateKey(bufferPKCS8: Buffer): jwk.RSAPrivateKey;
export declare function serializeRSAPrivateKey(key: jwk.RSAPrivateKey): Buffer;
