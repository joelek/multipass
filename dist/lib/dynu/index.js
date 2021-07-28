"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClient = exports.config = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-server");
const api = require("./api/client");
exports.config = require("./config");
const URL_PREFIX = "https://api.dynu.com/v2";
function makeClient(config) {
    let client = api.makeClient({
        urlPrefix: URL_PREFIX,
        requestHandler: autoguard.api.makeNodeRequestHandler(),
        defaultHeaders: [
            ["API-Key", config.api_key]
        ]
    });
    return client;
}
exports.makeClient = makeClient;
;
