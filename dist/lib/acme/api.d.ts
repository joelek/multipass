/// <reference types="node" />
import * as $messages from "./messages";
declare class Implementation {
    private directory;
    constructor(directory: $messages.GetDirectoryResponse);
    newAccount(account_private_key: Buffer): Promise<$messages.NewAccountResponse>;
    newNonce(): Promise<$messages.NewNonceResponse>;
}
declare function getImplementation(directory_url: string): Promise<Implementation>;
export { getImplementation };
