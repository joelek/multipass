import * as libcrypto from "crypto";
import * as encoding from "../encoding";

export type Header = {
	key: string;
	value: string;
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

export function deriveKey(data: Buffer, salt: Buffer, keyLength: number): Buffer {
	let last = Buffer.alloc(0);
	let key = Buffer.alloc(0);
	while (key.length < keyLength) {
		let hash = libcrypto.createHash(`MD5`);
		hash.update(last);
		hash.update(data);
		hash.update(salt);
		last = hash.digest();
		key = Buffer.concat([key, last]);
	}
	return key.slice(0, keyLength);
};

export function decrypt(section: Section, passphrase: string): Section {
	let procTypes = section.headers?.filter((header) => header.key.toLowerCase() === `proc-type`) ?? [];
	if (procTypes.length !== 1) {
		throw `Expected exactly one "Proc-Type" header!`;
	}
	let procType = procTypes[0].value.trim().split(`,`);
	if (procType.length < 2) {
		throw `Expected "Proc-Type" to contain at least 2 values!`;
	}
	if (procType[0] !== `4` || procType[1] !== `ENCRYPTED`) {
		throw `Expected an encrypted section!`;
	}
	let dekInfos = section.headers?.filter((header) => header.key.toLowerCase() === `dek-info`) ?? [];
	if (dekInfos.length !== 1) {
		throw `Expected exactly one "DEK-Info" header!`;
	}
	let dekInfo = dekInfos[0].value.trim().split(`,`);
	if (dekInfo.length < 2) {
		throw `Expected "DEK-Info" to contain at least 2 values!`;
	}
	let algorithm = dekInfo[0];
	let { ivLength, keyLength } = { ...libcrypto.getCipherInfo(algorithm) };
	if (ivLength == null || keyLength == null) {
		throw `Expected "${algorithm}" to be a supported cipher!`;
	}
	let iv = Buffer.from(dekInfo[1], `hex`);
	let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
	let decipher = libcrypto.createDecipheriv(algorithm, key, iv);
	let buffer = Buffer.concat([decipher.update(section.buffer), decipher.final()]);
	return {
		...section,
		headers: [
			...(section.headers ?? []).filter((header) => {
				let key = header.key.toLowerCase();
				return key !== `proc-type` && key !== `dek-info`;
			}),
		],
		buffer
	};
};

export function encrypt(section: Section, passphrase: string, options?: Partial<{
	algorithm: string,
	iv: Buffer
}>): Section {
	let algorithm = options?.algorithm ?? `AES-128-CBC`;
	let { ivLength, keyLength } = { ...libcrypto.getCipherInfo(algorithm) };
	if (ivLength == null || keyLength == null) {
		throw `Expected "${algorithm}" to be a supported cipher!`;
	}
	let iv = options?.iv ?? libcrypto.randomBytes(ivLength);
	let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
	let cipher = libcrypto.createCipheriv(algorithm, key, iv);
	let buffer = Buffer.concat([cipher.update(section.buffer), cipher.final()]);
	return {
		...section,
		headers: [
			...(section.headers ?? []),
			{
				key: `Proc-TYPE`,
				value: [`4`, `ENCRYPTED`].join(`,`)
			},
			{
				key: `DEK-Info`,
				value: [algorithm, iv.toString(`hex`).toUpperCase()].join(`,`)
			}
		],
		buffer
	};
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
				let value = parts[2];
				return {
					key,
					value
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
			let line = `${header.key}:${header.value}`;
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
