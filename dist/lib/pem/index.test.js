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
const $pem = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let one = yield $pem.serialize({
        label: "NUMBERS",
        buffer: Buffer.of(1, 2, 3, 4)
    });
    let two = yield $pem.serialize({
        label: "STRING",
        buffer: Buffer.from("räksmörgås")
    });
    let string = [
        "junk",
        one,
        "junk",
        two,
        "junk"
    ].join("\r\n");
    console.log(string);
    let structures = yield $pem.parse(string);
    console.log(structures);
}))();
