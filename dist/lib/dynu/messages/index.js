"use strict";
// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.DeleteRecordResponse = exports.UpdateRecordResponse = exports.CreateRecordResponse = exports.GetRecordsResponse = exports.GetDomainsResponse = exports.Record = exports.TextRecord = exports.GenericRecord = exports.Domain = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-shared");
exports.Domain = autoguard.guards.Object.of({
    "id": autoguard.guards.Number,
    "name": autoguard.guards.String
});
exports.GenericRecord = autoguard.guards.Object.of({
    "id": autoguard.guards.Number,
    "domainId": autoguard.guards.Number,
    "nodeName": autoguard.guards.String,
    "state": autoguard.guards.Boolean,
    "recordType": autoguard.guards.String
});
exports.TextRecord = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.GenericRecord), autoguard.guards.Object.of({
    "recordType": autoguard.guards.StringLiteral.of("TXT"),
    "textData": autoguard.guards.String
}));
exports.Record = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.GenericRecord), autoguard.guards.Reference.of(() => exports.TextRecord));
exports.GetDomainsResponse = autoguard.guards.Object.of({
    "body": autoguard.guards.Object.of({
        "domains": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Domain))
    })
});
exports.GetRecordsResponse = autoguard.guards.Object.of({
    "body": autoguard.guards.Object.of({
        "dnsRecords": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Record))
    })
});
exports.CreateRecordResponse = autoguard.guards.Object.of({
    "body": autoguard.guards.Reference.of(() => exports.Record)
});
exports.UpdateRecordResponse = autoguard.guards.Object.of({
    "body": autoguard.guards.Reference.of(() => exports.Record)
});
exports.DeleteRecordResponse = autoguard.guards.Object.of({
    "body": autoguard.guards.Object.of({})
});
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "Domain": autoguard.guards.Reference.of(() => exports.Domain),
        "GenericRecord": autoguard.guards.Reference.of(() => exports.GenericRecord),
        "TextRecord": autoguard.guards.Reference.of(() => exports.TextRecord),
        "Record": autoguard.guards.Reference.of(() => exports.Record),
        "GetDomainsResponse": autoguard.guards.Reference.of(() => exports.GetDomainsResponse),
        "GetRecordsResponse": autoguard.guards.Reference.of(() => exports.GetRecordsResponse),
        "CreateRecordResponse": autoguard.guards.Reference.of(() => exports.CreateRecordResponse),
        "UpdateRecordResponse": autoguard.guards.Reference.of(() => exports.UpdateRecordResponse),
        "DeleteRecordResponse": autoguard.guards.Reference.of(() => exports.DeleteRecordResponse)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;