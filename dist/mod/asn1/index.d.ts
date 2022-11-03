/// <reference types="node" />
import * as schema from "./schema";
export * from "./schema";
export declare const SEQUENCE: schema.Sequence;
export declare const SET: schema.Set;
export declare const INTEGER: schema.Integer;
export declare const OBJECT_IDENTIFER: schema.ObjectIdentifier;
export declare const NULL: schema.Null;
export declare const OCTET_STRING: schema.OctetString;
export declare const BIT_STRING: schema.BitString;
export declare const UTF8_STRING: schema.UTF8String;
export declare const DATE: schema.Date;
export declare const UTC_TIME: schema.UTCTime;
export declare const BOOLEAN: schema.Boolean;
export declare function decodeInteger(buffer: Buffer, options?: Partial<{
    paddedUnsigned: boolean;
}>): bigint;
export declare function encodeInteger(number: bigint, options?: Partial<{
    paddedUnsigned: boolean;
}>): Buffer;
export declare function encodeUTCTime(date: Date): string;
export declare function decodeUTCTime(string: string): Date;
