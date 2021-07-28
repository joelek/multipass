import * as $fs from "../fs";
import * as $der from "./";
import * as $pem from "../pem";
/*





let f = $asno.parse(buffer).asSequence()




 */
(async () => {
	let buffer = await $fs.readFileToBuffer("./private/certificate/certificate_key.pem");
	let structs = await $pem.parse(buffer.toString("utf8"));
	console.log(structs);
	//let buffer = Buffer.from("3013020105160e416e79626f64792074686572653f", "hex");
	let asno = await $der.parse(structs[0].buffer);
	console.log(JSON.stringify(asno, null, "\t"));

	let f = await $der.parseObjectIdentifier(Buffer.from("KoZIhvcNAQEL", "base64"));
	console.log(f.join(".") === "1.2.840.113549.1.1.11");
})();
