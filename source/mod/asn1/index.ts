import * as schema from "./schema";

export * from "./schema";

export const SEQUENCE: schema.Sequence = {
	kind: "UNIVERSAL",
	form: "CONSTRUCTED",
	type: "SEQUENCE",
	data: []
};

export const SET: schema.Set = {
	kind: "UNIVERSAL",
	form: "CONSTRUCTED",
	type: "SET",
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

export const UTF8_STRING: schema.UTF8String = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "UTF8_STRING",
	data: ""
};

export const DATE: schema.Date = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "DATE",
	data: ""
};

export const UTC_TIME: schema.UTCTime = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "UTC_TIME",
	data: ""
};

export const BOOLEAN: schema.Boolean = {
	kind: "UNIVERSAL",
	form: "PRIMITIVE",
	type: "BOOLEAN",
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

export function encodeUTCTime(date: Date): string {
	let year = (date.getUTCFullYear() % 100).toString().padStart(2, "0");
	let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	let day = (date.getUTCDate()).toString().padStart(2, "0");
	let hour = (date.getUTCHours()).toString().padStart(2, "0");
	let minute = (date.getUTCMinutes()).toString().padStart(2, "0");
	let second = (date.getUTCSeconds()).toString().padStart(2, "0");
	return `${year}${month}${day}${hour}${minute}${second}Z`;
};

export function decodeUTCTime(string: string): Date {
	let parts = /^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/.exec(string);
	if (parts == null) {
		throw `Expected a valid UTC time!`;
	}
	let century = (Number.parseInt(string[0]) < 5) ? "20" : "19";
	let year = parts[1];
	let month = parts[2];
	let day = parts[3];
	let hour = parts[4];
	let minute = parts[5];
	let second = parts[6] ?? "00";
	let iso = `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
	return new Date(iso);
};
