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
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = dynu.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf-8")));
        let client = dynu.makeClient(config);
        let domains = yield (yield client.listDomains({})).payload();
        let domain = domains.domains.pop();
        if (domain == null) {
            throw "Expected a domain!";
        }
        console.log(JSON.stringify({ domain }, null, "\t"));
        let created = yield (yield client.createDomainRecord({
            options: {
                domainid: domain.id
            },
            payload: {
                nodeName: "_acme-challenge",
                recordType: "TXT",
                textData: "TBD1",
                ttl: 60
            }
        })).payload();
        console.log(JSON.stringify({ created }, null, "\t"));
        let updated = yield (yield client.updateDomainRecord({
            options: {
                domainid: domain.id,
                recordid: created.id
            },
            payload: {
                nodeName: "_acme-challenge",
                recordType: "TXT",
                textData: "TBD2",
                ttl: 60
            }
        })).payload();
        console.log(JSON.stringify({ updated }, null, "\t"));
        let deleted = yield (yield client.deleteDomainRecord({
            options: {
                domainid: domain.id,
                recordid: created.id
            }
        })).payload();
        console.log(JSON.stringify({ deleted }, null, "\t"));
    });
}
test().catch((error) => console.log(String(error)));
