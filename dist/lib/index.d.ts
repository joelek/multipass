import * as config from "./config";
export * as config from "./config";
export declare const LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
export declare const LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";
export declare function loadConfig(value: string): config.Options;
export declare function run(options: config.Options): Promise<void>;
