type Enumeration = {
	[key: number]: undefined | string
};

async function nameOf<A extends Enumeration>(enumeration: A, index: number): Promise<keyof A> {
	if (!(index in enumeration)) {
		throw "Expected a valid index!";
	}
	return enumeration[index] as keyof A;
}

export {
	nameOf
};
