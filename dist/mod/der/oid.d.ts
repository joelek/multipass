/// <reference types="node" />
import * as parsing from "../parsing";
export declare function parse(parser: parsing.Parser): Array<number>;
export declare function serialize(arcs: Array<number>): Buffer;
