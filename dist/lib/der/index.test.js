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
const $fs = require("../fs");
const $der = require("./");
const $pem = require("../pem");
/*





let f = $asno.parse(buffer).asSequence()




 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = yield $fs.readFileToBuffer("./private/certificate/certificate_key.pem");
    let structs = yield $pem.parse(buffer.toString("utf8"));
    console.log(structs);
    //let buffer = Buffer.from("3013020105160e416e79626f64792074686572653f", "hex");
    let asno = yield $der.parse(structs[0].buffer);
    console.log(JSON.stringify(asno, null, "\t"));
    let f = yield $der.parseObjectIdentifier(Buffer.from("KoZIhvcNAQEL", "base64"));
    console.log(f.join(".") === "1.2.840.113549.1.1.11");
}))();
