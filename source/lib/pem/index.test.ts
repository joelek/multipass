import * as pem from "./";

(async () => {
	let one = await pem.serialize({
		label: `NUMBERS`,
		buffer: Buffer.of(1, 2, 3, 4)
	});
	let two = await pem.serialize({
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
	let sections = await pem.parse(string);
	console.log(sections);
})();

(async () => {
	let string = [
		`-----BEGIN NUMBERS-----`
	].join(`\r\n`);
	let sections = await pem.parse(string);
	console.log(sections);
})();
