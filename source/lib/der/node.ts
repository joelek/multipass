import * as asn1 from "../asn1";
import * as parsing from "../parsing";
import * as utils from "./utils";

export function parse(parser: parsing.Parser): asn1.Node {
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
		let node: asn1.Node = {
			kind,
			form,
			type,
			data: form === `CONSTRUCTED` ? parseArray(new parsing.Parser(buffer)) : buffer.toString(`base64url`)
		};
		return node;
	});
};

export function serialize(node: asn1.Node): Buffer {
	let buffers = new Array<Buffer>();
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
	if (typeof data === `string`) {
		let buffer = Buffer.from(data, `base64url`);
		buffers.push(utils.encodeLength(buffer.length));
		buffers.push(buffer);
	} else {
		let subbuffers = new Array<Buffer>();
		for (let node of data) {
			subbuffers.push(serialize(node));
		}
		let buffer = Buffer.concat(subbuffers);
		buffers.push(utils.encodeLength(buffer.length));
		buffers.push(buffer);
	}
	return Buffer.concat(buffers);
};

export function parseArray(parser: parsing.Parser): Array<asn1.Node> {
	return parser.try(() => {
		let nodes = new Array<asn1.Node>();
		while (!parser.eof()) {
			let node = parse(parser);
			nodes.push(node);
		}
		return nodes;
	});
};

export function serializeArray(nodes: Array<asn1.Node>): Buffer {
	let buffers = new Array<Buffer>();
	for (let node of nodes) {
		let buffer = serialize(node);
		buffers.push(buffer);
	}
	return Buffer.concat(buffers);
};
