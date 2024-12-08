/// <reference types="node" />
/// <reference types="node" />
export declare class Parser {
    private buffer;
    private offset;
    constructor(buffer: Buffer, offset?: number);
    chunk(length: number): Buffer;
    eof(): boolean;
    signed(length: number, endian?: "big" | "little"): number;
    try<A>(supplier: (reader: Parser) => A): A;
    unsigned(length: number, endian?: "big" | "little"): number;
}
