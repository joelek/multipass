import * as asn1 from "../asn1";
import * as parsing from "../parsing";

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

export function parseNode(parser: parsing.Parser): asn1.Node {
	return parser.try(() => {
		let tag = parser.unsigned(1);
		let kind = asn1.Kind.keyFromValue((tag >> 6) & 0x03);
		let form = asn1.Form.keyFromValue((tag >> 5) & 0x01);
		let type = asn1.Type.keyFromValue((tag >> 0) & 0x1F);
		// The value 31 is special and denotes a varlen encoded type.
		if (asn1.Type[type] === 31) {
			let length = decodeVarlen(parser);
			if (length < 31) {
				throw `Expected a minimally encoded type!`;
			}
			type = asn1.Type.keyFromValue(length);
		}
		let length = decodeLength(parser);
		let data = parser.chunk(length);
		return {
			kind,
			form,
			type,
			data: form === `CONSTRUCTED` ? parse(new parsing.Parser(data)) : data.toString(`base64url`)
		};
	});
};

export function serializeNode(node: asn1.Node): Buffer {
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
		buffers.push(encodeVarlen(type));
	}
	buffers.push(encodeLength(data.length));
	if (typeof data === `string`) {
		buffers.push(Buffer.from(data, `base64url`));
	} else {
		for (let node of data) {
			buffers.push(serializeNode(node));
		}
	}
	return Buffer.concat(buffers);
};

export function parse(parser: parsing.Parser): Array<asn1.Node> {
	return parser.try(() => {
		let nodes = new Array<asn1.Node>();
		while (!parser.eof()) {
			let node = parseNode(parser);
			nodes.push(node);
		}
		return nodes;
	});
};

export function serialize(nodes: Array<asn1.Node>): Buffer {
	let buffers = new Array<Buffer>();
	for (let node of nodes) {
		let buffer = serializeNode(node);
		buffers.push(buffer);
	}
	return Buffer.concat(buffers);
};
