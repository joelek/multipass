"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeInteger = exports.decodeInteger = exports.UTC_TIME = exports.DATE = exports.UTF8_STRING = exports.BIT_STRING = exports.OCTET_STRING = exports.NULL = exports.OBJECT_IDENTIFER = exports.INTEGER = exports.SET = exports.SEQUENCE = void 0;
__exportStar(require("./schema"), exports);
exports.SEQUENCE = {
    kind: "UNIVERSAL",
    form: "CONSTRUCTED",
    type: "SEQUENCE",
    data: []
};
exports.SET = {
    kind: "UNIVERSAL",
    form: "CONSTRUCTED",
    type: "SET",
    data: []
};
exports.INTEGER = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "INTEGER",
    data: ""
};
exports.OBJECT_IDENTIFER = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "OBJECT_IDENTIFIER",
    data: ""
};
exports.NULL = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "NULL",
    data: ""
};
exports.OCTET_STRING = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "OCTET_STRING",
    data: ""
};
exports.BIT_STRING = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "BIT_STRING",
    data: ""
};
exports.UTF8_STRING = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "UTF8_STRING",
    data: ""
};
exports.DATE = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "DATE",
    data: ""
};
exports.UTC_TIME = {
    kind: "UNIVERSAL",
    form: "PRIMITIVE",
    type: "UTC_TIME",
    data: ""
};
function decodeInteger(buffer, options) {
    var _a;
    let paddedUnsigned = (_a = options === null || options === void 0 ? void 0 : options.paddedUnsigned) !== null && _a !== void 0 ? _a : true;
    let hex = buffer.toString("hex");
    let number = BigInt(`0x${hex}`);
    if (buffer[0] < 0x80 || !paddedUnsigned) {
        return number;
    }
    else {
        let bias = BigInt(1) << BigInt(buffer.length * 8);
        return number - bias;
    }
}
exports.decodeInteger = decodeInteger;
;
function encodeInteger(number, options) {
    var _a;
    function getNibbles(number) {
        let nibbles = [...number.toString(16)].map((part) => Number.parseInt(part, 16));
        if ((nibbles.length % 2) === 1) {
            nibbles.unshift(0);
        }
        return nibbles;
    }
    ;
    let paddedUnsigned = (_a = options === null || options === void 0 ? void 0 : options.paddedUnsigned) !== null && _a !== void 0 ? _a : true;
    if (number >= 0) {
        let nibbles = getNibbles(number);
        if (nibbles[0] >= 0x8 && paddedUnsigned) {
            nibbles.unshift(0, 0);
        }
        let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
        return Buffer.from(hex, "hex");
    }
    else {
        let bias = BigInt(1) << BigInt(getNibbles(BigInt(0) - number).length * 4);
        let nibbles = getNibbles(number + bias);
        if (nibbles[0] < 0x8) {
            nibbles.unshift(0xF, 0xF);
        }
        let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
        return Buffer.from(hex, "hex");
    }
}
exports.encodeInteger = encodeInteger;
;
