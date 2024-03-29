export type Any = boolean | null | number | string | undefined | Any[] | {
    [key: string]: Any;
};
export type Array = Any[];
export type Object = {
    [key: string]: Any;
};
