#!/usr/bin/env node

import * as lib from "../lib";

async function run(): Promise<number> {
	let certificate: lib.Certificate = {
		hostnames: [],
	};
	let options: lib.Options = {
		providers: [],
		certificates: []
	};
	let foundUnrecognizedArgument = false;
	for (let argv of process.argv.slice(2)) {
		let parts: RegExpExecArray | null = null;
		if ((parts = /^--acme=(.*)$/.exec(argv)) != null) {
			options.acme = parts[1] || undefined;
		} else if ((parts = /^--config=(.*)$/.exec(argv)) != null) {
			options = lib.loadConfig(parts[1]);
			break;
		} else if ((parts = /^--dns=dynu[:]([^:]*)$/.exec(argv)) != null) {
			options.providers.push({
				type: "dynu",
				key: parts[1]
			});
		} else if ((parts = /^--dns=glesys[:]([^:]*)[:]([^:]*)$/.exec(argv)) != null) {
			options.providers.push({
				type: "glesys",
				account: parts[1],
				key: parts[2]
			});
		} else if ((parts = /^--hostname=(.*)$/.exec(argv)) != null) {
			certificate.hostnames.push(parts[1]);
		} else if ((parts = /^--monitor=(true|false)$/.exec(argv)) != null) {
			options.monitor = parts[1] === "true";
		} else if ((parts = /^--root=(.*)$/.exec(argv)) != null) {
			certificate.root = parts[1] || undefined;
			options.certificates.push(certificate);
			certificate = {
				hostnames: []
			};
		} else if ((parts = /^--account-key=(.*)$/.exec(argv)) != null) {
			options.filenames = options.filenames ?? {};
			options.filenames.account_key = parts[1];
		} else if ((parts = /^--certificate-key=(.*)$/.exec(argv)) != null) {
			options.filenames = options.filenames ?? {};
			options.filenames.certificate_key = parts[1];
		} else if ((parts = /^--full-chain=(.*)$/.exec(argv)) != null) {
			options.filenames = options.filenames ?? {};
			options.filenames.full_chain = parts[1];
		} else {
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
		return 1;
	} else {
		if (options.certificates.length === 0) {
			options.certificates.push(certificate);
		}
		await lib.run(options);
		return 0;
	}
};

run()
	.catch((error) => {
		console.log(String(error));
		return 1;
	})
	.then((code) => {
		process.exit(code);
	});
