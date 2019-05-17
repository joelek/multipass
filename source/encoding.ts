async function convertJSONToString(json: any): Promise<string> {
	return JSON.stringify(json);
}

async function convertStringToJSON(string: string): Promise<any> {
	return JSON.parse(string);
}

async function convertUTF8BufferToString(buffer: Buffer): Promise<string> {
	return buffer.toString("utf8");
}

async function convertStringToUTF8Buffer(string: string): Promise<Buffer> {
	return Buffer.from(string, "utf8");
}

async function convertBufferToBase64String(buffer: Buffer): Promise<string> {
	return buffer.toString("base64");
}

async function convertBase64StringToBuffer(string: string): Promise<Buffer> {
	return Buffer.from(string, "base64");
}

async function convertBufferToBase64URLString(buffer: Buffer): Promise<string> {
	return Promise.resolve(buffer)
		.then(convertBufferToBase64String)
		.then((string) => {
			string = string.replace(/\+/g, "-");
			string = string.replace(/\//g, "_");
			string = string.replace(/\=/g, "");
			return string;
		});
}

async function convertBase64URLStringToBuffer(string: string): Promise<Buffer> {
	return Promise.resolve(string)
		.then((string) => {
			string = string.replace(/\-/g, "+");
			string = string.replace(/\_/g, "/");
			return string;
		})
		.then(convertBase64StringToBuffer);
}

async function convertStringToBase64String(string: string): Promise<string> {
	return Promise.resolve(string)
		.then(convertStringToUTF8Buffer)
		.then(convertBufferToBase64String);
}

async function convertBase64StringToString(string: string): Promise<string> {
	return Promise.resolve(string)
		.then(convertBase64StringToBuffer)
		.then(convertUTF8BufferToString);
}

async function convertStringToBase64URLString(string: string): Promise<string> {
	return Promise.resolve(string)
		.then(convertStringToUTF8Buffer)
		.then(convertBufferToBase64URLString);
}

async function convertBase64URLStringToString(string: string): Promise<string> {
	return Promise.resolve(string)
		.then(convertBase64URLStringToBuffer)
		.then(convertUTF8BufferToString);
}

export {
	convertJSONToString,
	convertStringToJSON,
	convertUTF8BufferToString,
	convertStringToUTF8Buffer,
	convertBufferToBase64String,
	convertBase64StringToBuffer,
	convertBufferToBase64URLString,
	convertBase64URLStringToBuffer,
	convertStringToBase64String,
	convertBase64StringToString,
	convertStringToBase64URLString,
	convertBase64URLStringToString
};
