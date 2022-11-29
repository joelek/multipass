"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.parse = exports.parseHeaders = exports.encrypt = exports.decrypt = exports.deriveKey = void 0;
const libcrypto = require("crypto");
function deriveKey(data, salt, keyLength) {
    let last = Buffer.alloc(0);
    let key = Buffer.alloc(0);
    while (key.length < keyLength) {
        let hash = libcrypto.createHash("MD5");
        hash.update(last);
        hash.update(data);
        hash.update(salt);
        last = hash.digest();
        key = Buffer.concat([key, last]);
    }
    return key.slice(0, keyLength);
}
exports.deriveKey = deriveKey;
;
function decrypt(section, passphrase) {
    var _a, _b, _c, _d, _e;
    let procTypes = (_b = (_a = section.headers) === null || _a === void 0 ? void 0 : _a.filter((header) => header.key.toLowerCase() === "proc-type")) !== null && _b !== void 0 ? _b : [];
    if (procTypes.length !== 1) {
        throw `Expected exactly one "Proc-Type" header!`;
    }
    let procType = procTypes[0].value.trim().split(",");
    if (procType.length < 2) {
        throw `Expected "Proc-Type" to contain at least 2 values!`;
    }
    if (procType[0] !== "4" || procType[1] !== "ENCRYPTED") {
        throw `Expected an encrypted section!`;
    }
    let dekInfos = (_d = (_c = section.headers) === null || _c === void 0 ? void 0 : _c.filter((header) => header.key.toLowerCase() === "dek-info")) !== null && _d !== void 0 ? _d : [];
    if (dekInfos.length !== 1) {
        throw `Expected exactly one "DEK-Info" header!`;
    }
    let dekInfo = dekInfos[0].value.trim().split(",");
    if (dekInfo.length < 2) {
        throw `Expected "DEK-Info" to contain at least 2 values!`;
    }
    let algorithm = dekInfo[0];
    let { ivLength, keyLength } = Object.assign({}, libcrypto.getCipherInfo(algorithm));
    if (ivLength == null || keyLength == null) {
        throw `Expected "${algorithm}" to be a supported cipher!`;
    }
    let iv = Buffer.from(dekInfo[1], "hex");
    let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
    let decipher = libcrypto.createDecipheriv(algorithm, key, iv);
    let buffer = Buffer.concat([decipher.update(section.buffer), decipher.final()]);
    return Object.assign(Object.assign({}, section), { headers: [
            ...((_e = section.headers) !== null && _e !== void 0 ? _e : []).filter((header) => {
                let key = header.key.toLowerCase();
                return key !== "proc-type" && key !== "dek-info";
            }),
        ], buffer });
}
exports.decrypt = decrypt;
;
function encrypt(section, passphrase, options) {
    var _a, _b, _c;
    let algorithm = (_a = options === null || options === void 0 ? void 0 : options.algorithm) !== null && _a !== void 0 ? _a : "AES-128-CBC";
    let { ivLength, keyLength } = Object.assign({}, libcrypto.getCipherInfo(algorithm));
    if (ivLength == null || keyLength == null) {
        throw `Expected "${algorithm}" to be a supported cipher!`;
    }
    let iv = (_b = options === null || options === void 0 ? void 0 : options.iv) !== null && _b !== void 0 ? _b : libcrypto.randomBytes(ivLength);
    let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
    let cipher = libcrypto.createCipheriv(algorithm, key, iv);
    let buffer = Buffer.concat([cipher.update(section.buffer), cipher.final()]);
    return Object.assign(Object.assign({}, section), { headers: [
            ...((_c = section.headers) !== null && _c !== void 0 ? _c : []),
            {
                key: "Proc-TYPE",
                value: ["4", "ENCRYPTED"].join(",")
            },
            {
                key: "DEK-Info",
                value: [algorithm, iv.toString("hex").toUpperCase()].join(",")
            }
        ], buffer });
}
exports.encrypt = encrypt;
;
function parseHeaders(lines) {
    for (let i = 1; i < lines.length;) {
        let parts = /^[ \t]([\x09\x20-\x7E]*)$/u.exec(lines[i]);
        if (parts != null) {
            lines.splice(i, 1);
            lines[i - 1] += parts[1];
        }
        else {
            i += 1;
        }
    }
    return lines.map((line) => {
        let parts = /^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)[:]([\x09\x20-\x7E]*)$/u.exec(line);
        if (parts == null) {
            throw `Expected a valid header!`;
        }
        let key = parts[1];
        let value = parts[2];
        return {
            key,
            value
        };
    });
}
exports.parseHeaders = parseHeaders;
;
function parse(string) {
    let sections = new Array();
    let lines = string.split(/\r\n|\r|\n/);
    let index = 0;
    let preamble = new Array();
    outer: while (index < lines.length) {
        let line = lines[index++];
        let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/u.exec(line);
        if (parts == null) {
            preamble.push(line);
            continue outer;
        }
        let label = parts[1];
        let start = index;
        inner: while (index < lines.length) {
            if (lines[index++] !== `-----END ${label}-----`) {
                continue inner;
            }
            let end = index;
            let message = lines.slice(start, end - 1);
            let emptyIndex = Math.max(0, message.indexOf(""));
            let head = message.slice(0, emptyIndex);
            let body = message.slice(emptyIndex);
            let headers = parseHeaders(head);
            sections.push({
                preamble: preamble.splice(0, preamble.length),
                label: label,
                headers: headers,
                buffer: Buffer.from(body.join(""), "base64")
            });
            continue outer;
        }
        throw `Expected end of label "${label}"!`;
    }
    let postamble = preamble;
    return {
        sections,
        postamble
    };
}
exports.parse = parse;
;
function serialize(document) {
    var _a, _b, _c;
    let lines = new Array();
    for (let section of document.sections) {
        if (!/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/u.test(section.label)) {
            throw `Expected a valid label!`;
        }
        lines.push(...((_a = section.preamble) !== null && _a !== void 0 ? _a : []));
        lines.push(`-----BEGIN ${section.label}-----`);
        if (section.headers != null && section.headers.length > 0) {
            for (let { key, value } of section.headers) {
                if (!/^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)$/u.test(key)) {
                    throw `Expected a valid header key!`;
                }
                if (!/^([\x09\x20-\x7E]*)$/u.test(value)) {
                    throw `Expected a valid header value!`;
                }
                let parts = (_b = value.match(/.{1,64}/g)) !== null && _b !== void 0 ? _b : [""];
                if (key.length + 1 + parts[0].length > 64) {
                    parts.unshift("");
                }
                lines.push(`${key}:${parts[0]}`);
                for (let part of parts.slice(1)) {
                    lines.push(`\t${part}`);
                }
            }
            lines.push("");
        }
        let base64 = section.buffer.toString("base64");
        for (let i = 0; i < base64.length; i += 64) {
            let line = base64.substr(i, 64);
            lines.push(line);
        }
        lines.push(`-----END ${section.label}-----`);
    }
    lines.push(...((_c = document.postamble) !== null && _c !== void 0 ? _c : []));
    return lines.join("\r\n");
}
exports.serialize = serialize;
;
