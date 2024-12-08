/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as libcrypto from "crypto";
import * as jwk from "../jwk";
export type ECKeyOptions = {
    namedCurve?: "prime256v1" | "secp384r1" | "secp521r1" | string;
};
export type ECExportOptionsPKCS8DER = {
    passphrase?: string;
    cipher?: string;
};
export type ECExportOptionsPKCS8PEM = {
    passphrase?: string;
    cipher?: string;
};
export type ECExportOptionsPKCS8 = ({
    format: "der";
} & ECExportOptionsPKCS8DER) | ({
    format: "pem";
} & ECExportOptionsPKCS8PEM) | ({
    format?: undefined;
});
export type ECExportOptionsSEC1DER = {};
export type ECExportOptionsSEC1PEM = {
    passphrase?: string;
    cipher?: string;
};
export type ECExportOptionsSEC1 = ({
    format: "der";
} & ECExportOptionsSEC1DER) | ({
    format: "pem";
} & ECExportOptionsSEC1PEM) | ({
    format?: undefined;
});
export type ECExportOptions = ({
    container: "pkcs8";
} & ECExportOptionsPKCS8) | ({
    container: "sec1";
} & ECExportOptionsSEC1) | ({
    container?: undefined;
});
export type ECOptions = ECKeyOptions & ECExportOptions;
export declare function generatePrivateKey(options?: ECKeyOptions): libcrypto.KeyObject;
export declare function generatePrivateKeyPKCS8DER(options?: ECKeyOptions & ECExportOptionsPKCS8DER): Buffer;
export declare function generatePrivateKeyPKCS8PEM(options?: ECKeyOptions & ECExportOptionsPKCS8PEM): Buffer;
export declare function generatePrivateKeyPKCS8(options?: ECKeyOptions & ECExportOptionsPKCS8): Buffer;
export declare function generatePrivateKeySEC1DER(options?: ECKeyOptions & ECExportOptionsSEC1DER): Buffer;
export declare function generatePrivateKeySEC1PEM(options?: ECKeyOptions & ECExportOptionsSEC1PEM): Buffer;
export declare function generatePrivateKeySEC1(options?: ECKeyOptions & ECExportOptionsSEC1): Buffer;
export declare function generatePrivateKeyJWK(options?: ECKeyOptions): jwk.ECPrivateKey;
export declare function generatePrivateKeyBuffer(options?: ECOptions): Buffer;
