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
const parsing = require("../parsing");
const utils = require("./utils");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeVarlen(0);
    let expected = Buffer.of(0);
    console.assert(observed.equals(expected), `It should encode varlen 0 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(0));
    let observed = utils.decodeVarlen(parser);
    let expected = 0;
    console.assert(observed === expected, `It should decode varlen 0 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeVarlen(127);
    let expected = Buffer.of(127);
    console.assert(observed.equals(expected), `It should encode varlen 127 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(127));
    let observed = utils.decodeVarlen(parser);
    let expected = 127;
    console.assert(observed === expected, `It should decode varlen 127 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeVarlen(128);
    let expected = Buffer.of(129, 0);
    console.assert(observed.equals(expected), `It should encode varlen 128 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(129, 0));
    let observed = utils.decodeVarlen(parser);
    let expected = 128;
    console.assert(observed === expected, `It should decode varlen 128 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeLength(0);
    let expected = Buffer.of(0);
    console.assert(observed.equals(expected), `It should encode length 0 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(0));
    let observed = utils.decodeLength(parser);
    let expected = 0;
    console.assert(observed === expected, `It should decode length 0 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeLength(127);
    let expected = Buffer.of(127);
    console.assert(observed.equals(expected), `It should encode length 127 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(127));
    let observed = utils.decodeLength(parser);
    let expected = 127;
    console.assert(observed === expected, `It should decode length 127 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = utils.encodeLength(128);
    let expected = Buffer.of(129, 128);
    console.assert(observed.equals(expected), `It should encode length 128 properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let parser = new parsing.Parser(Buffer.of(129, 128));
    let observed = utils.decodeLength(parser);
    let expected = 128;
    console.assert(observed === expected, `It should decode length 128 properly.`);
}))();
