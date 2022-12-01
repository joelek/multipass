import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { BitString } from "../../asn1";
import { ECCurve } from "../../pkcs8";
import { Integer } from "../../asn1";
import { OctetString } from "../../asn1";
import { Sequence } from "../../asn1";
export declare const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString>;
export type ASN1BitString = autoguard.guards.Reference<BitString>;
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const ECPrivateKey: autoguard.serialization.MessageGuard<ECPrivateKey>;
export type ECPrivateKey = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1OctetString>,
            autoguard.guards.Object<{
                "kind": autoguard.guards.StringLiteral<"CONTEXT">;
                "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
                "type": autoguard.guards.StringLiteral<"END_OF_CONTENT">;
                "data": autoguard.guards.Tuple<[
                    autoguard.guards.Reference<ECCurve>
                ]>;
            }, {}>,
            autoguard.guards.Object<{
                "kind": autoguard.guards.StringLiteral<"CONTEXT">;
                "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
                "type": autoguard.guards.StringLiteral<"BOOLEAN">;
                "data": autoguard.guards.Tuple<[
                    autoguard.guards.Reference<ASN1BitString>
                ]>;
            }, {}>
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
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }, {
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "END_OF_CONTENT";
                data: [{
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
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "BOOLEAN";
                data: [{
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "BIT_STRING";
                    data: string;
                }];
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
