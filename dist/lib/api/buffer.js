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
exports.request = void 0;
const $https = require("https");
function parseHeaders(raw_headers) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((raw_headers.length & 1) !== 0) {
            throw "Expected an even number of raw headers!";
        }
        let headers = {};
        for (let i = 0; i < raw_headers.length; i += 2) {
            let key = raw_headers[i + 0];
            let value = raw_headers[i + 1];
            let values = headers[key];
            if (values == null) {
                values = new Array();
                headers[key] = values;
            }
            values.push(value);
        }
        return headers;
    });
}
function request(request) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let client_request = $https.request(request.url, {
                headers: request.headers,
                method: request.method
            });
            client_request.on("response", (incoming_message) => {
                incoming_message.setEncoding("binary");
                let buffers = new Array();
                incoming_message.on("data", (chunk) => {
                    let buffer = Buffer.from(chunk, "binary");
                    buffers.push(buffer);
                });
                incoming_message.on("end", () => __awaiter(this, void 0, void 0, function* () {
                    let buffer = Buffer.concat(buffers);
                    let body = buffer.length > 0 ? buffer : undefined;
                    let headers = yield parseHeaders(incoming_message.rawHeaders);
                    let status = incoming_message.statusCode || 0;
                    let response = {
                        body,
                        headers,
                        status
                    };
                    return resolve(response);
                }));
            });
            client_request.on("error", (error) => {
                return reject(error);
            });
            if (request.body != null) {
                client_request.end(request.body);
            }
            else {
                client_request.end();
            }
        });
    });
}
exports.request = request;
