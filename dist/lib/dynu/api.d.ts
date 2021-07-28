import * as $messages from "./messages";
declare class Implementation {
    private api_key;
    constructor(api_key: string);
    getDomains(): Promise<$messages.GetDomainsResponse>;
    getDomainFromHostname(hostname: string): Promise<$messages.Domain>;
    getRecords(domain: $messages.Domain): Promise<$messages.GetRecordsResponse>;
    createRecord(record: $messages.Record): Promise<$messages.CreateRecordResponse>;
    deleteRecord(record: $messages.Record): Promise<$messages.DeleteRecordResponse>;
    updateRecord(record: $messages.Record): Promise<$messages.UpdateRecordResponse>;
}
declare function getImplementation(api_key: string): Promise<Implementation>;
export { getImplementation };
