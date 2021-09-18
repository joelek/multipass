"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
class Parser {
    constructor(buffer, offset) {
        this.buffer = buffer;
        this.offset = offset !== null && offset !== void 0 ? offset : 0;
    }
    chunk(length) {
        if (this.offset + length > this.buffer.length) {
            throw `Expected to read at least ${length} bytes!`;
        }
        let buffer = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return buffer;
    }
    eof() {
        return this.offset >= this.buffer.length;
    }
    signed(length, endian) {
        if (endian === "little") {
            let value = this.buffer.readIntLE(this.offset, length);
            this.offset += length;
            return value;
        }
        else {
            let value = this.buffer.readIntBE(this.offset, length);
            this.offset += length;
            return value;
        }
    }
    try(supplier) {
        let offset = this.offset;
        try {
            return supplier(this);
        }
        catch (error) {
            this.offset = offset;
            throw error;
        }
    }
    unsigned(length, endian) {
        if (endian === "little") {
            let value = this.buffer.readUIntLE(this.offset, length);
            this.offset += length;
            return value;
        }
        else {
            let value = this.buffer.readUIntBE(this.offset, length);
            this.offset += length;
            return value;
        }
    }
}
exports.Parser = Parser;
;
