import * as autoguard from "@joelek/autoguard/dist/lib-shared";
import { AlgorithmIdentifier } from "../../pkcs5";
import { BitString } from "../../asn1";
import { Integer } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { Sequence } from "../../asn1";
export declare const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString>;
export type ASN1BitString = autoguard.guards.Reference<BitString>;
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null>;
export type ASN1Null = autoguard.guards.Reference<Null>;
export declare const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier>;
export type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const PKCS5AlgorithmIdentifier: autoguard.serialization.MessageGuard<PKCS5AlgorithmIdentifier>;
export type PKCS5AlgorithmIdentifier = autoguard.guards.Reference<AlgorithmIdentifier>;
export declare const PublicKeyInfo: autoguard.serialization.MessageGuard<PublicKeyInfo>;
export type PublicKeyInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<PKCS5AlgorithmIdentifier>,
            autoguard.guards.Reference<ASN1BitString>
        ]>;
    }, {}>
]>;
export declare const PrivateKeyInfo: autoguard.serialization.MessageGuard<PrivateKeyInfo>;
export type PrivateKeyInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<PKCS5AlgorithmIdentifier>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const ECCurvePrime256v1: autoguard.serialization.MessageGuard<ECCurvePrime256v1>;
export type ECCurvePrime256v1 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1ObjectIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.StringLiteral<"1.2.840.10045.3.1.7">;
    }, {}>
]>;
export declare const ECCurveSecp384r1: autoguard.serialization.MessageGuard<ECCurveSecp384r1>;
export type ECCurveSecp384r1 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1ObjectIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.StringLiteral<"1.3.132.0.34">;
    }, {}>
]>;
export declare const ECCurveSecp521r1: autoguard.serialization.MessageGuard<ECCurveSecp521r1>;
export type ECCurveSecp521r1 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1ObjectIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.StringLiteral<"1.3.132.0.35">;
    }, {}>
]>;
export declare const ECCurve: autoguard.serialization.MessageGuard<ECCurve>;
export type ECCurve = autoguard.guards.Union<[
    autoguard.guards.Reference<ECCurvePrime256v1>,
    autoguard.guards.Reference<ECCurveSecp384r1>,
    autoguard.guards.Reference<ECCurveSecp521r1>
]>;
export declare const ECIdentifier: autoguard.serialization.MessageGuard<ECIdentifier>;
export type ECIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PKCS5AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.10045.2.1">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ECCurve>
        ]>;
    }, {}>
]>;
export declare const ECPublicKey: autoguard.serialization.MessageGuard<ECPublicKey>;
export type ECPublicKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PublicKeyInfo>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ECIdentifier>,
            autoguard.guards.Reference<ASN1BitString>
        ]>;
    }, {}>
]>;
export declare const ECPrivateKey: autoguard.serialization.MessageGuard<ECPrivateKey>;
export type ECPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PrivateKeyInfo>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ECIdentifier>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const RSAIdentifier: autoguard.serialization.MessageGuard<RSAIdentifier>;
export type RSAIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PKCS5AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.1.1">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const RSAPublicKey: autoguard.serialization.MessageGuard<RSAPublicKey>;
export type RSAPublicKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PublicKeyInfo>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<RSAIdentifier>,
            autoguard.guards.Reference<ASN1BitString>
        ]>;
    }, {}>
]>;
export declare const RSAPrivateKey: autoguard.serialization.MessageGuard<RSAPrivateKey>;
export type RSAPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<PrivateKeyInfo>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<RSAIdentifier>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare namespace Autoguard {
    const Guards: {
        ASN1BitString: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "BIT_STRING";
            data: string;
        }>;
        ASN1Integer: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "INTEGER";
            data: string;
        }>;
        ASN1Null: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "NULL";
            data: string;
        }>;
        ASN1ObjectIdentifier: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: string;
        }>;
        ASN1OctetString: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OCTET_STRING";
            data: string;
        }>;
        ASN1Sequence: autoguard.guards.ReferenceGuard<{
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
        PKCS5AlgorithmIdentifier: autoguard.guards.ReferenceGuard<{
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
                type: "OBJECT_IDENTIFIER";
                data: string;
            }, {
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }];
        }>;
        PublicKeyInfo: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BIT_STRING";
                data: string;
            }];
        }>;
        PrivateKeyInfo: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        ECCurvePrime256v1: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.2.840.10045.3.1.7";
        }>;
        ECCurveSecp384r1: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.3.132.0.34";
        }>;
        ECCurveSecp521r1: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.3.132.0.35";
        }>;
        ECCurve: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.2.840.10045.3.1.7";
        } | {
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.3.132.0.34";
        } | {
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "OBJECT_IDENTIFIER";
            data: "1.3.132.0.35";
        }>;
        ECIdentifier: autoguard.guards.ReferenceGuard<{
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
                type: "OBJECT_IDENTIFIER";
                data: string;
            }, {
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }] & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.10045.2.1";
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.10045.3.1.7";
            } | {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.3.132.0.34";
            } | {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.3.132.0.35";
            }];
        }>;
        ECPublicKey: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BIT_STRING";
                data: string;
            }] & [{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }] & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.10045.2.1";
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.10045.3.1.7";
                } | {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.34";
                } | {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.35";
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BIT_STRING";
                data: string;
            }];
        }>;
        ECPrivateKey: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }] & [{
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
                }> & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }] & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.10045.2.1";
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.10045.3.1.7";
                } | {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.34";
                } | {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.35";
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        RSAIdentifier: autoguard.guards.ReferenceGuard<{
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
                type: "OBJECT_IDENTIFIER";
                data: string;
            }, {
                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                form: "PRIMITIVE" | "CONSTRUCTED";
                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                data: string | autoguard.guards.Array<any>;
            }] & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.1.1";
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "NULL";
                data: string;
            }];
        }>;
        RSAPublicKey: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BIT_STRING";
                data: string;
            }] & [{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }] & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.113549.1.1.1";
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "NULL";
                    data: string;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BIT_STRING";
                data: string;
            }];
        }>;
        RSAPrivateKey: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }] & [{
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
                }> & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }] & [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.113549.1.1.1";
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "NULL";
                    data: string;
                }];
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
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
