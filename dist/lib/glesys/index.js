"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeNodeClient = exports.CONFIG = void 0;
const autoguard = require("@joelek/ts-autoguard/dist/lib-server");
const libfs = require("fs");
const api = require("./api/client");
const settings = require("./settings");
exports.CONFIG = settings.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf-8")));
function makeNodeClient() {
    let token = Buffer.from(`${exports.CONFIG.username}:${exports.CONFIG.password}`).toString("base64");
    let client = api.makeClient({
        urlPrefix: "https://api.glesys.com",
        requestHandler: autoguard.api.makeNodeRequestHandler(),
        defaultHeaders: [
            ["Authorization", `Basic ${token}`]
        ]
    });
    return client;
}
exports.makeNodeClient = makeNodeClient;
;
