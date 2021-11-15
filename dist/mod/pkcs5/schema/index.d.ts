import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { Integer } from "../../asn1";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { Sequence } from "../../asn1";
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export declare type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node>;
export declare type ASN1Node = autoguard.guards.Reference<Node>;
export declare const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null>;
export declare type ASN1Null = autoguard.guards.Reference<Null>;
export declare const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier>;
export declare type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export declare type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export declare type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const AlgorithmIdentifier: autoguard.serialization.MessageGuard<AlgorithmIdentifier>;
export declare type AlgorithmIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1ObjectIdentifier>,
            autoguard.guards.Reference<ASN1Node>
        ]>;
    }, {}>
]>;
export declare const ECDSAWithSHA256: autoguard.serialization.MessageGuard<ECDSAWithSHA256>;
export declare type ECDSAWithSHA256 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.10045.4.3.2">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const ECDSAWithSHA384: autoguard.serialization.MessageGuard<ECDSAWithSHA384>;
export declare type ECDSAWithSHA384 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.10045.4.3.3">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const ECDSAWithSHA512: autoguard.serialization.MessageGuard<ECDSAWithSHA512>;
export declare type ECDSAWithSHA512 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.10045.4.3.4">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const SHA256WithRSAEncryption: autoguard.serialization.MessageGuard<SHA256WithRSAEncryption>;
export declare type SHA256WithRSAEncryption = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.1.11">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const SHA384WithRSAEncryption: autoguard.serialization.MessageGuard<SHA384WithRSAEncryption>;
export declare type SHA384WithRSAEncryption = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.1.12">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const SHA512WithRSAEncryption: autoguard.serialization.MessageGuard<SHA512WithRSAEncryption>;
export declare type SHA512WithRSAEncryption = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.1.13">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const AES128CBCIdentifier: autoguard.serialization.MessageGuard<AES128CBCIdentifier>;
export declare type AES128CBCIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"2.16.840.1.101.3.4.1.2">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const AES192CBCIdentifier: autoguard.serialization.MessageGuard<AES192CBCIdentifier>;
export declare type AES192CBCIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"2.16.840.1.101.3.4.1.22">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const AES256CBCIdentifier: autoguard.serialization.MessageGuard<AES256CBCIdentifier>;
export declare type AES256CBCIdentifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"2.16.840.1.101.3.4.1.42">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare const HMACSHA1Identifier: autoguard.serialization.MessageGuard<HMACSHA1Identifier>;
export declare type HMACSHA1Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.7">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA224Identifier: autoguard.serialization.MessageGuard<HMACSHA224Identifier>;
export declare type HMACSHA224Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.8">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA256Identifier: autoguard.serialization.MessageGuard<HMACSHA256Identifier>;
export declare type HMACSHA256Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.9">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA384Identifier: autoguard.serialization.MessageGuard<HMACSHA384Identifier>;
export declare type HMACSHA384Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.10">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA512Identifier: autoguard.serialization.MessageGuard<HMACSHA512Identifier>;
export declare type HMACSHA512Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.11">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA512224Identifier: autoguard.serialization.MessageGuard<HMACSHA512224Identifier>;
export declare type HMACSHA512224Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.12">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const HMACSHA512256Identifier: autoguard.serialization.MessageGuard<HMACSHA512256Identifier>;
export declare type HMACSHA512256Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.2.13">;
                }, {}>
            ]>,
            autoguard.guards.Reference<ASN1Null>
        ]>;
    }, {}>
]>;
export declare const PBKDF2Identifier1: autoguard.serialization.MessageGuard<PBKDF2Identifier1>;
export declare type PBKDF2Identifier1 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.5.12">;
                }, {}>
            ]>,
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1Sequence>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.Tuple<[
                        autoguard.guards.Union<[
                            autoguard.guards.Reference<ASN1OctetString>,
                            autoguard.guards.Reference<AlgorithmIdentifier>
                        ]>,
                        autoguard.guards.Reference<ASN1Integer>,
                        autoguard.guards.Reference<ASN1Integer>,
                        autoguard.guards.Reference<AlgorithmIdentifier>
                    ]>;
                }, {}>
            ]>
        ]>;
    }, {}>
]>;
export declare const PBKDF2Identifier2: autoguard.serialization.MessageGuard<PBKDF2Identifier2>;
export declare type PBKDF2Identifier2 = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.5.12">;
                }, {}>
            ]>,
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1Sequence>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.Tuple<[
                        autoguard.guards.Union<[
                            autoguard.guards.Reference<ASN1OctetString>,
                            autoguard.guards.Reference<AlgorithmIdentifier>
                        ]>,
                        autoguard.guards.Reference<ASN1Integer>,
                        autoguard.guards.Reference<AlgorithmIdentifier>
                    ]>;
                }, {}>
            ]>
        ]>;
    }, {}>
]>;
export declare const PBKDF2Identifier: autoguard.serialization.MessageGuard<PBKDF2Identifier>;
export declare type PBKDF2Identifier = autoguard.guards.Union<[
    autoguard.guards.Reference<PBKDF2Identifier1>,
    autoguard.guards.Reference<PBKDF2Identifier2>
]>;
export declare const PBES2Identifier: autoguard.serialization.MessageGuard<PBES2Identifier>;
export declare type PBES2Identifier = autoguard.guards.Intersection<[
    autoguard.guards.Reference<AlgorithmIdentifier>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1ObjectIdentifier>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.StringLiteral<"1.2.840.113549.1.5.13">;
                }, {}>
            ]>,
            autoguard.guards.Intersection<[
                autoguard.guards.Reference<ASN1Sequence>,
                autoguard.guards.Object<{
                    "data": autoguard.guards.Tuple<[
                        autoguard.guards.Reference<AlgorithmIdentifier>,
                        autoguard.guards.Reference<AlgorithmIdentifier>
                    ]>;
                }, {}>
            ]>
        ]>;
    }, {}>
]>;
export declare const EncryptedPrivateKeyInfo: autoguard.serialization.MessageGuard<EncryptedPrivateKeyInfo>;
export declare type EncryptedPrivateKeyInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<AlgorithmIdentifier>,
            autoguard.guards.Reference<ASN1OctetString>
        ]>;
    }, {}>
]>;
export declare namespace Autoguard {
    const Guards: {
        ASN1Integer: autoguard.guards.ReferenceGuard<Integer>;
        ASN1Node: autoguard.guards.ReferenceGuard<Node>;
        ASN1Null: autoguard.guards.ReferenceGuard<Null>;
        ASN1ObjectIdentifier: autoguard.guards.ReferenceGuard<ObjectIdentifier>;
        ASN1OctetString: autoguard.guards.ReferenceGuard<OctetString>;
        ASN1Sequence: autoguard.guards.ReferenceGuard<Sequence>;
        AlgorithmIdentifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
        }>;
        ECDSAWithSHA256: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.10045.4.3.2";
            }, Null, ...any[]];
        }>;
        ECDSAWithSHA384: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.10045.4.3.3";
            }, Null, ...any[]];
        }>;
        ECDSAWithSHA512: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.10045.4.3.4";
            }, Null, ...any[]];
        }>;
        SHA256WithRSAEncryption: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.1.11";
            }, Null, ...any[]];
        }>;
        SHA384WithRSAEncryption: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.1.12";
            }, Null, ...any[]];
        }>;
        SHA512WithRSAEncryption: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.1.13";
            }, Null, ...any[]];
        }>;
        AES128CBCIdentifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "2.16.840.1.101.3.4.1.2";
            }, OctetString, ...any[]];
        }>;
        AES192CBCIdentifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "2.16.840.1.101.3.4.1.22";
            }, OctetString, ...any[]];
        }>;
        AES256CBCIdentifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "2.16.840.1.101.3.4.1.42";
            }, OctetString, ...any[]];
        }>;
        HMACSHA1Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.7";
            }, Null, ...any[]];
        }>;
        HMACSHA224Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.8";
            }, Null, ...any[]];
        }>;
        HMACSHA256Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.9";
            }, Null, ...any[]];
        }>;
        HMACSHA384Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.10";
            }, Null, ...any[]];
        }>;
        HMACSHA512Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.11";
            }, Null, ...any[]];
        }>;
        HMACSHA512224Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.12";
            }, Null, ...any[]];
        }>;
        HMACSHA512256Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.2.13";
            }, Null, ...any[]];
        }>;
        PBKDF2Identifier1: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.5.12";
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [OctetString | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, Integer, Integer, {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, ...any[]];
            }, ...any[]];
        }>;
        PBKDF2Identifier2: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.5.12";
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [OctetString | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, Integer, {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, ...any[]];
            }, ...any[]];
        }>;
        PBKDF2Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.5.12";
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [OctetString | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, Integer, Integer, {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, ...any[]];
            }, ...any[]];
        } | {
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.5.12";
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [OctetString | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, Integer, {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, ...any[]];
            }, ...any[]];
        }>;
        PBES2Identifier: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]] & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "PRIMITIVE";
                type: "OBJECT_IDENTIFIER";
                data: "1.2.840.113549.1.5.13";
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [{
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
                }, ...any[]];
            }, ...any[]];
        }>;
        EncryptedPrivateKeyInfo: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
            }, OctetString, ...any[]];
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
