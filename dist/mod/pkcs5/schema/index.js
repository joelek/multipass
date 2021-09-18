"use strict";
// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.EncryptedPrivateKeyInfo = exports.PBES2Identifier = exports.PBKDF2Identifier = exports.PBKDF2Identifier2 = exports.PBKDF2Identifier1 = exports.HMACSHA512256Identifier = exports.HMACSHA512224Identifier = exports.HMACSHA512Identifier = exports.HMACSHA384Identifier = exports.HMACSHA256Identifier = exports.HMACSHA224Identifier = exports.HMACSHA1Identifier = exports.AES256CBCIdentifier = exports.AES192CBCIdentifier = exports.AES128CBCIdentifier = exports.SHA512WithRSAEncryption = exports.SHA384WithRSAEncryption = exports.SHA256WithRSAEncryption = exports.ECDSAWithSHA512 = exports.ECDSAWithSHA384 = exports.ECDSAWithSHA256 = exports.AlgorithmIdentifier = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Null = exports.ASN1Node = exports.ASN1Integer = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-shared");
const asn1_1 = require("../../asn1");
const asn1_2 = require("../../asn1");
const asn1_3 = require("../../asn1");
const asn1_4 = require("../../asn1");
const asn1_5 = require("../../asn1");
const asn1_6 = require("../../asn1");
exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_1.Integer);
exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_2.Node);
exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_3.Null);
exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_4.ObjectIdentifier);
exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_5.OctetString);
exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_6.Sequence);
exports.AlgorithmIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1Node))
}, {}));
exports.ECDSAWithSHA256 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.2")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.ECDSAWithSHA384 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.3")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.ECDSAWithSHA512 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.4")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.SHA256WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.11")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.SHA384WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.12")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.SHA512WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.13")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.AES128CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.2")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.AES192CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.22")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.AES256CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.42")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
exports.HMACSHA1Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.7")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA224Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.8")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA256Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.9")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA384Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.10")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA512Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.11")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA512224Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.12")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.HMACSHA512256Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.13")
    }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
}, {}));
exports.PBKDF2Identifier1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12")
    }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ASN1OctetString), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier)), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
    }, {})))
}, {}));
exports.PBKDF2Identifier2 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12")
    }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ASN1OctetString), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier)), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
    }, {})))
}, {}));
exports.PBKDF2Identifier = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.PBKDF2Identifier1), autoguard.guards.Reference.of(() => exports.PBKDF2Identifier2));
exports.PBES2Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.13")
    }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
    }, {})))
}, {}));
exports.EncryptedPrivateKeyInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
    "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
}, {}));
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
        "ASN1Node": autoguard.guards.Reference.of(() => exports.ASN1Node),
        "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
        "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
        "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
        "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
        "AlgorithmIdentifier": autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier),
        "ECDSAWithSHA256": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA256),
        "ECDSAWithSHA384": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA384),
        "ECDSAWithSHA512": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA512),
        "SHA256WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA256WithRSAEncryption),
        "SHA384WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA384WithRSAEncryption),
        "SHA512WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA512WithRSAEncryption),
        "AES128CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES128CBCIdentifier),
        "AES192CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES192CBCIdentifier),
        "AES256CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES256CBCIdentifier),
        "HMACSHA1Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA1Identifier),
        "HMACSHA224Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA224Identifier),
        "HMACSHA256Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA256Identifier),
        "HMACSHA384Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA384Identifier),
        "HMACSHA512Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512Identifier),
        "HMACSHA512224Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512224Identifier),
        "HMACSHA512256Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512256Identifier),
        "PBKDF2Identifier1": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier1),
        "PBKDF2Identifier2": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier2),
        "PBKDF2Identifier": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier),
        "PBES2Identifier": autoguard.guards.Reference.of(() => exports.PBES2Identifier),
        "EncryptedPrivateKeyInfo": autoguard.guards.Reference.of(() => exports.EncryptedPrivateKeyInfo)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
