/// <reference types="node" />
export declare type PublicKey = {
    modulus: Buffer;
    public_exponent: Buffer;
};
export declare type PrivateKey = {
    version: Buffer;
    modulus: Buffer;
    public_exponent: Buffer;
    private_exponent: Buffer;
    prime_one: Buffer;
    prime_two: Buffer;
    exponent_one: Buffer;
    exponent_two: Buffer;
    coefficient: Buffer;
};
export declare function generatePrivateKeyDer(): Promise<Buffer>;
export declare function generatePrivateKey(): Promise<PrivateKey>;
