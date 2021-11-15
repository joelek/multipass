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
        ASN1Integer: autoguard.guards.ReferenceGuard<Integer>;
        ASN1Sequence: autoguard.guards.ReferenceGuard<Sequence>;
        OtherPrimeInfo: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, Integer, Integer, ...any[]];
        }>;
        OtherPrimeInfos: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<import("../../asn1").Node> & autoguard.guards.Array<{
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, Integer, Integer, ...any[]];
            }>;
        }>;
        RSAPublicKey: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, Integer, ...any[]];
        }>;
        RSAPrivateKey: autoguard.guards.ReferenceGuard<{
            [x: string]: any;
            kind: "UNIVERSAL";
            form: "CONSTRUCTED";
            type: "SEQUENCE";
            data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, Integer, Integer, Integer, Integer, Integer, Integer, Integer, Integer, {
                [x: string]: any;
                kind: "UNIVERSAL";
                form: "CONSTRUCTED";
                type: "SEQUENCE";
                data: autoguard.guards.Array<import("../../asn1").Node> & autoguard.guards.Array<{
                    [x: string]: any;
                    kind: "UNIVERSAL";
                    form: "CONSTRUCTED";
                    type: "SEQUENCE";
                    data: autoguard.guards.Array<import("../../asn1").Node> & [Integer, Integer, Integer, ...any[]];
                }>;
            } | undefined, ...any[]];
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
