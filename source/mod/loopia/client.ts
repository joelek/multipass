import * as autoguard from "@joelek/autoguard/dist/lib-server";
import * as stdlib from "@joelek/stdlib";
import * as dns from "../dns";
import * as api from "./api/client";
import * as objects from "./api/index";
import * as config from "./config";

const URL_PREFIX = "https://api.loopia.se";

async function makeXMLRPCCall<
	A extends stdlib.data.xmlrpc.MethodCall,
	B extends stdlib.data.xmlrpc.MethodResponse
>(
	client: api.Client,
	methodCallGuard: autoguard.serialization.MessageGuard<A>,
	methodResponseGuard: autoguard.serialization.MessageGuard<B>,
	methodCall: A
): Promise<B> {
	let payload = stdlib.data.xml.xml.document(
		stdlib.data.xml.xml.declaration("1.0", "UTF-8", undefined),
		undefined,
		stdlib.data.xmlrpc.createMethodCall(methodCallGuard.as(methodCall))
	);
	let response = await client.sendRequest({
		payload: autoguard.api.serializeStringPayload(payload.serialize())
	})
	let string = await autoguard.api.deserializeStringPayload([await response.payload() ?? Uint8Array.of()]);
	let document = stdlib.data.xml.XMLDocument.parse(string);
	let methodResponse = stdlib.data.xmlrpc.parseMethodResponse(document.root);
	return methodResponseGuard.as(methodResponse);
};

export function makeClient(options?: autoguard.api.ClientOptions) {
	let client = api.makeClient({
		urlPrefix: URL_PREFIX,
		requestHandler: autoguard.api.makeNodeRequestHandler(),
		...options
	});
	return {
		getDomains: (request: objects.getDomainsRequest) => makeXMLRPCCall(client, objects.getDomainsRequest, objects.getDomainsResponse, request),
		getSubdomains: (request: objects.getSubdomainsRequest) => makeXMLRPCCall(client, objects.getSubdomainsRequest, objects.getSubdomainsResponse, request),
		addSubdomain: (request: objects.addSubdomainRequest) => makeXMLRPCCall(client, objects.addSubdomainRequest, objects.addSubdomainResponse, request),
		removeSubdomain: (request: objects.removeSubdomainRequest) => makeXMLRPCCall(client, objects.removeSubdomainRequest, objects.removeSubdomainResponse, request),
		updateZoneRecord: (request: objects.updateZoneRecordRequest) => makeXMLRPCCall(client, objects.updateZoneRecordRequest, objects.updateZoneRecordResponse, request),
		getZoneRecords: (request: objects.getZoneRecordsRequest) => makeXMLRPCCall(client, objects.getZoneRecordsRequest, objects.getZoneRecordsResponse, request),
		addZoneRecord: (request: objects.addZoneRecordRequest) => makeXMLRPCCall(client, objects.addZoneRecordRequest, objects.addZoneRecordResponse, request),
		removeZoneRecord: (request: objects.removeZoneRecordRequest) => makeXMLRPCCall(client, objects.removeZoneRecordRequest, objects.removeZoneRecordResponse, request)
	};
};

export async function makeStandardClient(config: config.Config, options?: autoguard.api.ClientOptions): Promise<dns.Client> {
	let client = makeClient(options);
	let domains = (await client.getDomains({
		methodName: "getDomains",
		parameters: [
			config.username,
			config.password,
			config.account ?? ""
		]
	})).parameters[0];
	return {
		async listDomains() {
			return domains.map((domain) => domain.domain);
		},
		async provisionTextRecord(details) {
			const domain = domains.find((domain) => domain.domain === details.domain);
			if (domain == null) {
				throw `Expected a domain!`;
			}
			let status = (await client.addZoneRecord({
				methodName: "addZoneRecord",
				parameters: [
					config.username,
					config.password,
					config.account ?? "",
					details.domain,
					details.subdomain || "@",
					{
						type: "TXT",
						ttl: 60,
						priority: 0,
						rdata: details.content,
						record_id: 0
					}
				]
			})).parameters[0];
			if (status !== "OK") {
				throw `Expected status "OK"!`;
			}
			let records = (await client.getZoneRecords({
				methodName: "getZoneRecords",
				parameters: [
					config.username,
					config.password,
					config.account ?? "",
					details.domain,
					details.subdomain || "@"
				]
			})).parameters[0];
			const record = records.find((record) => record.rdata === details.content);
			if (record == null) {
				throw `Expected a record!`;
			}
			return {
				async undo() {
					let status = (await client.removeZoneRecord({
						methodName: "removeZoneRecord",
						parameters: [
							config.username,
							config.password,
							config.account ?? "",
							details.domain,
							details.subdomain || "@",
							record.record_id
						]
					})).parameters[0];
					if (status !== "OK") {
						throw `Expected status "OK"!`;
					}
				}
			};
		}
	};
};
