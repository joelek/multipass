/// <reference types="node" />
declare type WebKey = {
    kty: "RSA";
    n: string;
    e: string;
};
declare class Key {
    private private_key;
    constructor(private_key: Buffer);
    getWebKey(): Promise<WebKey>;
    save(path: string): Promise<void>;
    static load(path: string): Promise<Key>;
}
export { Key };
