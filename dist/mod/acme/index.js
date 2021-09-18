"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeKeyAuthorization = exports.handler = exports.api = void 0;
const libcrypto = require("crypto");
const jwk = require("../jwk");
exports.api = require("./api");
exports.handler = require("./handler");
function computeKeyAuthorization(token, key) {
    let thumbprint = jwk.computeThumbprint(key);
    let hash = libcrypto.createHash("sha256");
    hash.update(Buffer.from(`${token}.${thumbprint}`));
    let buffer = hash.digest();
    return buffer.toString("base64url");
}
exports.computeKeyAuthorization = computeKeyAuthorization;
;
