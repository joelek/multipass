/// <reference types="node" />
import * as asn1 from "../asn1";
import * as jwk from "../jwk";
import * as pkcs8 from "../pkcs8";
export * from "./schema";
export declare function parseCurve(node: asn1.ObjectIdentifier): "P-256" | "P-384" | "P-521";
export declare function serializeCurve(curve: "P-256" | "P-384" | "P-521"): pkcs8.ECCurve;
export declare function parsePoint(node: asn1.BitString): {
    x: string;
    y: string;
};
export declare function serializePoint(x: string, y: string): asn1.BitString;
export declare function parseECPrivateKey(buffer: Buffer): jwk.ECPrivateKey;
export declare function serializeECPrivateKey(key: jwk.ECPrivateKey): Buffer;
