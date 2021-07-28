/// <reference types="node" />
declare function readFileToBuffer(path: string): Promise<Buffer>;
declare function writeBufferToFile(path: string, buffer: Buffer): Promise<void>;
export { readFileToBuffer, writeBufferToFile };
