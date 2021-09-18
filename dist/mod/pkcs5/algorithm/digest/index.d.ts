import * as schema from "../../schema";
import { Algorithm } from "../algorithm";
export interface DigestAlgorithm extends Algorithm {
    getType(): string;
}
export declare function fromIdentifier(node: schema.AlgorithmIdentifier): DigestAlgorithm;
export declare class HMACSHA1Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA1Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA1Algorithm;
}
export declare class HMACSHA224Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA224Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA224Algorithm;
}
export declare class HMACSHA256Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA256Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA256Algorithm;
}
export declare class HMACSHA384Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA384Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA384Algorithm;
}
export declare class HMACSHA512Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA512Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512Algorithm;
}
export declare class HMACSHA512224Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA512224Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512224Algorithm;
}
export declare class HMACSHA512256Algorithm implements DigestAlgorithm {
    constructor(options?: Partial<{}>);
    getIdentifier(): schema.HMACSHA512256Identifier;
    getType(): string;
    static fromIdentifier(node: schema.AlgorithmIdentifier): HMACSHA512256Algorithm;
}
