/// <reference types="node" />
declare function convertJSONToString(json: any): Promise<string>;
declare function convertStringToJSON(string: string): Promise<any>;
declare function convertUTF8BufferToString(buffer: Buffer): Promise<string>;
declare function convertStringToUTF8Buffer(string: string): Promise<Buffer>;
declare function convertBufferToBase64String(buffer: Buffer): Promise<string>;
declare function convertBase64StringToBuffer(string: string): Promise<Buffer>;
declare function convertBufferToBase64URLString(buffer: Buffer): Promise<string>;
declare function convertBase64URLStringToBuffer(string: string): Promise<Buffer>;
declare function convertStringToBase64String(string: string): Promise<string>;
declare function convertBase64StringToString(string: string): Promise<string>;
declare function convertStringToBase64URLString(string: string): Promise<string>;
declare function convertBase64URLStringToString(string: string): Promise<string>;
export { convertJSONToString, convertStringToJSON, convertUTF8BufferToString, convertStringToUTF8Buffer, convertBufferToBase64String, convertBase64StringToBuffer, convertBufferToBase64URLString, convertBase64URLStringToBuffer, convertStringToBase64String, convertBase64StringToString, convertStringToBase64URLString, convertBase64URLStringToString };
