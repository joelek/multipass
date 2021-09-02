// This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.

import * as autoguard from "@joelek/ts-autoguard/dist/lib-shared";

export const Domain: autoguard.serialization.MessageGuard<Domain> = autoguard.guards.Object.of({
	"id": autoguard.guards.Number,
	"name": autoguard.guards.String
}, {});

export type Domain = autoguard.guards.Object<{
	"id": autoguard.guards.Number,
	"name": autoguard.guards.String
}, {}>;

export const DomainRecordStubGeneric: autoguard.serialization.MessageGuard<DomainRecordStubGeneric> = autoguard.guards.Object.of({
	"nodeName": autoguard.guards.String,
	"recordType": autoguard.guards.String
}, {});

export type DomainRecordStubGeneric = autoguard.guards.Object<{
	"nodeName": autoguard.guards.String,
	"recordType": autoguard.guards.String
}, {}>;

export const DomainRecordStubTXT: autoguard.serialization.MessageGuard<DomainRecordStubTXT> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => DomainRecordStubGeneric),
	autoguard.guards.Object.of({
		"recordType": autoguard.guards.StringLiteral.of("TXT"),
		"textData": autoguard.guards.String
	}, {})
);

export type DomainRecordStubTXT = autoguard.guards.Intersection<[
	autoguard.guards.Reference<DomainRecordStubGeneric>,
	autoguard.guards.Object<{
		"recordType": autoguard.guards.StringLiteral<"TXT">,
		"textData": autoguard.guards.String
	}, {}>
]>;

export const DomainRecordStub: autoguard.serialization.MessageGuard<DomainRecordStub> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => DomainRecordStubGeneric),
	autoguard.guards.Reference.of(() => DomainRecordStubTXT)
);

export type DomainRecordStub = autoguard.guards.Union<[
	autoguard.guards.Reference<DomainRecordStubGeneric>,
	autoguard.guards.Reference<DomainRecordStubTXT>
]>;

export const DomainRecordBase: autoguard.serialization.MessageGuard<DomainRecordBase> = autoguard.guards.Object.of({
	"id": autoguard.guards.Number,
	"domainId": autoguard.guards.Number
}, {});

export type DomainRecordBase = autoguard.guards.Object<{
	"id": autoguard.guards.Number,
	"domainId": autoguard.guards.Number
}, {}>;

export const DomainRecordGeneric: autoguard.serialization.MessageGuard<DomainRecordGeneric> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => DomainRecordBase),
	autoguard.guards.Reference.of(() => DomainRecordStubGeneric)
);

export type DomainRecordGeneric = autoguard.guards.Intersection<[
	autoguard.guards.Reference<DomainRecordBase>,
	autoguard.guards.Reference<DomainRecordStubGeneric>
]>;

export const DomainRecordTXT: autoguard.serialization.MessageGuard<DomainRecordTXT> = autoguard.guards.Intersection.of(
	autoguard.guards.Reference.of(() => DomainRecordBase),
	autoguard.guards.Reference.of(() => DomainRecordStubTXT)
);

export type DomainRecordTXT = autoguard.guards.Intersection<[
	autoguard.guards.Reference<DomainRecordBase>,
	autoguard.guards.Reference<DomainRecordStubTXT>
]>;

export const DomainRecord: autoguard.serialization.MessageGuard<DomainRecord> = autoguard.guards.Union.of(
	autoguard.guards.Reference.of(() => DomainRecordGeneric),
	autoguard.guards.Reference.of(() => DomainRecordTXT)
);

export type DomainRecord = autoguard.guards.Union<[
	autoguard.guards.Reference<DomainRecordGeneric>,
	autoguard.guards.Reference<DomainRecordTXT>
]>;

export namespace Autoguard {
	export const Guards = {
		"Domain": autoguard.guards.Reference.of(() => Domain),
		"DomainRecordStubGeneric": autoguard.guards.Reference.of(() => DomainRecordStubGeneric),
		"DomainRecordStubTXT": autoguard.guards.Reference.of(() => DomainRecordStubTXT),
		"DomainRecordStub": autoguard.guards.Reference.of(() => DomainRecordStub),
		"DomainRecordBase": autoguard.guards.Reference.of(() => DomainRecordBase),
		"DomainRecordGeneric": autoguard.guards.Reference.of(() => DomainRecordGeneric),
		"DomainRecordTXT": autoguard.guards.Reference.of(() => DomainRecordTXT),
		"DomainRecord": autoguard.guards.Reference.of(() => DomainRecord)
	};

	export type Guards = { [A in keyof typeof Guards]: ReturnType<typeof Guards[A]["as"]>; };

	export const Requests = {
		"listDomains": autoguard.guards.Object.of({}, {
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Options
			),
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			),
			"payload": autoguard.api.Binary
		}),
		"listDomainRecords": autoguard.guards.Object.of({
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({
					"domainid": autoguard.guards.Number
				}, {}),
				autoguard.api.Options
			)
		}, {
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			),
			"payload": autoguard.api.Binary
		}),
		"createDomainRecord": autoguard.guards.Object.of({
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({
					"domainid": autoguard.guards.Number
				}, {}),
				autoguard.api.Options
			),
			"payload": autoguard.guards.Reference.of(() => DomainRecordStub)
		}, {
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"updateDomainRecord": autoguard.guards.Object.of({
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({
					"domainid": autoguard.guards.Number,
					"recordid": autoguard.guards.Number
				}, {}),
				autoguard.api.Options
			),
			"payload": autoguard.guards.Reference.of(() => DomainRecordStub)
		}, {
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"deleteDomainRecord": autoguard.guards.Object.of({
			"options": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({
					"domainid": autoguard.guards.Number,
					"recordid": autoguard.guards.Number
				}, {}),
				autoguard.api.Options
			)
		}, {
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			),
			"payload": autoguard.api.Binary
		})
	};

	export type Requests = { [A in keyof typeof Requests]: ReturnType<typeof Requests[A]["as"]>; };

	export const Responses = {
		"listDomains": autoguard.guards.Object.of({
			"payload": autoguard.guards.Object.of({
				"domains": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => Domain))
			}, {})
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"listDomainRecords": autoguard.guards.Object.of({
			"payload": autoguard.guards.Object.of({
				"dnsRecords": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => DomainRecord))
			}, {})
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"createDomainRecord": autoguard.guards.Object.of({
			"payload": autoguard.guards.Reference.of(() => DomainRecord)
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"updateDomainRecord": autoguard.guards.Object.of({
			"payload": autoguard.guards.Reference.of(() => DomainRecord)
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		}),
		"deleteDomainRecord": autoguard.guards.Object.of({
			"payload": autoguard.guards.Object.of({}, {})
		}, {
			"status": autoguard.guards.Number,
			"headers": autoguard.guards.Intersection.of(
				autoguard.guards.Object.of({}, {}),
				autoguard.api.Headers
			)
		})
	};

	export type Responses = { [A in keyof typeof Responses]: ReturnType<typeof Responses[A]["as"]>; };
};
