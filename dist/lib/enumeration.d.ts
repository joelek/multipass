declare type Enumeration = {
    [key: number]: undefined | string;
};
declare function nameOf<A extends Enumeration>(enumeration: A, index: number): Promise<keyof A>;
export { nameOf };
