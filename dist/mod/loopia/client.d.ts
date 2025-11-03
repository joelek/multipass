import * as autoguard from "@joelek/autoguard/dist/lib-server";
import * as dns from "../dns";
import * as objects from "./api/index";
import * as config from "./config";
export declare function makeClient(options?: autoguard.api.ClientOptions): {
    getDomains: (request: objects.getDomainsRequest) => Promise<{
        parameters: [autoguard.guards.Array<{
            domain: string;
            paid: boolean;
            registered: boolean;
            reference_no: number;
            renewal_status: "NORMAL" | "DEACTIVATED" | "NOT_HANDLED_BY_LOOPIA";
            expiration_date: string;
        }>];
    }>;
    getSubdomains: (request: objects.getSubdomainsRequest) => Promise<{
        parameters: [autoguard.guards.Array<string>];
    }>;
    addSubdomain: (request: objects.addSubdomainRequest) => Promise<{
        parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
    }>;
    removeSubdomain: (request: objects.removeSubdomainRequest) => Promise<{
        parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
    }>;
    updateZoneRecord: (request: objects.updateZoneRecordRequest) => Promise<{
        parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
    }>;
    getZoneRecords: (request: objects.getZoneRecordsRequest) => Promise<{
        parameters: [autoguard.guards.Array<{
            type: string;
            ttl: number;
            priority: number;
            rdata: string;
            record_id: number;
        }>];
    }>;
    addZoneRecord: (request: objects.addZoneRecordRequest) => Promise<{
        parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
    }>;
    removeZoneRecord: (request: objects.removeZoneRecordRequest) => Promise<{
        parameters: ["OK" | "AUTH_ERROR" | "DOMAIN_OCCUPIED" | "RATE_LIMITED" | "BAD_INDATA" | "UNKNOWN_ERROR" | "INSUFFICIENT_FUNDS"];
    }>;
};
export declare function makeStandardClient(config: config.Config, options?: autoguard.api.ClientOptions): Promise<dns.Client>;
