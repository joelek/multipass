/// <reference types="node" />
import * as asn1 from "../asn1";
import * as parsing from "../parsing";
export declare function parse(parser: parsing.Parser): asn1.Node;
export declare function serialize(node: asn1.Node): Buffer;
export declare function parseArray(parser: parsing.Parser): Array<asn1.Node>;
export declare function serializeArray(nodes: Array<asn1.Node>): Buffer;
