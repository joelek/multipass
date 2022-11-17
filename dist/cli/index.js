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
const lib = require("../lib");
function run() {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        let certificate = {
            hostnames: [],
        };
        let options = {
            providers: [],
            certificates: []
        };
        let foundUnrecognizedArgument = false;
        for (let argv of process.argv.slice(2)) {
            let parts = null;
            if ((parts = /^--acme=(.*)$/.exec(argv)) != null) {
                options.acme = parts[1] || undefined;
            }
            else if ((parts = /^--config=(.*)$/.exec(argv)) != null) {
                options = lib.loadConfig(parts[1]);
                break;
            }
            else if ((parts = /^--dns=dynu[:]([^:]*)$/.exec(argv)) != null) {
                options.providers.push({
                    type: "dynu",
                    key: parts[1]
                });
            }
            else if ((parts = /^--dns=glesys[:]([^:]*)[:]([^:]*)$/.exec(argv)) != null) {
                options.providers.push({
                    type: "glesys",
                    account: parts[1],
                    key: parts[2]
                });
            }
            else if ((parts = /^--hostname=(.*)$/.exec(argv)) != null) {
                certificate.hostnames.push(parts[1]);
            }
            else if ((parts = /^--monitor=(true|false)$/.exec(argv)) != null) {
                options.monitor = parts[1] === "true";
            }
            else if ((parts = /^--root=(.*)$/.exec(argv)) != null) {
                certificate.root = parts[1] || undefined;
                options.certificates.push(certificate);
                certificate = {
                    hostnames: []
                };
            }
            else if ((parts = /^--account-key=(.*)$/.exec(argv)) != null) {
                options.filenames = (_a = options.filenames) !== null && _a !== void 0 ? _a : {};
                options.filenames.account_key = parts[1];
            }
            else if ((parts = /^--certificate-key=(.*)$/.exec(argv)) != null) {
                options.filenames = (_b = options.filenames) !== null && _b !== void 0 ? _b : {};
                options.filenames.certificate_key = parts[1];
            }
            else if ((parts = /^--full-chain=(.*)$/.exec(argv)) != null) {
                options.filenames = (_c = options.filenames) !== null && _c !== void 0 ? _c : {};
                options.filenames.full_chain = parts[1];
            }
            else if ((parts = /^--account-pass=(.*)$/.exec(argv)) != null) {
                options.passphrases = (_d = options.passphrases) !== null && _d !== void 0 ? _d : {};
                options.passphrases.account_pass = parts[1];
            }
            else if ((parts = /^--certificate-pass=(.*)$/.exec(argv)) != null) {
                options.passphrases = (_e = options.passphrases) !== null && _e !== void 0 ? _e : {};
                options.passphrases.certificate_pass = parts[1];
            }
            else {
                foundUnrecognizedArgument = true;
                console.log(`Unrecognized argument "${argv}"!`);
            }
        }
        if (foundUnrecognizedArgument) {
            console.log(`Arguments:`);
            console.log(`	--acme=string`);
            console.log(`		Set ACME directory URL.`);
            console.log(`	--config=string`);
            console.log(`		Load specified config.`);
            console.log(`	--dns=string`);
            console.log(`		Set DNS provider and associated credentials.`);
            console.log(`	--hostname=string`);
            console.log(`		Set hostname for which to request certificate.`);
            console.log(`	--monitor=boolean`);
            console.log(`		Configure automatic monitoring and renewal of certificates.`);
            console.log(`	--root=string`);
            console.log(`		Set directory for which to store associated files.`);
            console.log(`	--account-key=string`);
            console.log(`		Set filename for account key file (without extension).`);
            console.log(`	--certificate-key=string`);
            console.log(`		Set filename for certificate key file (without extension).`);
            console.log(`	--full-chain=string`);
            console.log(`		Set filename for full certificate chain file (without extension).`);
            console.log(`	--account-pass=string`);
            console.log(`		Set passphrase used to encrypt the account key.`);
            console.log(`	--certificate-pass=string`);
            console.log(`		Set passphrase used to encrypt the certificate key.`);
            return 1;
        }
        else {
            if (options.certificates.length === 0) {
                options.certificates.push(certificate);
            }
            yield lib.run(options);
            return 0;
        }
    });
}
;
run()
    .catch((error) => {
    console.log(String(error));
    return 1;
})
    .then((code) => {
    process.exit(code);
});
