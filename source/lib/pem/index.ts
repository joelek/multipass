import * as encoding from "../encoding";

export type Header = {
	key: string;
	values: Array<string>;
};

export type Section = {
	preamble?: Array<string>;
	label: string;
	headers?: Array<Header>;
	buffer: Buffer;
};

export type Document = {
	sections: Array<Section>;
	postamble?: Array<string>;
};

export async function parse(string: string): Promise<Document> {
	let sections = new Array<Section>();
	let lines = string.split(/\r\n|\r|\n/);
	let index = 0;
	let preamble = new Array<string>();
	outer: while (index < lines.length) {
		let line = lines[index++];
		let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/u.exec(line);
		if (parts == null) {
			preamble.push(line);
			continue outer;
		}
		let label = parts[1];
		let start = index;
		inner: while (index < lines.length) {
			if (lines[index++] !== `-----END ${label}-----`) {
				continue inner;
			}
			let end = index;
			let body = lines.slice(start, end - 1);
			let headers = body.slice(0, body.indexOf(``)).map((line) => {
				let parts = /^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)[:]([\x20-\x7E]*)$/u.exec(line);
				if (parts == null) {
					throw `Expected a valid header!`;
				}
				let key = parts[1];
				let values = parts[2].trim().split(`,`).map((value) => value.trim());
				return {
					key,
					values
				};
			});
			sections.push({
				preamble: preamble.splice(0, preamble.length),
				label: label,
				headers: headers,
				buffer: await encoding.convertBase64StringToBuffer(body.slice(body.indexOf(``) + 1).join(``))
			});
			continue outer;
		}
		throw `Expected end of label "${label}"!`;
	}
	let postamble = preamble;
	return {
		sections,
		postamble
	};
};

export async function serialize(document: Document): Promise<string> {
	let lines = new Array<string>();
	for (let section of document.sections) {
		if (!/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/u.test(section.label)) {
			throw `Expected a valid label!`;
		}
		lines.push(...(section.preamble ?? []));
		lines.push(`-----BEGIN ${section.label}-----`);
		lines.push(...(section.headers ?? []).map((header) => {
			let line = `${header.key}: ${header.values.join(",")}`;
			if (!/^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)[:]([\x20-\x7E]*)$/u.test(line)) {
				throw `Expected a valid header!`;
			}
			return line;
		}));
		if (section.headers != null && section.headers.length > 0) {
			lines.push(``);
		}
		let base64 = await encoding.convertBufferToBase64String(section.buffer);
		for (let i = 0; i < base64.length; i += 64) {
			let line = base64.substr(i, 64);
			lines.push(line);
		}
		lines.push(`-----END ${section.label}-----`);
	}
	lines.push(...(document.postamble ?? []));
	return lines.join(`\r\n`);
};
