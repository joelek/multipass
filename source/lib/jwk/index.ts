export enum KeyType {
	"EC",
	"RSA",
	"oct"
};

export enum Curve {
	"P-256",
	"P-384",
	"P-521"
};

export type PublicKeyEC = {
	kty: `EC`;
	crv: keyof typeof Curve;
	x: string;
	y: string;
};

export type PrivateKeyEC = PublicKeyEC & {
	d: string;
};

export type PublicKeyRSA = {
	kty: `RSA`;
	n: string;
	e: string;
};

export type PrivateKeyRSA = PublicKeyRSA & {
	d: string;
	p?: string;
	q?: string;
	dp?: string;
	dq?: string;
	qi?: string;
	oth?: Array<{
		r: string;
		d: string;
		t: string;
	}>
};
