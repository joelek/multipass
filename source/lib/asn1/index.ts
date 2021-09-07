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
