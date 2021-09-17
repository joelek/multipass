import * as autoguard from "@joelek/ts-autoguard";

export const buffer: autoguard.serialization.MessageGuard<Buffer> = {
	as(subject: any, path: string = ""): Buffer {
		if (subject instanceof Buffer) {
			return subject;
		}
		throw new autoguard.serialization.MessageGuardError(this, subject, path);
	},
	is(subject: any, path: string = ""): subject is Buffer {
		try {
			this.as(subject);
		} catch (error) {
			return false;
		}
		return true;
	},
	ts(eol?: string): string {
		return "buffer";
	}
};

export type buffer = ReturnType<typeof buffer["as"]>;
