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
const pkcs5 = require("./");
const KEY_PBES2_PBKDF2_HMACSHA256_AES256CBC = Buffer.from(`
	MIIBvTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQI7CPA0QToyRYCAggA
	MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAishzFHPoJ3L9PZ0oYcIE9BIIB
	YC0GCO9eLL33oYA3x3v3MJHnT7bNK6KzGFftJpQgUC0gb/unohCSIh8JfinU54rO
	riIIq3LvqCjEER8Q1yTKhUst2A5eTMIHXlwk6MFtBMeYl5ztltTBbFTNJh6CMJlb
	qrmhvyq0Htd99KJ4Ip5nML7qN5onta1bjyqsAYceaNfKHmkWlf6TiiDVmV54sNdl
	WHjl/V1D3CM1Z6YbyG2iDkjnr44Cx2yL4CP9K4gn+SwQ1lH7YlKjwgL/asdQ4aqj
	6zCn/tLHR/FbxbkV2EOmaw9uHcUiEhwDHxCQFyMEBkjAFlzZxDgz88lKy9xEJtJH
	mTOaAa+JDBU3ZONkw3UW3QvSJMSIEzWd/JiyIG511n1MOqvcnuGiK6SO7YHjMyi3
	y4JWUUWP07EiLtaFHhNIaCum1BB2halThFpPIH3hX7uBcwTb6RwJKqhqS2NI3ArT
	42aaJpIpM0nJuSfIc5BSc/E=
`, "base64");
const KEY = Buffer.from(`
	MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEAvmMw/sCvyhhctqv3
	58NSMxVOghIYM4zg5YTjlVLFe5osR0PZJUPVbvso3cOb3AjlF1VbuTLXJ1mWE2tq
	dv6olQIDAQABAkAyo0FJ0MgwsXAfaffi3dGEIruh3twvAd5jTYgWlFBQQkgpTM2T
	dBaqac8TbrL8fYUlDhBu6rSDY/x7BRY9P+ohAiEA9z3/Tlio0/vECyhEDuW4bdLV
	uXiHSQZkDuJOz8NNlWkCIQDFIaIVCg8DLPpDRgB2Xx/QoFhAjvYzQxkKuU5I7DP4
	TQIgCfacoDqgaxJ9PvnbbEJDoWFarYO25/Fy/MqP5H15VekCIConPP9+vSMStRk5
	mNO3F5iHERgM+fyQNoSih2j0iVBpAiAZqtOXK/aqYFnsM1pixxUVHfzNZBRZekqH
	j0rDlYa3rg==
`, "base64");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = KEY;
    let observed = pkcs5.decrypt(KEY_PBES2_PBKDF2_HMACSHA256_AES256CBC, "test");
    console.assert(observed.equals(expected), `It should decypt data using PBES2 PBKDF2 HMACSHA256 AES256CBC properly.`);
}))();
(() => __awaiter(void 0, void 0, void 0, function* () {
    let expected = KEY_PBES2_PBKDF2_HMACSHA256_AES256CBC;
    let observed = pkcs5.encrypt(KEY, "test", {
        wrappingAlgorithm: new pkcs5.wrapping.PBES2Algorithm({
            derivationAlgorithm: new pkcs5.derivation.PBKDF2Algorithm({
                salt: Buffer.from("EC23C0D104E8C916", "hex"),
                iterations: 2048,
                digestAlgorithm: new pkcs5.digest.HMACSHA256Algorithm()
            }),
            cipherAlgorithm: new pkcs5.cipher.AES256CBCAlgorithm({
                iv: Buffer.from("22B21CC51CFA09DCBF4F674A1870813D", "hex")
            })
        })
    });
    console.assert(observed.equals(expected), `It should encrypt data using PBES2 PBKDF2 HMACSHA256 AES256CBC properly.`);
}))();
