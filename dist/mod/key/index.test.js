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
const __1 = require("..");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = __1.key.generatePrivateKey();
    __1.key.constructPrivateKey(buffer);
    console.assert(true, `It should generate and construct keys.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = __1.key.generatePrivateKey({
        type: "ec"
    });
    __1.key.constructPrivateKey(buffer);
    console.assert(true, `It should generate and construct EC keys.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = __1.key.generatePrivateKey({
        type: "ec",
        passphrase: "test"
    });
    __1.key.constructPrivateKey(buffer, {
        passphrase: "test"
    });
    console.assert(true, `It should generate and construct encrypted EC keys.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = __1.key.generatePrivateKey({
        type: "rsa"
    });
    __1.key.constructPrivateKey(buffer);
    console.assert(true, `It should generate and construct RSA keys.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let buffer = __1.key.generatePrivateKey({
        type: "rsa",
        passphrase: "test"
    });
    __1.key.constructPrivateKey(buffer, {
        passphrase: "test"
    });
    console.assert(true, `It should generate and construct encrypted RSA keys.`);
}))();
