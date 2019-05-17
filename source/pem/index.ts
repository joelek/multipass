import * as $encoding from "../encoding";

type Structure = {
	label: string,
	buffer: Buffer
};

async function parse(string: string): Promise<Array<Structure>> {
	let structures = new Array<Structure>();
	let lines = string.split(/\r\n|\r|\n/);
	let index = 0;
	while (index < lines.length) {
		let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/.exec(lines[index++]);
		if (parts == null) {
			continue;
		}
		let label = parts[1];
		let start = index;
		while (index < lines.length) {
			if (lines[index++] !== `-----END ${label}-----`) {
				continue;
			}
			let end = index;
			let string = lines.slice(start, end - 1).join("");
			structures.push({
				label: label,
				buffer: await $encoding.convertBase64StringToBuffer(string)
			});
			break;
		}
	}
	return structures;
}

async function serialize(structure: Structure): Promise<string> {
	let lines = new Array<string>();
	if (!(/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/.test(structure.label))) {
		throw "Expected a valid label!";
	}
	lines.push(`-----BEGIN ${structure.label}-----`);
	let base64 = await $encoding.convertBufferToBase64String(structure.buffer);
	for (let i = 0; i < base64.length; i += 64) {
		let line = base64.substr(i, 64);
		lines.push(line);
	}
	lines.push(`-----END ${structure.label}-----`);
	return lines.join("\r\n");
}

export {
	Structure,
	parse,
	serialize
};
