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
const libfs = require("fs");
const dynu = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let config = dynu.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf-8")));
    let client = dynu.makeClient(config, {
        debugMode: true
    });
    let domains = yield (yield client.listDomains({})).payload();
    let domain = domains.domains.pop();
    if (domain == null) {
        throw "Expected a domain!";
    }
    let created = yield (yield client.createDomainRecord({
        options: {
            domainid: domain.id
        },
        payload: {
            nodeName: "_acme-challenge",
            recordType: "TXT",
            textData: "TBD1",
            ttl: 60,
            state: false
        }
    })).payload();
    let updated = yield (yield client.updateDomainRecord({
        options: {
            domainid: domain.id,
            recordid: created.id
        },
        payload: {
            nodeName: "_acme-challenge",
            recordType: "TXT",
            textData: "TBD2",
            ttl: 60,
            state: true
        }
    })).payload();
    let deleted = yield (yield client.deleteDomainRecord({
        options: {
            domainid: domain.id,
            recordid: created.id
        }
    })).payload();
}))();
