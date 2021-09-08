import * as schema from "./schema";

export * from "./schema";

export const SEQUENCE: schema.Sequence = {
	kind: "UNIVERSAL",
	form: "CONSTRUCTED",
	type: "SEQUENCE",
	data: []
};

export const INTEGER: schema.Integer = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "INTEGER",
	data: ""
};

export const OBJECT_IDENTIFER: schema.ObjectIdentifier = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "OBJECT_IDENTIFIER",
	data: ""
};

export const NULL: schema.Null = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "NULL",
	data: ""
};

export const OCTET_STRING: schema.OctetString = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "OCTET_STRING",
	data: ""
};

export const BIT_STRING: schema.BitString = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "BIT_STRING",
	data: ""
};

export function encodeUnsignedInteger(number: number): Buffer {
	if (!Number.isInteger(number) || number < 0) {
		throw `Expected an unsigned integer!`;
	}
	let buffer = Buffer.alloc(4);
	buffer.writeUIntBE(number, 0, 4);
	let i = 0;
	for (; i < 4 - 1; i++) {
		if (buffer[i] !== 0) {
			break;
		}
	}
	return buffer.slice(i);
};
