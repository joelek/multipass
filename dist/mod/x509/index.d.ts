/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as pkcs5 from "../pkcs5";
import * as pkcs10 from "../pkcs10";
export * from "./schema";
export declare function signCertificationRequest(buffer: Buffer, issuer: pkcs10.Name, key: libcrypto.KeyObject, options?: Partial<{
    serialNumber: bigint;
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
    validityPeriod: {
        notBefore: Date;
        notAfter: Date;
    } | {
        days: number;
    };
}>): Buffer;
export declare function generateSelfSignedCertificate(hostnames: Array<string>, key: libcrypto.KeyObject, options?: Partial<{
    serialNumber: bigint;
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
    validityPeriod: {
        notBefore: Date;
        notAfter: Date;
    } | {
        days: number;
    };
}>): Buffer;
