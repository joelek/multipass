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
const glesys = require("./");
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let config = glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
        let client = glesys.makeClient(config);
        let response = yield client.listDomains({});
        let payload = yield response.payload();
        console.log(JSON.stringify(payload, null, "\t"));
    });
}
test().catch((error) => console.log(String(error)));
