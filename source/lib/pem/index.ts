import * as encoding from "../encoding";

export type Section = {
	headers?: Array<string>;
	label: string;
	buffer: Buffer;
};

export type Document = {
	sections: Array<Section>;
	trailers?: Array<string>;
};

export async function parse(string: string): Promise<Document> {
	let sections = new Array<Section>();
	let lines = string.split(/\r\n|\r|\n/);
	let index = 0;
	let headers = new Array<string>();
	outer: while (index < lines.length) {
		let line = lines[index++];
		let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/.exec(line);
		if (parts == null) {
			headers.push(line);
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
				headers: headers.splice(0, headers.length),
				label: label,
				buffer: await encoding.convertBase64StringToBuffer(string)
			});
			continue outer;
		}
		throw `Expected end of label "${label}"!`;
	}
	let trailers = headers;
	return {
		sections,
		trailers
	};
};

export async function serialize(document: Document): Promise<string> {
	let lines = new Array<string>();
	for (let section of document.sections) {
		if (!(/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/.test(section.label))) {
			throw `Expected a valid label!`;
		}
		lines.push(...(section.headers ?? []));
		lines.push(`-----BEGIN ${section.label}-----`);
		let base64 = await encoding.convertBufferToBase64String(section.buffer);
		for (let i = 0; i < base64.length; i += 64) {
			let line = base64.substr(i, 64);
			lines.push(line);
		}
		lines.push(`-----END ${section.label}-----`);
	}
	lines.push(...(document.trailers ?? []));
	return lines.join(`\r\n`);
};
