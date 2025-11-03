"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStandardClient = exports.makeClient = void 0;
const autoguard = require("@joelek/autoguard/dist/lib-server");
const stdlib = require("@joelek/stdlib");
const api = require("./api/client");
const objects = require("./api/index");
const URL_PREFIX = "https://api.loopia.se";
function makeXMLRPCCall(client, methodCallGuard, methodResponseGuard, methodCall) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let payload = stdlib.data.xml.xml.document(stdlib.data.xml.xml.declaration("1.0", "UTF-8", undefined), undefined, stdlib.data.xmlrpc.createMethodCall(methodCallGuard.as(methodCall)));
        let response = yield client.sendRequest({
            payload: autoguard.api.serializeStringPayload(payload.serialize())
        });
        let string = yield autoguard.api.deserializeStringPayload([(_a = yield response.payload()) !== null && _a !== void 0 ? _a : Uint8Array.of()]);
        let document = stdlib.data.xml.XMLDocument.parse(string);
        let methodResponse = stdlib.data.xmlrpc.parseMethodResponse(document.root);
        return methodResponseGuard.as(methodResponse);
    });
}
;
function makeClient(options) {
    let client = api.makeClient(Object.assign({ urlPrefix: URL_PREFIX, requestHandler: autoguard.api.makeNodeRequestHandler() }, options));
    return {
        getDomains: (request) => makeXMLRPCCall(client, objects.getDomainsRequest, objects.getDomainsResponse, request),
        getSubdomains: (request) => makeXMLRPCCall(client, objects.getSubdomainsRequest, objects.getSubdomainsResponse, request),
        addSubdomain: (request) => makeXMLRPCCall(client, objects.addSubdomainRequest, objects.addSubdomainResponse, request),
        removeSubdomain: (request) => makeXMLRPCCall(client, objects.removeSubdomainRequest, objects.removeSubdomainResponse, request),
        updateZoneRecord: (request) => makeXMLRPCCall(client, objects.updateZoneRecordRequest, objects.updateZoneRecordResponse, request),
        getZoneRecords: (request) => makeXMLRPCCall(client, objects.getZoneRecordsRequest, objects.getZoneRecordsResponse, request),
        addZoneRecord: (request) => makeXMLRPCCall(client, objects.addZoneRecordRequest, objects.addZoneRecordResponse, request),
        removeZoneRecord: (request) => makeXMLRPCCall(client, objects.removeZoneRecordRequest, objects.removeZoneRecordResponse, request)
    };
}
exports.makeClient = makeClient;
;
function makeStandardClient(config, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let client = makeClient(options);
        let domains = (yield client.getDomains({
            methodName: "getDomains",
            parameters: [
                config.username,
                config.password,
                (_a = config.account) !== null && _a !== void 0 ? _a : ""
            ]
        })).parameters[0];
        return {
            listDomains() {
                return __awaiter(this, void 0, void 0, function* () {
                    return domains.map((domain) => domain.domain);
                });
            },
            provisionTextRecord(details) {
                var _a, _b;
                return __awaiter(this, void 0, void 0, function* () {
                    const domain = domains.find((domain) => domain.domain === details.domain);
                    if (domain == null) {
                        throw `Expected a domain!`;
                    }
                    let status = (yield client.addZoneRecord({
                        methodName: "addZoneRecord",
                        parameters: [
                            config.username,
                            config.password,
                            (_a = config.account) !== null && _a !== void 0 ? _a : "",
                            details.domain,
                            details.subdomain || "@",
                            {
                                type: "TXT",
                                ttl: 60,
                                priority: 0,
                                rdata: details.content,
                                record_id: 0
                            }
                        ]
                    })).parameters[0];
                    if (status !== "OK") {
                        throw `Expected status "OK"!`;
                    }
                    let records = (yield client.getZoneRecords({
                        methodName: "getZoneRecords",
                        parameters: [
                            config.username,
                            config.password,
                            (_b = config.account) !== null && _b !== void 0 ? _b : "",
                            details.domain,
                            details.subdomain || "@"
                        ]
                    })).parameters[0];
                    const record = records.find((record) => record.rdata === details.content);
                    if (record == null) {
                        throw `Expected a record!`;
                    }
                    return {
                        undo() {
                            var _a;
                            return __awaiter(this, void 0, void 0, function* () {
                                let status = (yield client.removeZoneRecord({
                                    methodName: "removeZoneRecord",
                                    parameters: [
                                        config.username,
                                        config.password,
                                        (_a = config.account) !== null && _a !== void 0 ? _a : "",
                                        details.domain,
                                        details.subdomain || "@",
                                        record.record_id
                                    ]
                                })).parameters[0];
                                if (status !== "OK") {
                                    throw `Expected status "OK"!`;
                                }
                            });
                        }
                    };
                });
            }
        };
    });
}
exports.makeStandardClient = makeStandardClient;
;
