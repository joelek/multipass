# @joelek/certhero

```
certhero \
	--acme=https://api.acme-provider.com/directory \
	--email=user@domain.com \
	--dns=<string> \
	--domain=domain.com \
	--domain=*.domain.com \
	--account=account_key.pem \
	--key=certificate_key.pem \
	--cert=full_chain.pem \
	--root=/certs/domain.com/
```

## Roadmap

* JWK: Remove and add leadings zeroes from integers.
* JWS: Add support for other signature algorithms.
* RSA: Add support for PKCS#8 encryption.
