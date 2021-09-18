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
const pem = require("./");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let string = [].join(`\r\n`);
    let document = pem.parse(string);
    console.assert(document.sections.length === 0, `It should parse documents containing zero sections.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let string = [
            `-----BEGIN NUMBERS-----`
        ].join(`\r\n`);
        let document = pem.parse(string);
        console.assert(false, `It should throw an error when parsing documents with incomplete sections.`);
    }
    catch (error) { }
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let string = [
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = document.sections.length;
    let expected = 1;
    console.assert(observed === expected, `It should parse documents containing one section.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let string = [
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`,
        `-----BEGIN STRINGS-----`,
        `-----END STRINGS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = document.sections.length;
    let expected = 2;
    console.assert(observed === expected, `It should parse documents containing two sections.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let string = [
        `one`,
        `two`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_a = document.postamble) === null || _a === void 0 ? void 0 : _a.join(`\r\n`);
    let expected = [
        `one`,
        `two`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should parse document postamble properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let string = [
        `one`,
        `two`,
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_c = (_b = document.sections[0]) === null || _b === void 0 ? void 0 : _b.preamble) === null || _c === void 0 ? void 0 : _c.join(`\r\n`);
    let expected = [
        `one`,
        `two`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should parse section preamble properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    let string = [
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_d = document.sections[0]) === null || _d === void 0 ? void 0 : _d.label;
    let expected = `NUMBERS`;
    console.assert(observed === expected, `It should parse section labels properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    let string = [
        `-----BEGIN NUMBERS-----`,
        `one: 1`,
        `two: 2`,
        ``,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_f = (_e = document.sections[0]) === null || _e === void 0 ? void 0 : _e.headers) === null || _f === void 0 ? void 0 : _f.map((header) => {
        return `${header.key}:${header.value}`;
    }).join(`\r\n`);
    let expected = [
        `one: 1`,
        `two: 2`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should parse section headers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    let string = [
        `-----BEGIN NUMBERS-----`,
        `one: 1`,
        ` 1`,
        ` 1`,
        `two: 2`,
        ``,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_h = (_g = document.sections[0]) === null || _g === void 0 ? void 0 : _g.headers) === null || _h === void 0 ? void 0 : _h.map((header) => {
        return `${header.key}:${header.value}`;
    }).join(`\r\n`);
    let expected = [
        `one: 111`,
        `two: 2`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should parse multi-line section headers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    let string = [
        `-----BEGIN NUMBERS-----`,
        `AQIDBA==`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    let document = pem.parse(string);
    let observed = (_j = document.sections[0]) === null || _j === void 0 ? void 0 : _j.buffer;
    let expected = Buffer.from(`AQIDBA==`, `base64`);
    console.assert(observed === null || observed === void 0 ? void 0 : observed.equals(expected), `It should parse section buffers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: []
    });
    let expected = [].join(`\r\n`);
    console.assert(observed === expected, `It should serialize documents containing zero sections.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                label: "NUMBERS",
                buffer: Buffer.of()
            }
        ]
    });
    let expected = [
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize documents containing one section.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                label: "NUMBERS",
                buffer: Buffer.of()
            },
            {
                label: "STRINGS",
                buffer: Buffer.of()
            }
        ]
    });
    let expected = [
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`,
        `-----BEGIN STRINGS-----`,
        `-----END STRINGS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize documents containing two sections.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [],
        postamble: [
            `one`,
            `two`
        ]
    });
    let expected = [
        `one`,
        `two`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize documents containing postamble.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                label: "NUMBERS",
                headers: [
                    {
                        key: `one`,
                        value: `1`
                    },
                    {
                        key: `two`,
                        value: `2`
                    }
                ],
                buffer: Buffer.of()
            }
        ]
    });
    let expected = [
        `-----BEGIN NUMBERS-----`,
        `one:1`,
        `two:2`,
        ``,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize section headers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                label: "NUMBERS",
                headers: [
                    {
                        key: `one`,
                        value: `1111111111111111111111111111111111111111111111111111111111111111`
                    }
                ],
                buffer: Buffer.of()
            }
        ]
    });
    let expected = [
        `-----BEGIN NUMBERS-----`,
        `one:`,
        `	1111111111111111111111111111111111111111111111111111111111111111`,
        ``,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize multi-line section headers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                preamble: [
                    `one`,
                    `two`
                ],
                label: "NUMBERS",
                buffer: Buffer.of()
            }
        ]
    });
    let expected = [
        `one`,
        `two`,
        `-----BEGIN NUMBERS-----`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize section preamble properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = pem.serialize({
        sections: [
            {
                label: "NUMBERS",
                buffer: Buffer.of(1, 2, 3, 4)
            }
        ]
    });
    let expected = [
        `-----BEGIN NUMBERS-----`,
        `AQIDBA==`,
        `-----END NUMBERS-----`
    ].join(`\r\n`);
    console.assert(observed === expected, `It should serialize section buffers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let section = {
        label: `NUMBERS`,
        buffer: Buffer.of(1, 2, 3, 4)
    };
    let observed = pem.encrypt(section, `räksmörgås`, {
        algorithm: `AES-128-CBC`,
        iv: Buffer.alloc(16)
    }).buffer;
    let expected = Buffer.from(`ZjytgQTTv6HeUfYMXOuKcg==`, `base64`);
    console.assert(observed.equals(expected), `It should encrypt section buffers properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let section = {
        label: `NUMBERS`,
        headers: [
            {
                key: `Proc-Type`,
                value: [`4`, `ENCRYPTED`].join(`,`)
            },
            {
                key: `DEK-Info`,
                value: [`AES-128-CBC`, Buffer.alloc(16).toString(`hex`).toUpperCase()].join(`,`)
            }
        ],
        buffer: Buffer.from(`ZjytgQTTv6HeUfYMXOuKcg==`, `base64`)
    };
    let observed = pem.decrypt(section, `räksmörgås`).buffer;
    let expected = Buffer.of(1, 2, 3, 4);
    console.assert(observed.equals(expected), `It should decrypt section buffers properly.`);
}))();
