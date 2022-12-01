import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
export declare enum Kind {
    "UNIVERSAL" = 0,
    "APPLICATION" = 1,
    "CONTEXT" = 2,
    "PRIVATE" = 3
}
export declare namespace Kind {
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"UNIVERSAL">,
        autoguard.guards.StringLiteral<"APPLICATION">,
        autoguard.guards.StringLiteral<"CONTEXT">,
        autoguard.guards.StringLiteral<"PRIVATE">
    ]>;
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
        autoguard.guards.NumberLiteral<0>,
        autoguard.guards.NumberLiteral<1>,
        autoguard.guards.NumberLiteral<2>,
        autoguard.guards.NumberLiteral<3>
    ]>;
    function keyFromValue(value: number): Key;
    function valueFromKey(key: string): Value;
}
export declare enum Form {
    "PRIMITIVE" = 0,
    "CONSTRUCTED" = 1
}
export declare namespace Form {
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"PRIMITIVE">,
        autoguard.guards.StringLiteral<"CONSTRUCTED">
    ]>;
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
        autoguard.guards.NumberLiteral<0>,
        autoguard.guards.NumberLiteral<1>
    ]>;
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
    const Key: autoguard.serialization.MessageGuard<Key>;
    type Key = autoguard.guards.Union<[
        autoguard.guards.StringLiteral<"END_OF_CONTENT">,
        autoguard.guards.StringLiteral<"BOOLEAN">,
        autoguard.guards.StringLiteral<"INTEGER">,
        autoguard.guards.StringLiteral<"BIT_STRING">,
        autoguard.guards.StringLiteral<"OCTET_STRING">,
        autoguard.guards.StringLiteral<"NULL">,
        autoguard.guards.StringLiteral<"OBJECT_IDENTIFIER">,
        autoguard.guards.StringLiteral<"OBJECT_DESCRIPTOR">,
        autoguard.guards.StringLiteral<"EXTERNAL">,
        autoguard.guards.StringLiteral<"REAL">,
        autoguard.guards.StringLiteral<"ENUMERATED">,
        autoguard.guards.StringLiteral<"EMBEDDED_PDV">,
        autoguard.guards.StringLiteral<"UTF8_STRING">,
        autoguard.guards.StringLiteral<"RELATIVE_OID">,
        autoguard.guards.StringLiteral<"TIME">,
        autoguard.guards.StringLiteral<"0F_RESERVED">,
        autoguard.guards.StringLiteral<"SEQUENCE">,
        autoguard.guards.StringLiteral<"SET">,
        autoguard.guards.StringLiteral<"NUMERIC_STRING">,
        autoguard.guards.StringLiteral<"PRINTABLE_STRING">,
        autoguard.guards.StringLiteral<"T61_STRING">,
        autoguard.guards.StringLiteral<"VIDEOTEX_STRING">,
        autoguard.guards.StringLiteral<"IA5_STRING">,
        autoguard.guards.StringLiteral<"UTC_TIME">,
        autoguard.guards.StringLiteral<"GENERALIZED_TIME">,
        autoguard.guards.StringLiteral<"GRAPHIC_STRING">,
        autoguard.guards.StringLiteral<"VISIBLE_STRING">,
        autoguard.guards.StringLiteral<"GENERAL_STRING">,
        autoguard.guards.StringLiteral<"UNIVERSAL_STRING">,
        autoguard.guards.StringLiteral<"CHARACTER_STRING">,
        autoguard.guards.StringLiteral<"BMP_STRING">,
        autoguard.guards.StringLiteral<"DATE">,
        autoguard.guards.StringLiteral<"TIME_OF_DAY">,
        autoguard.guards.StringLiteral<"DATE_TIME">,
        autoguard.guards.StringLiteral<"DURATION">,
        autoguard.guards.StringLiteral<"OID_IRI">,
        autoguard.guards.StringLiteral<"RELATIVE_OID_IRI">
    ]>;
    const Value: autoguard.serialization.MessageGuard<Value>;
    type Value = autoguard.guards.Union<[
        autoguard.guards.NumberLiteral<0>,
        autoguard.guards.NumberLiteral<1>,
        autoguard.guards.NumberLiteral<2>,
        autoguard.guards.NumberLiteral<3>,
        autoguard.guards.NumberLiteral<4>,
        autoguard.guards.NumberLiteral<5>,
        autoguard.guards.NumberLiteral<6>,
        autoguard.guards.NumberLiteral<7>,
        autoguard.guards.NumberLiteral<8>,
        autoguard.guards.NumberLiteral<9>,
        autoguard.guards.NumberLiteral<10>,
        autoguard.guards.NumberLiteral<11>,
        autoguard.guards.NumberLiteral<12>,
        autoguard.guards.NumberLiteral<13>,
        autoguard.guards.NumberLiteral<14>,
        autoguard.guards.NumberLiteral<15>,
        autoguard.guards.NumberLiteral<16>,
        autoguard.guards.NumberLiteral<17>,
        autoguard.guards.NumberLiteral<18>,
        autoguard.guards.NumberLiteral<19>,
        autoguard.guards.NumberLiteral<20>,
        autoguard.guards.NumberLiteral<21>,
        autoguard.guards.NumberLiteral<22>,
        autoguard.guards.NumberLiteral<23>,
        autoguard.guards.NumberLiteral<24>,
        autoguard.guards.NumberLiteral<25>,
        autoguard.guards.NumberLiteral<26>,
        autoguard.guards.NumberLiteral<27>,
        autoguard.guards.NumberLiteral<28>,
        autoguard.guards.NumberLiteral<29>,
        autoguard.guards.NumberLiteral<30>,
        autoguard.guards.NumberLiteral<31>,
        autoguard.guards.NumberLiteral<32>,
        autoguard.guards.NumberLiteral<33>,
        autoguard.guards.NumberLiteral<34>,
        autoguard.guards.NumberLiteral<35>,
        autoguard.guards.NumberLiteral<36>
    ]>;
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
