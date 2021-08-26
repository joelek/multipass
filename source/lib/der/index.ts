import * as enumeration from "../enumeration";
import * as parsing from "../parsing";

export enum Kind {
	"UNIVERSAL",
	"APPLICATION",
	"CONTEXT",
	"PRIVATE"
};

export enum Form {
	"PRIMITIVE",
	"CONSTRUCTED"
};

export enum Type {
	"END_OF_CONTENT",
	"BOOLEAN",
	"INTEGER",
	"BIT_STRING",
	"OCTET_STRING",
	"NULL",
	"OBJECT_IDENTIFIER",
	"OBJECT_DESCRIPTOR",
	"EXTERNAL",
	"REAL",
	"ENUMERATED",
	"EMBEDDED_PDV",
	"UTF8_STRING",
	"RELATIVE_OID",
	"TIME",
	"0F_RESERVED",
	"SEQUENCE",
	"SET",
	"NUMERIC_STRING",
	"PRINTABLE_STRING",
	"T61_STRING",
	"VIDEOTEX_STRING",
	"IA5_STRING",
	"UTC_TIME",
	"GENERALIZED_TIME",
	"GRAPHIC_STRING",
	"VISIBLE_STRING",
	"GENERAL_STRING",
	"UNIVERSAL_STRING",
	"CHARACTER_STRING",
	"BMP_STRING",
	"DATE",
	"TIME_OF_DAY",
	"DATE_TIME",
	"DURATION",
	"OID_IRI",
	"RELATIVE_OID_IRI"
};

export type Node = {
	kind: keyof typeof Kind;
	form: keyof typeof Form;
	type: keyof typeof Type;
	data: Buffer;
};

export function encodeVarlen(number: number): Buffer {
	if (!Number.isInteger(number) || number < 0) {
		throw `Expected an unsigned integer!`;
	}
	let bytes = new Array<number>();
	while (true) {
		let byte = number % 128;
		bytes.push(byte);
		number = Math.floor(number / 128);
		if (number === 0) {
			break;
		}
	}
	for (let i = 1; i < bytes.length; i++) {
		bytes[i] += 128;
	}
	bytes.reverse();
	return Buffer.from(bytes);
};

export function decodeVarlen(parser: parsing.Parser): number {
	return parser.try(() => {
		let length = 0;
		for (let i = 0; true; i++) {
			let byte = parser.unsigned(1);
			let hi = (byte >> 7) & 0x01;
			let lo = (byte >> 0) & 0x7F;
			length = (length * 128) + lo;
			if (hi === 0) {
				break;
			}
			if (i === 0 && lo === 0) {
				throw `Expected a minimally encoded varlen!`;
			}
			if (i === 4) {
				throw `Expected a reasonably long varlen encoding!`;
			}
		}
		return length;
	});
};

export function encodeLength(number: number): Buffer {
	if (!Number.isInteger(number) || number < 0) {
		throw `Expected an unsigned integer!`;
	}
	if (number <= 127) {
		return Buffer.of(number);
	}
	let bytes = new Array<number>();
	while (true) {
		let byte = number % 256;
		bytes.push(byte);
		number = Math.floor(number / 256);
		if (number === 0) {
			break;
		}
	}
	bytes.push(bytes.length + 128);
	bytes.reverse();
	return Buffer.from(bytes);
};

export function decodeLength(parser: parsing.Parser): number {
	return parser.try(() => {
		let byte = parser.unsigned(1);
		let hi = (byte >> 7) & 0x01;
		let lo = (byte >> 0) & 0x7F;
		if (hi === 0) {
			return lo;
		}
		if (lo === 0) {
			throw `Expected a definite length!`;
		}
		if (lo > 4) {
			throw `Expected a reasonably long length encoding!`;
		}
		let length = 0;
		for (let i = 0; i < lo; i++) {
			let byte = parser.unsigned(1);
			length = (length * 256) + byte;
			if (i === 0 && byte === 0) {
				throw `Expected a minimally encoded length!`;
			}
		}
		if (length <= 127) {
			throw `Expected a minimally encoded length!`;
		}
		return length;
	});
};

export function parseNode(parser: parsing.Parser): Node {
	return parser.try(() => {
		let tag = parser.unsigned(1);
		let kind = enumeration.nameOf(Kind, ((tag >> 6) & 0x03));
		let form = enumeration.nameOf(Form, ((tag >> 5) & 0x01));
		let type = enumeration.nameOf(Type, ((tag >> 0) & 0x1F));
		// The value 31 is special and denotes a varlen encoded type.
		if (Type[type] === 31) {
			let length = decodeVarlen(parser);
			if (length < 31) {
				throw `Expected a minimally encoded type!`;
			}
			type = enumeration.nameOf(Type, length);
		}
		let length = decodeLength(parser);
		let data = parser.chunk(length);
		return {
			kind,
			form,
			type,
			data
		};
	});
};

export function serializeNode(node: Node): Buffer {
	let buffers = new Array<Buffer>();
	let kind = Kind[node.kind];
	let form = Form[node.form];
	let type = Type[node.type];
	let data = node.data;
	let extended = type >= 31;
	let tag = 0;
	tag |= (kind << 6);
	tag |= (form << 5);
	tag |= ((extended ? 31 : type) << 0);
	buffers.push(Buffer.of(tag));
	if (extended) {
		buffers.push(encodeVarlen(type));
	}
	buffers.push(data);
	return Buffer.concat(buffers);
};

export function parse(parser: parsing.Parser): Array<Node> {
	return parser.try(() => {
		let nodes = new Array<Node>();
		while (!parser.eof()) {
			let node = parseNode(parser);
			nodes.push(node);
		}
		return nodes;
	});
};

export function serialize(nodes: Array<Node>): Buffer {
	let buffers = new Array<Buffer>();
	for (let node of nodes) {
		let buffer = serializeNode(node);
		buffers.push(buffer);
	}
	return Buffer.concat(buffers);
};
