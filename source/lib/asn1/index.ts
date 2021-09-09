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

export function decodeInteger(buffer: Buffer, options?: Partial<{ paddedUnsigned: boolean }>): bigint {
	let paddedUnsigned = options?.paddedUnsigned ?? true;
	let hex = buffer.toString("hex");
	let number = BigInt(`0x${hex}`);
	if (buffer[0] < 0x80 || !paddedUnsigned) {
		return number;
	} else {
		let bias = BigInt(1) << BigInt(buffer.length * 8);
		return number - bias;
	}
};

export function encodeInteger(number: bigint, options?: Partial<{ paddedUnsigned: boolean }>): Buffer {
	function getNibbles(number: bigint): Array<number> {
		let nibbles = [...number.toString(16)].map((part) => Number.parseInt(part, 16));
		if ((nibbles.length % 2) === 1) {
			nibbles.unshift(0);
		}
		return nibbles;
	};
	let paddedUnsigned = options?.paddedUnsigned ?? true;
	if (number >= 0) {
		let nibbles = getNibbles(number);
		if (nibbles[0] >= 0x8 && paddedUnsigned) {
			nibbles.unshift(0, 0);
		}
		let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
		return Buffer.from(hex, "hex");
	} else {
		let bias = BigInt(1) << BigInt(getNibbles(BigInt(0) - number).length * 4);
		let nibbles = getNibbles(number + bias);
		if (nibbles[0] < 0x8) {
			nibbles.unshift(0xF, 0xF);
		}
		let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
		return Buffer.from(hex, "hex");
	}
};
