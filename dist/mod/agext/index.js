"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer = void 0;
const autoguard = require("@joelek/ts-autoguard");
exports.buffer = {
    as(subject, path = "") {
        if (subject instanceof Buffer) {
            return subject;
        }
        throw new autoguard.serialization.MessageGuardError(this, subject, path);
    },
    is(subject, path = "") {
        try {
            this.as(subject);
        }
        catch (error) {
            return false;
        }
        return true;
    },
    ts(eol) {
        return "buffer";
    }
};
