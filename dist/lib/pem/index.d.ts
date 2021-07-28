/// <reference types="node" />
declare type Structure = {
    label: string;
    buffer: Buffer;
};
declare function parse(string: string): Promise<Array<Structure>>;
declare function serialize(structure: Structure): Promise<string>;
export { Structure, parse, serialize };
