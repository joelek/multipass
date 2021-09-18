/// <reference types="node" />
import * as digest from "../digest";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";
export interface DerivationAlgorithm extends Algorithm {
    deriveKey(passphrase: string, defaultKeyLength: number): Buffer;
}
export declare function fromIdentifier(node: schema.AlgorithmIdentifier): DerivationAlgorithm;
export declare class PBKDF2Algorithm implements DerivationAlgorithm {
    private salt;
    private iterations;
    private keyLength?;
    private digestAlgorithm;
    constructor(options?: Partial<{
        salt: Buffer;
        iterations: number;
        keyLength: number;
        digestAlgorithm: digest.DigestAlgorithm;
    }>);
    deriveKey(passphrase: string, defaultKeyLength: number): Buffer;
    getIdentifier(): schema.PBKDF2Identifier;
    static fromIdentifier(node: schema.AlgorithmIdentifier): PBKDF2Algorithm;
}
