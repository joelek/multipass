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
exports.serialize = exports.parse = void 0;
const $encoding = require("../encoding");
function parse(string) {
    return __awaiter(this, void 0, void 0, function* () {
        let structures = new Array();
        let lines = string.split(/\r\n|\r|\n/);
        let index = 0;
        while (index < lines.length) {
            let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/.exec(lines[index++]);
            if (parts == null) {
                continue;
            }
            let label = parts[1];
            let start = index;
            while (index < lines.length) {
                if (lines[index++] !== `-----END ${label}-----`) {
                    continue;
                }
                let end = index;
                let string = lines.slice(start, end - 1).join("");
                structures.push({
                    label: label,
                    buffer: yield $encoding.convertBase64StringToBuffer(string)
                });
                break;
            }
        }
        return structures;
    });
}
exports.parse = parse;
function serialize(structure) {
    return __awaiter(this, void 0, void 0, function* () {
        let lines = new Array();
        if (!(/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/.test(structure.label))) {
            throw "Expected a valid label!";
        }
        lines.push(`-----BEGIN ${structure.label}-----`);
        let base64 = yield $encoding.convertBufferToBase64String(structure.buffer);
        for (let i = 0; i < base64.length; i += 64) {
            let line = base64.substr(i, 64);
            lines.push(line);
        }
        lines.push(`-----END ${structure.label}-----`);
        return lines.join("\r\n");
    });
}
exports.serialize = serialize;
