/// <reference types="node" />
declare type Structure = {
    protected: string;
    payload: string;
    signature: string;
};
declare function sign(private_key: Buffer, protected_json: any, payload_json?: any): Promise<Structure>;
export { Structure, sign };
