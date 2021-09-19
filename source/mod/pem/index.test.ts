import * as pem from "./";

(async () => {
	let string = [
	].join("\r\n");
	let document = pem.parse(string);
	console.assert(document.sections.length === 0, `It should parse documents containing zero sections.`);
})();

(async () => {
	try {
		let string = [
			"-----BEGIN NUMBERS-----"
		].join("\r\n");
		let document = pem.parse(string);
		console.assert(false, `It should throw an error when parsing documents with incomplete sections.`);
	} catch (error) {}
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections.length;
	let expected = 1;
	console.assert(observed === expected, `It should parse documents containing one section.`);
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----",
		"-----BEGIN STRINGS-----",
		"-----END STRINGS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections.length;
	let expected = 2;
	console.assert(observed === expected, `It should parse documents containing two sections.`);
})();

(async () => {
	let string = [
		"one",
		"two"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.postamble?.join("\r\n");
	let expected = [
		"one",
		"two"
	].join("\r\n");
	console.assert(observed === expected, `It should parse document postamble properly.`);
})();

(async () => {
	let string = [
		"one",
		"two",
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections[0]?.preamble?.join("\r\n");
	let expected = [
		"one",
		"two"
	].join("\r\n");
	console.assert(observed === expected, `It should parse section preamble properly.`);
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections[0]?.label;
	let expected = "NUMBERS"
	console.assert(observed === expected, `It should parse section labels properly.`);
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"one: 1",
		"two: 2",
		"",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections[0]?.headers?.map((header) => {
		return `${header.key}:${header.value}`;
	}).join("\r\n");
	let expected = [
		"one: 1",
		"two: 2"
	].join("\r\n");
	console.assert(observed === expected, `It should parse section headers properly.`);
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"one: 1",
		" 1",
		" 1",
		"two: 2",
		"",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections[0]?.headers?.map((header) => {
		return `${header.key}:${header.value}`;
	}).join("\r\n");
	let expected = [
		"one: 111",
		"two: 2"
	].join("\r\n");
	console.assert(observed === expected, `It should parse multi-line section headers properly.`);
})();

(async () => {
	let string = [
		"-----BEGIN NUMBERS-----",
		"AQIDBA==",
		"-----END NUMBERS-----"
	].join("\r\n");
	let document = pem.parse(string);
	let observed = document.sections[0]?.buffer;
	let expected = Buffer.from("AQIDBA==", "base64");
	console.assert(observed?.equals(expected), `It should parse section buffers properly.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: []
	});
	let expected = [
	].join("\r\n");
	console.assert(observed === expected, `It should serialize documents containing zero sections.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				label: "NUMBERS",
				buffer: Buffer.of()
			}
		]
	});
	let expected = [
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize documents containing one section.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				label: "NUMBERS",
				buffer: Buffer.of()
			},
			{
				label: "STRINGS",
				buffer: Buffer.of()
			}
		]
	});
	let expected = [
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----",
		"-----BEGIN STRINGS-----",
		"-----END STRINGS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize documents containing two sections.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [],
		postamble: [
			"one",
			"two"
		]
	});
	let expected = [
		"one",
		"two"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize documents containing postamble.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				label: "NUMBERS",
				headers: [
					{
						key: "one",
						value: "1"
					},
					{
						key: "two",
						value: "2"
					}
				],
				buffer: Buffer.of()
			}
		]
	});
	let expected = [
		"-----BEGIN NUMBERS-----",
		"one:1",
		"two:2",
		"",
		"-----END NUMBERS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize section headers properly.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				label: "NUMBERS",
				headers: [
					{
						key: "one",
						value: "1111111111111111111111111111111111111111111111111111111111111111"
					}
				],
				buffer: Buffer.of()
			}
		]
	});
	let expected = [
		"-----BEGIN NUMBERS-----",
		"one:",
		"	1111111111111111111111111111111111111111111111111111111111111111",
		"",
		"-----END NUMBERS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize multi-line section headers properly.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				preamble: [
					"one",
					"two"
				],
				label: "NUMBERS",
				buffer: Buffer.of()
			}
		]
	});
	let expected = [
		"one",
		"two",
		"-----BEGIN NUMBERS-----",
		"-----END NUMBERS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize section preamble properly.`);
})();

(async () => {
	let observed = pem.serialize({
		sections: [
			{
				label: "NUMBERS",
				buffer: Buffer.of(1, 2, 3, 4)
			}
		]
	});
	let expected = [
		"-----BEGIN NUMBERS-----",
		"AQIDBA==",
		"-----END NUMBERS-----"
	].join("\r\n");
	console.assert(observed === expected, `It should serialize section buffers properly.`);
})();

(async () => {
	let section: pem.Section = {
		label: "NUMBERS",
		buffer: Buffer.of(1, 2, 3, 4)
	};
	let observed = pem.encrypt(section, "räksmörgås", {
		algorithm: "AES-128-CBC",
		iv: Buffer.alloc(16)
	}).buffer;
	let expected = Buffer.from("ZjytgQTTv6HeUfYMXOuKcg==", "base64");
	console.assert(observed.equals(expected), `It should encrypt section buffers properly.`);
})();

(async () => {
	let section: pem.Section = {
		label: "NUMBERS",
		headers: [
			{
				key: "Proc-Type",
				value: ["4", "ENCRYPTED"].join(",")
			},
			{
				key: "DEK-Info",
				value: ["AES-128-CBC", Buffer.alloc(16).toString("hex").toUpperCase()].join(",")
			}
		],
		buffer: Buffer.from("ZjytgQTTv6HeUfYMXOuKcg==", "base64")
	};
	let observed = pem.decrypt(section, "räksmörgås").buffer;
	let expected = Buffer.of(1, 2, 3, 4);
	console.assert(observed.equals(expected), `It should decrypt section buffers properly.`);
})();
