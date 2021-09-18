/// <reference types="node" />
import * as libcrypto from "crypto";
import * as json from "../json";
import * as pkcs5 from "../pkcs5";
import * as schema from "./schema";
export * from "./schema";
export declare function getDefaultAlgorithm(key: libcrypto.KeyObject): pkcs5.signature.SignatureAlgorithm;
export declare function sign(key: libcrypto.KeyObject, options?: Partial<{
    protected: json.Object;
    payload: json.Any;
    signatureAlgorithm: pkcs5.signature.SignatureAlgorithm;
}>): Promise<schema.Body>;
export declare function verify(body: schema.Body, key: libcrypto.KeyObject): Promise<boolean>;
