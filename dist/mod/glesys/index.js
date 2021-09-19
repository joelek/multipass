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
exports.makeStandardClient = exports.makeClient = exports.config = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-server");
const api = require("./api/client");
exports.config = require("./config");
const URL_PREFIX = "https://api.glesys.com";
function makeClient(config, options) {
    let token = Buffer.from(`${config.account}:${config.key}`).toString("base64");
    let client = api.makeClient(Object.assign({ urlPrefix: URL_PREFIX, requestHandler: autoguard.api.makeNodeRequestHandler(), defaultHeaders: [
            ["Authorization", `Basic ${token}`]
        ] }, options));
    return client;
}
exports.makeClient = makeClient;
;
function makeStandardClient(config, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = makeClient(config, options);
        let domains = (yield (yield client.listDomains({})).payload()).response.domains;
        return {
            listDomains() {
                return __awaiter(this, void 0, void 0, function* () {
                    return domains.map((domain) => domain.domainname);
                });
            },
            provisionTextRecord(details) {
                return __awaiter(this, void 0, void 0, function* () {
                    const domain = domains.find((domain) => domain.domainname === details.domain);
                    if (domain == null) {
                        throw `Expected a domain!`;
                    }
                    let record = yield (yield client.createDomainRecord({
                        payload: {
                            domainname: details.domain,
                            host: details.subdomain || "@",
                            type: "TXT",
                            data: details.content,
                            ttl: 60
                        }
                    })).payload();
                    return {
                        undo() {
                            return __awaiter(this, void 0, void 0, function* () {
                                client.deleteDomainRecord({
                                    payload: {
                                        recordid: record.response.record.recordid
                                    }
                                });
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
