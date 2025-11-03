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
const loopia = require("./");
const libfs = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let config = loopia.Config.as(JSON.parse(libfs.readFileSync("./private/config/loopia.json", "utf-8")));
    let client = loopia.makeClient({});
    let response = yield client.getDomains({
        methodName: "getDomains",
        parameters: [
            config.username,
            config.password,
            (_a = config.account) !== null && _a !== void 0 ? _a : ""
        ]
    });
    console.log(JSON.stringify(response, null, "\t"));
}))();
