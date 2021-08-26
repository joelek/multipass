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

export function expect(node: Node, expected: Partial<Node>): Node {
	if (expected.kind != null) {
		if (node.kind !== expected.kind) {
			throw `Expected kind "${node.kind}" to be "${expected.kind}"!`;
		}
	}
	if (expected.form != null) {
		if (node.form !== expected.form) {
			throw `Expected form "${node.form}" to be "${expected.form}"!`;
		}
	}
	if (expected.type != null) {
		if (node.type !== expected.type) {
			throw `Expected type "${node.type}" to be "${expected.type}"!`;
		}
	}
	if (expected.data != null) {
		if (!node.data.equals(expected.data)) {
			throw `Expected data to be identical!`;
		}
	}
	return node;
};
