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
const sec1 = require("./");
const EC_PRIVATE_KEY_SEC1 = Buffer.from(`
	MHcCAQEEIB4AKlzxRI2sTVxq7SCJ9l5MeaCyvUqeEQqoZDc3M0OvoAoGCCqGSM49
	AwEHoUQDQgAEQcfTwyj10DdQpZ/2ZBWTEYvhW+z2OKZcWI/CJGuiMgVjy5cCjg8P
	22yJzfRBXT/Mc33quG4nPynPbc8aUPCuxQ==
`, "base64");
const EC_PRIVATE_KEY_JWK = {
    kty: "EC",
    crv: "P-256",
    x: "QcfTwyj10DdQpZ_2ZBWTEYvhW-z2OKZcWI_CJGuiMgU",
    y: "Y8uXAo4PD9tsic30QV0_zHN96rhuJz8pz23PGlDwrsU",
    d: "HgAqXPFEjaxNXGrtIIn2Xkx5oLK9Sp4RCqhkNzczQ68"
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    let key = sec1.parseECPrivateKey(EC_PRIVATE_KEY_SEC1);
    console.assert(true, `It should parse EC private keys properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let observed = sec1.serializeECPrivateKey(EC_PRIVATE_KEY_JWK);
    console.assert(observed.equals(EC_PRIVATE_KEY_SEC1), `It should serialize EC private keys properly.`);
}))();
