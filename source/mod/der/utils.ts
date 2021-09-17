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
