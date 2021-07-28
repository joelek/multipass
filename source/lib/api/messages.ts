interface Headers {
	[key: string]: undefined | string[]
}

interface Request<A> {
	body?: A,
	headers?: Headers,
	method?: string,
	url: string
}

interface Response<A> {
	body?: A,
	headers: Headers,
	status: number
}

export {
	Headers,
	Request,
	Response
};
