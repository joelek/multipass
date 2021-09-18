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
exports.convertBase64URLStringToString = exports.convertStringToBase64URLString = exports.convertBase64StringToString = exports.convertStringToBase64String = exports.convertBase64URLStringToBuffer = exports.convertBufferToBase64URLString = exports.convertBase64StringToBuffer = exports.convertBufferToBase64String = exports.convertStringToUTF8Buffer = exports.convertUTF8BufferToString = exports.convertStringToJSON = exports.convertBase64URLStringToJSON = exports.convertJSONToBase64URLString = exports.convertJSONToString = void 0;
function convertJSONToString(json) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.stringify(json);
    });
}
exports.convertJSONToString = convertJSONToString;
function convertJSONToBase64URLString(json) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(json)
            .then(convertJSONToString)
            .then(convertStringToUTF8Buffer)
            .then(convertBufferToBase64URLString);
    });
}
exports.convertJSONToBase64URLString = convertJSONToBase64URLString;
function convertBase64URLStringToJSON(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then(convertBase64URLStringToString)
            .then(convertStringToJSON);
    });
}
exports.convertBase64URLStringToJSON = convertBase64URLStringToJSON;
function convertStringToJSON(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.parse(string);
    });
}
exports.convertStringToJSON = convertStringToJSON;
function convertUTF8BufferToString(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return buffer.toString("utf8");
    });
}
exports.convertUTF8BufferToString = convertUTF8BufferToString;
function convertStringToUTF8Buffer(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Buffer.from(string, "utf8");
    });
}
exports.convertStringToUTF8Buffer = convertStringToUTF8Buffer;
function convertBufferToBase64String(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return buffer.toString("base64");
    });
}
exports.convertBufferToBase64String = convertBufferToBase64String;
function convertBase64StringToBuffer(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Buffer.from(string, "base64");
    });
}
exports.convertBase64StringToBuffer = convertBase64StringToBuffer;
function convertBufferToBase64URLString(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(buffer)
            .then(convertBufferToBase64String)
            .then((string) => {
            string = string.replace(/\+/g, "-");
            string = string.replace(/\//g, "_");
            string = string.replace(/\=/g, "");
            return string;
        });
    });
}
exports.convertBufferToBase64URLString = convertBufferToBase64URLString;
function convertBase64URLStringToBuffer(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then((string) => {
            string = string.replace(/\-/g, "+");
            string = string.replace(/\_/g, "/");
            return string;
        })
            .then(convertBase64StringToBuffer);
    });
}
exports.convertBase64URLStringToBuffer = convertBase64URLStringToBuffer;
function convertStringToBase64String(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then(convertStringToUTF8Buffer)
            .then(convertBufferToBase64String);
    });
}
exports.convertStringToBase64String = convertStringToBase64String;
function convertBase64StringToString(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then(convertBase64StringToBuffer)
            .then(convertUTF8BufferToString);
    });
}
exports.convertBase64StringToString = convertBase64StringToString;
function convertStringToBase64URLString(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then(convertStringToUTF8Buffer)
            .then(convertBufferToBase64URLString);
    });
}
exports.convertStringToBase64URLString = convertStringToBase64URLString;
function convertBase64URLStringToString(string) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(string)
            .then(convertBase64URLStringToBuffer)
            .then(convertUTF8BufferToString);
    });
}
exports.convertBase64URLStringToString = convertBase64URLStringToString;
