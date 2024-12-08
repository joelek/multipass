"use strict";
// This file was auto-generated by @joelek/autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.Certificate = exports.TBSCertificate = exports.BasicConstraintsExtension = exports.AuthorityKeyIdentifierExtension = exports.SubjectKeyIdentifierExtension = exports.Validity = exports.CertificateSerialNumber = exports.Version = exports.ASN1Boolean = exports.ASN1UTCTime = exports.ASN1UTF8String = exports.ASN1Set = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Node = exports.ASN1Null = exports.ASN1Integer = exports.ASN1BitString = void 0;
const autoguard = require("@joelek/autoguard/dist/lib-shared");
const pkcs5_1 = require("../../pkcs5");
const asn1_1 = require("../../asn1");
const asn1_2 = require("../../asn1");
const pkcs10_1 = require("../../pkcs10");
const pkcs10_2 = require("../../pkcs10");
const asn1_3 = require("../../asn1");
const pkcs10_3 = require("../../pkcs10");
const asn1_4 = require("../../asn1");
const asn1_5 = require("../../asn1");
const asn1_6 = require("../../asn1");
const asn1_7 = require("../../asn1");
const pkcs8_1 = require("../../pkcs8");
const asn1_8 = require("../../asn1");
const asn1_9 = require("../../asn1");
const asn1_10 = require("../../asn1");
const asn1_11 = require("../../asn1");
exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_3.Integer);
exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_5.Null);
exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_4.Node);
exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_6.ObjectIdentifier);
exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_7.OctetString);
exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_8.Sequence);
exports.ASN1Set = autoguard.guards.Reference.of(() => asn1_9.Set);
exports.ASN1UTF8String = autoguard.guards.Reference.of(() => asn1_11.UTF8String);
exports.ASN1UTCTime = autoguard.guards.Reference.of(() => asn1_10.UTCTime);
exports.ASN1Boolean = autoguard.guards.Reference.of(() => asn1_2.Boolean);
exports.Version = autoguard.guards.Reference.of(() => exports.ASN1Integer);
exports.CertificateSerialNumber = autoguard.guards.Reference.of(() => exports.ASN1Integer);
exports.Validity = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1UTCTime), autoguard.guards.Reference.of(() => exports.ASN1UTCTime))
}, {}));
exports.SubjectKeyIdentifierExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.5.29.14")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.AuthorityKeyIdentifierExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.5.29.35")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.BasicConstraintsExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.5.29.19")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Boolean), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.TBSCertificate = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
        "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
        "type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.Version))
    }, {}), autoguard.guards.Reference.of(() => exports.CertificateSerialNumber), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => pkcs10_3.Name), autoguard.guards.Reference.of(() => exports.Validity), autoguard.guards.Reference.of(() => pkcs10_3.Name), autoguard.guards.Reference.of(() => pkcs8_1.PublicKeyInfo), autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
        "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
        "type": autoguard.guards.StringLiteral.of("BIT_STRING"),
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => pkcs10_2.Extensions))
    }, {}))
}, {}));
exports.Certificate = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.TBSCertificate), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
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
        "ASN1Set": autoguard.guards.Reference.of(() => exports.ASN1Set),
        "ASN1UTF8String": autoguard.guards.Reference.of(() => exports.ASN1UTF8String),
        "ASN1UTCTime": autoguard.guards.Reference.of(() => exports.ASN1UTCTime),
        "ASN1Boolean": autoguard.guards.Reference.of(() => exports.ASN1Boolean),
        "Version": autoguard.guards.Reference.of(() => exports.Version),
        "CertificateSerialNumber": autoguard.guards.Reference.of(() => exports.CertificateSerialNumber),
        "Validity": autoguard.guards.Reference.of(() => exports.Validity),
        "SubjectKeyIdentifierExtension": autoguard.guards.Reference.of(() => exports.SubjectKeyIdentifierExtension),
        "AuthorityKeyIdentifierExtension": autoguard.guards.Reference.of(() => exports.AuthorityKeyIdentifierExtension),
        "BasicConstraintsExtension": autoguard.guards.Reference.of(() => exports.BasicConstraintsExtension),
        "TBSCertificate": autoguard.guards.Reference.of(() => exports.TBSCertificate),
        "Certificate": autoguard.guards.Reference.of(() => exports.Certificate)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
