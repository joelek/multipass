"use strict";
// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.DomainRecord = exports.DomainRecordTXT = exports.DomainRecordGeneric = exports.DomainRecordBase = exports.DomainRecordStub = exports.DomainRecordStubTXT = exports.DomainRecordStubGeneric = exports.Domain = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-shared");
exports.Domain = autoguard.guards.Object.of({
    "id": autoguard.guards.Number,
    "name": autoguard.guards.String
}, {});
exports.DomainRecordStubGeneric = autoguard.guards.Object.of({
    "nodeName": autoguard.guards.String,
    "recordType": autoguard.guards.String
}, {
    "ttl": autoguard.guards.Number,
    "state": autoguard.guards.Boolean
});
exports.DomainRecordStubTXT = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric), autoguard.guards.Object.of({
    "recordType": autoguard.guards.StringLiteral.of("TXT"),
    "textData": autoguard.guards.String
}, {}));
exports.DomainRecordStub = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric), autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT));
exports.DomainRecordBase = autoguard.guards.Object.of({
    "id": autoguard.guards.Number,
    "domainId": autoguard.guards.Number
}, {});
exports.DomainRecordGeneric = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordBase), autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric));
exports.DomainRecordTXT = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordBase), autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT));
exports.DomainRecord = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.DomainRecordGeneric), autoguard.guards.Reference.of(() => exports.DomainRecordTXT));
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "Domain": autoguard.guards.Reference.of(() => exports.Domain),
        "DomainRecordStubGeneric": autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric),
        "DomainRecordStubTXT": autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT),
        "DomainRecordStub": autoguard.guards.Reference.of(() => exports.DomainRecordStub),
        "DomainRecordBase": autoguard.guards.Reference.of(() => exports.DomainRecordBase),
        "DomainRecordGeneric": autoguard.guards.Reference.of(() => exports.DomainRecordGeneric),
        "DomainRecordTXT": autoguard.guards.Reference.of(() => exports.DomainRecordTXT),
        "DomainRecord": autoguard.guards.Reference.of(() => exports.DomainRecord)
    };
    Autoguard.Requests = {
        "listDomains": autoguard.guards.Object.of({}, {
            "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
            "payload": autoguard.api.Binary
        }),
        "listDomainRecords": autoguard.guards.Object.of({
            "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                "domainid": autoguard.guards.Number
            }, {}), autoguard.api.Options)
        }, {
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
            "payload": autoguard.api.Binary
        }),
        "createDomainRecord": autoguard.guards.Object.of({
            "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                "domainid": autoguard.guards.Number
            }, {}), autoguard.api.Options),
            "payload": autoguard.guards.Reference.of(() => exports.DomainRecordStub)
        }, {
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "updateDomainRecord": autoguard.guards.Object.of({
            "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                "domainid": autoguard.guards.Number,
                "recordid": autoguard.guards.Number
            }, {}), autoguard.api.Options),
            "payload": autoguard.guards.Reference.of(() => exports.DomainRecordStub)
        }, {
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "deleteDomainRecord": autoguard.guards.Object.of({
            "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                "domainid": autoguard.guards.Number,
                "recordid": autoguard.guards.Number
            }, {}), autoguard.api.Options)
        }, {
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
            "payload": autoguard.api.Binary
        })
    };
    Autoguard.Responses = {
        "listDomains": autoguard.guards.Object.of({
            "payload": autoguard.guards.Object.of({
                "domains": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Domain))
            }, {})
        }, {
            "status": autoguard.guards.Number,
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "listDomainRecords": autoguard.guards.Object.of({
            "payload": autoguard.guards.Object.of({
                "dnsRecords": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.DomainRecord))
            }, {})
        }, {
            "status": autoguard.guards.Number,
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "createDomainRecord": autoguard.guards.Object.of({
            "payload": autoguard.guards.Reference.of(() => exports.DomainRecord)
        }, {
            "status": autoguard.guards.Number,
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "updateDomainRecord": autoguard.guards.Object.of({
            "payload": autoguard.guards.Reference.of(() => exports.DomainRecord)
        }, {
            "status": autoguard.guards.Number,
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        }),
        "deleteDomainRecord": autoguard.guards.Object.of({
            "payload": autoguard.guards.Object.of({}, {})
        }, {
            "status": autoguard.guards.Number,
            "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
        })
    };
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
