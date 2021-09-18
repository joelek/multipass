"use strict";
// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.CertificationRequest = exports.CertificationRequestInfo = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Node = exports.ASN1Null = exports.ASN1Integer = exports.ASN1BitString = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-shared");
const pkcs5_1 = require("../../pkcs5");
const asn1_1 = require("../../asn1");
const asn1_2 = require("../../asn1");
const asn1_3 = require("../../asn1");
const asn1_4 = require("../../asn1");
const asn1_5 = require("../../asn1");
const asn1_6 = require("../../asn1");
const pkcs8_1 = require("../../pkcs8");
const asn1_7 = require("../../asn1");
exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_2.Integer);
exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_4.Null);
exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_3.Node);
exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_5.ObjectIdentifier);
exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_6.OctetString);
exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_7.Sequence);
exports.CertificationRequestInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Node), autoguard.guards.Reference.of(() => pkcs8_1.PublicKeyInfo), autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
        "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
        "type": autoguard.guards.StringLiteral.of("END_OF_CONTENT")
    }, {}))
}, {}));
exports.CertificationRequest = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.CertificationRequestInfo), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
}, {}));
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "ASN1BitString": autoguard.guards.Reference.of(() => exports.ASN1BitString),
        "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
        "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
        "ASN1Node": autoguard.guards.Reference.of(() => exports.ASN1Node),
        "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
        "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
        "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
        "CertificationRequestInfo": autoguard.guards.Reference.of(() => exports.CertificationRequestInfo),
        "CertificationRequest": autoguard.guards.Reference.of(() => exports.CertificationRequest)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
