import * as jwk from "../jwk";
import * as sec1 from "./";

const EC_PRIVATE_KEY_SEC1 = Buffer.from(`
	MHcCAQEEIB4AKlzxRI2sTVxq7SCJ9l5MeaCyvUqeEQqoZDc3M0OvoAoGCCqGSM49
	AwEHoUQDQgAEQcfTwyj10DdQpZ/2ZBWTEYvhW+z2OKZcWI/CJGuiMgVjy5cCjg8P
	22yJzfRBXT/Mc33quG4nPynPbc8aUPCuxQ==
`, "base64");

const EC_PRIVATE_KEY_JWK: jwk.ECPrivateKey = {
	kty: "EC",
	crv: "P-256",
	x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
	y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU",
	d: "HgAqXPFEjaxNXGrtIIn2Xkx5oLK9Sp4RCqhkNzczQ68"
};

(async () => {
	let key = sec1.parseECPrivateKey(EC_PRIVATE_KEY_SEC1);
	console.assert(true, `It should parse EC private keys properly.`);
})();

(async () => {
	let observed = sec1.serializeECPrivateKey(EC_PRIVATE_KEY_JWK);
	console.assert(observed.equals(EC_PRIVATE_KEY_SEC1), `It should serialize EC private keys properly.`);
})();
