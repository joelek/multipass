/// <reference types="node" />
import * as $messages from "./messages";
declare function request(request: $messages.Request<Buffer>): Promise<$messages.Response<Buffer>>;
export { request };
