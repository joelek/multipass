export class Parser {
	private buffer: Buffer;
	private offset: number;

	constructor(buffer: Buffer, offset?: number) {
		this.buffer = buffer;
		this.offset = offset ?? 0;
	}

	chunk(length: number): Buffer {
		if (this.offset + length > this.buffer.length) {
			throw `Expected to read at least ${length} bytes!`;
		}
		let buffer = this.buffer.slice(this.offset, this.offset + length);
		this.offset += length;
		return buffer;
	}

	eof(): boolean {
		return this.offset >= this.buffer.length;
	}

	signed(length: number, endian?: "big" | "little"): number {
		if (endian === "little") {
			let value = this.buffer.readIntLE(this.offset, length);
			this.offset += length;
			return value;
		} else {
			let value = this.buffer.readIntBE(this.offset, length);
			this.offset += length;
			return value;
		}
	}

	try<A>(supplier: (reader: Parser) => A): A {
		let offset = this.offset;
		try {
			return supplier(this);
		} catch (error) {
			this.offset = offset;
			throw error;
		}
	}

	unsigned(length: number, endian?: "big" | "little"): number {
		if (endian === "little") {
			let value = this.buffer.readUIntLE(this.offset, length);
			this.offset += length;
			return value;
		} else {
			let value = this.buffer.readUIntBE(this.offset, length);
			this.offset += length;
			return value;
		}
	}
};
