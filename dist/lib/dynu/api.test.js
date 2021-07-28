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
const $fs = require("fs");
const $api = require("./api");
const $config = require("./config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let content = $fs.readFileSync("./private/config/dynu.json", "utf8");
    let config = $config.Config.as(JSON.parse(content));
    let api = yield $api.getImplementation(config.api_key);
    let domain = yield api.getDomainFromHostname(config.hostname);
    let created = yield api.createRecord({
        id: 0,
        domainId: domain.id,
        nodeName: "",
        state: true,
        recordType: "TXT",
        textData: "TBD"
    });
    let updated = yield api.updateRecord(created.body);
    let deleted = yield api.deleteRecord(updated.body);
    console.log({
        domain,
        created,
        updated,
        deleted
    });
}))();
