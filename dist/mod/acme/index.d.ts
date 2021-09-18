import * as jwk from "../jwk";
export * as api from "./api";
export * as handler from "./handler";
export declare function computeKeyAuthorization(token: string, key: jwk.AssymetricKey): string;
