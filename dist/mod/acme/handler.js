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
exports.Handler = void 0;
const libcrypto = require("crypto");
const liburl = require("url");
const autoguard = require("@joelek/ts-autoguard/dist/lib-server");
const apiclient = require("./api/client");
const jwk = require("../jwk");
const jws = require("../jws");
function makeClient(urlPrefix) {
    let client = apiclient.makeClient({
        urlPrefix: urlPrefix,
        requestHandler: autoguard.api.makeNodeRequestHandler()
    });
    return client;
}
;
function getUrlPath(url, urlPrefix) {
    if (!url.startsWith(urlPrefix)) {
        throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
    }
    url = url.slice(urlPrefix.length);
    let components = autoguard.api.splitComponents(url);
    return components.map((component) => decodeURIComponent(component));
}
;
const CONTENT_TYPE = "application/jose+json";
class Handler {
    constructor(key, client, directory, urlPrefix) {
        this.key = key;
        this.client = client;
        this.directory = directory;
        this.urlPrefix = urlPrefix;
        this.nextReplayNonce = undefined;
    }
    createAccount(payloadData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let key = jwk.PublicKey.as(libcrypto.createPublicKey(this.key).export({ format: "jwk" }));
            let protectedData = {
                jwk: key,
                nonce: this.nextReplayNonce,
                url: this.directory.newAccount
            };
            let response = yield this.client.newAccount({
                options: {
                    path: getUrlPath(this.directory.newAccount, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData,
                    payload: payloadData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            let url = response.headers()["location"];
            return {
                payload,
                url
            };
        });
    }
    createNonce() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.client.newNonce({
                options: {
                    path: getUrlPath(this.directory.newNonce, this.urlPrefix)
                }
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
        });
    }
    createOrder(kid, payloadData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: this.directory.newOrder
            };
            let response = yield this.client.newOrder({
                options: {
                    path: getUrlPath(this.directory.newOrder, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData,
                    payload: payloadData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            let url = response.headers()["location"];
            return {
                payload,
                url
            };
        });
    }
    downloadCertificate(kid, url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.downloadCertificate({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let buffer = Buffer.from((_a = yield response.payload()) !== null && _a !== void 0 ? _a : new Uint8Array());
            return buffer;
        });
    }
    finalizeChallenge(kid, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.finalizeChallenge({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData,
                    payload: {}
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
        });
    }
    finalizeOrder(kid, url, payloadData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.finalizeOrder({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData,
                    payload: payloadData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
        });
    }
    getAccount(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: url,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.getAccount({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            return {
                payload,
                url
            };
        });
    }
    getAuthorization(kid, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.getAuthorization({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            return {
                payload,
                url
            };
        });
    }
    getChallenge(kid, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.getChallenge({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            return {
                payload,
                url
            };
        });
    }
    getOrder(kid, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.nextReplayNonce == null) {
                throw `Expected next replay nonce to be set!`;
            }
            let protectedData = {
                kid: kid,
                nonce: this.nextReplayNonce,
                url: url
            };
            let response = yield this.client.getOrder({
                options: {
                    path: getUrlPath(url, this.urlPrefix)
                },
                headers: {
                    "content-type": CONTENT_TYPE
                },
                payload: jws.sign(this.key, {
                    protected: protectedData
                })
            });
            this.nextReplayNonce = response.headers()["replay-nonce"];
            let payload = yield response.payload();
            return {
                payload,
                url
            };
        });
    }
    static make(url, key) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlPrefix = new liburl.URL(url).origin;
            let client = makeClient(urlPrefix);
            let response = yield client.getDirectory({
                options: {
                    path: getUrlPath(url, urlPrefix)
                }
            });
            let payload = yield response.payload();
            return new Handler(key, client, payload, urlPrefix);
        });
    }
    ;
}
exports.Handler = Handler;
;
