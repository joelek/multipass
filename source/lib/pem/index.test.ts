import * as lib from "./";

(async () => {
	let one = await lib.serialize({
		label: `NUMBERS`,
		buffer: Buffer.of(1, 2, 3, 4)
	});
	let two = await lib.serialize({
		label: `STRING`,
		buffer: Buffer.from(`räksmörgås`)
	});
	let string = [
		`junk`,
		one,
		`junk`,
		two,
		`junk`
	].join(`\r\n`);
	console.log(string);
	let sections = await lib.parse(string);
	console.log(sections);
})();

(async () => {
	let string = [
		`-----BEGIN NUMBERS-----`
	].join(`\r\n`);
	let sections = await lib.parse(string);
	console.log(sections);
})();
