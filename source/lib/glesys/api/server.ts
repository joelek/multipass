// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-server";
import * as shared from "./index";

export const makeServer = (routes: autoguard.api.Server<shared.Autoguard.Requests, shared.Autoguard.Responses>, serverOptions?: autoguard.api.MakeServerOptions): autoguard.api.RequestListener => {
	let endpoints = new Array<autoguard.api.Endpoint>();
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let matchers = new Array<autoguard.api.RouteMatcher>();
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("domain")));
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("list")));
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, matchers),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options: Record<string, autoguard.api.JSON> = {};
				options = { ...options, ...autoguard.api.decodeUndeclaredParameters(raw.parameters, Object.keys(options)) };
				let headers: Record<string, autoguard.api.JSON> = {};
				headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
				let payload = raw.payload;
				let guard = shared.Autoguard.Requests["listDomains"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["listDomains"](new autoguard.api.ClientRequest(request, true, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["listDomains"];
								guard.as(response, "response");
								let status = response.status ?? 200;
								let headers = new Array<[string, string]>();
								headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(response.headers ?? {}, headers.map((header) => header[0])));
								let payload = autoguard.api.serializePayload(response.payload);
								let defaultHeaders = serverOptions?.defaultHeaders?.slice() ?? [];
								defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
								return autoguard.api.finalizeResponse({ status, headers, payload }, defaultHeaders);
							}
						};
					}
				};
			}
		};
	});
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let matchers = new Array<autoguard.api.RouteMatcher>();
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("domain")));
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("listrecords")));
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, matchers),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options: Record<string, autoguard.api.JSON> = {};
				options = { ...options, ...autoguard.api.decodeUndeclaredParameters(raw.parameters, Object.keys(options)) };
				let headers: Record<string, autoguard.api.JSON> = {};
				headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
				let payload = await autoguard.api.deserializePayload(raw.payload);
				let guard = shared.Autoguard.Requests["listDomainRecords"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["listDomainRecords"](new autoguard.api.ClientRequest(request, false, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["listDomainRecords"];
								guard.as(response, "response");
								let status = response.status ?? 200;
								let headers = new Array<[string, string]>();
								headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(response.headers ?? {}, headers.map((header) => header[0])));
								let payload = autoguard.api.serializePayload(response.payload);
								let defaultHeaders = serverOptions?.defaultHeaders?.slice() ?? [];
								defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
								return autoguard.api.finalizeResponse({ status, headers, payload }, defaultHeaders);
							}
						};
					}
				};
			}
		};
	});
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let matchers = new Array<autoguard.api.RouteMatcher>();
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("domain")));
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("addrecord")));
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, matchers),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options: Record<string, autoguard.api.JSON> = {};
				options = { ...options, ...autoguard.api.decodeUndeclaredParameters(raw.parameters, Object.keys(options)) };
				let headers: Record<string, autoguard.api.JSON> = {};
				headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
				let payload = await autoguard.api.deserializePayload(raw.payload);
				let guard = shared.Autoguard.Requests["createDomainRecord"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["createDomainRecord"](new autoguard.api.ClientRequest(request, false, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["createDomainRecord"];
								guard.as(response, "response");
								let status = response.status ?? 200;
								let headers = new Array<[string, string]>();
								headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(response.headers ?? {}, headers.map((header) => header[0])));
								let payload = autoguard.api.serializePayload(response.payload);
								let defaultHeaders = serverOptions?.defaultHeaders?.slice() ?? [];
								defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
								return autoguard.api.finalizeResponse({ status, headers, payload }, defaultHeaders);
							}
						};
					}
				};
			}
		};
	});
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let matchers = new Array<autoguard.api.RouteMatcher>();
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("domain")));
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("updaterecord")));
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, matchers),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options: Record<string, autoguard.api.JSON> = {};
				options = { ...options, ...autoguard.api.decodeUndeclaredParameters(raw.parameters, Object.keys(options)) };
				let headers: Record<string, autoguard.api.JSON> = {};
				headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
				let payload = await autoguard.api.deserializePayload(raw.payload);
				let guard = shared.Autoguard.Requests["updateDomainRecord"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["updateDomainRecord"](new autoguard.api.ClientRequest(request, false, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["updateDomainRecord"];
								guard.as(response, "response");
								let status = response.status ?? 200;
								let headers = new Array<[string, string]>();
								headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(response.headers ?? {}, headers.map((header) => header[0])));
								let payload = autoguard.api.serializePayload(response.payload);
								let defaultHeaders = serverOptions?.defaultHeaders?.slice() ?? [];
								defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
								return autoguard.api.finalizeResponse({ status, headers, payload }, defaultHeaders);
							}
						};
					}
				};
			}
		};
	});
	endpoints.push((raw, auxillary) => {
		let method = "POST";
		let matchers = new Array<autoguard.api.RouteMatcher>();
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("domain")));
		matchers.push(new autoguard.api.StaticRouteMatcher(decodeURIComponent("deleterecord")));
		return {
			acceptsComponents: () => autoguard.api.acceptsComponents(raw.components, matchers),
			acceptsMethod: () => autoguard.api.acceptsMethod(raw.method, method),
			validateRequest: async () => {
				let options: Record<string, autoguard.api.JSON> = {};
				options = { ...options, ...autoguard.api.decodeUndeclaredParameters(raw.parameters, Object.keys(options)) };
				let headers: Record<string, autoguard.api.JSON> = {};
				headers = { ...headers, ...autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)) };
				let payload = await autoguard.api.deserializePayload(raw.payload);
				let guard = shared.Autoguard.Requests["deleteDomainRecord"];
				let request = guard.as({ options, headers, payload }, "request");
				return {
					handleRequest: async () => {
						let response = await routes["deleteDomainRecord"](new autoguard.api.ClientRequest(request, false, auxillary));
						return {
							validateResponse: async () => {
								let guard = shared.Autoguard.Responses["deleteDomainRecord"];
								guard.as(response, "response");
								let status = response.status ?? 200;
								let headers = new Array<[string, string]>();
								headers.push(...autoguard.api.encodeUndeclaredHeaderPairs(response.headers ?? {}, headers.map((header) => header[0])));
								let payload = autoguard.api.serializePayload(response.payload);
								let defaultHeaders = serverOptions?.defaultHeaders?.slice() ?? [];
								defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
								return autoguard.api.finalizeResponse({ status, headers, payload }, defaultHeaders);
							}
						};
					}
				};
			}
		};
	});
	return (request, response) => autoguard.api.route(endpoints, request, response, serverOptions);
};
