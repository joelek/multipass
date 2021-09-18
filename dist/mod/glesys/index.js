"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClient = exports.config = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-server");
const api = require("./api/client");
exports.config = require("./config");
const URL_PREFIX = "https://api.glesys.com";
function makeClient(config) {
    let token = Buffer.from(`${config.account}:${config.key}`).toString("base64");
    let client = api.makeClient({
        urlPrefix: URL_PREFIX,
        requestHandler: autoguard.api.makeNodeRequestHandler(),
        defaultHeaders: [
            ["Authorization", `Basic ${token}`]
        ]
    });
    return client;
}
exports.makeClient = makeClient;
;
