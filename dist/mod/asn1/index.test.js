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
const asn1 = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = BigInt(1);
    let observed = asn1.decodeInteger(Buffer.of(0x01));
    console.assert(observed === expected, `It should decode 0x01 as 1.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = BigInt(127);
    let observed = asn1.decodeInteger(Buffer.of(0x7F));
    console.assert(observed === expected, `It should decode 0x7F as 127.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = BigInt(-128);
    let observed = asn1.decodeInteger(Buffer.of(0x80));
    console.assert(observed === expected, `It should decode 0x80 as -128.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = BigInt(-1);
    let observed = asn1.decodeInteger(Buffer.of(0xFF));
    console.assert(observed === expected, `It should decode 0xFF as -1.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = BigInt(255);
    let observed = asn1.decodeInteger(Buffer.of(0xFF), { paddedUnsigned: false });
    console.assert(observed === expected, `It should decode 0xFF as 255 without padded unsigned.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0x01);
    let observed = asn1.encodeInteger(BigInt(1));
    console.assert(observed.equals(expected), `It should encode 1 as 0x01.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0x0F);
    let observed = asn1.encodeInteger(BigInt(15));
    console.assert(observed.equals(expected), `It should encode 15 as 0x0F.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0x7F);
    let observed = asn1.encodeInteger(BigInt(127));
    console.assert(observed.equals(expected), `It should encode 127 as 0x7F.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0x00, 0x80);
    let observed = asn1.encodeInteger(BigInt(128));
    console.assert(observed.equals(expected), `It should encode 128 as 0x0080.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0x80);
    let observed = asn1.encodeInteger(BigInt(-128));
    console.assert(observed.equals(expected), `It should encode -128 as 0x80.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0xFF, 0x7F);
    let observed = asn1.encodeInteger(BigInt(-129));
    console.assert(observed.equals(expected), `It should encode -129 as 0xFF7F.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0xFF);
    let observed = asn1.encodeInteger(BigInt(-1));
    console.assert(observed.equals(expected), `It should encode -1 as 0xFF.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0xF0);
    let observed = asn1.encodeInteger(BigInt(-16));
    console.assert(observed.equals(expected), `It should encode -16 as 0xF0.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = Buffer.of(0xFF);
    let observed = asn1.encodeInteger(BigInt(255), { paddedUnsigned: false });
    console.assert(observed.equals(expected), `It should encode 255 as 0xFF without padded unsigned.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = "010203040506Z";
    let observed = asn1.encodeUTCTime(new Date("2001-02-03T04:05:06Z"));
    console.assert(observed === expected, `It should encode UTCTime.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = new Date("2001-02-03T04:05:06Z").getTime();
    let observed = asn1.decodeUTCTime("010203040506Z").getTime();
    console.assert(observed === expected, `It should decode UTCTime.`);
}))();
