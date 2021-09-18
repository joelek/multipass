/// <reference types="node" />
import * as autoguard from "@joelek/ts-autoguard";
export declare const buffer: autoguard.serialization.MessageGuard<Buffer>;
export declare type buffer = ReturnType<typeof buffer["as"]>;
