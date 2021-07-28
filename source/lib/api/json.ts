import * as $buffer from "./buffer";
import * as $messages from "./messages";

type JSON = boolean | null | number | string | JSON[] | { [key: string]: JSON };

interface Parser<A> {
	(subject: $messages.Response<JSON>): A;
}

async function serializeBody(body?: Buffer | JSON): Promise<Buffer | undefined> {
	if (body === undefined) {
		return undefined;
	}
	if (body instanceof Buffer) {
		return body;
	}
	let string = JSON.stringify(body);
	return Buffer.from(string, "utf8");
}

async function parseBody(buffer?: Buffer): Promise<JSON | undefined> {
	if (buffer === undefined) {
		return undefined;
	}
	let string = buffer.toString("utf8");
	return JSON.parse(string);
}

async function request<A>(request: $messages.Request<Buffer | JSON>, parser: Parser<A>): Promise<$messages.Response<JSON> & A> {
	let buffer_response = await $buffer.request({
		...request,
		body: await serializeBody(request.body)
	});
	let response = {
		...buffer_response,
		body: await parseBody(buffer_response.body)
	};
	return {
		...response,
		...parser(response)
	};
}

export {
	request
};
