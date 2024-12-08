/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as ec from "../ec";
import * as rsa from "../rsa";
export type KeyOptions = ({
    type: "ec";
} & ec.ECOptions) | ({
    type: "rsa";
} & rsa.RSAOptions);
export declare function generatePrivateKey(options?: KeyOptions): Buffer;
export type ImportOptions = {
    passphrase?: string;
};
export declare function constructPrivateKey(buffer: Buffer, options?: ImportOptions): libcrypto.KeyObject;
export declare function generateOrConstructPrivateKey(path: string, options: KeyOptions): libcrypto.KeyObject;
