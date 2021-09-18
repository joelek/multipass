import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { Integer } from "../../asn1";
import { Sequence } from "../../asn1";
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export declare type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export declare type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const OtherPrimeInfo: autoguard.serialization.MessageGuard<OtherPrimeInfo>;
export declare type OtherPrimeInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>
        ]>;
    }, {}>
]>;
export declare const OtherPrimeInfos: autoguard.serialization.MessageGuard<OtherPrimeInfos>;
export declare type OtherPrimeInfos = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Array<autoguard.guards.Reference<OtherPrimeInfo>>;
    }, {}>
]>;
export declare const RSAPublicKey: autoguard.serialization.MessageGuard<RSAPublicKey>;
export declare type RSAPublicKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>
        ]>;
    }, {}>
]>;
export declare const RSAPrivateKey: autoguard.serialization.MessageGuard<RSAPrivateKey>;
export declare type RSAPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Union<[
                autoguard.guards.Reference<OtherPrimeInfos>,
                autoguard.guards.Undefined
            ]>
        ]>;
    }, {}>
]>;
export declare namespace Autoguard {
    const Guards: {
        ASN1Integer: autoguard.serialization.MessageGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "INTEGER";
            data: string;
        }>;
        ASN1Sequence: autoguard.serialization.MessageGuard<{
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
        OtherPrimeInfo: autoguard.serialization.MessageGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }> & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }];
        }>;
        OtherPrimeInfos: autoguard.serialization.MessageGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }> & autoguard.guards.Array<{
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<{
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }> & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "INTEGER";
                    data: string;
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "INTEGER";
                    data: string;
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "INTEGER";
                    data: string;
                }];
            }>;
        }>;
        RSAPublicKey: autoguard.serialization.MessageGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }> & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }];
        }>;
        RSAPrivateKey: autoguard.serialization.MessageGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<{
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }> & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "INTEGER";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<{
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }> & autoguard.guards.Array<{
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<{
                        kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                        form: "PRIMITIVE" | "CONSTRUCTED";
                        type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                        data: string | autoguard.guards.Array<any>;
                    }> & [{
                        kind: "UNIVERSAL";
                        form: "PRIMITIVE";
                        type: "INTEGER";
                        data: string;
                    }, {
                        kind: "UNIVERSAL";
                        form: "PRIMITIVE";
                        type: "INTEGER";
                        data: string;
                    }, {
                        kind: "UNIVERSAL";
                        form: "PRIMITIVE";
                        type: "INTEGER";
                        data: string;
                    }];
                }>;
            } | undefined];
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
