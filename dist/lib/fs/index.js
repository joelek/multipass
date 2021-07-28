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
exports.writeBufferToFile = exports.readFileToBuffer = void 0;
const $fs = require("fs");
function readFileToBuffer(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            $fs.readFile(path, (error, buffer) => {
                if (error != null) {
                    return reject(error);
                }
                return resolve(buffer);
            });
        });
    });
}
exports.readFileToBuffer = readFileToBuffer;
function writeBufferToFile(path, buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            $fs.writeFile(path, buffer, (error) => {
                if (error != null) {
                    return reject(error);
                }
                return resolve();
            });
        });
    });
}
exports.writeBufferToFile = writeBufferToFile;
