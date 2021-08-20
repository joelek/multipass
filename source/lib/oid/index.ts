// TODO: Add serializer.

export async function parse(buffer: Buffer): Promise<Array<number>> {
	let components = new Array<number>();
	let offset = 0;
	let byte = buffer.readUInt8(offset++);
	components.push((byte / 40) | 0);
	components.push(byte % 40);
	while (offset < buffer.length) {
		let component = 0;
		for (let i = 0; true; i++) {
			let byte = buffer.readUInt8(offset++);
			let hi = ((byte >> 7) & 0x01);
			let lo = ((byte >> 0) & 0x7F);
			component = (component * 128) + lo;
			if (hi === 0) {
				break;
			}
			if (i === 4) {
				throw "Expected a reasonable component length!";
			}
		}
		components.push(component);
	}
	return components;
};
