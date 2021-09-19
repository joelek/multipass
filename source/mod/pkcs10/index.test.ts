import * as libcrypto from "crypto";
import * as pkcs10 from "./";

const KEY = libcrypto.createPrivateKey({
	key: Buffer.from(`
		MIIBOQIBAAJBAL5jMP7Ar8oYXLar9+fDUjMVToISGDOM4OWE45VSxXuaLEdD2SVD
		1W77KN3Dm9wI5RdVW7ky1ydZlhNranb+qJUCAwEAAQJAMqNBSdDIMLFwH2n34t3R
		hCK7od7cLwHeY02IFpRQUEJIKUzNk3QWqmnPE26y/H2FJQ4Qbuq0g2P8ewUWPT/q
		IQIhAPc9/05YqNP7xAsoRA7luG3S1bl4h0kGZA7iTs/DTZVpAiEAxSGiFQoPAyz6
		Q0YAdl8f0KBYQI72M0MZCrlOSOwz+E0CIAn2nKA6oGsSfT7522xCQ6FhWq2Dtufx
		cvzKj+R9eVXpAiAqJzz/fr0jErUZOZjTtxeYhxEYDPn8kDaEoodo9IlQaQIgGarT
		lyv2qmBZ7DNaYscVFR38zWQUWXpKh49Kw5WGt64=
	`, "base64"),
	format: "der",
	type: "pkcs1"
});

let CSR = Buffer.from(`
	MIH/MIGqAgEAMBkxFzAVBgNVBAMMDnRlc3Quam9lbGVrLnNlMFwwDQYJKoZIhvcN
	AQEBBQADSwAwSAJBAL5jMP7Ar8oYXLar9+fDUjMVToISGDOM4OWE45VSxXuaLEdD
	2SVD1W77KN3Dm9wI5RdVW7ky1ydZlhNranb+qJUCAwEAAaAsMCoGCSqGSIb3DQEJ
	DjEdMBswGQYDVR0RBBIwEIIOdGVzdC5qb2VsZWsuc2UwDQYJKoZIhvcNAQELBQAD
	QQCJghpkfZQNRMy0wnY4Bs127IjgLPQkrhqgEuxEgt2RjfVWlG2AbDk2L0WZJ5lj
	jjymY5wrGYDlBMeZbrgoaaBM
`, "base64");

(async () => {
	let expected = CSR;
	let observed = pkcs10.createCertificateRequest(["test.joelek.se"], KEY);
	console.assert(observed.equals(expected), `It should create certificate requests.`);
})();
