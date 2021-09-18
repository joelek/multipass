"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.verify = exports.sign = exports.getDefaultAlgorithm = void 0;
const encoding = require("../encoding");
const jwk = require("../jwk");
const pkcs5 = require("../pkcs5");
const schema = require("./schema");
__exportStar(require("./schema"), exports);
function encode(json) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(json)
            .then(encoding.convertJSONToString)
            .then(encoding.convertStringToUTF8Buffer)
            .then(encoding.convertBufferToBase64URLString);
    });
}
;
function getDefaultAlgorithm(key) {
    let keyJwk = key.export({ format: "jwk" });
    if (jwk.RSAPublicKey.is(keyJwk)) {
        return new pkcs5.signature.SHA256WithRSAEncryption();
    }
    if (jwk.ECPublicKey.is(keyJwk)) {
        if (keyJwk.crv === "P-256") {
            return new pkcs5.signature.ECDSAWithSHA256();
        }
        if (keyJwk.crv === "P-384") {
            return new pkcs5.signature.ECDSAWithSHA384();
        }
        if (keyJwk.crv === "P-521") {
            return new pkcs5.signature.ECDSAWithSHA512();
        }
    }
    throw `Expected code to be unreachable!`;
}
exports.getDefaultAlgorithm = getDefaultAlgorithm;
;
function sign(key, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let signatureAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _a !== void 0 ? _a : getDefaultAlgorithm(key);
        let protected_base64url = yield encode(Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.protected), { alg: signatureAlgorithm.getJoseType() }));
        let payload_base64url = ((options === null || options === void 0 ? void 0 : options.payload) != null ? yield encode(options.payload) : "");
        let signature = signatureAlgorithm.sign(Buffer.from(`${protected_base64url}.${payload_base64url}`), key);
        let signature_base64url = yield encoding.convertBufferToBase64URLString(signature);
        return {
            protected: protected_base64url,
            payload: payload_base64url,
            signature: signature_base64url
        };
    });
}
exports.sign = sign;
;
function verify(body, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let signature = yield encoding.convertBase64URLStringToBuffer(body.signature);
        let joseType = schema.Protected.as(JSON.parse(Buffer.from(body.protected, "base64url").toString())).alg;
        let signatureAlgorithm = pkcs5.signature.fromJoseType(joseType);
        return signatureAlgorithm.verify(Buffer.from(`${body.protected}.${body.payload}`), key, signature);
    });
}
exports.verify = verify;
;
