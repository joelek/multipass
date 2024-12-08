"use strict";
// This file was auto-generated by @joelek/autoguard. Edit at own risk.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoguard = exports.Config = void 0;
const autoguard = require("@joelek/autoguard/dist/lib-shared");
exports.Config = autoguard.guards.Object.of({
    "account": autoguard.guards.String,
    "key": autoguard.guards.String
}, {});
var Autoguard;
(function (Autoguard) {
    Autoguard.Guards = {
        "Config": autoguard.guards.Reference.of(() => exports.Config)
    };
    Autoguard.Requests = {};
    Autoguard.Responses = {};
})(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
;
