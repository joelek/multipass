import * as oid from "./oid";
import * as parsing from "../parsing";

(async () => {
	let parser = new parsing.Parser(Buffer.from("KoZIhvcNAQEL", "base64url"));
	let observed = oid.parse(parser).join(".");
	let expected = "1.2.840.113549.1.1.11";
	console.assert(observed === expected, `It should parse a common cryptographic oid.`);
})();

(async () => {
	let observed = oid.serialize("1.2.840.113549.1.1.11".split(".").map((part) => Number.parseInt(part, 10)));
	let expected = Buffer.from("KoZIhvcNAQEL", "base64url");
	console.assert(observed.equals(expected), `It should serialize a common cryptographic oid.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0x27));
	let observed = oid.parse(parser).join(".");
	let expected = "0.39";
	console.assert(observed === expected, `It should parse [0, 39] properly.`);
})();

(async () => {
	let observed = oid.serialize([0, 39]);
	let expected = Buffer.of(0x27);
	console.assert(observed.equals(expected), `It should serialize [0, 39] properly.`);
})();

(async () => {
	try {
		let buffer = oid.serialize([0, 40]);
		console.assert(false, `It should throw an error when serializing [0, 40].`);
	} catch (error) {}
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0x4F));
	let observed = oid.parse(parser).join(".");
	let expected = "1.39";
	console.assert(observed === expected, `It should parse [1, 39] properly.`);
})();

(async () => {
	let observed = oid.serialize([1, 39]);
	let expected = Buffer.of(0x4F);
	console.assert(observed.equals(expected), `It should serialize [1, 39] properly.`);
})();

(async () => {
	try {
		let buffer = oid.serialize([1, 40]);
		console.assert(false, `It should throw an error when serializing [1, 40].`);
	} catch (error) {}
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0x7F));
	let observed = oid.parse(parser).join(".");
	let expected = "2.47";
	console.assert(observed === expected, `It should parse [2, 47] properly.`);
})();

(async () => {
	let observed = oid.serialize([2, 47]);
	let expected = Buffer.of(0x7F);
	console.assert(observed.equals(expected), `It should serialize [2, 47] properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0x81, 0x00));
	let observed = oid.parse(parser).join(".");
	let expected = "2.48";
	console.assert(observed === expected, `It should parse [2, 48] properly.`);
})();

(async () => {
	let observed = oid.serialize([2, 48]);
	let expected = Buffer.of(0x81, 0x00);
	console.assert(observed.equals(expected), `It should serialize [2, 48] properly.`);
})();
