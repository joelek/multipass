/// <reference types="node" />
import * as parsing from "../parsing";
export declare function encodeVarlen(number: number): Buffer;
export declare function decodeVarlen(parser: parsing.Parser): number;
export declare function encodeLength(number: number): Buffer;
export declare function decodeLength(parser: parsing.Parser): number;
