/// <reference types="node" />
import * as cipher from "../cipher";
import * as derivation from "../derivation";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";
export interface WrappingAlgorithm extends Algorithm {
    unwrap(ciphertext: Buffer, passhprase: string): Buffer;
    wrap(plaintext: Buffer, passhprase: string): Buffer;
}
export declare function fromIdentifier(node: schema.AlgorithmIdentifier): WrappingAlgorithm;
export declare class PBES2Algorithm implements WrappingAlgorithm {
    private derivationAlgorithm;
    private cipherAlgorithm;
    constructor(options?: Partial<{
        derivationAlgorithm: derivation.DerivationAlgorithm;
        cipherAlgorithm: cipher.CipherAlgorithm;
    }>);
    unwrap(ciphertext: Buffer, passhprase: string): Buffer;
    wrap(plaintext: Buffer, passhprase: string): Buffer;
    getIdentifier(): schema.PBES2Identifier;
    static fromIdentifier(node: schema.AlgorithmIdentifier): PBES2Algorithm;
}
