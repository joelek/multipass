#!/usr/bin/env node

import * as libcrypto from 'crypto';
import * as libcp from 'child_process';
import * as libfs from 'fs';
import * as libhttp from 'http';
import * as libhttps from 'https';
import * as libpath from 'path';
import * as lib from "../lib";

let cfgacme = lib.acme.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/acme.json", "utf8")));
let cfgdynu = lib.dynu.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf8")));
let cfgglesys = lib.glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf8")));

interface DnsDomain {
	readonly id: number;
	readonly name: string;
}

interface DnsDomains {
	readonly domains: Array<DnsDomain>;
}

interface Callback<T> {
	(value: T): void;
}

interface ApiResponse<T> {
	headers: libhttp.IncomingHttpHeaders;
	body: T;
}

interface KeyPairPEM {
	public_key: string;
	private_key: string;
}

let read_utf8_file = (filename: string, cb: Callback<string | null>): void => {
	libfs.readFile(libpath.join(certificate_path, filename), { encoding: 'utf8' }, (error, content) => {
		if (error) {
			cb(null);
		} else {
			cb(content);
		}
	});
};

let write_utf8_file = (filename: string, content: string, cb: Callback<void | null>): void => {
	libfs.writeFile(libpath.join(certificate_path, filename), content, { encoding: 'utf8' }, (error) => {
		if (error) {
			cb(null);
		} else {
			cb();
		}
	});
};

let delete_file = (filename: string, cb: Callback<void | null>): void => {
	libfs.unlink(libpath.join(certificate_path, filename), (error) => {
		if (error) {
			cb(null);
		} else {
			cb();
		}
	});
};

let rename_file = (filename_old: string, filename_new: string, cb: Callback<void | null>): void => {
	libfs.rename(libpath.join(certificate_path, filename_old), libpath.join(certificate_path, filename_new), (error) => {
		if (error) {
			cb(null);
		} else {
			cb();
		}
	});
};

let safe_wait = (cb: Callback<void>, delay_ms: number): void => {
	process.stdout.write(`Waiting for ${get_duration_from_ms(delay_ms)}\n`);
	let next = () => {
		if (delay_ms > 0) {
			let current_delay_ms = Math.min(delay_ms, 2147483647);
			delay_ms -= current_delay_ms;
			setTimeout(next, current_delay_ms);
		} else {
			cb();
		}
	};
	next();
};

let is_array = <T>(value: any, of: { (value: any): value is T }): value is Array<T> => {
	if (value != null && value.constructor === Array) {
		for (let i = 0; i < value.length; i++) {
			if (!of(value[i])) {
				return false;
			}
		}
		return true;
	}
	return false;
};

let is_string = (value: any): value is string => {
	return value != null && value.constructor === String;
};

let base64_from_buffer = (buffer: Buffer): string => {
	return buffer.toString('base64');
};

let base64url_from_buffer = (buffer: Buffer): string => {
	return base64_from_buffer(buffer).split('+').join('-').split('/').join('_').split('=').join('');
};

let base64_from_string = (string: string): string => {
	return Buffer.from(string, "utf8").toString('base64');
};

let base64url_from_string = (string: string): string => {
	return base64_from_string(string).split('+').join('-').split('/').join('_').split('=').join('');
};


















namespace libasno {
	interface Leaf {
		access(): string;
		asLeaf(): Leaf;
		isLeaf(): boolean;
	}

	interface Node {
		at(index: number): Instance;
		asNode(): Node;
		isNode(): boolean;
	}

	export abstract class Instance implements Leaf, Node {
		constructor() {

		}

		access(): string {
			throw new Error();
		}

		at(index: number): Instance {
			throw new Error();
		}

		asLeaf(): Leaf {
			throw new Error();
		}

		asNode(): Node {
			throw new Error();
		}

		isLeaf(): boolean {
			return false;
		}

		isNode(): boolean {
			return false;
		}
	}

	export class ConcreteLeaf extends Instance {
		private value: string;

		constructor(value: string) {
			super();
			this.value = value;
		}

		access(): string {
			return this.value;
		}

		asLeaf(): Leaf {
			return this;
		}

		isLeaf(): boolean {
			return true;
		}
	}

	export class ConcreteNode extends Instance {
		private instances: Array<Instance>;

		constructor(instances: Array<Instance>) {
			super();
			this.instances = new Array(...instances);
		}

		at(index: number): Instance {
			if (index < 0 || index >= this.instances.length) {
				throw new Error(`Bad index!`);
			}
			return this.instances[index];
		}

		asNode(): Node {
			return this;
		}

		isNode(): boolean {
			return true;
		}
	}
}

interface AbstractSyntaxNotationOneNode {
	type_name: string;
	data: string | Array<AbstractSyntaxNotationOneNode>;
}

let asno_tag_name_from_id = [
	'0x00',
	'BOOLEAN',
	'INTEGER',
	'BIT_STRING',
	'OCTET_STRING',
	'NULL',
	'OBJECT_ID',
	'0x07',
	'0x08',
	'0x09',
	'0x0A',
	'0x0B',
	'UTF8_STRING',
	'0x0D',
	'0x0E',
	'0x0F',
	'SEQUENCE',
	'SET',
	'0x12',
	'PRINTABLE_STRING',
	'TELETEX_STRING',
	'0x15',
	'IA5_STRING',
	'UTC_DATE',
	'0x18',
	'0x19',
	'0x1A',
	'0x1B',
	'0x1C',
	'0x1D',
	'BMP_STRING',
	'0x1F',
	'0x20',
	'0x21',
	'0x22',
	'0x23',
	'0x24',
	'0x25',
	'0x26',
	'0x27',
	'0x28',
	'0x29',
	'0x2A',
	'0x2B',
	'0x2C',
	'0x2D',
	'0x2E',
	'0x2F',
	'SEQUENCE',
	'SET',
	'0x32'
];

let parse_oid = (data: Buffer): string => {
	if (0 >= data.length) {
		throw new Error();
	}
	let numbers: Array<number> = [];
	numbers.push((data[0] / 40) | 0);
	numbers.push((data[0] % 40));
	for (let i = 1; i < data.length;) {
		let byte = data[i++];
		if (byte < 128) {
			numbers.push(byte);
		} else {
			let number = 0;
			while (true) {
				number = (number << 7) | (byte & 0x7F);
				if (i + 1 >= data.length) {
					throw new Error();
				}
				byte = data[i++];
				if (byte < 128) {
					number = (number << 7) | (byte & 0x7F);
					break;
				}
			}
			numbers.push(number);
		}
	}
	return numbers.map(a => `${a}`).join('.');
};

let oid_names: Record<string, string> = {
	'2.5.4.3': 'joint-iso-itu-t(2) ds(5) attributeType(4) commonName(3)',
	'1.2.840.113549.1.1.1': 'iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs-1(1) rsaEncryption(1)',
	'1.2.840.113549.1.1.11': 'iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs-1(1) sha256WithRSAEncryption(11)'
};

let readable_name_from_oid = (string: string): string => {
	let s = oid_names[string];
	if (s !== undefined) {
		return s;
	}
	return string;
};

let date_from_datestring = (string: string): string => {
	let parts = /^([0-9]{12})Z$/.exec(string);
	if (parts !== null) {
		let century = (Number.parseInt(string[0]) < 5) ? '20' : '19';
		let year = string.substr(0, 2);
		let month = string.substr(2, 2);
		let day = string.substr(4, 2);
		let hour = string.substr(6, 2);
		let minute = string.substr(8, 2);
		let second = string.substr(10, 2);
		return `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`
	}
	return string;
};

let parse_der = (der: Buffer): Array<AbstractSyntaxNotationOneNode> => {
	let offset = 0;
	let result = [];
	while (offset < der.length) {
		let tag = der[offset++];
		let len = der[offset++];
		if ((len & 0x7F) !== len) {
			let length = 0;
			for (let i = 0; i < (len & 0x7F); i++) {
				length = (length * 256) + der[offset++];
			}
			len = length;
		}
		let type = ((tag >> 0) & 0x1F);
		let form = ((tag >> 5) & 0x01);
		let kind = ((tag >> 6) & 0x02);
		let data = der.slice(offset, offset + len);
		result.push({
			type_name: asno_tag_name_from_id[type],
			data: (form === 0) ? (type === 6) ? readable_name_from_oid(parse_oid(data)) : (type === 23) ? date_from_datestring(data.toString('binary')) : base64url_from_buffer(data) : parse_der(data)
		});
		offset += len;
	}
	return result;
};

let parse_der2 = (der: Buffer): Array<libasno.Instance> => {
	let offset = 0;
	let result = [];
	while (offset < der.length) {
		let tag = der[offset++];
		let len = der[offset++];
		if ((len & 0x7F) !== len) {
			let length = 0;
			for (let i = 0; i < (len & 0x7F); i++) {
				length = (length * 256) + der[offset++];
			}
			len = length;
		}
		let type = ((tag >> 0) & 0x1F);
		let form = ((tag >> 5) & 0x01);
		let kind = ((tag >> 6) & 0x02);
		let data = der.slice(offset, offset + len);
		if (form === 0) {
			let value = (type === 6) ? readable_name_from_oid(parse_oid(data)) : (type === 23) ? date_from_datestring(data.toString('binary')) : base64url_from_buffer(data);
			result.push(new libasno.ConcreteLeaf(value));
		} else {
			result.push(new libasno.ConcreteNode(parse_der2(data)));
		}
		offset += len;
	}
	return result;
};







































let get_response_buffer = (options: libhttps.RequestOptions, body: Buffer, cb: Callback<ApiResponse<Buffer>>, url?: string): void => {
	if (url === undefined) {
		url = `${options.protocol}//${options.hostname}${options.path}`;
	}
console.log(`\n[${url}]`);
	libhttps.request(url, options, (response) => {
		response.setEncoding('binary');
		let chunks = new Array<Buffer>();
		response.on('data', (chunk) => {
			chunks.push(Buffer.from(chunk, 'binary'));
		});
		response.on('end', () => {
			let buffer = Buffer.concat(chunks);
			cb({
				headers: response.headers,
				body: buffer
			});
		});
	}).on('error', (error) => {
		throw error;
	}).end(body)
};

let get_response_json = (options: libhttps.RequestOptions, body: any, cb: Callback<ApiResponse<any>>, url?: string): void => {
	let buffer = Buffer.from(JSON.stringify(body));
	console.log(JSON.stringify(body, null, 2));
	get_response_buffer(options, buffer, (response) => {
		let body = JSON.parse(response.body.toString());
		console.log(JSON.stringify(body, null, 2));
		cb({
			headers: response.headers,
			body: body
		});
	}, url);
};





















const dynu_hostname = 'api.dynu.com';

let get_domains = (cb: Callback<ApiResponse<DnsDomains>>): void => {
	get_response_json({
		method: 'GET',
		protocol: 'https:',
		hostname: dynu_hostname,
		port: 443,
		path: '/v2/dns',
		headers: {
			'Accept': 'application/json',
			'API-Key': cfgdynu.api_key
		}
	}, {}, cb);
};

let get_domain_id = (cb: Callback<number>): void => {
	get_domains((response) => {
		let found = response.body.domains.find((value) => {
			return value.name === cfgdynu.hostname;
		});
		if (found === undefined) {
			throw new Error();
		}
		cb(found.id);
	});
};

interface AddDomainRecordResponse {
	statusCode: number;
	id: number;
	domainId: number;
	domainName: string;
	nodeName: string;
	hostname: string;
	recordType: string;
	ttl: number;
	state: boolean;
	content: string;
	updatedOn: string;
	textData: string;
}

let add_domain_record_for_domain_id = (domain_id: number, text_data: string, cb: Callback<ApiResponse<AddDomainRecordResponse>>): void => {
	get_response_json({
		method: 'POST',
		protocol: 'https:',
		hostname: dynu_hostname,
		port: 443,
		path: `/v2/dns/${domain_id}/record`,
		headers: {
			'Accept': 'application/json',
			'API-Key': cfgdynu.api_key
		}
	}, {
		nodeName: '',
		recordType: 'TXT',
		state: true,
		textData: (text_data === '' ? 'TBD': text_data)
	}, cb);
};

let dynu_delete_record = (domain_id: number, record_id: number, cb: Callback<ApiResponse<any>>): void => {
	get_response_json({
		method: 'DELETE',
		protocol: 'https:',
		hostname: dynu_hostname,
		port: 443,
		path: `/v2/dns/${domain_id}/record/${record_id}`,
		headers: {
			'Accept': 'application/json',
			'API-Key': cfgdynu.api_key
		}
	}, {}, cb);
};














interface JWS {
	protected: string;
	payload: string;
	signature: string;
}

let jws_create_request = (private_key: string, protected_json: any, payload_json?: any): JWS => {
	let protected_base64url = base64url_from_string(JSON.stringify(protected_json));
	let payload_base64url = payload_json === undefined ? '' : base64url_from_string(JSON.stringify(payload_json));
	let signer = libcrypto.createSign('SHA256');
	signer.update(`${protected_base64url}.${payload_base64url}`);
	let signature_base64url = base64url_from_buffer(signer.sign(private_key));
	return {
		protected: protected_base64url,
		payload: payload_base64url,
		signature: signature_base64url
	};
};
















let compute_jwk_thumbprint = (jwk: KeyObject): string => {
	let n = Buffer.from(jwk.n.split('-').join('+').split('_').join('/').split('=').join(''), 'base64');
	let e = Buffer.from(jwk.e.split('-').join('+').split('_').join('/').split('=').join(''), 'base64');
	if (n[0] === 0) {
		n = n.slice(1);
	}
	let hash = libcrypto.createHash('SHA256');
	hash.update(`{"e":"${base64url_from_buffer(e)}","kty":"RSA","n":"${base64url_from_buffer(n)}"}`, 'ascii');
	return base64url_from_buffer(hash.digest());
};

let compute_key_authorization = (token: string, jwk: KeyObject): string => {
	let hash = libcrypto.createHash('SHA256');
	hash.update(`${token}.${compute_jwk_thumbprint(jwk)}`, 'ascii');
	return base64url_from_buffer(hash.digest());
};

















interface KeyObject {
	n: string;
	e: string;
	d: string;
	p: string;
	q: string;
	dp: string;
	dq: string;
	qi: string
}

let generate_rsa_key_pair = (cb: Callback<KeyPairPEM>) => {
	libcrypto.generateKeyPair('rsa', {
		modulusLength: 4096,
		publicExponent: 65537,
		publicKeyEncoding: {
			type: 'pkcs1',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs1',
			format: 'pem'
		}
	} as libcrypto.RSAKeyPairOptions<'pem', 'pem'>, (error, public_key, private_key) => {
		if (error !== null) {
			throw error;
		}
		cb({
			public_key: public_key,
			private_key: private_key
		});
	});
};

let convert_to_key_object = (private_key: Buffer): KeyObject => {
	let asno = parse_der(private_key);
	let data = asno[0].data as Array<AbstractSyntaxNotationOneNode>;
	let n = data[1].data as string;
	let e = data[2].data as string;
	let d = data[3].data as string;
	let p = data[4].data as string;
	let q = data[5].data as string;
	let dp = data[6].data as string;
	let dq = data[7].data as string;
	let qi = data[8].data as string;
	return { n, e, d, p, q, dp, dq, qi };
};

interface ASNOInstance {
	type: string,
	data: Buffer
}

let convert_to_der_from_pem = (pem: string): Array<ASNOInstance> => {
	let instances: Array<ASNOInstance> = [];
	let lines = pem.split(/\r?\n/);
	let index = 0;
	while (index < lines.length) {
		let beginparts = /^[-]{5}BEGIN ([A-Z ]+)[-]{5}$/.exec(lines[index++]);
		if (beginparts === null) {
			continue;
		}
		let start = index;
		while (index < lines.length) {
			let endparts = /^[-]{5}END ([A-Z ]+)[-]{5}$/.exec(lines[index++]);
			if (endparts === null) {
				continue;
			}
			let end = index;
			instances.push({
				type: beginparts[1],
				data: Buffer.from(lines.slice(start, end - 1).join(''), 'base64')
			});
		}
	}
	return instances;
};

const certificate_path = './private/certificate/';

let read_key = (name: string, cb: Callback<string | null>): void => {
	libfs.readFile(libpath.join(certificate_path, name), { encoding: 'utf8' }, (error, key) => {
		if (error) {
			cb(null);
		} else {
			cb(key);
		}
	});
};

let save_key = (name: string, key: string, cb: Callback<void | null>): void => {
	libfs.writeFile(libpath.join(certificate_path, name), key, { encoding: 'utf8' }, (error) => {
		if (error) {
			cb(null);
		} else {
			cb();
		}
	});
};

let get_key = (name: string, cb: Callback<string>): void => {
	read_key(name, (value) => {
		if (value === null) {
			generate_rsa_key_pair((key_pair) => {
				let key = key_pair.private_key;
				save_key(name, key, (value) => {
					if (value === null) {
					} else {
						cb(key);
					}
				});
			});
		} else {
			cb(value);
		}
	});
};
























const acme_hostname = 'acme-v02.api.letsencrypt.org';

let acme_get_new_nonce = (cb: Callback<string>): void => {
	get_response_buffer({
		method: 'HEAD',
		protocol: 'https:',
		hostname: acme_hostname,
		port: 443,
		path: `/acme/new-nonce`,
		headers: {
			'Content-Type': 'application/jose+json'
		}
	}, Buffer.alloc(0), (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		cb(nonce);
	});
};

interface AddCountResponse {
	nonce: string;
	kid: string;
}

let acme_add_account = (nonce: string, key_object: KeyObject, private_key: string, cb: Callback<AddCountResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		protocol: 'https:',
		hostname: acme_hostname,
		port: 443,
		path: `/acme/new-acct`,
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		jwk: {
			kty: 'RSA',
			n: key_object.n,
			e: key_object.e
		},
		nonce: nonce,
		url: `${options.protocol}//${options.hostname}${options.path}`
	}, {
		termsOfServiceAgreed: cfgacme.agree_to_tos,
		contact: cfgacme.contact
	});
	get_response_buffer(options, Buffer.from(JSON.stringify(request)), (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		let kid = response.headers['location'];
		if (!is_string(kid)) {
			throw new Error();
		}
		cb({ nonce, kid });
	});
};

interface AddOrderResponse {
	nonce: string;
	order: string;
	authz: Array<string>;
	finalize: string;
}

let acme_add_order = (nonce: string, kid: string, private_key: string, cb: Callback<AddOrderResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		protocol: 'https:',
		hostname: acme_hostname,
		port: 443,
		path: `/acme/new-order`,
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: `${options.protocol}//${options.hostname}${options.path}`
	}, {
		identifiers: cfgacme.domains.map((domain) => {
			return {
				type: "dns",
				value: domain.wildcard ? `*.${domain.hostname}` : `${domain.hostname}`
			};
		})
	});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		let order = response.headers['location'];
		if (!is_string(order)) {
			throw new Error();
		}
		let body = response.body;
		let authz = body.authorizations;
		if (!is_array(authz, is_string)) {
			throw new Error();
		}
		let finalize = body.finalize;
		if (!is_string(finalize)) {
			throw new Error();
		}
		cb({ nonce, order, authz, finalize });
	});
};

interface GetChallengesResponse {
	nonce: string;
	body: {
		identifier: {
			type: string;
			value: string;
		},
		status: string;
		expires: string;
		challenges: Array<{
			type: string;
			status: string;
			url: string;
			token: string;
		}>;
		wildcard: boolean
	};
}

let acme_get_challenges = (authz: string, kid: string, nonce: string, private_key: string, cb: Callback<GetChallengesResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: `${authz}`
	});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		cb({ nonce, body: response.body });
	}, authz);
};

interface FinalizeChallengeResponse {
	nonce: string;
	status: string;
}

let acme_finalize_challenge = (url: string, kid: string, nonce: string, private_key: string, cb: Callback<FinalizeChallengeResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: url
	}, {});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		let status = response.body.status;
		if (!is_string(status)) {
			throw new Error();
		}
		cb({ nonce, status });
	}, url);
};

interface GetAccountResponse {
	nonce: string;
}

let acme_get_account = (kid: string, nonce: string, private_key: string, cb: Callback<GetAccountResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: `${kid}`
	});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		cb({ nonce });
	}, kid);
};

interface GetOrderResponse {
	nonce: string;
	body: {
		status: string
	}
}

let acme_get_order = (url: string, kid: string, nonce: string, private_key: string, cb: Callback<GetOrderResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: url
	});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		cb({ nonce, body: response.body });
	}, url);
};

interface FinalizeOrderResponse {
	nonce: string;
	body: any;
}

let acme_finalize_order = (url: string, csr: string, kid: string, nonce: string, private_key: string, cb: Callback<FinalizeOrderResponse>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: url
	}, {
		csr: csr
	});
	get_response_json(options, request, (response) => {
		let nonce = response.headers['replay-nonce'];
		if (!is_string(nonce)) {
			throw new Error();
		}
		cb({ nonce, body: response.body });
	}, url);
};

let acme_download_certificate = (url: string, kid: string, nonce: string, private_key: string, cb: Callback<string>): void => {
	let options: libhttp.ClientRequestArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/jose+json'
		}
	};
	let request = jws_create_request(private_key, {
		alg: 'RS256',
		kid: kid,
		nonce: nonce,
		url: url
	});
	get_response_buffer(options, Buffer.from(JSON.stringify(request)), (response) => {
		let resp = response.body.toString('utf8');
		cb(resp);
	}, url);
};

let acme_get_certificate = (cb: Callback<string>): void => {
	let glesysClient = lib.glesys.makeClient(cfgglesys);
	get_key('account_key.pem', (account_key) => {
		let buffer = convert_to_der_from_pem(account_key);
		let jwk = convert_to_key_object(buffer[0].data);
		//get_domain_id((domain_id) => {
			acme_get_new_nonce((nonce) => {
				acme_add_account(nonce, jwk, account_key, (response) => {
					nonce = response.nonce;
					let kid = response.kid;
					acme_add_order(nonce, kid, account_key, (response) => {
						nonce = response.nonce;
						let authzorig = response.authz.slice();
						let authz = response.authz.slice();
						let record_ids: Array<number> = [];
						let final = response.finalize;
						let done = () => {
							acme_get_order(response.order, kid, nonce, account_key, (response) => {
								nonce = response.nonce;
								if (response.body.status === 'ready') {
									get_csr((csr_pem) => {
										let csr_der = convert_to_der_from_pem(csr_pem);
										let csr_b64 = base64url_from_buffer(csr_der[0].data);
										acme_finalize_order(final, csr_b64, kid, nonce, account_key, (response) => {
											nonce = response.nonce;
											acme_download_certificate(response.body.certificate, kid, nonce, account_key, (cert) => {
												let next = () => {
													if (record_ids.length > 0) {
														let record_id = record_ids.pop() as number;
/* 														dynu_delete_record(domain_id, record_id, () => {
															next();
														}); */
														glesysClient.deleteDomainRecord({
															payload: {
																recordid: record_id
															}
														}).then((response) => {
															next();
														});
													} else {
														cb(cert);
													}
												};
												next();
											});
										});
									});
								} else {
									setTimeout(done, 60 * 1000);
								}
							});
						};
						let next = () => {
							if (authz.length > 0) {
								let auth = authz.pop() as string;
								acme_get_challenges(auth, kid, nonce, account_key, (response) => {
									nonce = response.nonce;
									let challenge = response.body.challenges.find(a => a.type === 'dns-01') as any;
									if (challenge === undefined) {
										throw new Error();
									}
									let key_authorization = compute_key_authorization(challenge.token, jwk);
/* 									add_domain_record_for_domain_id(domain_id, key_authorization, (response) => {
										let record_id = response.body.id;
										record_ids.push(record_id);
										next();
									}); */
									glesysClient.createDomainRecord({
										payload: {
											domainname: cfgglesys.domainname,
											host: "@", // "@" if CNAME was used to delegate, "_acme-challenge" otherwise
											type: "TXT",
											data: key_authorization
										}
									}).then(async (response) => {
										let payload = await response.payload();
										record_ids.push(payload.response.record.recordid);
										next();
									});
								});
							} else {
								let nextauth = () => {
									if (authzorig.length > 0) {
										let auth = authzorig.pop() as string;
										acme_get_challenges(auth, kid, nonce, account_key, (response) => {
											nonce = response.nonce;
											let challenge = response.body.challenges.find(a => a.type === 'dns-01') as any;
											if (challenge === undefined) {
												throw new Error();
											}
											acme_finalize_challenge(challenge.url, kid, nonce, account_key, (response) => {
												nonce = response.nonce;
												let attempt_to_finalize = () => {
													acme_get_challenges(auth, kid, nonce, account_key, (response) => {
														nonce = response.nonce;
														if (response.body.status === 'valid') {
															nextauth();
														} else {
															setTimeout(attempt_to_finalize, 60 * 1000);
														}
													});
												};
												attempt_to_finalize();
											});
										});
									} else {
										done();
									}
								};
								nextauth();
							}
						};
						next();
					});
				});
			});
		//});
	});
};

interface CertificateAndKey {
	certificate_key: string;
	full_chain: string;
}

let get_csr = (cb: Callback<string>) => {
	get_key('certificate_key.pem', (key) => {
		if (key !== null) {
			let domains = cfgacme.domains.map((domain) => {
				return domain.wildcard ? `*.${domain.hostname}` : domain.hostname;
			})
			let altNames = domains.map((domain) => {
				return `DNS:${domain}`;
			}).join(',');
			write_utf8_file('openssl.ini', `
				[req]
				distinguished_name = req_distinguished_name
				req_extensions = v3_req
				x509_extension = v3_req
				prompt = no

				[req_distinguished_name]
				commonName = ${domains[0]}

				[v3_req]
				subjectAltName = ${altNames}
			`, () => {
				libcp.exec(`openssl req -new -sha256 -key ${libpath.join(certificate_path, 'certificate_key.pem')} -config ${libpath.join(certificate_path, 'openssl.ini')}`, (error, stdout, stderr) => {
					delete_file('openssl.ini', () => {
						cb(stdout);
					});
				});
			});
		} else {}
	});
};

let get_certificate = (filename: string, cb: Callback<string>): void => {
	read_utf8_file(filename, (full_chain) => {
		if (full_chain !== null) {
			cb(full_chain);
		} else {
			acme_get_certificate((full_chain) => {
				write_utf8_file(filename, full_chain, () => {
					cb(full_chain);
				});
			});
		}
	});
};

let get_certificate_and_key = (cb: Callback<CertificateAndKey>): void => {
	get_key('certificate_key.pem', (certificate_key) => {
		get_certificate('full_chain.pem', (full_chain) => {
			cb({
				certificate_key: certificate_key,
				full_chain: full_chain
			});
		});
	});
};

interface Validity {
	now: number;
	not_before: number;
	not_after: number;
	duration_ms: number;
	renew_at: number;
	ms_until_valid: number;
	ms_until_expired: number;
	ms_until_renew: number;
}

let get_validity_from_certificate = (full_chain: string): Validity => {
	let asno = parse_der2((convert_to_der_from_pem(full_chain).pop() as ASNOInstance).data)[0];
	let dates = asno.asNode().at(0).asNode().at(4).asNode();
	let date_before = dates.at(0).asLeaf().access();
	let date_after = dates.at(1).asLeaf().access();
	let now = Date.now();
	let not_before = Date.parse(date_before);
	let not_after = Date.parse(date_after);
	let duration_ms = not_after - not_before;
	let renew_at = not_before + Math.floor(duration_ms * 2 / 3);
	let ms_until_valid = Math.max(not_before - now, 0);
	let ms_until_expired = Math.max(not_after - now, 0);
	let ms_until_renew = Math.max(renew_at - now, 0);
	return {
		now,
		not_before,
		not_after,
		duration_ms,
		renew_at,
		ms_until_valid,
		ms_until_expired,
		ms_until_renew
	};
};

let get_duration_from_ms = (ms: number): string => {
	let s = Math.floor(ms / 1000);
	ms -= s * 1000;
	let m = Math.floor(s / 60);
	s -= m * 60;
	let h = Math.floor(m / 60);
	m -= h * 60;
	let d = Math.floor(h / 24);
	h -= d * 24;
	let th = `00${h}`.slice(-2);
	let tm = `00${m}`.slice(-2);
	let ts = `00${s}`.slice(-2);
	let tms = `000${ms}`.slice(-3);
	return `${d} days ${th}:${tm}:${ts}.${tms}`;
};

function observeCertificate(observer: Callback<CertificateAndKey>): void {
	libfs.mkdirSync(certificate_path, { mode: 0o700, recursive: true });
	get_certificate_and_key((credentials) => {
		let validity = get_validity_from_certificate(credentials.full_chain);
		process.stdout.write(`Current time is ${new Date(validity.now).toUTCString()}.\n`);
		process.stdout.write(`Certificate is not valid before ${new Date(validity.not_before).toUTCString()}.\n`);
		process.stdout.write(`Certificate is not valid after ${new Date(validity.not_after).toUTCString()}.\n`);
		process.stdout.write(`Certificate should be renewed at ${new Date(validity.renew_at).toUTCString()}.\n`);
		process.stdout.write(`Certificate is valid for ${get_duration_from_ms(validity.duration_ms)}.\n`);
		process.stdout.write(`Certificate is valid in ${get_duration_from_ms(validity.ms_until_valid)}.\n`);
		process.stdout.write(`Certificate is valid for another ${get_duration_from_ms(validity.ms_until_expired)}.\n`);
		process.stdout.write(`Certificate should be renewed in ${get_duration_from_ms(validity.ms_until_renew)}.\n`);
		if (validity.ms_until_renew > 0) {
			observer(credentials);
		}
		safe_wait(() => {
			delete_file('full_chain.new', () => {
				get_certificate('full_chain.new', (full_chain) => {
					delete_file('full_chain.old', () => {
						rename_file('full_chain.pem', 'full_chain.old', () => {
							rename_file('full_chain.new', 'full_chain.pem', () => {
								observeCertificate(observer);
							});
						});
					});
				});
			});
		}, validity.ms_until_renew);
	});
}

observeCertificate((creds) => {
	console.log("got creds!");
});
//1329
