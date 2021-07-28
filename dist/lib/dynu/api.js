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
exports.getImplementation = void 0;
const $api = require("../api/");
const $messages = require("./messages");
const api_url = "https://api.dynu.com/v2/dns";
class Implementation {
    constructor(api_key) {
        this.api_key = api_key;
    }
    getDomains() {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                headers: {
                    "Accept": ["application/json"],
                    "API-Key": [this.api_key]
                },
                method: "GET",
                url: `${api_url}/`
            }, $messages.GetDomainsResponse.as);
        });
    }
    getDomainFromHostname(hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.getDomains();
            let domain = response.body.domains.find((domain) => {
                return domain.name === hostname;
            });
            if (domain == null) {
                throw "Expected a domain with a matching hostname!";
            }
            return domain;
        });
    }
    getRecords(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                headers: {
                    "Accept": ["application/json"],
                    "API-Key": [this.api_key]
                },
                method: "GET",
                url: `${api_url}/${domain.id}/record`
            }, $messages.GetRecordsResponse.as);
        });
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                body: record,
                headers: {
                    "Accept": ["application/json"],
                    "API-Key": [this.api_key]
                },
                method: "POST",
                url: `${api_url}/${record.domainId}/record`
            }, $messages.CreateRecordResponse.as);
        });
    }
    deleteRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                headers: {
                    "Accept": ["application/json"],
                    "API-Key": [this.api_key]
                },
                method: "DELETE",
                url: `${api_url}/${record.domainId}/record/${record.id}`
            }, $messages.DeleteRecordResponse.as);
        });
    }
    updateRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                body: record,
                headers: {
                    "Accept": ["application/json"],
                    "API-Key": [this.api_key]
                },
                method: "POST",
                url: `${api_url}/${record.domainId}/record/${record.id}`
            }, $messages.UpdateRecordResponse.as);
        });
    }
}
function getImplementation(api_key) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Implementation(api_key);
    });
}
exports.getImplementation = getImplementation;
