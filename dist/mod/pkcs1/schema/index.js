"use strict";
// This file was auto-generated by @joelek/autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.RSAPrivateKey = exports.RSAPublicKey = exports.OtherPrimeInfos = exports.OtherPrimeInfo = exports.ASN1Sequence = exports.ASN1Integer = void 0;
const autoguard = require("@joelek/autoguard/dist/lib-shared");
const asn1_1 = require("../../asn1");
const asn1_2 = require("../../asn1");
exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_1.Integer);
exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_2.Sequence);
exports.OtherPrimeInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer))
}, {}));
exports.OtherPrimeInfos = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.OtherPrimeInfo))
}, {}));
exports.RSAPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer))
}, {}));
exports.RSAPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.OtherPrimeInfos), autoguard.guards.Undefined))
}, {}));
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
        "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
        "OtherPrimeInfo": autoguard.guards.Reference.of(() => exports.OtherPrimeInfo),
        "OtherPrimeInfos": autoguard.guards.Reference.of(() => exports.OtherPrimeInfos),
        "RSAPublicKey": autoguard.guards.Reference.of(() => exports.RSAPublicKey),
        "RSAPrivateKey": autoguard.guards.Reference.of(() => exports.RSAPrivateKey)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
