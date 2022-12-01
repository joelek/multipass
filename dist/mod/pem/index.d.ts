/// <reference types="node" />
export type Header = {
    key: string;
    value: string;
};
export type Section = {
    preamble?: Array<string>;
    label: string;
    headers?: Array<Header>;
    buffer: Buffer;
};
export type Document = {
    sections: Array<Section>;
    postamble?: Array<string>;
};
export declare function deriveKey(data: Buffer, salt: Buffer, keyLength: number): Buffer;
export declare function decrypt(section: Section, passphrase: string): Section;
export declare function encrypt(section: Section, passphrase: string, options?: Partial<{
    algorithm: string;
    iv: Buffer;
}>): Section;
export declare function parseHeaders(lines: Array<string>): Array<Header>;
export declare function parse(string: string): Document;
export declare function serialize(document: Document): string;
