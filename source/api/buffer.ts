import * as $https from "https";
import * as $messages from "./messages";

async function parseHeaders(raw_headers: string[]): Promise<$messages.Headers> {
	if ((raw_headers.length & 1) !== 0) {
		throw "Expected an even number of raw headers!";
	}
	let headers: $messages.Headers = {};
	for (let i = 0; i < raw_headers.length; i += 2) {
		let key = raw_headers[i + 0];
		let value = raw_headers[i + 1];
		let values = headers[key];
		if (values == null) {
			values = new Array<string>();
			headers[key] = values;
		}
		values.push(value);
	}
	return headers;
}

async function request(request: $messages.Request<Buffer>): Promise<$messages.Response<Buffer>> {
	return new Promise((resolve, reject) => {
		let client_request = $https.request(request.url, {
			headers: request.headers,
			method: request.method
		});
		client_request.on("response", (incoming_message) => {
			incoming_message.setEncoding("binary");
			let buffers = new Array<Buffer>();
			incoming_message.on("data", (chunk) => {
				let buffer = Buffer.from(chunk, "binary");
				buffers.push(buffer);
			});
			incoming_message.on("end", async () => {
				let buffer = Buffer.concat(buffers);
				let body = buffer.length > 0 ? buffer : undefined;
				let headers = await parseHeaders(incoming_message.rawHeaders);
				let status = incoming_message.statusCode || 0;
				let response = {
					body,
					headers,
					status
				};
				return resolve(response);
			});
		});
		client_request.on("error", (error) => {
			return reject(error);
		});
		if (request.body != null) {
			client_request.end(request.body);
		} else {
			client_request.end();
		}
	});
}

export {
	request
};
