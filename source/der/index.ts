import * as $encoding from "../encoding";
import * as $enumeration from "../enumeration";

enum Type {
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

enum Form {
	"PRIMITIVE",
	"CONSTRUCTED"
};

enum Kind {
	"UNIVERSAL",
	"APPLICATION",
	"CONTEXT_SPECIFIC",
	"PRIVATE"
};

enum OctetType {
	"FINAL",
	"NON_FINAL"
};

type Node = {
	type: keyof typeof Type,
	form: keyof typeof Form,
	kind: keyof typeof Kind,
	data: string | Array<Node>
};

async function parse(buffer: Buffer): Promise<Array<Node>> {
	let offset = 0;
	let nodes = new Array<Node>();
	while (offset < buffer.length) {
		let tag = buffer.readUInt8(offset++);
		let kind = await $enumeration.nameOf(Kind, ((tag >> 6) & 0x03));
		let form = await $enumeration.nameOf(Form, ((tag >> 5) & 0x01));
		let type = await $enumeration.nameOf(Type, ((tag >> 0) & 0x1F));
		if (Type[type] === 0x1F) {
			let bytes = new Array<number>();
			while (true) {
				let byte = buffer.readUInt8(offset++);
				bytes.push(byte);
				let octet_type = await $enumeration.nameOf(OctetType, ((byte >> 7) & 0x01));
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
			if (index < 0x1F) {
				throw "Unexpected long form!";
			}
			type = await $enumeration.nameOf(Type, index);
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
}

async function parseObjectIdentifier(buffer: Buffer): Promise<Array<number>> {
	let components = new Array<number>();
	let offset = 0;
	let byte = buffer.readUInt8(offset++);
	components.push((byte / 40) | 0);
	components.push(byte % 40);
	while (offset < buffer.length) {
		let component = 0;
		for (let i = 0; true; i++) {
			let byte = buffer.readUInt8(offset++);
			let hi = ((byte >> 7) & 0x01);
			let lo = ((byte >> 0) & 0x7F);
			component = (component * 128) + lo;
			if (hi === 0) {
				break;
			}
			if (i === 4) {
				throw "Expected a reasonable length!";
			}
		}
		components.push(component);
	}
	return components;
}

export {
	parse,
	parseObjectIdentifier
};
