/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as schema from "../../schema";
import { Algorithm } from "../algorithm";
export interface SignatureAlgorithm extends Algorithm {
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
}
export declare function fromIdentifier(node: schema.AlgorithmIdentifier): SignatureAlgorithm;
export declare function fromJoseType(joseType: string): SignatureAlgorithm;
export declare class ECDSAWithSHA256 implements SignatureAlgorithm {
    private format;
    constructor(options?: Partial<{
        format: "ieee-p1363" | "der";
    }>);
    getIdentifier(): schema.ECDSAWithSHA256;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA256;
}
export declare class ECDSAWithSHA384 implements SignatureAlgorithm {
    private format;
    constructor(options?: Partial<{
        format: "ieee-p1363" | "der";
    }>);
    getIdentifier(): schema.ECDSAWithSHA384;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA384;
}
export declare class ECDSAWithSHA512 implements SignatureAlgorithm {
    private format;
    constructor(options?: Partial<{
        format: "ieee-p1363" | "der";
    }>);
    getIdentifier(): schema.ECDSAWithSHA512;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): ECDSAWithSHA512;
}
export declare class SHA256WithRSAEncryption implements SignatureAlgorithm {
    constructor();
    getIdentifier(): schema.SHA256WithRSAEncryption;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): SHA256WithRSAEncryption;
}
export declare class SHA384WithRSAEncryption implements SignatureAlgorithm {
    constructor();
    getIdentifier(): schema.SHA384WithRSAEncryption;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): SHA384WithRSAEncryption;
}
export declare class SHA512WithRSAEncryption implements SignatureAlgorithm {
    constructor();
    getIdentifier(): schema.SHA512WithRSAEncryption;
    getJoseType(): string;
    sign(buffer: Buffer, key: libcrypto.KeyObject): Buffer;
    verify(buffer: Buffer, key: libcrypto.KeyObject, signature: Buffer): boolean;
    static fromIdentifier(node: schema.AlgorithmIdentifier): SHA512WithRSAEncryption;
}
