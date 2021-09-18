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
    return __awaiter(this, void 0, void 0, function* () {
        let certificate = {
            hostnames: [],
        };
        let options = {
            providers: [],
            certificates: []
        };
        let found_unrecognized_argument = false;
        for (let argv of process.argv.slice(2)) {
            let parts = null;
            if ((parts = /^--acme=(.*)$/.exec(argv)) != null) {
                options.acme = parts[1];
            }
            else if ((parts = /^--config=(.*)$/.exec(argv)) !== null) {
                options = lib.loadConfig(parts[1]);
                break;
            }
            else if ((parts = /^--dns=dynu[:](.*)$/.exec(argv)) != null) {
                options.providers.push({
                    type: "dynu",
                    key: parts[1]
                });
            }
            else if ((parts = /^--dns=glesys[:](.*)[:](.*)$/.exec(argv)) != null) {
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
                certificate.root = parts[1];
                options.certificates.push(certificate);
                certificate = {
                    hostnames: []
                };
            }
            else {
                found_unrecognized_argument = true;
                console.log(`Unrecognized argument "${argv}"!`);
            }
        }
        if (found_unrecognized_argument) {
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
