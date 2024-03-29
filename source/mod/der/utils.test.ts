import * as parsing from "../parsing";
import * as utils from "./utils";

(async () => {
	let observed = utils.encodeVarlen(0);
	let expected = Buffer.of(0);
	console.assert(observed.equals(expected), `It should encode varlen 0 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0));
	let observed = utils.decodeVarlen(parser);
	let expected = 0;
	console.assert(observed === expected, `It should decode varlen 0 properly.`);
})();

(async () => {
	let observed = utils.encodeVarlen(127);
	let expected = Buffer.of(127);
	console.assert(observed.equals(expected), `It should encode varlen 127 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(127));
	let observed = utils.decodeVarlen(parser);
	let expected = 127;
	console.assert(observed === expected, `It should decode varlen 127 properly.`);
})();

(async () => {
	let observed = utils.encodeVarlen(128);
	let expected = Buffer.of(129, 0);
	console.assert(observed.equals(expected), `It should encode varlen 128 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(129, 0));
	let observed = utils.decodeVarlen(parser);
	let expected = 128;
	console.assert(observed === expected, `It should decode varlen 128 properly.`);
})();

(async () => {
	let observed = utils.encodeLength(0);
	let expected = Buffer.of(0);
	console.assert(observed.equals(expected), `It should encode length 0 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(0));
	let observed = utils.decodeLength(parser);
	let expected = 0;
	console.assert(observed === expected, `It should decode length 0 properly.`);
})();

(async () => {
	let observed = utils.encodeLength(127);
	let expected = Buffer.of(127);
	console.assert(observed.equals(expected), `It should encode length 127 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(127));
	let observed = utils.decodeLength(parser);
	let expected = 127;
	console.assert(observed === expected, `It should decode length 127 properly.`);
})();

(async () => {
	let observed = utils.encodeLength(128);
	let expected = Buffer.of(129, 128);
	console.assert(observed.equals(expected), `It should encode length 128 properly.`);
})();

(async () => {
	let parser = new parsing.Parser(Buffer.of(129, 128));
	let observed = utils.decodeLength(parser);
	let expected = 128;
	console.assert(observed === expected, `It should decode length 128 properly.`);
})();
