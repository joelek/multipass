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
const pkcs10 = require("./");
const KEY = libcrypto.createPrivateKey({
    key: Buffer.from(`
		MIGkAgEBBDDJ9wyXr+EvaaVU6wxQgl0+jkk/DzlR7FHOijM1N9TUAd+/mtKNTUIu
		rToI8+sYYzGgBwYFK4EEACKhZANiAARzcfwXM/sMo4kMTduiJejmqI0hjISOEqeb
		NReVCsyR8wRBg0VvEueim6tijQn6qP0G80JNx4jWElOUefVITEFPxfNwy4tphAvg
		T8t1Uvzm8v472y3W7kexag22dG/eWxU=
	`, "base64"),
    format: "der",
    type: "sec1"
});
let CSR = Buffer.from(`
	MIIBPTCBxAIBADAZMRcwFQYDVQQDDA50ZXN0LmpvZWxlay5zZTB2MBAGByqGSM49
	AgEGBSuBBAAiA2IABHNx/Bcz+wyjiQxN26Il6OaojSGMhI4Sp5s1F5UKzJHzBEGD
	RW8S56Kbq2KNCfqo/QbzQk3HiNYSU5R59UhMQU/F83DLi2mEC+BPy3VS/Oby/jvb
	LdbuR7FqDbZ0b95bFaAsMCoGCSqGSIb3DQEJDjEdMBswGQYDVR0RBBIwEIIOdGVz
	dC5qb2VsZWsuc2UwCgYIKoZIzj0EAwMDaAAwZQIwecDHWSlwomUhGesa/JSk5It9
	m/taislATzI8dV/K8BUlOrOhYk/h8vKavGIpMZz5AjEAs9MqR1HirAEC3fTJuoqR
	n7xxL3mX1GmCi3/zaTk3KxLDP9GT1CLulHudzIcMiKFX
`, "base64");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = CSR;
    let observed = pkcs10.createCertificateRequest(["test.joelek.se"], KEY);
    console.log(observed.toString("base64"));
    console.assert(observed.equals(expected), `It should create certificate requests.`);
}))();
