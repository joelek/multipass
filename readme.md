# @joelek/multipass

Fully-automated certificate manager for NodeJS 16 written completely in TypeScript.

```
multipass \
	--acme=le \
	--dns=<credentials> \
	--hostname=domain.com \
	--hostname=www.domain.com \
	--root=/certs/domain.com/
```

Please make sure that you read the section about DNS delegation and that you fully understand the implications of not using the technique before you deploy Multipass in production environments.

## Background

TLS certificates are an essential component of the Internet. They enable end-to-end encryption (E2EE) between parties and are vital for keeping private information private. They can also be difficult to manage due to the inherent complexity of cryptography and due to the existance of competing standards and formats.

Multipass was created to make certificate management as simple as possible without compromising cryptographic security.

## Features

### Automatic key generation

Multipass can generate strong assymetric cryptographic keys automatically and supports loading existing keys stored using the commonly used `PKCS1`, `PKCS8` and `SEC1` containers.

By default, Multipass will generate 256-bit elliptic curve keys and store them using the `SEC1` container.

### Automated certification

Multipass is constructed around the Automatic Certificate Management Environment (ACME) protocol which allows the certification process to be fully-automated.

Multipass uses Let's Encrypt's staging environment by default. Although using the staging environment will produce valid certificates, the certificates produced will _not_ be recognized as secure as they will have been signed by an untrusted root authority.

Let's Encrypt provides a production environment that produces certificates signed by a globally trusted root authority. Multipass can be instructed to use Let's Encrypt's production environment by setting the `--acme=<string>` argument to the value `le`.

```
multipass --acme=le
```

The argument can also be set to the ACME directory URL of any certificate authority implementing the ACME protocol.

```
multipass --acme=https://acme.certificate-authority.com/directory
```

Please note that Multipass will signal that you agree to the terms and conditions of the certificate authority configured when running the software. Do _not_ run the software if you do not agree to the terms and conditions of the certificate authority you intend to use.

### Automated DNS authorization

The ACME protocol defines a set of challenges that can be used to prove authority for the hostnames for which a certificate is to be issued.

Multipass implements the `dns-01` challenge which requires proving authority for a hostname through the domain name system (DNS). Implementing this challenge provides great flexibility for what hostnames certificates may be issued. The challenge even allows for wildcard certificates to be issued.

The `dns-01` challenge is notoriously difficult to automate as it requires knowledge about and precise control over the DNS configuration of the domain corresponding to the hostname for which the certificate is to be issued.

Multipass requires credentials for provisioning `TXT` records in order to automate certification. Several DNS providers support the provisioning of DNS records through proprietary APIs. Multipass implements the APIs of the DNS providers listed below.

#### Dynu

https://www.dynu.com/

Credentials for the DNS provider may be configured using the `--dns=<string>` argument.

```
multipass --dns=dynu:<key>
```

Credentials for the DNS provider use the following JSON format.

```
{
	"type": "dynu",
	"key": string
}
```

#### GleSYS

https://glesys.se/

Credentials for the DNS provider may be configured using the `--dns=<string>` argument.

```
multipass --dns=glesys:<account>:<key>
```

Credentials for the DNS provider use the following JSON format.

```
{
	"type": "glesys",
	"account": string,
	"key": string
}
```

Please note that GleSYS employs a whitelisting system for access keys to their API. You must explicitly allow the hostname or IP of the machine running Multipass for all keys used by Multipass. You can create access keys and configure access control through their control panel.

### Multiple hostnames

Multipass can be used to obtain a single TLS certificate for multiple hostnames through the use of a certificate extension named Subject Alternative Name (SAN). The extension is commonly used when a single certificate is needed for the apex domain as well as for certain subdomains like `www` or `mail`.

Hostnames may be provided using the `--hostname=<string>` argument. Multipass will automate certification for every hostname provided.

```
multipass \
	--hostname=domain.com \
	--hostname=www.domain.com
```

### Multiple certificates

Multipass can be used to obtain multiple TLS certificates. This feature is enabled through the `--root=<string>` argument which specifies the root directory for the files associated with the certificate.

Every time the `--root=<string>` argument is provided, a certificate configuration is created using the previously provided settings.

```
multipass \
	--hostname=domain1.com \
	--root=/certs/domain1.com/ \
	--hostname=domain2.com \
	--root=/certs/domain2.com/
```
By default, the files associated with the certificate are stored in the current working directory.

### Certificate monitoring

Multipass can be configured to automatically trigger a certification process once it deems it necessary to do so. It bases its decision on the number of certificates managed as well as their validity periods and prioritizes the most urgent certification processes.

The monitoring feature is turned _off_ by default and can be configured using the `--monitor=<boolean>` argument.

### Configuration files

Multipass can load configuration files stored using the JSON format shown below. A configuration file is loaded using the `--config=<string>` argument.

```
{
	"providers": [],
	"certificates": [
		{
			"hostnames": [
				string
			],
			"root"?: string
		}
	],
	"acme"?: string,
	"monitor?": boolean
}
```

The array of providers is an array of API credentials for DNS providers supported by Multipass. Please see the specific provider for information about the JSON format.

## DNS delegation

The APIs of most DNS providers do not allow for fine-grained access control. This poses a great security risk as full control over the associated domains is granted to whomever is in possession of the credentials.

Anyone in possession of the credentials can in theory provision records well beyond the scope of certificate management. This includes redirecting users to external servers through the provisioning of `A` or `AAAA` records, redirecting incoming e-mail to external servers through the provisioning of `MX` records as well complete delegation of all DNS requests to external servers through the provisioning of `NS` records! It is therefore strongly recommended that DNS delegation is used in a way that only grants the necessary provisioning privileges.

By not utilizing DNS delegation and a DNS provider without fine-grained access control, you will be granting anyone in possession of the credentials, including Multipass, full control over the domain in question.

Automated certification requires authority over the `_acme-challenge` subdomain of the domain in question. By manually provisioning a `CNAME` record pointing the `_acme-challenge` subdomain to a designated certification domain for which the credentials apply, the risk is mitigated.

This technique can also be used to add support for automated certification of domains controlled through a DNS provider lacking API functionality. Simply provision a `CNAME` record pointing the `_acme-challenge` subdomain to a domain controlled by one of the DNS providers for which Multipass implements API support.

```
CNAME _acme-challenge.api-unsupported.com => api-unsupported.com.acme.api-supported.com
```

## DNS propagation

All DNS records have an associated Time To Live (TTL) value which specifies the number of seconds after it is received for which the record is considered to be valid.

It is important to understand the effects that this caching feature can have on certification automation, especially in conjunction with DNS delegation.

Any domain is likely to have `A` or `AAAA` records with fairly high TTL values since the IP addresses rarely change if not ever. DNS servers that have queried the nameservers for a certain domain will have had cached the records and are likely to consider them valid for some additional time.

When Multipass provisions `TXT` records during the certification process, it is dependent on the certificate authority being able to query and receive the records properly. The certificate authority should query the authoritative nameservers directly and not send its queries through an intermediary. This in order to avoid issues associated with caching.

Multipass performs propagation validation before asking the certificate authority to validate the records being provisioned.

## Sponsorship

The continued development of this software depends on your sponsorship. Please consider sponsoring this project if you find that the software creates value for you and your organization.

The sponsor button can be used to view the different sponsoring options. Contributions of all sizes are welcome.

Thank you for your support!

## Installation

Releases follow semantic versioning and release packages are published using the GitHub platform. Use the following command to install the latest release.

```
npm install [-g] joelek/multipass#semver:^0.1
```

Use the following command to install the very latest build. The very latest build may include breaking changes and should not be used in production environments.

```
npm install [-g] joelek/multipass#master
```

## Roadmap

* Use authoritative nameservers directly when resolving DNS queries.
* Add support for additional DNS APIs.
* Stop using promises in the encoding module.
* Add support for configuring account, key and cert filenames.
* Add support for keys protected using passphrases.
