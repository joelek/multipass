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
exports.Key = void 0;
const asno = require("../der");
const encoding = require("../encoding");
const $fs = require("../fs");
class Key {
    constructor(private_key) {
        this.private_key = private_key;
    }
    getWebKey() {
        return __awaiter(this, void 0, void 0, function* () {
            let nodes = yield asno.parse(this.private_key);
            let data = nodes[0].data;
            if (data instanceof Buffer) {
                return Promise.reject("Unexpected buffer!");
            }
            let n = data[1].data;
            if (!(n instanceof Buffer)) {
                return Promise.reject("Expected a buffer!");
            }
            let e = data[2].data;
            if (!(e instanceof Buffer)) {
                return Promise.reject("Expected a buffer!");
            }
            return {
                kty: "RSA",
                n: yield encoding.convertBufferToBase64URLString(n),
                e: yield encoding.convertBufferToBase64URLString(e)
            };
        });
    }
    save(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return $fs.writeBufferToFile(path, this.private_key);
        });
    }
    static load(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(path)
                .then($fs.readFileToBuffer)
                .then((buffer) => {
                return new Key(buffer);
            });
        });
    }
}
exports.Key = Key;
