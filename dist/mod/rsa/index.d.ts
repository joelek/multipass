/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export declare type RSAKeyOptions = {
    modulusLength?: number;
};
export declare type RSAExportOptionsPKCS1DER = {};
export declare type RSAExportOptionsPKCS1PEM = {
    passphrase?: string;
    cipher?: string;
};
export declare type RSAExportOptionsPKCS1 = ({
    format: "der";
} & RSAExportOptionsPKCS1DER) | ({
    format: "pem";
} & RSAExportOptionsPKCS1PEM) | ({
    format?: undefined;
});
export declare type RSAExportOptionsPKCS8DER = {
    passphrase?: string;
    cipher?: string;
};
export declare type RSAExportOptionsPKCS8PEM = {
    passphrase?: string;
    cipher?: string;
};
export declare type RSAExportOptionsPKCS8 = ({
    format: "der";
} & RSAExportOptionsPKCS8DER) | ({
    format: "pem";
} & RSAExportOptionsPKCS8PEM) | ({
    format?: undefined;
});
export declare type RSAExportOptions = ({
    container: "pkcs1";
} & RSAExportOptionsPKCS1) | ({
    container: "pkcs8";
} & RSAExportOptionsPKCS8) | ({
    container?: undefined;
});
export declare type RSAOptions = RSAKeyOptions & RSAExportOptions;
export declare function generatePrivateKey(options?: RSAKeyOptions): libcrypto.KeyObject;
export declare function generatePrivateKeyPKCS1DER(options?: RSAKeyOptions & RSAExportOptionsPKCS1DER): Buffer;
export declare function generatePrivateKeyPKCS1PEM(options?: RSAKeyOptions & RSAExportOptionsPKCS1PEM): Buffer;
export declare function generatePrivateKeyPKCS1(options?: RSAKeyOptions & RSAExportOptionsPKCS1): Buffer;
export declare function generatePrivateKeyPKCS8DER(options?: RSAKeyOptions & RSAExportOptionsPKCS8DER): Buffer;
export declare function generatePrivateKeyPKCS8PEM(options?: RSAKeyOptions & RSAExportOptionsPKCS8PEM): Buffer;
export declare function generatePrivateKeyPKCS8(options?: RSAKeyOptions & RSAExportOptionsPKCS8): Buffer;
export declare function generatePrivateKeyJWK(options?: RSAKeyOptions): jwk.RSAPrivateKey;
export declare function generatePrivateKeyBuffer(options?: RSAOptions): Buffer;
