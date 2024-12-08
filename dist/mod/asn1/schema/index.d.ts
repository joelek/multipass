import * as autoguard from "@joelek/autoguard/dist/lib-shared";
export declare enum Kind {
    "UNIVERSAL" = 0,
    "APPLICATION" = 1,
    "CONTEXT" = 2,
    "PRIVATE" = 3
}
export declare namespace Kind {
    const Entries: readonly [{
        readonly key: "UNIVERSAL";
        readonly value: 0;
    }, {
        readonly key: "APPLICATION";
        readonly value: 1;
    }, {
        readonly key: "CONTEXT";
        readonly value: 2;
    }, {
        readonly key: "PRIVATE";
        readonly value: 3;
    }];
    const Keys: readonly ["UNIVERSAL", "APPLICATION", "CONTEXT", "PRIVATE"];
    const Values: readonly [0, 1, 2, 3];
    const KeyToValueMap: {
        readonly UNIVERSAL: 0;
        readonly APPLICATION: 1;
        readonly CONTEXT: 2;
        readonly PRIVATE: 3;
    };
    const ValueToKeyMap: {
        readonly 0: "UNIVERSAL";
        readonly 1: "APPLICATION";
        readonly 2: "CONTEXT";
        readonly 3: "PRIVATE";
    };
    type Key = typeof Keys[number];
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Value = typeof Values[number];
    const Value: autoguard.serialization.MessageGuard<Value>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare enum Form {
    "PRIMITIVE" = 0,
    "CONSTRUCTED" = 1
}
export declare namespace Form {
    const Entries: readonly [{
        readonly key: "PRIMITIVE";
        readonly value: 0;
    }, {
        readonly key: "CONSTRUCTED";
        readonly value: 1;
    }];
    const Keys: readonly ["PRIMITIVE", "CONSTRUCTED"];
    const Values: readonly [0, 1];
    const KeyToValueMap: {
        readonly PRIMITIVE: 0;
        readonly CONSTRUCTED: 1;
    };
    const ValueToKeyMap: {
        readonly 0: "PRIMITIVE";
        readonly 1: "CONSTRUCTED";
    };
    type Key = typeof Keys[number];
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Value = typeof Values[number];
    const Value: autoguard.serialization.MessageGuard<Value>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare enum Type {
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
export declare namespace Type {
    const Entries: readonly [{
        readonly key: "END_OF_CONTENT";
        readonly value: 0;
    }, {
        readonly key: "BOOLEAN";
        readonly value: 1;
    }, {
        readonly key: "INTEGER";
        readonly value: 2;
    }, {
        readonly key: "BIT_STRING";
        readonly value: 3;
    }, {
        readonly key: "OCTET_STRING";
        readonly value: 4;
    }, {
        readonly key: "NULL";
        readonly value: 5;
    }, {
        readonly key: "OBJECT_IDENTIFIER";
        readonly value: 6;
    }, {
        readonly key: "OBJECT_DESCRIPTOR";
        readonly value: 7;
    }, {
        readonly key: "EXTERNAL";
        readonly value: 8;
    }, {
        readonly key: "REAL";
        readonly value: 9;
    }, {
        readonly key: "ENUMERATED";
        readonly value: 10;
    }, {
        readonly key: "EMBEDDED_PDV";
        readonly value: 11;
    }, {
        readonly key: "UTF8_STRING";
        readonly value: 12;
    }, {
        readonly key: "RELATIVE_OID";
        readonly value: 13;
    }, {
        readonly key: "TIME";
        readonly value: 14;
    }, {
        readonly key: "0F_RESERVED";
        readonly value: 15;
    }, {
        readonly key: "SEQUENCE";
        readonly value: 16;
    }, {
        readonly key: "SET";
        readonly value: 17;
    }, {
        readonly key: "NUMERIC_STRING";
        readonly value: 18;
    }, {
        readonly key: "PRINTABLE_STRING";
        readonly value: 19;
    }, {
        readonly key: "T61_STRING";
        readonly value: 20;
    }, {
        readonly key: "VIDEOTEX_STRING";
        readonly value: 21;
    }, {
        readonly key: "IA5_STRING";
        readonly value: 22;
    }, {
        readonly key: "UTC_TIME";
        readonly value: 23;
    }, {
        readonly key: "GENERALIZED_TIME";
        readonly value: 24;
    }, {
        readonly key: "GRAPHIC_STRING";
        readonly value: 25;
    }, {
        readonly key: "VISIBLE_STRING";
        readonly value: 26;
    }, {
        readonly key: "GENERAL_STRING";
        readonly value: 27;
    }, {
        readonly key: "UNIVERSAL_STRING";
        readonly value: 28;
    }, {
        readonly key: "CHARACTER_STRING";
        readonly value: 29;
    }, {
        readonly key: "BMP_STRING";
        readonly value: 30;
    }, {
        readonly key: "DATE";
        readonly value: 31;
    }, {
        readonly key: "TIME_OF_DAY";
        readonly value: 32;
    }, {
        readonly key: "DATE_TIME";
        readonly value: 33;
    }, {
        readonly key: "DURATION";
        readonly value: 34;
    }, {
        readonly key: "OID_IRI";
        readonly value: 35;
    }, {
        readonly key: "RELATIVE_OID_IRI";
        readonly value: 36;
    }];
    const Keys: readonly ["END_OF_CONTENT", "BOOLEAN", "INTEGER", "BIT_STRING", "OCTET_STRING", "NULL", "OBJECT_IDENTIFIER", "OBJECT_DESCRIPTOR", "EXTERNAL", "REAL", "ENUMERATED", "EMBEDDED_PDV", "UTF8_STRING", "RELATIVE_OID", "TIME", "0F_RESERVED", "SEQUENCE", "SET", "NUMERIC_STRING", "PRINTABLE_STRING", "T61_STRING", "VIDEOTEX_STRING", "IA5_STRING", "UTC_TIME", "GENERALIZED_TIME", "GRAPHIC_STRING", "VISIBLE_STRING", "GENERAL_STRING", "UNIVERSAL_STRING", "CHARACTER_STRING", "BMP_STRING", "DATE", "TIME_OF_DAY", "DATE_TIME", "DURATION", "OID_IRI", "RELATIVE_OID_IRI"];
    const Values: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    const KeyToValueMap: {
        readonly END_OF_CONTENT: 0;
        readonly BOOLEAN: 1;
        readonly INTEGER: 2;
        readonly BIT_STRING: 3;
        readonly OCTET_STRING: 4;
        readonly NULL: 5;
        readonly OBJECT_IDENTIFIER: 6;
        readonly OBJECT_DESCRIPTOR: 7;
        readonly EXTERNAL: 8;
        readonly REAL: 9;
        readonly ENUMERATED: 10;
        readonly EMBEDDED_PDV: 11;
        readonly UTF8_STRING: 12;
        readonly RELATIVE_OID: 13;
        readonly TIME: 14;
        readonly "0F_RESERVED": 15;
        readonly SEQUENCE: 16;
        readonly SET: 17;
        readonly NUMERIC_STRING: 18;
        readonly PRINTABLE_STRING: 19;
        readonly T61_STRING: 20;
        readonly VIDEOTEX_STRING: 21;
        readonly IA5_STRING: 22;
        readonly UTC_TIME: 23;
        readonly GENERALIZED_TIME: 24;
        readonly GRAPHIC_STRING: 25;
        readonly VISIBLE_STRING: 26;
        readonly GENERAL_STRING: 27;
        readonly UNIVERSAL_STRING: 28;
        readonly CHARACTER_STRING: 29;
        readonly BMP_STRING: 30;
        readonly DATE: 31;
        readonly TIME_OF_DAY: 32;
        readonly DATE_TIME: 33;
        readonly DURATION: 34;
        readonly OID_IRI: 35;
        readonly RELATIVE_OID_IRI: 36;
    };
    const ValueToKeyMap: {
        readonly 0: "END_OF_CONTENT";
        readonly 1: "BOOLEAN";
        readonly 2: "INTEGER";
        readonly 3: "BIT_STRING";
        readonly 4: "OCTET_STRING";
        readonly 5: "NULL";
        readonly 6: "OBJECT_IDENTIFIER";
        readonly 7: "OBJECT_DESCRIPTOR";
        readonly 8: "EXTERNAL";
        readonly 9: "REAL";
        readonly 10: "ENUMERATED";
        readonly 11: "EMBEDDED_PDV";
        readonly 12: "UTF8_STRING";
        readonly 13: "RELATIVE_OID";
        readonly 14: "TIME";
        readonly 15: "0F_RESERVED";
        readonly 16: "SEQUENCE";
        readonly 17: "SET";
        readonly 18: "NUMERIC_STRING";
        readonly 19: "PRINTABLE_STRING";
        readonly 20: "T61_STRING";
        readonly 21: "VIDEOTEX_STRING";
        readonly 22: "IA5_STRING";
        readonly 23: "UTC_TIME";
        readonly 24: "GENERALIZED_TIME";
        readonly 25: "GRAPHIC_STRING";
        readonly 26: "VISIBLE_STRING";
        readonly 27: "GENERAL_STRING";
        readonly 28: "UNIVERSAL_STRING";
        readonly 29: "CHARACTER_STRING";
        readonly 30: "BMP_STRING";
        readonly 31: "DATE";
        readonly 32: "TIME_OF_DAY";
        readonly 33: "DATE_TIME";
        readonly 34: "DURATION";
        readonly 35: "OID_IRI";
        readonly 36: "RELATIVE_OID_IRI";
    };
    type Key = typeof Keys[number];
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Value = typeof Values[number];
    const Value: autoguard.serialization.MessageGuard<Value>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare const Node: autoguard.serialization.MessageGuard<Node>;
export type Node = autoguard.guards.Object<{
    "kind": autoguard.guards.Reference<Kind.Key>;
    "form": autoguard.guards.Reference<Form.Key>;
    "type": autoguard.guards.Reference<Type.Key>;
    "data": autoguard.guards.Union<[
        autoguard.guards.String,
        autoguard.guards.Array<autoguard.guards.Reference<Node>>
    ]>;
}, {}>;
export declare const BitString: autoguard.serialization.MessageGuard<BitString>;
export type BitString = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"BIT_STRING">;
    "data": autoguard.guards.String;
}, {}>;
export declare const Integer: autoguard.serialization.MessageGuard<Integer>;
export type Integer = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"INTEGER">;
    "data": autoguard.guards.String;
}, {}>;
export declare const Null: autoguard.serialization.MessageGuard<Null>;
export type Null = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"NULL">;
    "data": autoguard.guards.String;
}, {}>;
export declare const ObjectIdentifier: autoguard.serialization.MessageGuard<ObjectIdentifier>;
export type ObjectIdentifier = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"OBJECT_IDENTIFIER">;
    "data": autoguard.guards.String;
}, {}>;
export declare const OctetString: autoguard.serialization.MessageGuard<OctetString>;
export type OctetString = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"OCTET_STRING">;
    "data": autoguard.guards.String;
}, {}>;
export declare const Sequence: autoguard.serialization.MessageGuard<Sequence>;
export type Sequence = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
    "type": autoguard.guards.StringLiteral<"SEQUENCE">;
    "data": autoguard.guards.Array<autoguard.guards.Reference<Node>>;
}, {}>;
export declare const Set: autoguard.serialization.MessageGuard<Set>;
export type Set = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
    "type": autoguard.guards.StringLiteral<"SET">;
    "data": autoguard.guards.Array<autoguard.guards.Reference<Node>>;
}, {}>;
export declare const UTF8String: autoguard.serialization.MessageGuard<UTF8String>;
export type UTF8String = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"UTF8_STRING">;
    "data": autoguard.guards.String;
}, {}>;
export declare const Date: autoguard.serialization.MessageGuard<Date>;
export type Date = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"DATE">;
    "data": autoguard.guards.String;
}, {}>;
export declare const UTCTime: autoguard.serialization.MessageGuard<UTCTime>;
export type UTCTime = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"UTC_TIME">;
    "data": autoguard.guards.String;
}, {}>;
export declare const Boolean: autoguard.serialization.MessageGuard<Boolean>;
export type Boolean = autoguard.guards.Object<{
    "kind": autoguard.guards.StringLiteral<"UNIVERSAL">;
    "form": autoguard.guards.StringLiteral<"PRIMITIVE">;
    "type": autoguard.guards.StringLiteral<"BOOLEAN">;
    "data": autoguard.guards.String;
}, {}>;
export declare namespace Autoguard {
    const Guards: {
        Node: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
            form: "PRIMITIVE" | "CONSTRUCTED";
            type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
            data: string | autoguard.guards.Array<any>;
        }>;
        BitString: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "BIT_STRING";
            data: string;
        }>;
        Integer: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "INTEGER";
            data: string;
        }>;
        Null: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "NULL";
            data: string;
        }>;
        ObjectIdentifier: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: string;
        }>;
        OctetString: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OCTET_STRING";
            data: string;
        }>;
        Sequence: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }>;
        }>;
        Set: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SET";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }>;
        }>;
        UTF8String: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "UTF8_STRING";
            data: string;
        }>;
        Date: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "DATE";
            data: string;
        }>;
        UTCTime: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "UTC_TIME";
            data: string;
        }>;
        Boolean: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "BOOLEAN";
            data: string;
        }>;
    };
    type Guards = {
        [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>;
    };
    const Requests: {};
    type Requests = {
        [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>;
    };
    const Responses: {};
    type Responses = {
        [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>;
    };
}
