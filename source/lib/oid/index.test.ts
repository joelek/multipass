import * as oid from "./";

(async () => {
	let buffer = Buffer.from("KoZIhvcNAQEL", "base64");
	let objectIdentifier = await oid.parse(buffer);
	console.log(objectIdentifier.join(".") === "1.2.840.113549.1.1.11");
})();
