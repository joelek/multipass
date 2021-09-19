export interface Undoable {
	undo(): Promise<void>;
};

export interface Client {
	listDomains(): Promise<Array<string>>;
	provisionTextRecord(details: { domain: string, subdomain: string, content: string }): Promise<Undoable>;
};
