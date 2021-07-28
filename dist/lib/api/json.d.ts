/// <reference types="node" />
import * as $messages from "./messages";
declare type JSON = boolean | null | number | string | JSON[] | {
    [key: string]: JSON;
};
interface Parser<A> {
    (subject: $messages.Response<JSON>): A;
}
declare function request<A>(request: $messages.Request<Buffer | JSON>, parser: Parser<A>): Promise<$messages.Response<JSON> & A>;
export { request };
