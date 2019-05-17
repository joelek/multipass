import * as acme from "./acme";
import * as dynu from "./dynu";

/*
sensitive:

account_key.pem
certificate_key.pem
full_chain.pem

user specifies directory in which to store certs

*/

type Options = {
	acme: acme.config.Config,
	dynu: dynu.config.Config
};

function watch(options: Options) {

}

export {
	watch
};
