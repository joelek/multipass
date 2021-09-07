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
