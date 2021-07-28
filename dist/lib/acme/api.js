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
class Implementation {
    constructor(directory) {
        this.directory = directory;
    }
    newAccount(account_private_key) {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                method: "POST",
                url: this.directory.body.newAccount,
                headers: {
                    "Content-Type": ["application/jose+json"]
                },
                body: {}
            }, $messages.NewAccountResponse.as);
        });
    }
    newNonce() {
        return __awaiter(this, void 0, void 0, function* () {
            return $api.json.request({
                method: "HEAD",
                url: this.directory.body.newNonce
            }, $messages.NewNonceResponse.as);
        });
    }
}
function getImplementation(directory_url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield $api.json.request({
            method: "GET",
            url: directory_url
        }, $messages.GetDirectoryResponse.as);
        return new Implementation(response);
    });
}
exports.getImplementation = getImplementation;
