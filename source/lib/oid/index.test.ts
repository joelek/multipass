import * as oid from "./";
import * as parsing from "../parsing";

(async () => {
	let buffer = Buffer.from("KoZIhvcNAQEL", "base64");
	let parser = new parsing.Parser(buffer);
	let id = oid.parse(parser);
	console.log(id.join(".") === "1.2.840.113549.1.1.11");
})();

(async () => {
	let buffer = oid.serialize([0, 39]);
	console.log(buffer.equals(Buffer.of(0x27)));
	let id = oid.parse(new parsing.Parser(buffer));
	console.log(id.join(".") === "0.39");
})();

(async () => {
	let unexpected = `Expected method to throw!`;
	try {
		let buffer = oid.serialize([0, 40]);
		throw unexpected;
	} catch (error) {
		if (error === unexpected) {
			throw error;
		}
	}
})();

(async () => {
	let buffer = oid.serialize([1, 39]);
	console.log(buffer.equals(Buffer.of(0x4F)));
	let id = oid.parse(new parsing.Parser(buffer));
	console.log(id.join(".") === "1.39");
})();

(async () => {
	let unexpected = `Expected method to throw!`;
	try {
		let buffer = oid.serialize([1, 40]);
		throw unexpected;
	} catch (error) {
		if (error === unexpected) {
			throw error;
		}
	}
})();

(async () => {
	let buffer = oid.serialize([2, 47]);
	console.log(buffer.equals(Buffer.of(0x7F)));
	let id = oid.parse(new parsing.Parser(buffer));
	console.log(id.join(".") === "2.47");
})();

(async () => {
	let buffer = oid.serialize([2, 48]);
	console.log(buffer.equals(Buffer.of(0x81, 0x00)));
	let id = oid.parse(new parsing.Parser(buffer));
	console.log(id.join(".") === "2.48");
})();

(async () => {
	let buffer = oid.serialize([2, 999]);
	console.log(buffer.equals(Buffer.of(0x88, 0x37)));
	let id = oid.parse(new parsing.Parser(buffer));
	console.log(id.join(".") === "2.999");
})();
