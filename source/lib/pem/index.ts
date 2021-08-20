import * as encoding from "../encoding";

// TODO: Add support for parsing padding.

export type Section = {
	label: string;
	buffer: Buffer;
};

export async function parse(string: string): Promise<Array<Section>> {
	let sections = new Array<Section>();
	let lines = string.split(/\r\n|\r|\n/);
	let index = 0;
	outer: while (index < lines.length) {
		let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/.exec(lines[index++]);
		if (parts == null) {
			continue outer;
		}
		let label = parts[1];
		let start = index;
		inner: while (index < lines.length) {
			if (lines[index++] !== `-----END ${label}-----`) {
				continue inner;
			}
			let end = index;
			let string = lines.slice(start, end - 1).join(``);
			sections.push({
				label: label,
				buffer: await encoding.convertBase64StringToBuffer(string)
			});
			continue outer;
		}
		throw `Expected end of label "${label}"!`;
	}
	return sections;
};

export async function serialize(section: Section): Promise<string> {
	let lines = new Array<string>();
	if (!(/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/.test(section.label))) {
		throw `Expected a valid label!`;
	}
	lines.push(`-----BEGIN ${section.label}-----`);
	let base64 = await encoding.convertBufferToBase64String(section.buffer);
	for (let i = 0; i < base64.length; i += 64) {
		let line = base64.substr(i, 64);
		lines.push(line);
	}
	lines.push(`-----END ${section.label}-----`);
	return lines.join(`\r\n`);
};
