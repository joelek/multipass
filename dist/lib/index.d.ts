import * as config from "./config";
export * from "./config";
export declare function loadConfig(value: string): config.Options;
export declare function run(options: config.Options): Promise<void>;
