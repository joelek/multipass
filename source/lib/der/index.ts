import * as enumeration from "../enumeration";
import * as parsing from "../parsing";

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

export enum Form {
	"PRIMITIVE",
	"CONSTRUCTED"
};

export enum Kind {
	"UNIVERSAL",
	"APPLICATION",
	"CONTEXT",
	"PRIVATE"
};

export enum OctetType {
	"FINAL",
	"NON_FINAL"
};

export type Node = {
	type: keyof typeof Type,
	form: keyof typeof Form,
	kind: keyof typeof Kind,
	data: string | Array<Node>
};

export function encodeVarlen(number: number): Buffer {
	let bytes = new Array<number>();
	while (true) {
		let byte = number & 0x7F;
		bytes.push(byte);
		number = number >> 7;
		if (number === 0) {
			break;
		}
	}
	for (let i = 1; i < bytes.length; i++) {
		bytes[i] += 0x80;
	}
	bytes.reverse();
	return Buffer.from(bytes);
};

export function decodeVarlen(parser: parsing.Parser): number {
	return parser.try(() => {
		let length = 0;
		for (let i = 0; true; i++) {
			let byte = parser.unsigned(1);
			let hi = ((byte >> 7) & 0x01);
			let lo = ((byte >> 0) & 0x7F);
			length = (length * 128) + lo;
			if (hi === 0) {
				break;
			}
			if (i === 4) {
				throw "Expected a reasonably long varlen encoding!";
			}
		}
		return length;
	});
};

export async function parse(buffer: Buffer): Promise<Array<Node>> {
	let offset = 0;
	let nodes = new Array<Node>();
	while (offset < buffer.length) {
		let tag = buffer.readUInt8(offset++);
		let kind = await enumeration.nameOf(Kind, ((tag >> 6) & 0x03));
		let form = await enumeration.nameOf(Form, ((tag >> 5) & 0x01));
		let type = await enumeration.nameOf(Type, ((tag >> 0) & 0x1F));
		// TODO: Use constant.
		if (Type[type] === 0x1F) {
			let bytes = new Array<number>();
			while (true) {
				let byte = buffer.readUInt8(offset++);
				bytes.push(byte);
				let octet_type = await enumeration.nameOf(OctetType, ((byte >> 7) & 0x01));
				if (octet_type === "FINAL") {
					break;
				}
				if (bytes.length === 4) {
					throw "Expected a reasonable length!";
				}
			}
			if ((bytes[0] & 0x7F) === 0x00) {
				throw "Expected a minimally encoded length!";
			}
			let index = 0;
			for (let i = 0; i < bytes.length; i++) {
				index = (index * 128) + (bytes[i] & 0x7F);
			}
			// stop of decode
			if (index < 0x1F) {
				throw "Unexpected long form!";
			}
			type = await enumeration.nameOf(Type, index);
		}
		let length = buffer.readUInt8(offset++);
		if (length <= 127) {
		} else if (length <= 128) {
			throw "Expected a definite length!";
		} else if (length <= 254) {
			let bytes = (length & 0x7F);
			if (bytes > 4) {
				throw "Expected a reasonable length!";
			}
			let true_length = 0;
			for (let i = 0; i < bytes; i++) {
				let byte = buffer.readUInt8(offset++);
				if ((i === 0) && (byte === 0)) {
					throw "Expected a minimally encoded length!";
				}
				true_length = (true_length * 256) + ((byte >> 0) & 0xFF);
			}
			if (true_length <= 127) {
				throw "Expected a minimally encoded length!";
			}
			length = true_length;
		} else {
			throw "Expected a valid length!";
		}
		if (offset + length > buffer.length) {
			throw "Expected a valid length!";
		}
		let data = buffer.slice(offset, offset + length);
		if (form === "PRIMITIVE") {
			nodes.push({
				type,
				form,
				kind,
				data: data.toString("hex")
			});
		} else {
			nodes.push({
				type,
				form,
				kind,
				data: await parse(data)
			});
		}
		offset += length;
	}
	return nodes;
};
