import * as algorithm from "./algorithm";
import * as asn1 from "../asn1";
import * as der from "../der";
import * as parsing from "../parsing";
import * as schema from "./schema";

export * from "./algorithm";
export * from "./schema";

export function decrypt(buffer: Buffer, passphrase: string): Buffer {
	let parser = new parsing.Parser(buffer);
	let node = der.node.parse(parser);
	if (schema.EncryptedPrivateKeyInfo.is(node)) {
		let [wrappingNode, ciphertextNode] = node.data;
		let wrappingAlgorithm = algorithm.wrapping.fromIdentifier(wrappingNode);
		let ciphertext = Buffer.from(ciphertextNode.data, "base64url");
		let plaintext = wrappingAlgorithm.unwrap(ciphertext, passphrase);
		return plaintext;
	}
	throw `Expected an encrypted buffer!`;
};

export function encrypt(plaintext: Buffer, passphrase: string, options?: Partial<{ wrappingAlgorithm: algorithm.wrapping.WrappingAlgorithm }>): Buffer {
	let wrappingAlgorithm = options?.wrappingAlgorithm ?? new algorithm.wrapping.PBES2Algorithm();
	let ciphertext = wrappingAlgorithm.wrap(plaintext, passphrase);
	let node: schema.EncryptedPrivateKeyInfo = {
		...asn1.SEQUENCE,
		data: [
			{
				...wrappingAlgorithm.getIdentifier()
			},
			{
				...asn1.OCTET_STRING,
				data: ciphertext.toString("base64url")
			}
		]
	};
	return der.node.serialize(node);
};
