/// <reference types="node" />
declare enum Type {
    "END_OF_CONTENT" = 0,
    "BOOLEAN" = 1,
    "INTEGER" = 2,
    "BIT_STRING" = 3,
    "OCTET_STRING" = 4,
    "NULL" = 5,
    "OBJECT_IDENTIFIER" = 6,
    "OBJECT_DESCRIPTOR" = 7,
    "EXTERNAL" = 8,
    "REAL" = 9,
    "ENUMERATED" = 10,
    "EMBEDDED_PDV" = 11,
    "UTF8_STRING" = 12,
    "RELATIVE_OID" = 13,
    "TIME" = 14,
    "0F_RESERVED" = 15,
    "SEQUENCE" = 16,
    "SET" = 17,
    "NUMERIC_STRING" = 18,
    "PRINTABLE_STRING" = 19,
    "T61_STRING" = 20,
    "VIDEOTEX_STRING" = 21,
    "IA5_STRING" = 22,
    "UTC_TIME" = 23,
    "GENERALIZED_TIME" = 24,
    "GRAPHIC_STRING" = 25,
    "VISIBLE_STRING" = 26,
    "GENERAL_STRING" = 27,
    "UNIVERSAL_STRING" = 28,
    "CHARACTER_STRING" = 29,
    "BMP_STRING" = 30,
    "DATE" = 31,
    "TIME_OF_DAY" = 32,
    "DATE_TIME" = 33,
    "DURATION" = 34,
    "OID_IRI" = 35,
    "RELATIVE_OID_IRI" = 36
}
declare enum Form {
    "PRIMITIVE" = 0,
    "CONSTRUCTED" = 1
}
declare enum Kind {
    "UNIVERSAL" = 0,
    "APPLICATION" = 1,
    "CONTEXT_SPECIFIC" = 2,
    "PRIVATE" = 3
}
declare type Node = {
    type: keyof typeof Type;
    form: keyof typeof Form;
    kind: keyof typeof Kind;
    data: string | Array<Node>;
};
declare function parse(buffer: Buffer): Promise<Array<Node>>;
declare function parseObjectIdentifier(buffer: Buffer): Promise<Array<number>>;
export { parse, parseObjectIdentifier };
