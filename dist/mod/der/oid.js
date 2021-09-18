"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.parse = void 0;
const utils = require("./utils");
function parse(parser) {
    return parser.try(() => {
        let arcs = new Array();
        let arc = utils.decodeVarlen(parser);
        let root = Math.min(Math.floor(arc / 40), 2);
        let second = arc - (root * 40);
        arcs.push(root);
        arcs.push(second);
        while (!parser.eof()) {
            let arc = utils.decodeVarlen(parser);
            arcs.push(arc);
        }
        return arcs;
    });
}
exports.parse = parse;
;
function serialize(arcs) {
    for (let arc of arcs) {
        if (!Number.isInteger(arc) || arc < 0) {
            throw `Expected an unsigned integer!`;
        }
    }
    if (arcs.length < 2) {
        throw `Expected at least two arcs!`;
    }
    let root = arcs[0];
    let second = arcs[1];
    if (root > 2) {
        throw `Expected the root arc to be at most 2!`;
    }
    else if (root < 2 && second >= 40) {
        throw `Expected the second arc to be at most 39!`;
    }
    let buffers = new Array();
    buffers.push(utils.encodeVarlen((root * 40) + second));
    for (let i = 2; i < arcs.length; i++) {
        buffers.push(utils.encodeVarlen(arcs[i]));
    }
    return Buffer.concat(buffers);
}
exports.serialize = serialize;
;
