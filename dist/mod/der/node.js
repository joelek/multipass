"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeArray = exports.parseArray = exports.serialize = exports.parse = void 0;
const asn1 = require("../asn1");
const oid = require("./oid");
const parsing = require("../parsing");
const utils = require("./utils");
function parse(parser) {
    return parser.try(() => {
        let tag = parser.unsigned(1);
        let kind = asn1.Kind.keyFromValue((tag >> 6) & 0x03);
        let form = asn1.Form.keyFromValue((tag >> 5) & 0x01);
        let type = asn1.Type.keyFromValue((tag >> 0) & 0x1F);
        // The value 31 is special and denotes a varlen encoded type.
        if (asn1.Type[type] === 31) {
            let length = utils.decodeVarlen(parser);
            if (length < 31) {
                throw `Expected a minimally encoded type!`;
            }
            type = asn1.Type.keyFromValue(length);
        }
        let length = utils.decodeLength(parser);
        let buffer = parser.chunk(length);
        let node = {
            kind,
            form,
            type,
            data: form === "CONSTRUCTED" ? parseArray(new parsing.Parser(buffer)) : buffer.toString("base64url")
        };
        if (asn1.ObjectIdentifier.is(node)) {
            let parser = new parsing.Parser(buffer);
            node.data = oid.parse(parser).join(".");
        }
        return node;
    });
}
exports.parse = parse;
;
function serialize(node) {
    let buffers = new Array();
    let kind = asn1.Kind[node.kind];
    let form = asn1.Form[node.form];
    let type = asn1.Type[node.type];
    let data = node.data;
    let extended = type >= 31;
    let tag = 0;
    tag |= (kind << 6);
    tag |= (form << 5);
    tag |= ((extended ? 31 : type) << 0);
    buffers.push(Buffer.of(tag));
    if (extended) {
        buffers.push(utils.encodeVarlen(type));
    }
    if (typeof data === "string") {
        let buffer = Buffer.alloc(0);
        if (asn1.ObjectIdentifier.is(node)) {
            let numbers = node.data.split(".").map((part) => Number.parseInt(part));
            buffer = oid.serialize(numbers);
        }
        else {
            buffer = Buffer.from(data, "base64url");
        }
        buffers.push(utils.encodeLength(buffer.length));
        buffers.push(buffer);
    }
    else {
        let subbuffers = new Array();
        for (let node of data) {
            subbuffers.push(serialize(node));
        }
        let buffer = Buffer.concat(subbuffers);
        buffers.push(utils.encodeLength(buffer.length));
        buffers.push(buffer);
    }
    return Buffer.concat(buffers);
}
exports.serialize = serialize;
;
function parseArray(parser) {
    return parser.try(() => {
        let nodes = new Array();
        while (!parser.eof()) {
            let node = parse(parser);
            nodes.push(node);
        }
        return nodes;
    });
}
exports.parseArray = parseArray;
;
function serializeArray(nodes) {
    let buffers = new Array();
    for (let node of nodes) {
        let buffer = serialize(node);
        buffers.push(buffer);
    }
    return Buffer.concat(buffers);
}
exports.serializeArray = serializeArray;
;
