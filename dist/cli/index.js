#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const libcrypto = require("crypto");
const libcp = require("child_process");
const libfs = require("fs");
const libhttps = require("https");
const libpath = require("path");
const lib = require("../lib");
let cfgacme = lib.acme.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/acme.json", "utf8")));
let cfgdynu = lib.dynu.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/dynu.json", "utf8")));
let cfgglesys = lib.glesys.config.Config.as(JSON.parse(libfs.readFileSync("./private/config/glesys.json", "utf8")));
let read_utf8_file = (filename, cb) => {
    libfs.readFile(libpath.join(certificate_path, filename), { encoding: 'utf8' }, (error, content) => {
        if (error) {
            cb(null);
        }
        else {
            cb(content);
        }
    });
};
let write_utf8_file = (filename, content, cb) => {
    libfs.writeFile(libpath.join(certificate_path, filename), content, { encoding: 'utf8' }, (error) => {
        if (error) {
            cb(null);
        }
        else {
            cb();
        }
    });
};
let delete_file = (filename, cb) => {
    libfs.unlink(libpath.join(certificate_path, filename), (error) => {
        if (error) {
            cb(null);
        }
        else {
            cb();
        }
    });
};
let rename_file = (filename_old, filename_new, cb) => {
    libfs.rename(libpath.join(certificate_path, filename_old), libpath.join(certificate_path, filename_new), (error) => {
        if (error) {
            cb(null);
        }
        else {
            cb();
        }
    });
};
let safe_wait = (cb, delay_ms) => {
    process.stdout.write(`Waiting for ${get_duration_from_ms(delay_ms)}\n`);
    let next = () => {
        if (delay_ms > 0) {
            let current_delay_ms = Math.min(delay_ms, 2147483647);
            delay_ms -= current_delay_ms;
            setTimeout(next, current_delay_ms);
        }
        else {
            cb();
        }
    };
    next();
};
let is_array = (value, of) => {
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
let is_string = (value) => {
    return value != null && value.constructor === String;
};
let base64_from_buffer = (buffer) => {
    return buffer.toString('base64');
};
let base64url_from_buffer = (buffer) => {
    return base64_from_buffer(buffer).split('+').join('-').split('/').join('_').split('=').join('');
};
let base64_from_string = (string) => {
    return Buffer.from(string, "utf8").toString('base64');
};
let base64url_from_string = (string) => {
    return base64_from_string(string).split('+').join('-').split('/').join('_').split('=').join('');
};
var libasno;
(function (libasno) {
    class Instance {
        constructor() {
        }
        access() {
            throw new Error();
        }
        at(index) {
            throw new Error();
        }
        asLeaf() {
            throw new Error();
        }
        asNode() {
            throw new Error();
        }
        isLeaf() {
            return false;
        }
        isNode() {
            return false;
        }
    }
    libasno.Instance = Instance;
    class ConcreteLeaf extends Instance {
        constructor(value) {
            super();
            this.value = value;
        }
        access() {
            return this.value;
        }
        asLeaf() {
            return this;
        }
        isLeaf() {
            return true;
        }
    }
    libasno.ConcreteLeaf = ConcreteLeaf;
    class ConcreteNode extends Instance {
        constructor(instances) {
            super();
            this.instances = new Array(...instances);
        }
        at(index) {
            if (index < 0 || index >= this.instances.length) {
                throw new Error(`Bad index!`);
            }
            return this.instances[index];
        }
        asNode() {
            return this;
        }
        isNode() {
            return true;
        }
    }
    libasno.ConcreteNode = ConcreteNode;
})(libasno || (libasno = {}));
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
let parse_oid = (data) => {
    if (0 >= data.length) {
        throw new Error();
    }
    let numbers = [];
    numbers.push((data[0] / 40) | 0);
    numbers.push((data[0] % 40));
    for (let i = 1; i < data.length;) {
        let byte = data[i++];
        if (byte < 128) {
            numbers.push(byte);
        }
        else {
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
let oid_names = {
    '2.5.4.3': 'joint-iso-itu-t(2) ds(5) attributeType(4) commonName(3)',
    '1.2.840.113549.1.1.1': 'iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs-1(1) rsaEncryption(1)',
    '1.2.840.113549.1.1.11': 'iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) pkcs-1(1) sha256WithRSAEncryption(11)'
};
let readable_name_from_oid = (string) => {
    let s = oid_names[string];
    if (s !== undefined) {
        return s;
    }
    return string;
};
let date_from_datestring = (string) => {
    let parts = /^([0-9]{12})Z$/.exec(string);
    if (parts !== null) {
        let century = (Number.parseInt(string[0]) < 5) ? '20' : '19';
        let year = string.substr(0, 2);
        let month = string.substr(2, 2);
        let day = string.substr(4, 2);
        let hour = string.substr(6, 2);
        let minute = string.substr(8, 2);
        let second = string.substr(10, 2);
        return `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
    }
    return string;
};
let parse_der = (der) => {
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
let parse_der2 = (der) => {
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
        }
        else {
            result.push(new libasno.ConcreteNode(parse_der2(data)));
        }
        offset += len;
    }
    return result;
};
let get_response_buffer = (options, body, cb, url) => {
    if (url === undefined) {
        url = `${options.protocol}//${options.hostname}${options.path}`;
    }
    console.log(`\n[${url}]`);
    libhttps.request(url, options, (response) => {
        response.setEncoding('binary');
        let chunks = new Array();
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
    }).end(body);
};
let get_response_json = (options, body, cb, url) => {
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
let get_domains = (cb) => {
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
let get_domain_id = (cb) => {
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
let add_domain_record_for_domain_id = (domain_id, text_data, cb) => {
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
        textData: (text_data === '' ? 'TBD' : text_data)
    }, cb);
};
let dynu_delete_record = (domain_id, record_id, cb) => {
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
let jws_create_request = (private_key, protected_json, payload_json) => {
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
let compute_jwk_thumbprint = (jwk) => {
    let n = Buffer.from(jwk.n.split('-').join('+').split('_').join('/').split('=').join(''), 'base64');
    let e = Buffer.from(jwk.e.split('-').join('+').split('_').join('/').split('=').join(''), 'base64');
    if (n[0] === 0) {
        n = n.slice(1);
    }
    let hash = libcrypto.createHash('SHA256');
    hash.update(`{"e":"${base64url_from_buffer(e)}","kty":"RSA","n":"${base64url_from_buffer(n)}"}`, 'ascii');
    return base64url_from_buffer(hash.digest());
};
let compute_key_authorization = (token, jwk) => {
    let hash = libcrypto.createHash('SHA256');
    hash.update(`${token}.${compute_jwk_thumbprint(jwk)}`, 'ascii');
    return base64url_from_buffer(hash.digest());
};
let generate_rsa_key_pair = (cb) => {
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
    }, (error, public_key, private_key) => {
        if (error !== null) {
            throw error;
        }
        cb({
            public_key: public_key,
            private_key: private_key
        });
    });
};
let convert_to_key_object = (private_key) => {
    let asno = parse_der(private_key);
    let data = asno[0].data;
    let n = data[1].data;
    let e = data[2].data;
    let d = data[3].data;
    let p = data[4].data;
    let q = data[5].data;
    let dp = data[6].data;
    let dq = data[7].data;
    let qi = data[8].data;
    return { n, e, d, p, q, dp, dq, qi };
};
let convert_to_der_from_pem = (pem) => {
    let instances = [];
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
let read_key = (name, cb) => {
    libfs.readFile(libpath.join(certificate_path, name), { encoding: 'utf8' }, (error, key) => {
        if (error) {
            cb(null);
        }
        else {
            cb(key);
        }
    });
};
let save_key = (name, key, cb) => {
    libfs.writeFile(libpath.join(certificate_path, name), key, { encoding: 'utf8' }, (error) => {
        if (error) {
            cb(null);
        }
        else {
            cb();
        }
    });
};
let get_key = (name, cb) => {
    read_key(name, (value) => {
        if (value === null) {
            generate_rsa_key_pair((key_pair) => {
                let key = key_pair.private_key;
                save_key(name, key, (value) => {
                    if (value === null) {
                    }
                    else {
                        cb(key);
                    }
                });
            });
        }
        else {
            cb(value);
        }
    });
};
const acme_hostname = 'acme-v02.api.letsencrypt.org';
let acme_get_new_nonce = (cb) => {
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
let acme_add_account = (nonce, key_object, private_key, cb) => {
    let options = {
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
let acme_add_order = (nonce, kid, private_key, cb) => {
    let options = {
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
let acme_get_challenges = (authz, kid, nonce, private_key, cb) => {
    let options = {
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
let acme_finalize_challenge = (url, kid, nonce, private_key, cb) => {
    let options = {
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
let acme_get_account = (kid, nonce, private_key, cb) => {
    let options = {
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
let acme_get_order = (url, kid, nonce, private_key, cb) => {
    let options = {
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
let acme_finalize_order = (url, csr, kid, nonce, private_key, cb) => {
    let options = {
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
let acme_download_certificate = (url, kid, nonce, private_key, cb) => {
    let options = {
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
let acme_get_certificate = (cb) => {
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
                    let record_ids = [];
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
                                                    let record_id = record_ids.pop();
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
                                                }
                                                else {
                                                    cb(cert);
                                                }
                                            };
                                            next();
                                        });
                                    });
                                });
                            }
                            else {
                                setTimeout(done, 60 * 1000);
                            }
                        });
                    };
                    let next = () => {
                        if (authz.length > 0) {
                            let auth = authz.pop();
                            acme_get_challenges(auth, kid, nonce, account_key, (response) => {
                                nonce = response.nonce;
                                let challenge = response.body.challenges.find(a => a.type === 'dns-01');
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
                                        host: "@",
                                        type: "TXT",
                                        data: key_authorization
                                    }
                                }).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                                    let payload = yield response.payload();
                                    record_ids.push(payload.response.record.recordid);
                                    next();
                                }));
                            });
                        }
                        else {
                            let nextauth = () => {
                                if (authzorig.length > 0) {
                                    let auth = authzorig.pop();
                                    acme_get_challenges(auth, kid, nonce, account_key, (response) => {
                                        nonce = response.nonce;
                                        let challenge = response.body.challenges.find(a => a.type === 'dns-01');
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
                                                    }
                                                    else {
                                                        setTimeout(attempt_to_finalize, 60 * 1000);
                                                    }
                                                });
                                            };
                                            attempt_to_finalize();
                                        });
                                    });
                                }
                                else {
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
let get_csr = (cb) => {
    get_key('certificate_key.pem', (key) => {
        if (key !== null) {
            let domains = cfgacme.domains.map((domain) => {
                return domain.wildcard ? `*.${domain.hostname}` : domain.hostname;
            });
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
        }
        else { }
    });
};
let get_certificate = (filename, cb) => {
    read_utf8_file(filename, (full_chain) => {
        if (full_chain !== null) {
            cb(full_chain);
        }
        else {
            acme_get_certificate((full_chain) => {
                write_utf8_file(filename, full_chain, () => {
                    cb(full_chain);
                });
            });
        }
    });
};
let get_certificate_and_key = (cb) => {
    get_key('certificate_key.pem', (certificate_key) => {
        get_certificate('full_chain.pem', (full_chain) => {
            cb({
                certificate_key: certificate_key,
                full_chain: full_chain
            });
        });
    });
};
let get_validity_from_certificate = (full_chain) => {
    let asno = parse_der2(convert_to_der_from_pem(full_chain).pop().data)[0];
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
let get_duration_from_ms = (ms) => {
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
function observeCertificate(observer) {
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
