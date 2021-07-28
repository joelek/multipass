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
    let content = $fs.readFileSync("./private/config/acme.json", "utf8");
    let config = $config.Config.as(JSON.parse(content));
    let api = yield $api.getImplementation(config.directories.staging);
    let nonce = yield api.newNonce();
    console.log(nonce);
}))();
