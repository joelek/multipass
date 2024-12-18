"use strict";
// This file was auto-generated by @joelek/autoguard. Edit at own risk.
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
exports.makeClient = void 0;
const autoguard = require("@joelek/autoguard/dist/lib-client");
const shared = require("./index");
const makeClient = (clientOptions) => ({
    "downloadCertificate": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["downloadCertificate"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_b = (_a = request.options) === null || _a === void 0 ? void 0 : _a["path"]) !== null && _b !== void 0 ? _b : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_c = request.options) !== null && _c !== void 0 ? _c : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_d = request.headers) === null || _d === void 0 ? void 0 : _d["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_e = request.headers) !== null && _e !== void 0 ? _e : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_f = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _f !== void 0 ? _f : autoguard.api.xhr;
        let defaultHeaders = (_h = (_g = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _g === void 0 ? void 0 : _g.slice()) !== null && _h !== void 0 ? _h : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/octet-stream"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = raw.payload;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["downloadCertificate"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, true);
        }
    }),
    "finalizeChallenge": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _j, _k, _l, _m, _o, _p, _q, _r;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["finalizeChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_k = (_j = request.options) === null || _j === void 0 ? void 0 : _j["path"]) !== null && _k !== void 0 ? _k : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_l = request.options) !== null && _l !== void 0 ? _l : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_m = request.headers) === null || _m === void 0 ? void 0 : _m["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_o = request.headers) !== null && _o !== void 0 ? _o : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_p = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _p !== void 0 ? _p : autoguard.api.xhr;
        let defaultHeaders = (_r = (_q = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _q === void 0 ? void 0 : _q.slice()) !== null && _r !== void 0 ? _r : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["finalizeChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "finalizeOrder": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _s, _t, _u, _v, _w, _x, _y, _z;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["finalizeOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_t = (_s = request.options) === null || _s === void 0 ? void 0 : _s["path"]) !== null && _t !== void 0 ? _t : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_u = request.options) !== null && _u !== void 0 ? _u : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_v = request.headers) === null || _v === void 0 ? void 0 : _v["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_w = request.headers) !== null && _w !== void 0 ? _w : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_x = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _x !== void 0 ? _x : autoguard.api.xhr;
        let defaultHeaders = (_z = (_y = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _y === void 0 ? void 0 : _y.slice()) !== null && _z !== void 0 ? _z : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["finalizeOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "getAccount": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _0, _1, _2, _3, _4, _5, _6, _7;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_1 = (_0 = request.options) === null || _0 === void 0 ? void 0 : _0["path"]) !== null && _1 !== void 0 ? _1 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_2 = request.options) !== null && _2 !== void 0 ? _2 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_3 = request.headers) === null || _3 === void 0 ? void 0 : _3["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_4 = request.headers) !== null && _4 !== void 0 ? _4 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_5 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _5 !== void 0 ? _5 : autoguard.api.xhr;
        let defaultHeaders = (_7 = (_6 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _6 === void 0 ? void 0 : _6.slice()) !== null && _7 !== void 0 ? _7 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "getAuthorization": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _8, _9, _10, _11, _12, _13, _14, _15;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getAuthorization"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_9 = (_8 = request.options) === null || _8 === void 0 ? void 0 : _8["path"]) !== null && _9 !== void 0 ? _9 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_10 = request.options) !== null && _10 !== void 0 ? _10 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_11 = request.headers) === null || _11 === void 0 ? void 0 : _11["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_12 = request.headers) !== null && _12 !== void 0 ? _12 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_13 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _13 !== void 0 ? _13 : autoguard.api.xhr;
        let defaultHeaders = (_15 = (_14 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _14 === void 0 ? void 0 : _14.slice()) !== null && _15 !== void 0 ? _15 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getAuthorization"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "getChallenge": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _16, _17, _18, _19, _20, _21, _22, _23;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_17 = (_16 = request.options) === null || _16 === void 0 ? void 0 : _16["path"]) !== null && _17 !== void 0 ? _17 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_18 = request.options) !== null && _18 !== void 0 ? _18 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_19 = request.headers) === null || _19 === void 0 ? void 0 : _19["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_20 = request.headers) !== null && _20 !== void 0 ? _20 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_21 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _21 !== void 0 ? _21 : autoguard.api.xhr;
        let defaultHeaders = (_23 = (_22 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _22 === void 0 ? void 0 : _22.slice()) !== null && _23 !== void 0 ? _23 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "getDirectory": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _24, _25, _26, _27, _28, _29, _30, _31;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getDirectory"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "GET";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_25 = (_24 = request.options) === null || _24 === void 0 ? void 0 : _24["path"]) !== null && _25 !== void 0 ? _25 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_26 = request.options) !== null && _26 !== void 0 ? _26 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_27 = request.headers) !== null && _27 !== void 0 ? _27 : {}, headers.map((header) => header[0])));
        let payload = (_28 = request.payload) !== null && _28 !== void 0 ? _28 : [];
        let requestHandler = (_29 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _29 !== void 0 ? _29 : autoguard.api.xhr;
        let defaultHeaders = (_31 = (_30 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _30 === void 0 ? void 0 : _30.slice()) !== null && _31 !== void 0 ? _31 : [];
        defaultHeaders.push(["Content-Type", "application/octet-stream"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getDirectory"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "getOrder": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _32, _33, _34, _35, _36, _37, _38, _39;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_33 = (_32 = request.options) === null || _32 === void 0 ? void 0 : _32["path"]) !== null && _33 !== void 0 ? _33 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_34 = request.options) !== null && _34 !== void 0 ? _34 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_35 = request.headers) === null || _35 === void 0 ? void 0 : _35["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_36 = request.headers) !== null && _36 !== void 0 ? _36 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_37 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _37 !== void 0 ? _37 : autoguard.api.xhr;
        let defaultHeaders = (_39 = (_38 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _38 === void 0 ? void 0 : _38.slice()) !== null && _39 !== void 0 ? _39 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "newAccount": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _40, _41, _42, _43, _44, _45, _46, _47;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_41 = (_40 = request.options) === null || _40 === void 0 ? void 0 : _40["path"]) !== null && _41 !== void 0 ? _41 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_42 = request.options) !== null && _42 !== void 0 ? _42 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_43 = request.headers) === null || _43 === void 0 ? void 0 : _43["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_44 = request.headers) !== null && _44 !== void 0 ? _44 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_45 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _45 !== void 0 ? _45 : autoguard.api.xhr;
        let defaultHeaders = (_47 = (_46 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _46 === void 0 ? void 0 : _46.slice()) !== null && _47 !== void 0 ? _47 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers["location"] = autoguard.api.decodeHeaderValue(raw.headers, "location", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
    "newNonce": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _48, _49, _50, _51, _52, _53, _54, _55;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newNonce"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "HEAD";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_49 = (_48 = request.options) === null || _48 === void 0 ? void 0 : _48["path"]) !== null && _49 !== void 0 ? _49 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_50 = request.options) !== null && _50 !== void 0 ? _50 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_51 = request.headers) !== null && _51 !== void 0 ? _51 : {}, headers.map((header) => header[0])));
        let payload = (_52 = request.payload) !== null && _52 !== void 0 ? _52 : [];
        let requestHandler = (_53 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _53 !== void 0 ? _53 : autoguard.api.xhr;
        let defaultHeaders = (_55 = (_54 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _54 === void 0 ? void 0 : _54.slice()) !== null && _55 !== void 0 ? _55 : [];
        defaultHeaders.push(["Content-Type", "application/octet-stream"]);
        defaultHeaders.push(["Accept", "application/octet-stream"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = raw.payload;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newNonce"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, true);
        }
    }),
    "newOrder": (request, requestOptions) => __awaiter(void 0, void 0, void 0, function* () {
        var _56, _57, _58, _59, _60, _61, _62, _63;
        let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
        guard.as(request, "request");
        let method = "POST";
        let components = new Array();
        components.push(...autoguard.api.encodeComponents((_57 = (_56 = request.options) === null || _56 === void 0 ? void 0 : _56["path"]) !== null && _57 !== void 0 ? _57 : [], true));
        let parameters = new Array();
        parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_58 = request.options) !== null && _58 !== void 0 ? _58 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
        let headers = new Array();
        headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_59 = request.headers) === null || _59 === void 0 ? void 0 : _59["content-type"]], true));
        headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_60 = request.headers) !== null && _60 !== void 0 ? _60 : {}, headers.map((header) => header[0])));
        let payload = autoguard.api.serializePayload(request.payload);
        let requestHandler = (_61 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _61 !== void 0 ? _61 : autoguard.api.xhr;
        let defaultHeaders = (_63 = (_62 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _62 === void 0 ? void 0 : _62.slice()) !== null && _63 !== void 0 ? _63 : [];
        defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
        defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
        let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions, requestOptions);
        {
            let status = raw.status;
            let headers = {};
            headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
            headers["location"] = autoguard.api.decodeHeaderValue(raw.headers, "location", true);
            headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
            let payload = yield autoguard.api.deserializePayload(raw.payload);
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            let response = guard.as({ status, headers, payload }, "response");
            return new autoguard.api.ServerResponse(response, false);
        }
    }),
});
exports.makeClient = makeClient;
