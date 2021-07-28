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
exports.parseObjectIdentifier = exports.parse = void 0;
const $enumeration = require("../enumeration");
var Type;
(function (Type) {
    Type[Type["END_OF_CONTENT"] = 0] = "END_OF_CONTENT";
    Type[Type["BOOLEAN"] = 1] = "BOOLEAN";
    Type[Type["INTEGER"] = 2] = "INTEGER";
    Type[Type["BIT_STRING"] = 3] = "BIT_STRING";
    Type[Type["OCTET_STRING"] = 4] = "OCTET_STRING";
    Type[Type["NULL"] = 5] = "NULL";
    Type[Type["OBJECT_IDENTIFIER"] = 6] = "OBJECT_IDENTIFIER";
    Type[Type["OBJECT_DESCRIPTOR"] = 7] = "OBJECT_DESCRIPTOR";
    Type[Type["EXTERNAL"] = 8] = "EXTERNAL";
    Type[Type["REAL"] = 9] = "REAL";
    Type[Type["ENUMERATED"] = 10] = "ENUMERATED";
    Type[Type["EMBEDDED_PDV"] = 11] = "EMBEDDED_PDV";
    Type[Type["UTF8_STRING"] = 12] = "UTF8_STRING";
    Type[Type["RELATIVE_OID"] = 13] = "RELATIVE_OID";
    Type[Type["TIME"] = 14] = "TIME";
    Type[Type["0F_RESERVED"] = 15] = "0F_RESERVED";
    Type[Type["SEQUENCE"] = 16] = "SEQUENCE";
    Type[Type["SET"] = 17] = "SET";
    Type[Type["NUMERIC_STRING"] = 18] = "NUMERIC_STRING";
    Type[Type["PRINTABLE_STRING"] = 19] = "PRINTABLE_STRING";
    Type[Type["T61_STRING"] = 20] = "T61_STRING";
    Type[Type["VIDEOTEX_STRING"] = 21] = "VIDEOTEX_STRING";
    Type[Type["IA5_STRING"] = 22] = "IA5_STRING";
    Type[Type["UTC_TIME"] = 23] = "UTC_TIME";
    Type[Type["GENERALIZED_TIME"] = 24] = "GENERALIZED_TIME";
    Type[Type["GRAPHIC_STRING"] = 25] = "GRAPHIC_STRING";
    Type[Type["VISIBLE_STRING"] = 26] = "VISIBLE_STRING";
    Type[Type["GENERAL_STRING"] = 27] = "GENERAL_STRING";
    Type[Type["UNIVERSAL_STRING"] = 28] = "UNIVERSAL_STRING";
    Type[Type["CHARACTER_STRING"] = 29] = "CHARACTER_STRING";
    Type[Type["BMP_STRING"] = 30] = "BMP_STRING";
    Type[Type["DATE"] = 31] = "DATE";
    Type[Type["TIME_OF_DAY"] = 32] = "TIME_OF_DAY";
    Type[Type["DATE_TIME"] = 33] = "DATE_TIME";
    Type[Type["DURATION"] = 34] = "DURATION";
    Type[Type["OID_IRI"] = 35] = "OID_IRI";
    Type[Type["RELATIVE_OID_IRI"] = 36] = "RELATIVE_OID_IRI";
})(Type || (Type = {}));
;
var Form;
(function (Form) {
    Form[Form["PRIMITIVE"] = 0] = "PRIMITIVE";
    Form[Form["CONSTRUCTED"] = 1] = "CONSTRUCTED";
})(Form || (Form = {}));
;
var Kind;
(function (Kind) {
    Kind[Kind["UNIVERSAL"] = 0] = "UNIVERSAL";
    Kind[Kind["APPLICATION"] = 1] = "APPLICATION";
    Kind[Kind["CONTEXT_SPECIFIC"] = 2] = "CONTEXT_SPECIFIC";
    Kind[Kind["PRIVATE"] = 3] = "PRIVATE";
})(Kind || (Kind = {}));
;
var OctetType;
(function (OctetType) {
    OctetType[OctetType["FINAL"] = 0] = "FINAL";
    OctetType[OctetType["NON_FINAL"] = 1] = "NON_FINAL";
})(OctetType || (OctetType = {}));
;
function parse(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        let offset = 0;
        let nodes = new Array();
        while (offset < buffer.length) {
            let tag = buffer.readUInt8(offset++);
            let kind = yield $enumeration.nameOf(Kind, ((tag >> 6) & 0x03));
            let form = yield $enumeration.nameOf(Form, ((tag >> 5) & 0x01));
            let type = yield $enumeration.nameOf(Type, ((tag >> 0) & 0x1F));
            if (Type[type] === 0x1F) {
                let bytes = new Array();
                while (true) {
                    let byte = buffer.readUInt8(offset++);
                    bytes.push(byte);
                    let octet_type = yield $enumeration.nameOf(OctetType, ((byte >> 7) & 0x01));
                    if (octet_type === "FINAL") {
                        break;
                    }
                    if (bytes.length === 4) {
                        throw "Expected a reasonable length!";
                    }
                }
                if ((bytes[0] & 0x7F) === 0x00) {
                    throw "Expected a minimally encoded length!";
                }
                let index = 0;
                for (let i = 0; i < bytes.length; i++) {
                    index = (index * 128) + (bytes[i] & 0x7F);
                }
                if (index < 0x1F) {
                    throw "Unexpected long form!";
                }
                type = yield $enumeration.nameOf(Type, index);
            }
            let length = buffer.readUInt8(offset++);
            if (length <= 127) {
            }
            else if (length <= 128) {
                throw "Expected a definite length!";
            }
            else if (length <= 254) {
                let bytes = (length & 0x7F);
                if (bytes > 4) {
                    throw "Expected a reasonable length!";
                }
                let true_length = 0;
                for (let i = 0; i < bytes; i++) {
                    let byte = buffer.readUInt8(offset++);
                    if ((i === 0) && (byte === 0)) {
                        throw "Expected a minimally encoded length!";
                    }
                    true_length = (true_length * 256) + ((byte >> 0) & 0xFF);
                }
                if (true_length <= 127) {
                    throw "Expected a minimally encoded length!";
                }
                length = true_length;
            }
            else {
                throw "Expected a valid length!";
            }
            if (offset + length > buffer.length) {
                throw "Expected a valid length!";
            }
            let data = buffer.slice(offset, offset + length);
            if (form === "PRIMITIVE") {
                nodes.push({
                    type,
                    form,
                    kind,
                    data: data.toString("hex")
                });
            }
            else {
                nodes.push({
                    type,
                    form,
                    kind,
                    data: yield parse(data)
                });
            }
            offset += length;
        }
        return nodes;
    });
}
exports.parse = parse;
function parseObjectIdentifier(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        let components = new Array();
        let offset = 0;
        let byte = buffer.readUInt8(offset++);
        components.push((byte / 40) | 0);
        components.push(byte % 40);
        while (offset < buffer.length) {
            let component = 0;
            for (let i = 0; true; i++) {
                let byte = buffer.readUInt8(offset++);
                let hi = ((byte >> 7) & 0x01);
                let lo = ((byte >> 0) & 0x7F);
                component = (component * 128) + lo;
                if (hi === 0) {
                    break;
                }
                if (i === 4) {
                    throw "Expected a reasonable length!";
                }
            }
            components.push(component);
        }
        return components;
    });
}
exports.parseObjectIdentifier = parseObjectIdentifier;
