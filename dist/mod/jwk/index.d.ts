import * as schema from "./schema";
export * from "./schema";
export declare function getJWKInteger(string: string): string;
export declare function getASN1Integer(string: string): string;
export declare function getPublicKey(key: schema.AssymetricKey): schema.PublicKey;
export declare function computeThumbprint(key: schema.AssymetricKey): string;
