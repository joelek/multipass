/// <reference types="node" />
import * as algorithm from "./algorithm";
export * from "./algorithm";
export * from "./schema";
export declare function decrypt(buffer: Buffer, passphrase: string): Buffer;
export declare function encrypt(plaintext: Buffer, passphrase: string, options?: Partial<{
    wrappingAlgorithm: algorithm.wrapping.WrappingAlgorithm;
}>): Buffer;
