import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { BitString } from "../../asn1";
import { ECCurve } from "../../pkcs8";
import { Integer } from "../../asn1";
import { OctetString } from "../../asn1";
import { Sequence } from "../../asn1";
export declare const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString>;
export declare type ASN1BitString = autoguard.guards.Reference<BitString>;
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export declare type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export declare type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export declare type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const ECPrivateKey: autoguard.serialization.MessageGuard<ECPrivateKey>;
export declare type ECPrivateKey = autoguard.guards.Intersection<[
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
        ASN1BitString: autoguard.guards.ReferenceGuard<BitString>;
        ASN1Integer: autoguard.guards.ReferenceGuard<Integer>;
        ASN1OctetString: autoguard.guards.ReferenceGuard<OctetString>;
        ASN1Sequence: autoguard.guards.ReferenceGuard<Sequence>;
        ECPrivateKey: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, OctetString, autoguard.guards.Object<{
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "END_OF_CONTENT";
                data: [{
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.2.840.10045.3.1.7";
                } | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.34";
                } | {
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "PRIMITIVE";
                    type: "OBJECT_IDENTIFIER";
                    data: "1.3.132.0.35";
                }, ...any[]];
            }, {}>, autoguard.guards.Object<{
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "BOOLEAN";
                data: [BitString, ...any[]];
            }, {}>, ...any[]];
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
