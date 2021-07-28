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
exports.request = void 0;
const $buffer = require("./buffer");
function serializeBody(body) {
    return __awaiter(this, void 0, void 0, function* () {
        if (body === undefined) {
            return undefined;
        }
        if (body instanceof Buffer) {
            return body;
        }
        let string = JSON.stringify(body);
        return Buffer.from(string, "utf8");
    });
}
function parseBody(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        if (buffer === undefined) {
            return undefined;
        }
        let string = buffer.toString("utf8");
        return JSON.parse(string);
    });
}
function request(request, parser) {
    return __awaiter(this, void 0, void 0, function* () {
        let buffer_response = yield $buffer.request(Object.assign(Object.assign({}, request), { body: yield serializeBody(request.body) }));
        let response = Object.assign(Object.assign({}, buffer_response), { body: yield parseBody(buffer_response.body) });
        return Object.assign(Object.assign({}, response), parser(response));
    });
}
exports.request = request;
