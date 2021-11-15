import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";
import { AlgorithmIdentifier } from "../../pkcs5";
import { BitString } from "../../asn1";
import { Integer } from "../../asn1";
import { Node } from "../../asn1";
import { Null } from "../../asn1";
import { ObjectIdentifier } from "../../asn1";
import { OctetString } from "../../asn1";
import { PublicKeyInfo } from "../../pkcs8";
import { Sequence } from "../../asn1";
export declare const ASN1BitString: autoguard.serialization.MessageGuard<ASN1BitString>;
export declare type ASN1BitString = autoguard.guards.Reference<BitString>;
export declare const ASN1Integer: autoguard.serialization.MessageGuard<ASN1Integer>;
export declare type ASN1Integer = autoguard.guards.Reference<Integer>;
export declare const ASN1Null: autoguard.serialization.MessageGuard<ASN1Null>;
export declare type ASN1Null = autoguard.guards.Reference<Null>;
export declare const ASN1Node: autoguard.serialization.MessageGuard<ASN1Node>;
export declare type ASN1Node = autoguard.guards.Reference<Node>;
export declare const ASN1ObjectIdentifier: autoguard.serialization.MessageGuard<ASN1ObjectIdentifier>;
export declare type ASN1ObjectIdentifier = autoguard.guards.Reference<ObjectIdentifier>;
export declare const ASN1OctetString: autoguard.serialization.MessageGuard<ASN1OctetString>;
export declare type ASN1OctetString = autoguard.guards.Reference<OctetString>;
export declare const ASN1Sequence: autoguard.serialization.MessageGuard<ASN1Sequence>;
export declare type ASN1Sequence = autoguard.guards.Reference<Sequence>;
export declare const CertificationRequestInfo: autoguard.serialization.MessageGuard<CertificationRequestInfo>;
export declare type CertificationRequestInfo = autoguard.guards.Intersection<[
    autoguard.guards.Reference<ASN1Sequence>,
    autoguard.guards.Object<{
        "data": autoguard.guards.Tuple<[
            autoguard.guards.Reference<ASN1Integer>,
            autoguard.guards.Reference<ASN1Node>,
            autoguard.guards.Reference<PublicKeyInfo>,
            autoguard.guards.Object<{
                "kind": autoguard.guards.StringLiteral<"CONTEXT">;
                "form": autoguard.guards.StringLiteral<"CONSTRUCTED">;
                "type": autoguard.guards.StringLiteral<"END_OF_CONTENT">;
            }, {}>
        ]>;
    }, {}>
]>;
export declare const CertificationRequest: autoguard.serialization.MessageGuard<CertificationRequest>;
export declare type CertificationRequest = autoguard.guards.Intersection<[
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
        ASN1BitString: autoguard.guards.ReferenceGuard<BitString>;
        ASN1Integer: autoguard.guards.ReferenceGuard<Integer>;
        ASN1Null: autoguard.guards.ReferenceGuard<Null>;
        ASN1Node: autoguard.guards.ReferenceGuard<Node>;
        ASN1ObjectIdentifier: autoguard.guards.ReferenceGuard<ObjectIdentifier>;
        ASN1OctetString: autoguard.guards.ReferenceGuard<OctetString>;
        ASN1Sequence: autoguard.guards.ReferenceGuard<Sequence>;
        CertificationRequestInfo: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [Integer, Node, {
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
                }, BitString, ...any[]];
            }, autoguard.guards.Object<{
                kind: "CONTEXT";
                form: "CONSTRUCTED";
                type: "END_OF_CONTENT";
            }, {}>, ...any[]];
        }>;
        CertificationRequest: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<Node> & [{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [Integer, Node, {
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
                    }, BitString, ...any[]];
                }, autoguard.guards.Object<{
                    kind: "CONTEXT";
                    form: "CONSTRUCTED";
                    type: "END_OF_CONTENT";
                }, {}>, ...any[]];
            }, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<Node> & [ObjectIdentifier, Node, ...any[]];
            }, BitString, ...any[]];
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
