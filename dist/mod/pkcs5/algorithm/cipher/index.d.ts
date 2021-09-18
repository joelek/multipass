/// <reference types="node" />
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";
export interface CipherAlgorithm extends Algorithm {
    decrypt(ciphertext: Buffer, key: Buffer): Buffer;
    encrypt(plaintext: Buffer, key: Buffer): Buffer;
    getKeyLength(): number;
}
export declare function fromIdentifier(node: schema.AlgorithmIdentifier): CipherAlgorithm;
export declare class AES128CBCAlgorithm implements CipherAlgorithm {
    private iv;
    constructor(options?: Partial<{
        iv: Buffer;
    }>);
    decrypt(ciphertext: Buffer, key: Buffer): Buffer;
    encrypt(plaintext: Buffer, key: Buffer): Buffer;
    getKeyLength(): number;
    getIdentifier(): schema.AES128CBCIdentifier;
    static fromIdentifier(node: schema.AlgorithmIdentifier): AES128CBCAlgorithm;
}
export declare class AES192CBCAlgorithm implements CipherAlgorithm {
    private iv;
    constructor(options?: Partial<{
        iv: Buffer;
    }>);
    decrypt(ciphertext: Buffer, key: Buffer): Buffer;
    encrypt(plaintext: Buffer, key: Buffer): Buffer;
    getKeyLength(): number;
    getIdentifier(): schema.AES192CBCIdentifier;
    static fromIdentifier(node: schema.AlgorithmIdentifier): AES192CBCAlgorithm;
}
export declare class AES256CBCAlgorithm implements CipherAlgorithm {
    private iv;
    constructor(options?: Partial<{
        iv: Buffer;
    }>);
    decrypt(ciphertext: Buffer, key: Buffer): Buffer;
    encrypt(plaintext: Buffer, key: Buffer): Buffer;
    getKeyLength(): number;
    getIdentifier(): schema.AES256CBCIdentifier;
    static fromIdentifier(node: schema.AlgorithmIdentifier): AES256CBCAlgorithm;
}
