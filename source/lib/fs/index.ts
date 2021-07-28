import * as $fs from "fs";

async function readFileToBuffer(path: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		$fs.readFile(path, (error, buffer) => {
			if (error != null) {
				return reject(error);
			}
			return resolve(buffer);
		});
	});
}

async function writeBufferToFile(path: string, buffer: Buffer): Promise<void> {
	return new Promise((resolve, reject) => {
		$fs.writeFile(path, buffer, (error) => {
			if (error != null) {
				return reject(error);
			}
			return resolve();
		});
	});
}

export {
	readFileToBuffer,
	writeBufferToFile
};
