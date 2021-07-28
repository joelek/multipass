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
exports.sign = void 0;
const libcrypto = require("crypto");
const encoding = require("../encoding");
function encode(json) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(json)
            .then(encoding.convertJSONToString)
            .then(encoding.convertStringToUTF8Buffer)
            .then(encoding.convertBufferToBase64URLString);
    });
}
function sign(private_key, protected_json, payload_json) {
    return __awaiter(this, void 0, void 0, function* () {
        let protected_base64url = yield encode(Object.assign(Object.assign({}, protected_json), { alg: "RS256" }));
        let payload_base64url = (payload_json != null ? yield encode(payload_json) : "");
        let signer = libcrypto.createSign("SHA256");
        signer.update(`${protected_base64url}.${payload_base64url}`);
        let signature = signer.sign(private_key);
        let signature_base64url = yield encoding.convertBufferToBase64URLString(signature);
        return {
            protected: protected_base64url,
            payload: payload_base64url,
            signature: signature_base64url
        };
    });
}
exports.sign = sign;
