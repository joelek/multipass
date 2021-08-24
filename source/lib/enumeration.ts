type EnumerationValues = {
	[key: number]: undefined | string;
};

export function nameOf<A extends EnumerationValues>(enumeration: A, key: number): keyof A {
	let value = enumeration[key];
	if (value == null) {
		throw `Expected a valid enumeration key!`;
	}
	return value as keyof A;
};
