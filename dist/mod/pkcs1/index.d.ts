/// <reference types="node" />
/// <reference types="node" />
import * as jwk from "../jwk";
export * from "./schema";
export declare function parseRSAPublicKey(buffer: Buffer): jwk.RSAPublicKey;
export declare function serializeRSAPublicKey(key: jwk.RSAPublicKey): Buffer;
export declare function parseRSAPrivateKey(buffer: Buffer): jwk.RSAPrivateKey;
export declare function serializeRSAPrivateKey(key: jwk.RSAPrivateKey): Buffer;
