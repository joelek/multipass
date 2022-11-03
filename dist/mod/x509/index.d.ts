/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as pkcs5 from "../pkcs5";
import * as pkcs10 from "../pkcs10";
export * from "./schema";
export declare function signCertificationRequest(buffer: Buffer, issuer: pkcs10.Name, key: libcrypto.KeyObject, options?: Partial<{
    serialNumber: bigint;
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
    notBefore: Date;
    notAfter: Date;
}>): Buffer;
export declare function generateSignedCertificate(hostnames: Array<string>, subjectKey: libcrypto.KeyObject, issuerKey: libcrypto.KeyObject, csrOptions?: Partial<{
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
}>, options?: Partial<{
    serialNumber: bigint;
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
    notBefore: Date;
    notAfter: Date;
}>): Buffer;
