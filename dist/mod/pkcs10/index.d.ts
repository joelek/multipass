/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as pkcs5 from "../pkcs5";
export * from "./schema";
export declare function getDefaultAlgorithm(key: libcrypto.KeyObject): pkcs5.signature.SignatureAlgorithm;
export declare function createSANExtension(hostnames: Array<string>): Buffer;
export declare function createCertificateRequest(hostnames: Array<string>, key: libcrypto.KeyObject, options?: Partial<{
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
}>): Buffer;
