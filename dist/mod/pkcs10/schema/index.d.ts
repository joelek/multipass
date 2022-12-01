import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { AlgorithmIdentifier } from "../../pkcs5";
import { BitString } from "../../asn1";
import { Boolean } from "../../asn1";
import { Integer } from "../../asn1";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { PublicKeyInfo } from "../../pkcs8";
import { Sequence } from "../../asn1";
import { Set } from "../../asn1";
import { UTF8String } from "../../asn1";
export declare const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString>;
export type ASN1BitString = autoguard.guards.Reference<BitString>;
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null>;
export type ASN1Null = autoguard.guards.Reference<Null>;
export declare const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node>;
export type ASN1Node = autoguard.guards.Reference<Node>;
export declare const ASN1Set: autoguard.serialization.MessageGuard<ASN1Set>;
export type ASN1Set = autoguard.guards.Reference<Set>;
export declare const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier>;
export type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const ASN1UTF8String: autoguard.serialization.MessageGuard<ASN1UTF8String>;
export type ASN1UTF8String = autoguard.guards.Reference<UTF8String>;
export declare const ASN1Boolean: autoguard.serialization.MessageGuard<ASN1Boolean>;
export type ASN1Boolean = autoguard.guards.Reference<Boolean>;
export declare const AttributeTypeAndValue: autoguard.serialization.MessageGuard<AttributeTypeAndValue>;
export type AttributeTypeAndValue = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1ObjectIdentifier>,
            autoguard.guards.Reference<ASN1Node>
        ]>;
    }, {}>
]>;
export declare const CommonName: autoguard.serialization.MessageGuard<CommonName>;
export type CommonName = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AttributeTypeAndValue>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"2.5.4.3">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1UTF8String>
        ]>;
    }, {}>
]>;
export declare const RelativeDistinguishedName: autoguard.serialization.MessageGuard<RelativeDistinguishedName>;
export type RelativeDistinguishedName = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Set>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Array<autoguard.guards.Reference<AttributeTypeAndValue>>;
    }, {}>
]>;
export declare const RDNSequence: autoguard.serialization.MessageGuard<RDNSequence>;
export type RDNSequence = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Array<autoguard.guards.Reference<RelativeDistinguishedName>>;
    }, {}>
]>;
export declare const Name: autoguard.serialization.MessageGuard<Name>;
export type Name = autoguard.guards.Reference<RDNSequence>;
export declare const CRIAttribute: autoguard.serialization.MessageGuard<CRIAttribute>;
export type CRIAttribute = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1ObjectIdentifier>,
            autoguard.guards.Reference<ASN1Set>
        ]>;
    }, {}>
]>;
export declare const Extension1: autoguard.serialization.MessageGuard<Extension1>;
export type Extension1 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1ObjectIdentifier>,
            autoguard.guards.Reference<ASN1Boolean>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const Extension2: autoguard.serialization.MessageGuard<Extension2>;
export type Extension2 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1ObjectIdentifier>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const SubjectAlternativeNameExtension: autoguard.serialization.MessageGuard<SubjectAlternativeNameExtension>;
export type SubjectAlternativeNameExtension = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"2.5.29.17">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const Extension: autoguard.serialization.MessageGuard<Extension>;
export type Extension = autoguard.guards.Union<[
    autoguard.guards.Reference<Extension1>,
    autoguard.guards.Reference<Extension2>
]>;
export declare const Extensions: autoguard.serialization.MessageGuard<Extensions>;
export type Extensions = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Array<autoguard.guards.Reference<Extension>>;
    }, {}>
]>;
export declare const ExtensionRequests: autoguard.serialization.MessageGuard<ExtensionRequests>;
export type ExtensionRequests = autoguard.guards.Intersection<[
    autoguard.guards.Reference<CRIAttribute>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.9.14">;
                }, {}>
            ]>,
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1Set>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.Tuple<[
                        autoguard.guards.Reference<Extensions>
                    ]>;
                }, {}>
            ]>
        ]>;
    }, {}>
]>;
export declare const CertificationRequestInfo: autoguard.serialization.MessageGuard<CertificationRequestInfo>;
export type CertificationRequestInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<Name>,
            autoguard.guards.Reference<PublicKeyInfo>,
            autoguard.guards.Object<{
                "kind": autoguard.guards.StringLiteral<"CONTEXT">;
                "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
                "type": autoguard.guards.StringLiteral<"END_OF_CONTENT">;
                "data": autoguard.guards.Array<autoguard.guards.Reference<CRIAttribute>>;
            }, {}>
        ]>;
    }, {}>
]>;
export declare const CertificationRequest: autoguard.serialization.MessageGuard<CertificationRequest>;
export type CertificationRequest = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<CertificationRequestInfo>,
            autoguard.guards.Reference<AlgorithmIdentifier>,
            autoguard.guards.Reference<ASN1BitString>
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
        ASN1Node: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
            form: "PRIMITIVE" | "CONSTRUCTED";
            type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
            data: string | autoguard.guards.Array<any>;
        }>;
        ASN1Set: autoguard.guards.ReferenceGuard<{
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
        ASN1UTF8String: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "UTF8_STRING";
            data: string;
        }>;
        ASN1Boolean: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "PRIMITIVE";
            type: "BOOLEAN";
            data: string;
        }>;
        AttributeTypeAndValue: autoguard.guards.ReferenceGuard<{
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
        CommonName: autoguard.guards.ReferenceGuard<{
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
                data: "2.5.4.3";
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "UTF8_STRING";
                data: string;
            }];
        }>;
        RelativeDistinguishedName: autoguard.guards.ReferenceGuard<{
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SET";
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }];
            }>;
        }>;
        RDNSequence: autoguard.guards.ReferenceGuard<{
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
                type: "SET";
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
                        type: "OBJECT_IDENTIFIER";
                        data: string;
                    }, {
                        kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                        form: "PRIMITIVE" | "CONSTRUCTED";
                        type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                        data: string | autoguard.guards.Array<any>;
                    }];
                }>;
            }>;
        }>;
        Name: autoguard.guards.ReferenceGuard<{
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
                type: "SET";
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
                        type: "OBJECT_IDENTIFIER";
                        data: string;
                    }, {
                        kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                        form: "PRIMITIVE" | "CONSTRUCTED";
                        type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                        data: string | autoguard.guards.Array<any>;
                    }];
                }>;
            }>;
        }>;
        CRIAttribute: autoguard.guards.ReferenceGuard<{
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
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SET";
                data: autoguard.guards.Array<{
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }>;
            }];
        }>;
        Extension1: autoguard.guards.ReferenceGuard<{
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
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BOOLEAN";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        Extension2: autoguard.guards.ReferenceGuard<{
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
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        SubjectAlternativeNameExtension: autoguard.guards.ReferenceGuard<{
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
                data: "2.5.29.17";
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        Extension: autoguard.guards.ReferenceGuard<{
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
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "BOOLEAN";
                data: string;
            }, {
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        } | {
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
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OCTET_STRING";
                data: string;
            }];
        }>;
        Extensions: autoguard.guards.ReferenceGuard<{
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
                    type: "OBJECT_IDENTIFIER";
                    data: string;
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "BOOLEAN";
                    data: string;
                }, {
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OCTET_STRING";
                    data: string;
                }];
            } | {
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
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OCTET_STRING";
                    data: string;
                }];
            }>;
        }>;
        ExtensionRequests: autoguard.guards.ReferenceGuard<{
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
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SET";
                data: autoguard.guards.Array<{
                    kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                    form: "PRIMITIVE" | "CONSTRUCTED";
                    type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                    data: string | autoguard.guards.Array<any>;
                }>;
            }] & [{
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.9.14";
            }, {
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SET";
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
                            type: "OBJECT_IDENTIFIER";
                            data: string;
                        }, {
                            kind: "UNIVERSAL";
                            form: "PRIMITIVE";
                            type: "BOOLEAN";
                            data: string;
                        }, {
                            kind: "UNIVERSAL";
                            form: "PRIMITIVE";
                            type: "OCTET_STRING";
                            data: string;
                        }];
                    } | {
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
                            kind: "UNIVERSAL";
                            form: "PRIMITIVE";
                            type: "OCTET_STRING";
                            data: string;
                        }];
                    }>;
                }];
            }];
        }>;
        CertificationRequestInfo: autoguard.guards.ReferenceGuard<{
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
                }> & autoguard.guards.Array<{
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SET";
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
                            type: "OBJECT_IDENTIFIER";
                            data: string;
                        }, {
                            kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                            form: "PRIMITIVE" | "CONSTRUCTED";
                            type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                            data: string | autoguard.guards.Array<any>;
                        }];
                    }>;
                }>;
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
            }, {
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "END_OF_CONTENT";
                data: autoguard.guards.Array<{
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
                        kind: "UNIVERSAL";
                        form: "CONSTRUCTED";
                        type: "SET";
                        data: autoguard.guards.Array<{
                            kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                            form: "PRIMITIVE" | "CONSTRUCTED";
                            type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                            data: string | autoguard.guards.Array<any>;
                        }>;
                    }];
                }>;
            }];
        }>;
        CertificationRequest: autoguard.guards.ReferenceGuard<{
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
                        type: "SET";
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
                                type: "OBJECT_IDENTIFIER";
                                data: string;
                            }, {
                                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                                form: "PRIMITIVE" | "CONSTRUCTED";
                                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                                data: string | autoguard.guards.Array<any>;
                            }];
                        }>;
                    }>;
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
                }, {
                    kind: "CONTEXT";
                    form: "CONSTRUCTED";
                    type: "END_OF_CONTENT";
                    data: autoguard.guards.Array<{
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
                            kind: "UNIVERSAL";
                            form: "CONSTRUCTED";
                            type: "SET";
                            data: autoguard.guards.Array<{
                                kind: "UNIVERSAL" | "APPLICATION" | "CONTEXT" | "PRIVATE";
                                form: "PRIMITIVE" | "CONSTRUCTED";
                                type: "END_OF_CONTENT" | "BOOLEAN" | "INTEGER" | "BIT_STRING" | "OCTET_STRING" | "NULL" | "OBJECT_IDENTIFIER" | "OBJECT_DESCRIPTOR" | "EXTERNAL" | "REAL" | "ENUMERATED" | "EMBEDDED_PDV" | "UTF8_STRING" | "RELATIVE_OID" | "TIME" | "0F_RESERVED" | "SEQUENCE" | "SET" | "NUMERIC_STRING" | "PRINTABLE_STRING" | "T61_STRING" | "VIDEOTEX_STRING" | "IA5_STRING" | "UTC_TIME" | "GENERALIZED_TIME" | "GRAPHIC_STRING" | "VISIBLE_STRING" | "GENERAL_STRING" | "UNIVERSAL_STRING" | "CHARACTER_STRING" | "BMP_STRING" | "DATE" | "TIME_OF_DAY" | "DATE_TIME" | "DURATION" | "OID_IRI" | "RELATIVE_OID_IRI";
                                data: string | autoguard.guards.Array<any>;
                            }>;
                        }];
                    }>;
                }];
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
                type: "BIT_STRING";
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
