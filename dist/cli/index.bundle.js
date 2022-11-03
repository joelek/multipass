#!/usr/bin/env node
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/serialization", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageSerializer = exports.MessageGuardError = exports.MessageGuardBase = void 0;
    ;
    class MessageGuardBase {
        constructor() { }
        is(subject, path) {
            try {
                this.as(subject, path);
                return true;
            }
            catch (error) {
                return false;
            }
        }
        decode(codec, buffer) {
            return this.as(codec.decode(buffer));
        }
        encode(codec, subject) {
            return codec.encode(this.as(subject));
        }
    }
    exports.MessageGuardBase = MessageGuardBase;
    ;
    class MessageGuardError {
        constructor(guard, subject, path) {
            this.guard = guard;
            this.subject = subject;
            this.path = path;
        }
        getSubjectType() {
            if (this.subject === null) {
                return "null";
            }
            if (this.subject instanceof Array) {
                return "array";
            }
            return typeof this.subject;
        }
        toString() {
            return `The type ${this.getSubjectType()} at ${this.path} is type-incompatible with the expected type: ${this.guard.ts()}`;
        }
    }
    exports.MessageGuardError = MessageGuardError;
    ;
    class MessageSerializer {
        constructor(guards) {
            this.guards = guards;
        }
        deserialize(string, cb) {
            let json = JSON.parse(string);
            if ((json != null) && (json.constructor === Object)) {
                if ((json.type != null) && (json.type.constructor === String)) {
                    let type = json.type;
                    let data = json.data;
                    let guard = this.guards[type];
                    if (guard === undefined) {
                        throw "Unknown message type \"" + String(type) + "\"!";
                    }
                    cb(type, guard.as(data));
                    return;
                }
            }
            throw "Invalid message envelope!";
        }
        serialize(type, data) {
            return JSON.stringify({
                type,
                data
            });
        }
    }
    exports.MessageSerializer = MessageSerializer;
    ;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/guards", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/serialization"], function (require, exports, serialization) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Union = exports.UnionGuard = exports.Undefined = exports.UndefinedGuard = exports.Tuple = exports.TupleGuard = exports.StringLiteral = exports.StringLiteralGuard = exports.String = exports.StringGuard = exports.Reference = exports.ReferenceGuard = exports.Record = exports.RecordGuard = exports.Object = exports.ObjectGuard = exports.NumberLiteral = exports.NumberLiteralGuard = exports.Number = exports.NumberGuard = exports.Null = exports.NullGuard = exports.Intersection = exports.IntersectionGuard = exports.Group = exports.GroupGuard = exports.BooleanLiteral = exports.BooleanLiteralGuard = exports.Boolean = exports.BooleanGuard = exports.Binary = exports.BinaryGuard = exports.BigInt = exports.BigIntGuard = exports.Array = exports.ArrayGuard = exports.Any = exports.AnyGuard = void 0;
    class AnyGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            return subject;
        }
        ts(eol = "\n") {
            return "any";
        }
    }
    exports.AnyGuard = AnyGuard;
    ;
    exports.Any = new AnyGuard();
    class ArrayGuard extends serialization.MessageGuardBase {
        constructor(guard) {
            super();
            this.guard = guard;
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Array)) {
                for (let i = 0; i < subject.length; i++) {
                    this.guard.as(subject[i], path + "[" + i + "]");
                }
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return `array<${this.guard.ts(eol)}>`;
        }
    }
    exports.ArrayGuard = ArrayGuard;
    ;
    exports.Array = {
        of(guard) {
            return new ArrayGuard(guard);
        }
    };
    class BigIntGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.BigInt)) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "bigint";
        }
    }
    exports.BigIntGuard = BigIntGuard;
    ;
    exports.BigInt = new BigIntGuard();
    class BinaryGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Uint8Array)) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "binary";
        }
    }
    exports.BinaryGuard = BinaryGuard;
    ;
    exports.Binary = new BinaryGuard();
    class BooleanGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Boolean)) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "boolean";
        }
    }
    exports.BooleanGuard = BooleanGuard;
    ;
    exports.Boolean = new BooleanGuard();
    class BooleanLiteralGuard extends serialization.MessageGuardBase {
        constructor(value) {
            super();
            this.value = value;
        }
        as(subject, path = "") {
            if (subject === this.value) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return `${this.value}`;
        }
    }
    exports.BooleanLiteralGuard = BooleanLiteralGuard;
    ;
    exports.BooleanLiteral = {
        of(value) {
            return new BooleanLiteralGuard(value);
        }
    };
    class GroupGuard extends serialization.MessageGuardBase {
        constructor(guard, name) {
            super();
            this.guard = guard;
            this.name = name;
        }
        as(subject, path = "") {
            return this.guard.as(subject, path);
        }
        ts(eol = "\n") {
            var _a;
            return (_a = this.name) !== null && _a !== void 0 ? _a : this.guard.ts(eol);
        }
    }
    exports.GroupGuard = GroupGuard;
    ;
    exports.Group = {
        of(guard, name) {
            return new GroupGuard(guard, name);
        }
    };
    class IntersectionGuard extends serialization.MessageGuardBase {
        constructor(...guards) {
            super();
            this.guards = guards;
        }
        as(subject, path = "") {
            for (let guard of this.guards) {
                guard.as(subject, path);
            }
            return subject;
        }
        ts(eol = "\n") {
            let lines = new globalThis.Array();
            for (let guard of this.guards) {
                lines.push("\t" + guard.ts(eol + "\t"));
            }
            return lines.length === 0 ? "intersection<>" : "intersection<" + eol + lines.join("," + eol) + eol + ">";
        }
    }
    exports.IntersectionGuard = IntersectionGuard;
    ;
    exports.Intersection = {
        of(...guards) {
            return new IntersectionGuard(...guards);
        }
    };
    class NullGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if (subject === null) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "null";
        }
    }
    exports.NullGuard = NullGuard;
    ;
    exports.Null = new NullGuard();
    class NumberGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Number)) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "number";
        }
    }
    exports.NumberGuard = NumberGuard;
    ;
    exports.Number = new NumberGuard();
    class NumberLiteralGuard extends serialization.MessageGuardBase {
        constructor(value) {
            super();
            this.value = value;
        }
        as(subject, path = "") {
            if (subject === this.value) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return `${this.value}`;
        }
    }
    exports.NumberLiteralGuard = NumberLiteralGuard;
    ;
    exports.NumberLiteral = {
        of(value) {
            return new NumberLiteralGuard(value);
        }
    };
    class ObjectGuard extends serialization.MessageGuardBase {
        constructor(required, optional) {
            super();
            this.required = required;
            this.optional = optional;
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Object)) {
                for (let key in this.required) {
                    this.required[key].as(subject[key], path + (/^([a-z][a-z0-9_]*)$/isu.test(key) ? "." + key : "[\"" + key + "\"]"));
                }
                for (let key in this.optional) {
                    if (key in subject && subject[key] !== undefined) {
                        this.optional[key].as(subject[key], path + (/^([a-z][a-z0-9_]*)$/isu.test(key) ? "." + key : "[\"" + key + "\"]"));
                    }
                }
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            let lines = new globalThis.Array();
            for (let [key, value] of globalThis.Object.entries(this.required)) {
                lines.push(`\t"${key}": ${value.ts(eol + "\t")}`);
            }
            for (let [key, value] of globalThis.Object.entries(this.optional)) {
                lines.push(`\t"${key}"?: ${value.ts(eol + "\t")}`);
            }
            return lines.length === 0 ? "object<>" : "object<" + eol + lines.join("," + eol) + eol + ">";
        }
    }
    exports.ObjectGuard = ObjectGuard;
    ;
    exports.Object = {
        of(required, optional = {}) {
            return new ObjectGuard(required, optional);
        }
    };
    class RecordGuard extends serialization.MessageGuardBase {
        constructor(guard) {
            super();
            this.guard = guard;
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Object)) {
                let wrapped = exports.Union.of(exports.Undefined, this.guard);
                for (let key of globalThis.Object.keys(subject)) {
                    wrapped.as(subject[key], path + "[\"" + key + "\"]");
                }
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return `record<${this.guard.ts(eol)}>`;
        }
    }
    exports.RecordGuard = RecordGuard;
    ;
    exports.Record = {
        of(guard) {
            return new RecordGuard(guard);
        }
    };
    class ReferenceGuard extends serialization.MessageGuardBase {
        constructor(guard) {
            super();
            this.guard = guard;
        }
        as(subject, path = "") {
            return this.guard().as(subject, path);
        }
        ts(eol = "\n") {
            return this.guard().ts(eol);
        }
    }
    exports.ReferenceGuard = ReferenceGuard;
    ;
    exports.Reference = {
        of(guard) {
            return new ReferenceGuard(guard);
        }
    };
    class StringGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.String)) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "string";
        }
    }
    exports.StringGuard = StringGuard;
    ;
    exports.String = new StringGuard();
    class StringLiteralGuard extends serialization.MessageGuardBase {
        constructor(value) {
            super();
            this.value = value;
        }
        as(subject, path = "") {
            if (subject === this.value) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return `"${this.value}"`;
        }
    }
    exports.StringLiteralGuard = StringLiteralGuard;
    ;
    exports.StringLiteral = {
        of(value) {
            return new StringLiteralGuard(value);
        }
    };
    class TupleGuard extends serialization.MessageGuardBase {
        constructor(...guards) {
            super();
            this.guards = guards;
        }
        as(subject, path = "") {
            if ((subject != null) && (subject.constructor === globalThis.Array)) {
                for (let i = 0; i < this.guards.length; i++) {
                    this.guards[i].as(subject[i], path + "[" + i + "]");
                }
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            let lines = new globalThis.Array();
            for (let guard of this.guards) {
                lines.push(`\t${guard.ts(eol + "\t")}`);
            }
            return lines.length === 0 ? "tuple<>" : "tuple<" + eol + lines.join("," + eol) + eol + ">";
        }
    }
    exports.TupleGuard = TupleGuard;
    ;
    exports.Tuple = {
        of(...guards) {
            return new TupleGuard(...guards);
        }
    };
    class UndefinedGuard extends serialization.MessageGuardBase {
        constructor() {
            super();
        }
        as(subject, path = "") {
            if (subject === undefined) {
                return subject;
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            return "undefined";
        }
    }
    exports.UndefinedGuard = UndefinedGuard;
    ;
    exports.Undefined = new UndefinedGuard();
    class UnionGuard extends serialization.MessageGuardBase {
        constructor(...guards) {
            super();
            this.guards = guards;
        }
        as(subject, path = "") {
            for (let guard of this.guards) {
                try {
                    return guard.as(subject, path);
                }
                catch (error) { }
            }
            throw new serialization.MessageGuardError(this, subject, path);
        }
        ts(eol = "\n") {
            let lines = new globalThis.Array();
            for (let guard of this.guards) {
                lines.push("\t" + guard.ts(eol + "\t"));
            }
            return lines.length === 0 ? "union<>" : "union<" + eol + lines.join("," + eol) + eol + ">";
        }
    }
    exports.UnionGuard = UnionGuard;
    ;
    exports.Union = {
        of(...guards) {
            return new UnionGuard(...guards);
        }
    };
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/api", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/guards"], function (require, exports, guards) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __asyncValues = (this && this.__asyncValues) || function (o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapMessageGuard = exports.deserializePayload = exports.deserializeStringPayload = exports.compareArrays = exports.serializePayload = exports.serializeStringPayload = exports.collectPayload = exports.deserializeValue = exports.serializeValue = exports.Headers = exports.Options = exports.JSON = exports.Primitive = exports.Binary = exports.SyncBinary = exports.AsyncBinary = exports.decodeUndeclaredHeaders = exports.decodeHeaderValue = exports.decodeHeaderValues = exports.decodeUndeclaredParameters = exports.decodeParameterValue = exports.decodeParameterValues = exports.encodeUndeclaredParameterPairs = exports.encodeParameterPairs = exports.escapeParameterValue = exports.escapeParameterKey = exports.encodeComponents = exports.escapeComponent = exports.encodeUndeclaredHeaderPairs = exports.encodeHeaderPairs = exports.escapeHeaderValue = exports.escapeHeaderKey = exports.splitHeaders = exports.combineParameters = exports.splitParameters = exports.combineComponents = exports.splitComponents = exports.decodeURIComponent = void 0;
    function decodeURIComponent(string) {
        try {
            return globalThis.decodeURIComponent(string);
        }
        catch (error) { }
    }
    exports.decodeURIComponent = decodeURIComponent;
    ;
    function splitComponents(url) {
        let components = new Array();
        for (let part of url.split("?")[0].split("/").slice(1)) {
            components.push(part);
        }
        return components;
    }
    exports.splitComponents = splitComponents;
    ;
    function combineComponents(components) {
        return "/" + components.join("/");
    }
    exports.combineComponents = combineComponents;
    ;
    function splitParameters(url) {
        let parameters = new Array();
        let query = url.split("?").slice(1).join("?");
        if (query !== "") {
            for (let part of query.split("&")) {
                let parts = part.split("=");
                if (parts.length === 1) {
                    let key = parts[0];
                    let value = "";
                    parameters.push([key, value]);
                }
                else {
                    let key = parts[0];
                    let value = parts.slice(1).join("=");
                    parameters.push([key, value]);
                }
            }
        }
        return parameters;
    }
    exports.splitParameters = splitParameters;
    ;
    function combineParameters(parameters) {
        let parts = parameters.map((parameters) => {
            let key = parameters[0];
            let value = parameters[1];
            return `${key}=${value}`;
        });
        if (parts.length === 0) {
            return "";
        }
        return `?${parts.join("&")}`;
    }
    exports.combineParameters = combineParameters;
    ;
    function splitHeaders(lines) {
        return lines.map((part) => {
            let parts = part.split(":");
            if (parts.length === 1) {
                let key = parts[0].toLowerCase();
                let value = "";
                return [key, value];
            }
            else {
                let key = parts[0].toLowerCase();
                let value = parts.slice(1).join(":").trim();
                return [key, value];
            }
        });
    }
    exports.splitHeaders = splitHeaders;
    ;
    const RFC7320_DELIMITERS = "\"(),/:;<=>?@[\\]{}";
    const RFC7320_WHITESPACE = "\t ";
    // The specification (rfc7320) allows octets 33-126 and forbids delimiters. Octets 128-255 have been deprecated since rfc2616.
    function escapeHeaderKey(string, alwaysEncode = "") {
        return escapeHeaderValue(string, RFC7320_DELIMITERS + RFC7320_WHITESPACE + alwaysEncode);
    }
    exports.escapeHeaderKey = escapeHeaderKey;
    ;
    // The specification (rfc7320) allows octets 33-126 and whitespace. Octets 128-255 have been deprecated since rfc2616.
    function escapeHeaderValue(string, alwaysEncode = "") {
        return [...string]
            .map((codePointString) => {
            var _a;
            if (!alwaysEncode.includes(codePointString) && codePointString !== "%") {
                let codePoint = (_a = codePointString.codePointAt(0)) !== null && _a !== void 0 ? _a : 0;
                if (codePoint >= 33 && codePoint <= 126) {
                    return codePointString;
                }
                if (RFC7320_WHITESPACE.includes(codePointString)) {
                    return codePointString;
                }
            }
            return encodeURIComponent(codePointString);
        })
            .join("");
    }
    exports.escapeHeaderValue = escapeHeaderValue;
    ;
    function encodeHeaderPairs(key, values, plain) {
        let pairs = new Array();
        for (let value of values) {
            let serialized = serializeValue(value, plain);
            if (serialized !== undefined) {
                if (plain) {
                    pairs.push([
                        escapeHeaderKey(key),
                        escapeHeaderValue(serialized)
                    ]);
                }
                else {
                    pairs.push([
                        escapeHeaderKey(key),
                        escapeHeaderKey(serialized)
                    ]);
                }
            }
        }
        return pairs;
    }
    exports.encodeHeaderPairs = encodeHeaderPairs;
    ;
    function encodeUndeclaredHeaderPairs(record, exclude) {
        let pairs = new Array();
        for (let [key, value] of Object.entries(record)) {
            if (!exclude.includes(key) && value !== undefined) {
                if (guards.String.is(value)) {
                    pairs.push(...encodeHeaderPairs(key, [value], true));
                }
                else if (guards.Array.of(guards.String).is(value)) {
                    pairs.push(...encodeHeaderPairs(key, value, true));
                }
                else {
                    throw `Expected type of undeclared header "${key}" to be string or string[]!`;
                }
            }
        }
        return pairs;
    }
    exports.encodeUndeclaredHeaderPairs = encodeUndeclaredHeaderPairs;
    ;
    function escapeComponent(string) {
        return encodeURIComponent(string);
    }
    exports.escapeComponent = escapeComponent;
    ;
    function encodeComponents(values, plain) {
        let array = new Array();
        for (let value of values) {
            let serialized = serializeValue(value, plain);
            if (serialized !== undefined) {
                array.push(escapeComponent(serialized));
            }
        }
        return array;
    }
    exports.encodeComponents = encodeComponents;
    ;
    function escapeParameterKey(string) {
        return encodeURIComponent(string);
    }
    exports.escapeParameterKey = escapeParameterKey;
    ;
    function escapeParameterValue(string) {
        return encodeURIComponent(string);
    }
    exports.escapeParameterValue = escapeParameterValue;
    ;
    function encodeParameterPairs(key, values, plain) {
        let pairs = new Array();
        for (let value of values) {
            let serialized = serializeValue(value, plain);
            if (serialized !== undefined) {
                pairs.push([
                    escapeParameterKey(key),
                    escapeParameterValue(serialized)
                ]);
            }
        }
        return pairs;
    }
    exports.encodeParameterPairs = encodeParameterPairs;
    ;
    function encodeUndeclaredParameterPairs(record, exclude) {
        let pairs = new Array();
        for (let [key, value] of Object.entries(record)) {
            if (!exclude.includes(key) && value !== undefined) {
                if (guards.String.is(value)) {
                    pairs.push(...encodeParameterPairs(key, [value], true));
                }
                else if (guards.Array.of(guards.String).is(value)) {
                    pairs.push(...encodeParameterPairs(key, value, true));
                }
                else {
                    throw `Expected type of undeclared parameter "${key}" to be string or string[]!`;
                }
            }
        }
        return pairs;
    }
    exports.encodeUndeclaredParameterPairs = encodeUndeclaredParameterPairs;
    ;
    function decodeParameterValues(pairs, key, plain) {
        let values = new Array();
        for (let pair of pairs) {
            if (key === decodeURIComponent(pair[0])) {
                let parts = pair[1].split(",");
                for (let part of parts) {
                    let value = deserializeValue(decodeURIComponent(part), plain);
                    if (value === undefined) {
                        throw `Expected parameter "${key}" to be properly encoded!`;
                    }
                    values.push(value);
                }
            }
        }
        return values;
    }
    exports.decodeParameterValues = decodeParameterValues;
    ;
    function decodeParameterValue(pairs, key, plain) {
        let values = decodeParameterValues(pairs, key, plain);
        if (values.length > 1) {
            throw `Expected no more than one "${key}" parameter!`;
        }
        return values[0];
    }
    exports.decodeParameterValue = decodeParameterValue;
    ;
    function decodeUndeclaredParameters(pairs, exclude) {
        let map = {};
        for (let pair of pairs) {
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1]);
            if (key === undefined || value === undefined) {
                throw `Expected undeclared parameter "${key}" to be properly encoded!`;
            }
            if (!exclude.includes(key)) {
                let values = map[key];
                if (values === undefined) {
                    values = new Array();
                    map[key] = values;
                }
                values.push(value);
            }
        }
        let record = {};
        for (let [key, value] of Object.entries(map)) {
            if (value.length === 1) {
                record[key] = value[0];
            }
            else {
                record[key] = value;
            }
        }
        return record;
    }
    exports.decodeUndeclaredParameters = decodeUndeclaredParameters;
    ;
    function decodeHeaderValues(pairs, key, plain) {
        let values = new Array();
        for (let pair of pairs) {
            if (key === decodeURIComponent(pair[0])) {
                let parts = pair[1].split(",");
                for (let part of parts) {
                    let value = deserializeValue(decodeURIComponent(part.trim()), plain);
                    if (value === undefined) {
                        throw `Expected header "${key}" to be properly encoded!`;
                    }
                    values.push(value);
                }
            }
        }
        return values;
    }
    exports.decodeHeaderValues = decodeHeaderValues;
    ;
    function decodeHeaderValue(pairs, key, plain) {
        let values = decodeHeaderValues(pairs, key, plain);
        if (values.length > 1) {
            throw `Expected no more than one "${key}" header!`;
        }
        return values[0];
    }
    exports.decodeHeaderValue = decodeHeaderValue;
    ;
    function decodeUndeclaredHeaders(pairs, exclude) {
        let map = {};
        for (let pair of pairs) {
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1]);
            if (key === undefined || value === undefined) {
                throw `Expected undeclared header "${key}" to be properly encoded!`;
            }
            if (!exclude.includes(key)) {
                let values = map[key];
                if (values === undefined) {
                    values = new Array();
                    map[key] = values;
                }
                values.push(value);
            }
        }
        let record = {};
        for (let [key, value] of Object.entries(map)) {
            if (value.length === 1) {
                record[key] = value[0];
            }
            else {
                record[key] = value;
            }
        }
        return record;
    }
    exports.decodeUndeclaredHeaders = decodeUndeclaredHeaders;
    ;
    exports.AsyncBinary = {
        as(subject, path = "") {
            if (subject != null) {
                let member = subject[Symbol.asyncIterator];
                if (member != null && member.constructor === globalThis.Function) {
                    return subject;
                }
            }
            throw "Expected AsyncBinary at " + path + "!";
        },
        is(subject) {
            try {
                this.as(subject);
            }
            catch (error) {
                return false;
            }
            return true;
        },
        ts(eol = "\n") {
            return `AsyncBinary`;
        }
    };
    exports.SyncBinary = {
        as(subject, path = "") {
            if (subject != null) {
                let member = subject[Symbol.iterator];
                if (member != null && member.constructor === globalThis.Function) {
                    return subject;
                }
            }
            throw "Expected SyncBinary at " + path + "!";
        },
        is(subject) {
            try {
                this.as(subject);
            }
            catch (error) {
                return false;
            }
            return true;
        },
        ts(eol = "\n") {
            return `SyncBinary`;
        }
    };
    exports.Binary = guards.Union.of(exports.AsyncBinary, exports.SyncBinary);
    exports.Primitive = guards.Union.of(guards.Boolean, guards.Number, guards.String, guards.Undefined);
    exports.JSON = guards.Group.of(guards.Union.of(guards.Boolean, guards.Null, guards.Number, guards.String, guards.Array.of(guards.Reference.of(() => exports.JSON)), guards.Record.of(guards.Reference.of(() => exports.JSON)), guards.Undefined), "JSON");
    exports.Options = guards.Record.of(exports.JSON);
    exports.Headers = guards.Record.of(exports.JSON);
    function serializeValue(value, plain) {
        if (value === undefined) {
            return;
        }
        return plain ? String(value) : globalThis.JSON.stringify(value);
    }
    exports.serializeValue = serializeValue;
    ;
    function deserializeValue(value, plain) {
        if (value === undefined || plain) {
            return value;
        }
        try {
            return globalThis.JSON.parse(value);
        }
        catch (error) { }
    }
    exports.deserializeValue = deserializeValue;
    ;
    function collectPayload(binary) {
        var binary_1, binary_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let chunks = new Array();
            let length = 0;
            try {
                for (binary_1 = __asyncValues(binary); binary_1_1 = yield binary_1.next(), !binary_1_1.done;) {
                    let chunk = binary_1_1.value;
                    chunks.push(chunk);
                    length += chunk.length;
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (binary_1_1 && !binary_1_1.done && (_a = binary_1.return))
                        yield _a.call(binary_1);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            let payload = new Uint8Array(length);
            let offset = 0;
            for (let chunk of chunks) {
                payload.set(chunk, offset);
                offset += chunk.length;
            }
            return payload;
        });
    }
    exports.collectPayload = collectPayload;
    ;
    function serializeStringPayload(string) {
        // @ts-ignore
        let encoder = new TextEncoder();
        let array = encoder.encode(string);
        return [array];
    }
    exports.serializeStringPayload = serializeStringPayload;
    ;
    function serializePayload(payload) {
        let serialized = serializeValue(payload, false);
        if (serialized === undefined) {
            return [];
        }
        return serializeStringPayload(serialized);
    }
    exports.serializePayload = serializePayload;
    ;
    function compareArrays(one, two) {
        if (one.length !== two.length) {
            return false;
        }
        for (let i = 0; i < one.length; i++) {
            if (one[i] !== two[i]) {
                return false;
            }
        }
        return true;
    }
    exports.compareArrays = compareArrays;
    ;
    function deserializeStringPayload(binary) {
        return __awaiter(this, void 0, void 0, function* () {
            let buffer = yield collectPayload(binary);
            // @ts-ignore
            let decoder = new TextDecoder();
            let string = decoder.decode(buffer);
            // @ts-ignore
            let encoder = new TextEncoder();
            let encoded = encoder.encode(string);
            if (!compareArrays(buffer, encoded)) {
                throw `Expected payload to be UTF-8 encoded!`;
            }
            return string;
        });
    }
    exports.deserializeStringPayload = deserializeStringPayload;
    ;
    function deserializePayload(binary) {
        return __awaiter(this, void 0, void 0, function* () {
            let string = yield deserializeStringPayload(binary);
            if (string === "") {
                return;
            }
            let value = deserializeValue(string, false);
            if (value === undefined) {
                throw `Expected payload to be JSON encoded!`;
            }
            return value;
        });
    }
    exports.deserializePayload = deserializePayload;
    ;
    function wrapMessageGuard(guard, log) {
        return Object.assign(Object.assign({}, guard), { as(subject, path) {
                if (log) {
                    console.log(subject);
                }
                return guard.as(subject, path);
            } });
    }
    exports.wrapMessageGuard = wrapMessageGuard;
    ;
});
define("node_modules/@joelek/bedrock/dist/lib/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VarLength = exports.VarInteger = exports.VarCategory = exports.Chunk = exports.IntegerAssert = exports.Parser = void 0;
    class Parser {
        buffer;
        offset;
        constructor(buffer, offset) {
            this.buffer = buffer;
            this.offset = offset ?? 0;
        }
        chunk(length) {
            length = length ?? this.buffer.length - this.offset;
            if (this.offset + length > this.buffer.length) {
                throw `Expected to read at least ${length} bytes!`;
            }
            let buffer = this.buffer.slice(this.offset, this.offset + length);
            this.offset += length;
            return buffer;
        }
        eof() {
            return this.offset >= this.buffer.length;
        }
        signed(length, endian) {
            let value = this.unsigned(length, endian);
            let bias = 2 ** (length * 8 - 1);
            if (value >= bias) {
                value -= bias + bias;
            }
            return value;
        }
        try(supplier) {
            let offset = this.offset;
            try {
                return supplier(this);
            }
            catch (error) {
                this.offset = offset;
                throw error;
            }
        }
        tryArray(suppliers) {
            let offset = this.offset;
            for (let supplier of suppliers) {
                try {
                    return supplier(this);
                }
                catch (error) {
                    this.offset = offset;
                }
            }
            throw `Expected one supplier to succeed!`;
        }
        unsigned(length, endian) {
            IntegerAssert.between(1, length, 6);
            if (this.offset + length > this.buffer.length) {
                throw `Expected to read at least ${length} bytes!`;
            }
            if (endian === "little") {
                let value = 0;
                for (let i = length - 1; i >= 0; i--) {
                    value *= 256;
                    value += this.buffer[this.offset + i];
                }
                this.offset += length;
                return value;
            }
            else {
                let value = 0;
                for (let i = 0; i < length; i++) {
                    value *= 256;
                    value += this.buffer[this.offset + i];
                }
                this.offset += length;
                return value;
            }
        }
    }
    exports.Parser = Parser;
    ;
    class IntegerAssert {
        constructor() { }
        static atLeast(min, value) {
            this.integer(min);
            this.integer(value);
            if (value < min) {
                throw `Expected ${value} to be at least ${min}!`;
            }
            return value;
        }
        static atMost(max, value) {
            this.integer(value);
            this.integer(max);
            if (value > max) {
                throw `Expected ${value} to be at most ${max}!`;
            }
            return value;
        }
        static between(min, value, max) {
            this.integer(min);
            this.integer(value);
            this.integer(max);
            if (value < min || value > max) {
                throw `Expected ${value} to be between ${min} and ${max}!`;
            }
            return value;
        }
        static exactly(value, expected) {
            this.integer(expected);
            this.integer(value);
            if (value !== expected) {
                throw `Expected ${value} to be exactly ${expected}!`;
            }
            return value;
        }
        static integer(value) {
            if (!Number.isInteger(value)) {
                throw `Expected ${value} to be an integer!`;
            }
            return value;
        }
    }
    exports.IntegerAssert = IntegerAssert;
    ;
    class Chunk {
        constructor() { }
        static fromString(string, encoding) {
            if (encoding === "binary") {
                let bytes = new Array();
                for (let i = 0; i < string.length; i += 1) {
                    let byte = string.charCodeAt(i);
                    bytes.push(byte);
                }
                return Uint8Array.from(bytes);
            }
            if (encoding === "base64") {
                return Chunk.fromString(atob(string), "binary");
            }
            if (encoding === "base64url") {
                return Chunk.fromString(string.replaceAll("-", "+").replaceAll("_", "/"), "base64");
            }
            if (encoding === "hex") {
                if (string.length % 2 === 1) {
                    string = `0${string}`;
                }
                let bytes = new Array();
                for (let i = 0; i < string.length; i += 2) {
                    let part = string.slice(i, i + 2);
                    let byte = Number.parseInt(part, 16);
                    bytes.push(byte);
                }
                return Uint8Array.from(bytes);
            }
            // @ts-ignore
            return new TextEncoder().encode(string);
        }
        static toString(chunk, encoding) {
            if (encoding === "binary") {
                let parts = new Array();
                for (let byte of chunk) {
                    let part = String.fromCharCode(byte);
                    parts.push(part);
                }
                return parts.join("");
            }
            if (encoding === "base64") {
                return btoa(Chunk.toString(chunk, "binary"));
            }
            if (encoding === "base64url") {
                return Chunk.toString(chunk, "base64").replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
            }
            if (encoding === "hex") {
                let parts = new Array();
                for (let byte of chunk) {
                    let part = byte.toString(16).toUpperCase().padStart(2, "0");
                    parts.push(part);
                }
                return parts.join("");
            }
            // @ts-ignore
            return new TextDecoder().decode(chunk);
        }
        static equals(one, two) {
            return this.comparePrefixes(one, two) === 0;
        }
        static comparePrefixes(one, two) {
            for (let i = 0; i < Math.min(one.length, two.length); i++) {
                let a = one[i];
                let b = two[i];
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
            }
            if (one.length < two.length) {
                return -1;
            }
            if (one.length > two.length) {
                return 1;
            }
            return 0;
        }
        static concat(buffers) {
            let length = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
            let result = new Uint8Array(length);
            let offset = 0;
            for (let buffer of buffers) {
                result.set(buffer, offset);
                offset += buffer.length;
            }
            return result;
        }
    }
    exports.Chunk = Chunk;
    ;
    class VarCategory {
        constructor() { }
        static decode(parser, maxBytes = 8) {
            parser = parser instanceof Parser ? parser : new Parser(parser);
            return parser.try((parser) => {
                let value = 0;
                for (let i = 0; i < maxBytes; i++) {
                    let byte = parser.unsigned(1);
                    let asis = (byte >> 7) & 0x01;
                    let cont = (byte >> 6) & 0x01;
                    if (asis === 0) {
                        let bits = ~byte & 0x3F;
                        value = value + bits;
                        if (cont === 1) {
                            value = value + 1;
                            value = 0 - value;
                            return value;
                        }
                        if (i === 0 && bits === 0) {
                            throw `Expected a distinguished encoding!`;
                        }
                    }
                    else {
                        let bits = byte & 0x3F;
                        value = value + bits;
                        if (cont === 0) {
                            return value;
                        }
                        if (i === 0 && bits === 0) {
                            throw `Expected a distinguished encoding!`;
                        }
                    }
                }
                throw `Expected to decode at most ${maxBytes} bytes!`;
            });
        }
        ;
        static encode(value, maxBytes = 8) {
            IntegerAssert.integer(value);
            let bytes = new Array();
            if (value >= 0) {
                do {
                    let bits = value > 63 ? 63 : value;
                    value = value - bits;
                    bytes.push(128 + bits);
                } while (value > 0);
                for (let i = 0; i < bytes.length - 1; i++) {
                    bytes[i] += 64;
                }
            }
            else {
                value = 0 - value;
                value = value - 1;
                do {
                    let bits = value > 63 ? 63 : value;
                    value = value - bits;
                    bytes.push(~bits & 0x3F);
                } while (value > 0);
                bytes[bytes.length - 1] += 64;
            }
            if (bytes.length > maxBytes) {
                throw `Expected to encode at most ${maxBytes} bytes!`;
            }
            return Uint8Array.from(bytes);
        }
        ;
    }
    exports.VarCategory = VarCategory;
    ;
    class VarInteger {
        constructor() { }
        static decode(parser, maxBytes = 8) {
            parser = parser instanceof Parser ? parser : new Parser(parser);
            return parser.try((parser) => {
                let value = 0;
                for (let i = 0; i < maxBytes; i++) {
                    let byte = parser.unsigned(1);
                    let asis = (byte >> 7) & 0x01;
                    let cont = (byte >> 6) & 0x01;
                    if (asis === 0) {
                        let bits = ~byte & 0x3F;
                        value = (value * 64) + bits;
                        if (cont === 1) {
                            value = value + 1;
                            value = 0 - value;
                            return value;
                        }
                        if (i === 0 && bits === 0) {
                            throw `Expected a distinguished encoding!`;
                        }
                    }
                    else {
                        let bits = byte & 0x3F;
                        value = (value * 64) + bits;
                        if (cont === 0) {
                            return value;
                        }
                        if (i === 0 && bits === 0) {
                            throw `Expected a distinguished encoding!`;
                        }
                    }
                }
                throw `Expected to decode at most ${maxBytes} bytes!`;
            });
        }
        ;
        static encode(value, maxBytes = 8) {
            IntegerAssert.integer(value);
            let bytes = new Array();
            if (value >= 0) {
                do {
                    let bits = value % 64;
                    value = Math.floor(value / 64);
                    bytes.push(128 + bits);
                } while (value > 0);
                bytes.reverse();
                for (let i = 0; i < bytes.length - 1; i++) {
                    bytes[i] += 64;
                }
            }
            else {
                value = 0 - value;
                value = value - 1;
                do {
                    let bits = value % 64;
                    value = Math.floor(value / 64);
                    bytes.push(128 + ~bits & 0x3F);
                } while (value > 0);
                bytes.reverse();
                bytes[bytes.length - 1] += 64;
            }
            if (bytes.length > maxBytes) {
                throw `Expected to encode at most ${maxBytes} bytes!`;
            }
            return Uint8Array.from(bytes);
        }
        ;
    }
    exports.VarInteger = VarInteger;
    ;
    class VarLength {
        constructor() { }
        static decode(parser, maxBytes = 8) {
            parser = parser instanceof Parser ? parser : new Parser(parser);
            return parser.try((parser) => {
                let value = 0;
                for (let i = 0; i < maxBytes; i++) {
                    let byte = parser.unsigned(1);
                    let cont = (byte >> 7) & 0x01;
                    let bits = (byte >> 0) & 0x7F;
                    value = (value * 128) + bits;
                    if (cont === 0) {
                        return value;
                    }
                    if (i === 0 && bits === 0) {
                        throw `Expected a distinguished encoding!`;
                    }
                }
                throw `Expected to decode at most ${maxBytes} bytes!`;
            });
        }
        ;
        static encode(value, maxBytes = 8) {
            IntegerAssert.atLeast(0, value);
            let bytes = new Array();
            do {
                let bits = value % 128;
                value = Math.floor(value / 128);
                bytes.push(bits);
            } while (value > 0);
            bytes.reverse();
            for (let i = 0; i < bytes.length - 1; i++) {
                bytes[i] += 128;
            }
            if (bytes.length > maxBytes) {
                throw `Expected to encode at most ${maxBytes} bytes!`;
            }
            return Uint8Array.from(bytes);
        }
        ;
    }
    exports.VarLength = VarLength;
    ;
});
define("node_modules/@joelek/bedrock/dist/lib/codecs", ["require", "exports", "node_modules/@joelek/bedrock/dist/lib/utils"], function (require, exports, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BooleanLiteral = exports.BooleanLiteralCodec = exports.BigIntLiteral = exports.BigIntLiteralCodec = exports.NumberLiteral = exports.NumberLiteralCodec = exports.StringLiteral = exports.StringLiteralCodec = exports.Integer = exports.IntegerCodec = exports.Intersection = exports.IntersectionCodec = exports.Union = exports.UnionCodec = exports.Object = exports.ObjectCodec = exports.Tuple = exports.TupleCodec = exports.Record = exports.RecordCodec = exports.Array = exports.ArrayCodec = exports.Boolean = exports.BooleanCodec = exports.Unknown = exports.UnknownCodec = exports.UnknownValue = exports.Map = exports.MapCodec = exports.List = exports.ListCodec = exports.BigInt = exports.BigIntCodec = exports.Binary = exports.BinaryCodec = exports.String = exports.StringCodec = exports.Number = exports.NumberCodec = exports.True = exports.TrueCodec = exports.False = exports.FalseCodec = exports.Null = exports.NullCodec = exports.Any = exports.AnyCodec = exports.Codec = exports.Tag = exports.Packet = void 0;
    exports.IntegerLiteral = exports.IntegerLiteralCodec = void 0;
    class Packet {
        constructor() { }
        static decode(parser) {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                let length = utils.VarLength.decode(parser);
                let payload = parser.chunk(length);
                return payload;
            });
        }
        static encode(payload) {
            return utils.Chunk.concat([
                utils.VarLength.encode(payload.length),
                payload
            ]);
        }
    }
    exports.Packet = Packet;
    ;
    var Tag;
    (function (Tag) {
        Tag[Tag["NULL"] = 0] = "NULL";
        Tag[Tag["FALSE"] = 1] = "FALSE";
        Tag[Tag["TRUE"] = 2] = "TRUE";
        Tag[Tag["NUMBER"] = 3] = "NUMBER";
        Tag[Tag["STRING"] = 4] = "STRING";
        Tag[Tag["BINARY"] = 5] = "BINARY";
        Tag[Tag["BIGINT"] = 6] = "BIGINT";
        Tag[Tag["LIST"] = 7] = "LIST";
        Tag[Tag["MAP"] = 8] = "MAP";
    })(Tag = exports.Tag || (exports.Tag = {}));
    ;
    class Codec {
        constructor() { }
        decode(parser, path = "") {
            let payload = Packet.decode(parser);
            return this.decodePayload(payload, path);
        }
        encode(subject, path = "") {
            let payload = this.encodePayload(subject, path);
            return Packet.encode(payload);
        }
    }
    exports.Codec = Codec;
    ;
    class AnyCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.tryArray([
                (parser) => exports.Null.decodePayload(parser, path),
                (parser) => exports.False.decodePayload(parser, path),
                (parser) => exports.True.decodePayload(parser, path),
                (parser) => exports.Number.decodePayload(parser, path),
                (parser) => exports.String.decodePayload(parser, path),
                (parser) => exports.Binary.decodePayload(parser, path),
                (parser) => exports.BigInt.decodePayload(parser, path),
                (parser) => exports.List.decodePayload(parser, path),
                (parser) => exports.Map.decodePayload(parser, path),
                (parser) => exports.Unknown.decodePayload(parser, path)
            ]);
        }
        encodePayload(subject, path = "") {
            try {
                return exports.Null.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.False.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.True.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.Number.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.String.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.Binary.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.BigInt.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.List.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.Map.encodePayload(subject, path);
            }
            catch (error) { }
            try {
                return exports.Unknown.encodePayload(subject, path);
            }
            catch (error) { }
            throw `Expected subject to be encodable!`;
        }
    }
    exports.AnyCodec = AnyCodec;
    ;
    exports.Any = new AnyCodec();
    class NullCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.NULL) {
                    throw `Expected Null at ${path}!`;
                }
                return null;
            });
        }
        encodePayload(subject, path = "") {
            if (subject !== null) {
                throw `Expected Null at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.NULL));
            return utils.Chunk.concat(chunks);
        }
    }
    exports.NullCodec = NullCodec;
    ;
    exports.Null = new NullCodec();
    class FalseCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.FALSE) {
                    throw `Expected False at ${path}!`;
                }
                return false;
            });
        }
        encodePayload(subject, path = "") {
            if (subject !== false) {
                throw `Expected False at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.FALSE));
            return utils.Chunk.concat(chunks);
        }
    }
    exports.FalseCodec = FalseCodec;
    ;
    exports.False = new FalseCodec();
    class TrueCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.TRUE) {
                    throw `Expected True at ${path}!`;
                }
                return true;
            });
        }
        encodePayload(subject, path = "") {
            if (subject !== true) {
                throw `Expected True at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.TRUE));
            return utils.Chunk.concat(chunks);
        }
    }
    exports.TrueCodec = TrueCodec;
    ;
    exports.True = new TrueCodec();
    class NumberCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.NUMBER) {
                    throw `Expected Number at ${path}!`;
                }
                let chunk = parser.chunk(8);
                if (((chunk[0] >> 7) & 0x01) === 0x01) {
                    chunk[0] ^= 0x80;
                    for (let i = 1; i < chunk.length; i++) {
                        chunk[i] ^= 0x00;
                    }
                }
                else {
                    chunk[0] ^= 0xFF;
                    for (let i = 1; i < chunk.length; i++) {
                        chunk[i] ^= 0xFF;
                    }
                }
                let value = new DataView(chunk.buffer).getFloat64(0, false);
                return value;
            });
        }
        encodePayload(subject, path = "") {
            if (subject == null || subject.constructor !== globalThis.Number) {
                throw `Expected Number at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.NUMBER));
            let chunk = new Uint8Array(8);
            new DataView(chunk.buffer).setFloat64(0, subject, false);
            if (((chunk[0] >> 7) & 0x01) === 0x00) {
                chunk[0] ^= 0x80;
                for (let i = 1; i < chunk.length; i++) {
                    chunk[i] ^= 0x00;
                }
            }
            else {
                chunk[0] ^= 0xFF;
                for (let i = 1; i < chunk.length; i++) {
                    chunk[i] ^= 0xFF;
                }
            }
            chunks.push(chunk);
            return utils.Chunk.concat(chunks);
        }
    }
    exports.NumberCodec = NumberCodec;
    ;
    exports.Number = new NumberCodec();
    class StringCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.STRING) {
                    throw `Expected String at ${path}!`;
                }
                let value = utils.Chunk.toString(parser.chunk(), "utf-8");
                return value;
            });
        }
        encodePayload(subject, path = "") {
            if (subject == null || subject.constructor !== globalThis.String) {
                throw `Expected String at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.STRING));
            chunks.push(utils.Chunk.fromString(subject, "utf-8"));
            return utils.Chunk.concat(chunks);
        }
    }
    exports.StringCodec = StringCodec;
    ;
    exports.String = new StringCodec();
    class BinaryCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.BINARY) {
                    throw `Expected Binary at ${path}!`;
                }
                let value = parser.chunk();
                return value;
            });
        }
        encodePayload(subject, path = "") {
            if (subject == null || subject.constructor !== globalThis.Uint8Array) {
                throw `Expected Binary at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.BINARY));
            chunks.push(subject);
            return utils.Chunk.concat(chunks);
        }
    }
    exports.BinaryCodec = BinaryCodec;
    ;
    exports.Binary = new BinaryCodec();
    class BigIntCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.BIGINT) {
                    throw `Expected BigInt at ${path}!`;
                }
                let category = utils.VarCategory.decode(parser);
                let value = 0n;
                if (category >= 0) {
                    let size = category + 1;
                    for (let i = 0; i < size; i++) {
                        let byte = globalThis.BigInt(parser.unsigned(1));
                        value = value << 8n;
                        value = value | byte;
                    }
                }
                else {
                    let size = 0 - category;
                    for (let i = 0; i < size; i++) {
                        let byte = globalThis.BigInt(~parser.unsigned(1) & 0xFF);
                        value = value << 8n;
                        value = value | byte;
                    }
                    value = value + 1n;
                    value = 0n - value;
                }
                return value;
            });
        }
        encodePayload(subject, path = "") {
            if (subject == null || subject.constructor !== globalThis.BigInt) {
                throw `Expected BigInt at ${path}!`;
            }
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.BIGINT));
            let bytes = [];
            let value = subject;
            if (value >= 0n) {
                do {
                    let byte = globalThis.Number(value & 0xffn);
                    value = value >> 8n;
                    bytes.push(byte);
                } while (value > 0n);
                let category = utils.VarCategory.encode(bytes.length - 1);
                chunks.push(category);
            }
            else {
                value = 0n - value;
                value = value - 1n;
                do {
                    let byte = ~globalThis.Number(value & 0xffn) & 0xFF;
                    value = value >> 8n;
                    bytes.push(byte);
                } while (value > 0n);
                let category = utils.VarCategory.encode(0 - bytes.length);
                chunks.push(category);
            }
            bytes.reverse();
            chunks.push(Uint8Array.from(bytes));
            return utils.Chunk.concat(chunks);
        }
    }
    exports.BigIntCodec = BigIntCodec;
    ;
    exports.BigInt = new BigIntCodec();
    class ListCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "", decode) {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.LIST) {
                    throw `Expected List at ${path}!`;
                }
                decode = decode ?? ((key, path, parser) => exports.Any.decode(parser, path));
                let value = [];
                let index = 0;
                while (!parser.eof()) {
                    let subpath = `${path}[${index}]`;
                    value.push(decode(index, subpath, parser));
                    index += 1;
                }
                return value;
            });
        }
        encodePayload(subject, path = "", encode) {
            if (subject == null || subject.constructor !== globalThis.Array) {
                throw `Expected List at ${path}!`;
            }
            encode = encode ?? ((key, path, subject) => exports.Any.encode(subject, path));
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.LIST));
            for (let index = 0; index < subject.length; index++) {
                let value = subject[index];
                if (value === undefined) {
                    value = null;
                }
                let subpath = `${path}[${index}]`;
                chunks.push(encode(index, subpath, value));
            }
            return utils.Chunk.concat(chunks);
        }
    }
    exports.ListCodec = ListCodec;
    ;
    exports.List = new ListCodec();
    class MapCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "", decode) {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                if (parser.unsigned(1) !== Tag.MAP) {
                    throw `Expected Map at ${path}!`;
                }
                decode = decode ?? ((key, path, parser) => exports.Any.decode(parser, path));
                let value = {};
                while (!parser.eof()) {
                    let key = exports.String.decode(parser);
                    let subpath = /^[a-z][a-z0-9_]*$/isu.test(key) ? `${path}.${key}` : `${path}["${key}"]`;
                    value[key] = decode(key, subpath, parser);
                }
                return value;
            });
        }
        encodePayload(subject, path = "", encode) {
            if (subject == null || subject.constructor !== globalThis.Object) {
                throw `Expected Map at ${path}!`;
            }
            encode = encode ?? ((key, path, subject) => exports.Any.encode(subject, path));
            let chunks = [];
            chunks.push(Uint8Array.of(Tag.MAP));
            let pairs = [];
            for (let key in subject) {
                let value = subject[key];
                if (value === undefined) {
                    continue;
                }
                let subpath = /^[a-z][a-z0-9_]*$/isu.test(key) ? `${path}.${key}` : `${path}["${key}"]`;
                pairs.push({
                    key: exports.String.encodePayload(key),
                    value: encode(key, subpath, value)
                });
            }
            pairs.sort((one, two) => utils.Chunk.comparePrefixes(one.key, two.key));
            for (let pair of pairs) {
                chunks.push(Packet.encode(pair.key));
                chunks.push(pair.value);
            }
            return utils.Chunk.concat(chunks);
        }
    }
    exports.MapCodec = MapCodec;
    ;
    exports.Map = new MapCodec();
    class UnknownValue {
        chunk;
        constructor(chunk) {
            utils.IntegerAssert.atLeast(1, chunk.length);
            if (chunk[0] in Tag) {
                throw `Expected tag ${Tag[chunk[0]]} to be unknown!`;
            }
            this.chunk = chunk;
        }
        getChunk() {
            return this.chunk;
        }
    }
    exports.UnknownValue = UnknownValue;
    ;
    class UnknownCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                let value = parser.chunk();
                return new UnknownValue(value);
            });
        }
        encodePayload(subject, path = "") {
            if (subject == null || subject.constructor !== UnknownValue) {
                throw `Expected Unknown at ${path}!`;
            }
            let chunks = [];
            chunks.push(subject.getChunk());
            return utils.Chunk.concat(chunks);
        }
    }
    exports.UnknownCodec = UnknownCodec;
    ;
    exports.Unknown = new UnknownCodec();
    class BooleanCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.tryArray([
                (parser) => exports.True.decodePayload(parser, path),
                (parser) => exports.False.decodePayload(parser, path)
            ]);
        }
        encodePayload(subject, path = "") {
            if (subject) {
                return exports.True.encodePayload(subject, path);
            }
            else {
                return exports.False.encodePayload(subject, path);
            }
        }
    }
    exports.BooleanCodec = BooleanCodec;
    ;
    exports.Boolean = new BooleanCodec();
    class ArrayCodec extends Codec {
        codec;
        constructor(codec) {
            super();
            this.codec = codec;
        }
        decodePayload(parser, path = "") {
            return exports.List.decodePayload(parser, path, (index, path, parser) => {
                return this.codec.decode(parser, path);
            });
        }
        encodePayload(subject, path = "") {
            return exports.List.encodePayload(subject, path, (index, path, subject) => {
                return this.codec.encode(subject, path);
            });
        }
    }
    exports.ArrayCodec = ArrayCodec;
    ;
    exports.Array = {
        of(codec) {
            return new ArrayCodec(codec);
        }
    };
    class RecordCodec extends Codec {
        codec;
        constructor(codec) {
            super();
            this.codec = codec;
        }
        decodePayload(parser, path = "") {
            return exports.Map.decodePayload(parser, path, (key, path, parser) => {
                return this.codec.decode(parser, path);
            });
        }
        encodePayload(subject, path = "") {
            return exports.Map.encodePayload(subject, path, (key, path, subject) => {
                return this.codec.encode(subject, path);
            });
        }
    }
    exports.RecordCodec = RecordCodec;
    ;
    exports.Record = {
        of(codec) {
            return new RecordCodec(codec);
        }
    };
    class TupleCodec extends Codec {
        codecs;
        constructor(...codecs) {
            super();
            this.codecs = codecs;
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                let indices = new globalThis.Set(this.codecs.keys());
                let subject = exports.List.decodePayload(parser, path, (index, path, parser) => {
                    indices.delete(index);
                    if (index in this.codecs) {
                        return this.codecs[index].decode(parser, path);
                    }
                    else {
                        return exports.Any.decode(parser, path);
                    }
                });
                if (indices.size !== 0) {
                    throw `Expected members ${globalThis.Array.from(indices)} to be decoded!`;
                }
                return subject;
            });
        }
        encodePayload(subject, path = "") {
            let indices = new globalThis.Set(this.codecs.keys());
            let payload = exports.List.encodePayload(subject, path, (index, path, subject) => {
                indices.delete(index);
                if (index in this.codecs) {
                    return this.codecs[index].encode(subject, path);
                }
                else {
                    return exports.Any.encode(subject, path);
                }
            });
            if (indices.size !== 0) {
                throw `Expected members ${globalThis.Array.from(indices)} to be encoded!`;
            }
            return payload;
        }
    }
    exports.TupleCodec = TupleCodec;
    ;
    exports.Tuple = {
        of(...codecs) {
            return new TupleCodec(...codecs);
        }
    };
    class ObjectCodec extends Codec {
        required;
        optional;
        constructor(required, optional) {
            super();
            this.required = required;
            this.optional = optional ?? {};
        }
        decodePayload(parser, path = "") {
            parser = parser instanceof utils.Parser ? parser : new utils.Parser(parser);
            return parser.try((parser) => {
                let keys = new Set(globalThis.Object.keys(this.required));
                let subject = exports.Map.decodePayload(parser, path, (key, path, parser) => {
                    keys.delete(key);
                    if (key in this.required) {
                        return this.required[key].decode(parser, path);
                    }
                    else if (key in this.optional) {
                        return this.optional[key].decode(parser, path);
                    }
                    else {
                        return exports.Any.decode(parser, path);
                    }
                });
                if (keys.size !== 0) {
                    throw `Expected members ${globalThis.Array.from(keys)} to be decoded!`;
                }
                return subject;
            });
        }
        encodePayload(subject, path = "") {
            let keys = new Set(globalThis.Object.keys(this.required));
            let payload = exports.Map.encodePayload(subject, path, (key, path, subject) => {
                keys.delete(key);
                if (key in this.required) {
                    return this.required[key].encode(subject, path);
                }
                else if (key in this.optional) {
                    return this.optional[key].encode(subject, path);
                }
                else {
                    return exports.Any.encode(subject, path);
                }
            });
            if (keys.size !== 0) {
                throw `Expected members ${globalThis.Array.from(keys)} to be encoded!`;
            }
            return payload;
        }
    }
    exports.ObjectCodec = ObjectCodec;
    ;
    exports.Object = {
        of(required, optional) {
            return new ObjectCodec(required, optional);
        }
    };
    class UnionCodec extends Codec {
        codecs;
        constructor(...codecs) {
            super();
            this.codecs = codecs;
        }
        decodePayload(parser, path = "") {
            for (let codec of this.codecs) {
                try {
                    return codec.decodePayload(parser, path);
                }
                catch (error) { }
            }
            throw `Expected subject to be decodable!`;
        }
        encodePayload(subject, path = "") {
            for (let codec of this.codecs) {
                try {
                    return codec.encodePayload(subject, path);
                }
                catch (error) { }
            }
            throw `Expected subject to be encodable!`;
        }
    }
    exports.UnionCodec = UnionCodec;
    ;
    exports.Union = {
        of(...codecs) {
            return new UnionCodec(...codecs);
        }
    };
    class IntersectionCodec extends Codec {
        codecs;
        constructor(...codecs) {
            super();
            this.codecs = codecs;
        }
        decodePayload(parser, path = "") {
            for (let codec of this.codecs) {
                codec.decodePayload(parser, path);
            }
            return exports.Any.decodePayload(parser, path);
        }
        encodePayload(subject, path = "") {
            for (let codec of this.codecs) {
                codec.encodePayload(subject, path);
            }
            return exports.Any.encodePayload(subject, path);
        }
    }
    exports.IntersectionCodec = IntersectionCodec;
    ;
    exports.Intersection = {
        of(...codecs) {
            return new IntersectionCodec(...codecs);
        }
    };
    class IntegerCodec extends Codec {
        constructor() {
            super();
        }
        decodePayload(parser, path = "") {
            let subject = exports.BigInt.decodePayload(parser, path);
            if (subject < globalThis.BigInt(globalThis.Number.MIN_SAFE_INTEGER)) {
                throw `Expected ${subject} at ${path} to be within safe range!`;
            }
            if (subject > globalThis.BigInt(globalThis.Number.MAX_SAFE_INTEGER)) {
                throw `Expected ${subject} at ${path} to be within safe range!`;
            }
            return globalThis.Number(subject);
        }
        encodePayload(subject, path = "") {
            return exports.BigInt.encodePayload(globalThis.BigInt(subject), path);
        }
    }
    exports.IntegerCodec = IntegerCodec;
    ;
    exports.Integer = new IntegerCodec();
    class StringLiteralCodec extends Codec {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
        decodePayload(parser, path = "") {
            let subject = exports.String.decodePayload(parser, path);
            if (subject !== this.value) {
                throw `Expected "${this.value}" at ${path}!`;
            }
            return this.value;
        }
        encodePayload(subject, path = "") {
            if (subject !== this.value) {
                throw `Expected "${this.value}" at ${path}!`;
            }
            return exports.String.encodePayload(subject, path);
        }
    }
    exports.StringLiteralCodec = StringLiteralCodec;
    ;
    exports.StringLiteral = {
        of(value) {
            return new StringLiteralCodec(value);
        }
    };
    class NumberLiteralCodec extends Codec {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
        decodePayload(parser, path = "") {
            let subject = exports.Number.decodePayload(parser, path);
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return this.value;
        }
        encodePayload(subject, path = "") {
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return exports.Number.encodePayload(subject, path);
        }
    }
    exports.NumberLiteralCodec = NumberLiteralCodec;
    ;
    exports.NumberLiteral = {
        of(value) {
            return new NumberLiteralCodec(value);
        }
    };
    class BigIntLiteralCodec extends Codec {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
        decodePayload(parser, path = "") {
            let subject = exports.BigInt.decodePayload(parser, path);
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return this.value;
        }
        encodePayload(subject, path = "") {
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return exports.BigInt.encodePayload(subject, path);
        }
    }
    exports.BigIntLiteralCodec = BigIntLiteralCodec;
    ;
    exports.BigIntLiteral = {
        of(value) {
            return new BigIntLiteralCodec(value);
        }
    };
    class BooleanLiteralCodec extends Codec {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
        decodePayload(parser, path = "") {
            let subject = exports.Boolean.decodePayload(parser, path);
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return this.value;
        }
        encodePayload(subject, path = "") {
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return exports.Boolean.encodePayload(subject, path);
        }
    }
    exports.BooleanLiteralCodec = BooleanLiteralCodec;
    ;
    exports.BooleanLiteral = {
        of(value) {
            return new BooleanLiteralCodec(value);
        }
    };
    class IntegerLiteralCodec extends Codec {
        value;
        constructor(value) {
            super();
            this.value = value;
        }
        decodePayload(parser, path = "") {
            let subject = exports.Integer.decodePayload(parser, path);
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return this.value;
        }
        encodePayload(subject, path = "") {
            if (subject !== this.value) {
                throw `Expected ${this.value} at ${path}!`;
            }
            return exports.Integer.encodePayload(subject, path);
        }
    }
    exports.IntegerLiteralCodec = IntegerLiteralCodec;
    ;
    exports.IntegerLiteral = {
        of(value) {
            return new IntegerLiteralCodec(value);
        }
    };
});
define("node_modules/@joelek/bedrock/dist/lib/index", ["require", "exports", "node_modules/@joelek/bedrock/dist/lib/codecs", "node_modules/@joelek/bedrock/dist/lib/utils"], function (require, exports, codecs, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = exports.codecs = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = exports.codecs = void 0;
    exports.codecs = codecs;
    exports.utils = utils;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/bedrock", ["require", "exports", "node_modules/@joelek/bedrock/dist/lib/index"], function (require, exports, bedrock) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CODEC = exports.BedrockCodec = void 0;
    class BedrockCodec {
        constructor() { }
        decode(buffer) {
            return bedrock.codecs.Any.decode(buffer);
        }
        encode(subject) {
            return bedrock.codecs.Any.encode(subject);
        }
    }
    exports.BedrockCodec = BedrockCodec;
    ;
    exports.CODEC = new BedrockCodec();
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/json", ["require", "exports", "node_modules/@joelek/bedrock/dist/lib/index", "node_modules/@joelek/ts-autoguard/dist/lib-shared/guards"], function (require, exports, bedrock, guards) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CODEC = exports.JSONCodec = void 0;
    const BIGINT_GUARD = guards.Object.of({
        type: guards.StringLiteral.of("@bigint"),
        data: guards.String
    });
    const BINARY_GUARD = guards.Object.of({
        type: guards.StringLiteral.of("@binary"),
        data: guards.String
    });
    class JSONCodec {
        constructor() { }
        decode(buffer) {
            let string = bedrock.utils.Chunk.toString(buffer, "utf-8");
            let subject = string.length === 0 ? undefined : JSON.parse(string, (key, subject) => {
                if (BIGINT_GUARD.is(subject)) {
                    return BigInt(subject.data);
                }
                if (BINARY_GUARD.is(subject)) {
                    return bedrock.utils.Chunk.fromString(subject.data, "base64url");
                }
                return subject;
            });
            return subject;
        }
        encode(subject) {
            let string = subject === undefined ? "" : JSON.stringify(subject, (key, subject) => {
                if (guards.BigInt.is(subject)) {
                    return {
                        type: "@bigint",
                        data: subject.toString()
                    };
                }
                if (guards.Binary.is(subject)) {
                    return {
                        type: "@binary",
                        data: bedrock.utils.Chunk.toString(subject, "base64url")
                    };
                }
                return subject;
            });
            let packet = bedrock.utils.Chunk.fromString(string, "utf-8");
            return packet;
        }
    }
    exports.JSONCodec = JSONCodec;
    ;
    exports.CODEC = new JSONCodec();
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/bedrock", "node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/json"], function (require, exports, bedrock, json) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.json = exports.bedrock = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.json = exports.bedrock = void 0;
    exports.bedrock = bedrock;
    exports.json = json;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-shared/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/api", "node_modules/@joelek/ts-autoguard/dist/lib-shared/codecs/index", "node_modules/@joelek/ts-autoguard/dist/lib-shared/guards", "node_modules/@joelek/ts-autoguard/dist/lib-shared/serialization"], function (require, exports, api, codecs, guards, serialization) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialization = exports.guards = exports.codecs = exports.api = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialization = exports.guards = exports.codecs = exports.api = void 0;
    exports.api = api;
    exports.codecs = codecs;
    exports.guards = guards;
    exports.serialization = serialization;
});
define("build/lib/config/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Options = exports.Certificate = exports.Provider = exports.ProviderGlesys = exports.ProviderDynu = void 0;
    exports.ProviderDynu = autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("dynu"),
        "key": autoguard.guards.String
    }, {});
    exports.ProviderGlesys = autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("glesys"),
        "account": autoguard.guards.String,
        "key": autoguard.guards.String
    }, {});
    exports.Provider = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ProviderDynu), autoguard.guards.Reference.of(() => exports.ProviderGlesys));
    exports.Certificate = autoguard.guards.Object.of({
        "hostnames": autoguard.guards.Array.of(autoguard.guards.String)
    }, {
        "root": autoguard.guards.String
    });
    exports.Options = autoguard.guards.Object.of({
        "providers": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Provider)),
        "certificates": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Certificate))
    }, {
        "acme": autoguard.guards.String,
        "monitor": autoguard.guards.Boolean
    });
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ProviderDynu": autoguard.guards.Reference.of(() => exports.ProviderDynu),
            "ProviderGlesys": autoguard.guards.Reference.of(() => exports.ProviderGlesys),
            "Provider": autoguard.guards.Reference.of(() => exports.Provider),
            "Certificate": autoguard.guards.Reference.of(() => exports.Certificate),
            "Options": autoguard.guards.Reference.of(() => exports.Options)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/asn1/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Boolean = exports.UTCTime = exports.Date = exports.UTF8String = exports.Set = exports.Sequence = exports.OctetString = exports.ObjectIdentifier = exports.Null = exports.Integer = exports.BitString = exports.Node = exports.Type = exports.Form = exports.Kind = void 0;
    var Kind;
    (function (Kind) {
        Kind[Kind["UNIVERSAL"] = 0] = "UNIVERSAL";
        Kind[Kind["APPLICATION"] = 1] = "APPLICATION";
        Kind[Kind["CONTEXT"] = 2] = "CONTEXT";
        Kind[Kind["PRIVATE"] = 3] = "PRIVATE";
    })(Kind = exports.Kind || (exports.Kind = {}));
    ;
    (function (Kind) {
        Kind.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("UNIVERSAL"), autoguard.guards.StringLiteral.of("APPLICATION"), autoguard.guards.StringLiteral.of("CONTEXT"), autoguard.guards.StringLiteral.of("PRIVATE"));
        Kind.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1), autoguard.guards.NumberLiteral.of(2), autoguard.guards.NumberLiteral.of(3));
        function keyFromValue(value) {
            return Kind.Key.as(Kind[Kind.Value.as(value)]);
        }
        Kind.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return Kind.Value.as(Kind[Kind.Key.as(key)]);
        }
        Kind.valueFromKey = valueFromKey;
        ;
    })(Kind = exports.Kind || (exports.Kind = {}));
    ;
    var Form;
    (function (Form) {
        Form[Form["PRIMITIVE"] = 0] = "PRIMITIVE";
        Form[Form["CONSTRUCTED"] = 1] = "CONSTRUCTED";
    })(Form = exports.Form || (exports.Form = {}));
    ;
    (function (Form) {
        Form.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("PRIMITIVE"), autoguard.guards.StringLiteral.of("CONSTRUCTED"));
        Form.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1));
        function keyFromValue(value) {
            return Form.Key.as(Form[Form.Value.as(value)]);
        }
        Form.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return Form.Value.as(Form[Form.Key.as(key)]);
        }
        Form.valueFromKey = valueFromKey;
        ;
    })(Form = exports.Form || (exports.Form = {}));
    ;
    var Type;
    (function (Type) {
        Type[Type["END_OF_CONTENT"] = 0] = "END_OF_CONTENT";
        Type[Type["BOOLEAN"] = 1] = "BOOLEAN";
        Type[Type["INTEGER"] = 2] = "INTEGER";
        Type[Type["BIT_STRING"] = 3] = "BIT_STRING";
        Type[Type["OCTET_STRING"] = 4] = "OCTET_STRING";
        Type[Type["NULL"] = 5] = "NULL";
        Type[Type["OBJECT_IDENTIFIER"] = 6] = "OBJECT_IDENTIFIER";
        Type[Type["OBJECT_DESCRIPTOR"] = 7] = "OBJECT_DESCRIPTOR";
        Type[Type["EXTERNAL"] = 8] = "EXTERNAL";
        Type[Type["REAL"] = 9] = "REAL";
        Type[Type["ENUMERATED"] = 10] = "ENUMERATED";
        Type[Type["EMBEDDED_PDV"] = 11] = "EMBEDDED_PDV";
        Type[Type["UTF8_STRING"] = 12] = "UTF8_STRING";
        Type[Type["RELATIVE_OID"] = 13] = "RELATIVE_OID";
        Type[Type["TIME"] = 14] = "TIME";
        Type[Type["0F_RESERVED"] = 15] = "0F_RESERVED";
        Type[Type["SEQUENCE"] = 16] = "SEQUENCE";
        Type[Type["SET"] = 17] = "SET";
        Type[Type["NUMERIC_STRING"] = 18] = "NUMERIC_STRING";
        Type[Type["PRINTABLE_STRING"] = 19] = "PRINTABLE_STRING";
        Type[Type["T61_STRING"] = 20] = "T61_STRING";
        Type[Type["VIDEOTEX_STRING"] = 21] = "VIDEOTEX_STRING";
        Type[Type["IA5_STRING"] = 22] = "IA5_STRING";
        Type[Type["UTC_TIME"] = 23] = "UTC_TIME";
        Type[Type["GENERALIZED_TIME"] = 24] = "GENERALIZED_TIME";
        Type[Type["GRAPHIC_STRING"] = 25] = "GRAPHIC_STRING";
        Type[Type["VISIBLE_STRING"] = 26] = "VISIBLE_STRING";
        Type[Type["GENERAL_STRING"] = 27] = "GENERAL_STRING";
        Type[Type["UNIVERSAL_STRING"] = 28] = "UNIVERSAL_STRING";
        Type[Type["CHARACTER_STRING"] = 29] = "CHARACTER_STRING";
        Type[Type["BMP_STRING"] = 30] = "BMP_STRING";
        Type[Type["DATE"] = 31] = "DATE";
        Type[Type["TIME_OF_DAY"] = 32] = "TIME_OF_DAY";
        Type[Type["DATE_TIME"] = 33] = "DATE_TIME";
        Type[Type["DURATION"] = 34] = "DURATION";
        Type[Type["OID_IRI"] = 35] = "OID_IRI";
        Type[Type["RELATIVE_OID_IRI"] = 36] = "RELATIVE_OID_IRI";
    })(Type = exports.Type || (exports.Type = {}));
    ;
    (function (Type) {
        Type.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("END_OF_CONTENT"), autoguard.guards.StringLiteral.of("BOOLEAN"), autoguard.guards.StringLiteral.of("INTEGER"), autoguard.guards.StringLiteral.of("BIT_STRING"), autoguard.guards.StringLiteral.of("OCTET_STRING"), autoguard.guards.StringLiteral.of("NULL"), autoguard.guards.StringLiteral.of("OBJECT_IDENTIFIER"), autoguard.guards.StringLiteral.of("OBJECT_DESCRIPTOR"), autoguard.guards.StringLiteral.of("EXTERNAL"), autoguard.guards.StringLiteral.of("REAL"), autoguard.guards.StringLiteral.of("ENUMERATED"), autoguard.guards.StringLiteral.of("EMBEDDED_PDV"), autoguard.guards.StringLiteral.of("UTF8_STRING"), autoguard.guards.StringLiteral.of("RELATIVE_OID"), autoguard.guards.StringLiteral.of("TIME"), autoguard.guards.StringLiteral.of("0F_RESERVED"), autoguard.guards.StringLiteral.of("SEQUENCE"), autoguard.guards.StringLiteral.of("SET"), autoguard.guards.StringLiteral.of("NUMERIC_STRING"), autoguard.guards.StringLiteral.of("PRINTABLE_STRING"), autoguard.guards.StringLiteral.of("T61_STRING"), autoguard.guards.StringLiteral.of("VIDEOTEX_STRING"), autoguard.guards.StringLiteral.of("IA5_STRING"), autoguard.guards.StringLiteral.of("UTC_TIME"), autoguard.guards.StringLiteral.of("GENERALIZED_TIME"), autoguard.guards.StringLiteral.of("GRAPHIC_STRING"), autoguard.guards.StringLiteral.of("VISIBLE_STRING"), autoguard.guards.StringLiteral.of("GENERAL_STRING"), autoguard.guards.StringLiteral.of("UNIVERSAL_STRING"), autoguard.guards.StringLiteral.of("CHARACTER_STRING"), autoguard.guards.StringLiteral.of("BMP_STRING"), autoguard.guards.StringLiteral.of("DATE"), autoguard.guards.StringLiteral.of("TIME_OF_DAY"), autoguard.guards.StringLiteral.of("DATE_TIME"), autoguard.guards.StringLiteral.of("DURATION"), autoguard.guards.StringLiteral.of("OID_IRI"), autoguard.guards.StringLiteral.of("RELATIVE_OID_IRI"));
        Type.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1), autoguard.guards.NumberLiteral.of(2), autoguard.guards.NumberLiteral.of(3), autoguard.guards.NumberLiteral.of(4), autoguard.guards.NumberLiteral.of(5), autoguard.guards.NumberLiteral.of(6), autoguard.guards.NumberLiteral.of(7), autoguard.guards.NumberLiteral.of(8), autoguard.guards.NumberLiteral.of(9), autoguard.guards.NumberLiteral.of(10), autoguard.guards.NumberLiteral.of(11), autoguard.guards.NumberLiteral.of(12), autoguard.guards.NumberLiteral.of(13), autoguard.guards.NumberLiteral.of(14), autoguard.guards.NumberLiteral.of(15), autoguard.guards.NumberLiteral.of(16), autoguard.guards.NumberLiteral.of(17), autoguard.guards.NumberLiteral.of(18), autoguard.guards.NumberLiteral.of(19), autoguard.guards.NumberLiteral.of(20), autoguard.guards.NumberLiteral.of(21), autoguard.guards.NumberLiteral.of(22), autoguard.guards.NumberLiteral.of(23), autoguard.guards.NumberLiteral.of(24), autoguard.guards.NumberLiteral.of(25), autoguard.guards.NumberLiteral.of(26), autoguard.guards.NumberLiteral.of(27), autoguard.guards.NumberLiteral.of(28), autoguard.guards.NumberLiteral.of(29), autoguard.guards.NumberLiteral.of(30), autoguard.guards.NumberLiteral.of(31), autoguard.guards.NumberLiteral.of(32), autoguard.guards.NumberLiteral.of(33), autoguard.guards.NumberLiteral.of(34), autoguard.guards.NumberLiteral.of(35), autoguard.guards.NumberLiteral.of(36));
        function keyFromValue(value) {
            return Type.Key.as(Type[Type.Value.as(value)]);
        }
        Type.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return Type.Value.as(Type[Type.Key.as(key)]);
        }
        Type.valueFromKey = valueFromKey;
        ;
    })(Type = exports.Type || (exports.Type = {}));
    ;
    exports.Node = autoguard.guards.Object.of({
        "kind": autoguard.guards.Reference.of(() => Kind.Key),
        "form": autoguard.guards.Reference.of(() => Form.Key),
        "type": autoguard.guards.Reference.of(() => Type.Key),
        "data": autoguard.guards.Union.of(autoguard.guards.String, autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Node)))
    }, {});
    exports.BitString = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("BIT_STRING"),
        "data": autoguard.guards.String
    }, {});
    exports.Integer = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("INTEGER"),
        "data": autoguard.guards.String
    }, {});
    exports.Null = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("NULL"),
        "data": autoguard.guards.String
    }, {});
    exports.ObjectIdentifier = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("OBJECT_IDENTIFIER"),
        "data": autoguard.guards.String
    }, {});
    exports.OctetString = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("OCTET_STRING"),
        "data": autoguard.guards.String
    }, {});
    exports.Sequence = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
        "type": autoguard.guards.StringLiteral.of("SEQUENCE"),
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Node))
    }, {});
    exports.Set = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
        "type": autoguard.guards.StringLiteral.of("SET"),
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Node))
    }, {});
    exports.UTF8String = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("UTF8_STRING"),
        "data": autoguard.guards.String
    }, {});
    exports.Date = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("DATE"),
        "data": autoguard.guards.String
    }, {});
    exports.UTCTime = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("UTC_TIME"),
        "data": autoguard.guards.String
    }, {});
    exports.Boolean = autoguard.guards.Object.of({
        "kind": autoguard.guards.StringLiteral.of("UNIVERSAL"),
        "form": autoguard.guards.StringLiteral.of("PRIMITIVE"),
        "type": autoguard.guards.StringLiteral.of("BOOLEAN"),
        "data": autoguard.guards.String
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Node": autoguard.guards.Reference.of(() => exports.Node),
            "BitString": autoguard.guards.Reference.of(() => exports.BitString),
            "Integer": autoguard.guards.Reference.of(() => exports.Integer),
            "Null": autoguard.guards.Reference.of(() => exports.Null),
            "ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ObjectIdentifier),
            "OctetString": autoguard.guards.Reference.of(() => exports.OctetString),
            "Sequence": autoguard.guards.Reference.of(() => exports.Sequence),
            "Set": autoguard.guards.Reference.of(() => exports.Set),
            "UTF8String": autoguard.guards.Reference.of(() => exports.UTF8String),
            "Date": autoguard.guards.Reference.of(() => exports.Date),
            "UTCTime": autoguard.guards.Reference.of(() => exports.UTCTime),
            "Boolean": autoguard.guards.Reference.of(() => exports.Boolean)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/asn1/index", ["require", "exports", "build/mod/asn1/schema/index"], function (require, exports, schema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeUTCTime = exports.encodeUTCTime = exports.encodeInteger = exports.decodeInteger = exports.BOOLEAN = exports.UTC_TIME = exports.DATE = exports.UTF8_STRING = exports.BIT_STRING = exports.OCTET_STRING = exports.NULL = exports.OBJECT_IDENTIFER = exports.INTEGER = exports.SET = exports.SEQUENCE = void 0;
    __exportStar(schema_1, exports);
    exports.SEQUENCE = {
        kind: "UNIVERSAL",
        form: "CONSTRUCTED",
        type: "SEQUENCE",
        data: []
    };
    exports.SET = {
        kind: "UNIVERSAL",
        form: "CONSTRUCTED",
        type: "SET",
        data: []
    };
    exports.INTEGER = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "INTEGER",
        data: ""
    };
    exports.OBJECT_IDENTIFER = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "OBJECT_IDENTIFIER",
        data: ""
    };
    exports.NULL = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "NULL",
        data: ""
    };
    exports.OCTET_STRING = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "OCTET_STRING",
        data: ""
    };
    exports.BIT_STRING = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "BIT_STRING",
        data: ""
    };
    exports.UTF8_STRING = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "UTF8_STRING",
        data: ""
    };
    exports.DATE = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "DATE",
        data: ""
    };
    exports.UTC_TIME = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "UTC_TIME",
        data: ""
    };
    exports.BOOLEAN = {
        kind: "UNIVERSAL",
        form: "PRIMITIVE",
        type: "BOOLEAN",
        data: ""
    };
    function decodeInteger(buffer, options) {
        var _a;
        let paddedUnsigned = (_a = options === null || options === void 0 ? void 0 : options.paddedUnsigned) !== null && _a !== void 0 ? _a : true;
        let hex = buffer.toString("hex");
        let number = BigInt(`0x${hex}`);
        if (buffer[0] < 0x80 || !paddedUnsigned) {
            return number;
        }
        else {
            let bias = BigInt(1) << BigInt(buffer.length * 8);
            return number - bias;
        }
    }
    exports.decodeInteger = decodeInteger;
    ;
    function encodeInteger(number, options) {
        var _a;
        function getNibbles(number) {
            let nibbles = [...number.toString(16)].map((part) => Number.parseInt(part, 16));
            if ((nibbles.length % 2) === 1) {
                nibbles.unshift(0);
            }
            return nibbles;
        }
        ;
        let paddedUnsigned = (_a = options === null || options === void 0 ? void 0 : options.paddedUnsigned) !== null && _a !== void 0 ? _a : true;
        if (number >= 0) {
            let nibbles = getNibbles(number);
            if (nibbles[0] >= 0x8 && paddedUnsigned) {
                nibbles.unshift(0, 0);
            }
            let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
            return Buffer.from(hex, "hex");
        }
        else {
            let bias = BigInt(1) << BigInt(getNibbles(BigInt(0) - number).length * 4);
            let nibbles = getNibbles(number + bias);
            if (nibbles[0] < 0x8) {
                nibbles.unshift(0xF, 0xF);
            }
            let hex = nibbles.map((nibble) => nibble.toString(16)).join("");
            return Buffer.from(hex, "hex");
        }
    }
    exports.encodeInteger = encodeInteger;
    ;
    function encodeUTCTime(date) {
        let year = (date.getUTCFullYear() % 100).toString().padStart(2, "0");
        let month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
        let day = (date.getUTCDate()).toString().padStart(2, "0");
        let hour = (date.getUTCHours()).toString().padStart(2, "0");
        let minute = (date.getUTCMinutes()).toString().padStart(2, "0");
        let second = (date.getUTCSeconds()).toString().padStart(2, "0");
        return `${year}${month}${day}${hour}${minute}${second}Z`;
    }
    exports.encodeUTCTime = encodeUTCTime;
    ;
    function decodeUTCTime(string) {
        var _a;
        let parts = /^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/.exec(string);
        if (parts == null) {
            throw `Expected a valid UTC time!`;
        }
        let century = (Number.parseInt(string[0]) < 5) ? "20" : "19";
        let year = parts[1];
        let month = parts[2];
        let day = parts[3];
        let hour = parts[4];
        let minute = parts[5];
        let second = (_a = parts[6]) !== null && _a !== void 0 ? _a : "00";
        let iso = `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
        return new Date(iso);
    }
    exports.decodeUTCTime = decodeUTCTime;
    ;
});
define("build/mod/jwk/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.PrivateKey = exports.PublicKey = exports.RSAPrivateKey = exports.RSAPublicKey = exports.RSAKey = exports.ECPrivateKey = exports.ECPublicKey = exports.ECKey = exports.AssymetricKey = exports.Key = exports.Curve = exports.KeyType = void 0;
    var KeyType;
    (function (KeyType) {
        KeyType[KeyType["EC"] = 0] = "EC";
        KeyType[KeyType["RSA"] = 1] = "RSA";
        KeyType[KeyType["oct"] = 2] = "oct";
    })(KeyType = exports.KeyType || (exports.KeyType = {}));
    ;
    (function (KeyType) {
        KeyType.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("EC"), autoguard.guards.StringLiteral.of("RSA"), autoguard.guards.StringLiteral.of("oct"));
        KeyType.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1), autoguard.guards.NumberLiteral.of(2));
        function keyFromValue(value) {
            return KeyType.Key.as(KeyType[KeyType.Value.as(value)]);
        }
        KeyType.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return KeyType.Value.as(KeyType[KeyType.Key.as(key)]);
        }
        KeyType.valueFromKey = valueFromKey;
        ;
    })(KeyType = exports.KeyType || (exports.KeyType = {}));
    ;
    var Curve;
    (function (Curve) {
        Curve[Curve["P-256"] = 0] = "P-256";
        Curve[Curve["P-384"] = 1] = "P-384";
        Curve[Curve["P-521"] = 2] = "P-521";
    })(Curve = exports.Curve || (exports.Curve = {}));
    ;
    (function (Curve) {
        Curve.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("P-256"), autoguard.guards.StringLiteral.of("P-384"), autoguard.guards.StringLiteral.of("P-521"));
        Curve.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1), autoguard.guards.NumberLiteral.of(2));
        function keyFromValue(value) {
            return Curve.Key.as(Curve[Curve.Value.as(value)]);
        }
        Curve.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return Curve.Value.as(Curve[Curve.Key.as(key)]);
        }
        Curve.valueFromKey = valueFromKey;
        ;
    })(Curve = exports.Curve || (exports.Curve = {}));
    ;
    exports.Key = autoguard.guards.Object.of({
        "kty": autoguard.guards.Reference.of(() => KeyType.Key)
    }, {});
    exports.AssymetricKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Key), autoguard.guards.Object.of({
        "kty": autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("EC"), autoguard.guards.StringLiteral.of("RSA"))
    }, {}));
    exports.ECKey = autoguard.guards.Object.of({
        "kty": autoguard.guards.StringLiteral.of("EC")
    }, {});
    exports.ECPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ECKey), autoguard.guards.Object.of({
        "crv": autoguard.guards.Reference.of(() => Curve.Key),
        "x": autoguard.guards.String,
        "y": autoguard.guards.String
    }, {}));
    exports.ECPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ECPublicKey), autoguard.guards.Object.of({
        "d": autoguard.guards.String
    }, {}));
    exports.RSAKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AssymetricKey), autoguard.guards.Object.of({
        "kty": autoguard.guards.StringLiteral.of("RSA")
    }, {}));
    exports.RSAPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.RSAKey), autoguard.guards.Object.of({
        "n": autoguard.guards.String,
        "e": autoguard.guards.String
    }, {}));
    exports.RSAPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.RSAPublicKey), autoguard.guards.Object.of({
        "d": autoguard.guards.String
    }, {
        "p": autoguard.guards.String,
        "q": autoguard.guards.String,
        "dp": autoguard.guards.String,
        "dq": autoguard.guards.String,
        "qi": autoguard.guards.String,
        "oth": autoguard.guards.Array.of(autoguard.guards.Object.of({
            "r": autoguard.guards.String,
            "d": autoguard.guards.String,
            "t": autoguard.guards.String
        }, {}))
    }));
    exports.PublicKey = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ECPublicKey), autoguard.guards.Reference.of(() => exports.RSAPublicKey));
    exports.PrivateKey = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ECPrivateKey), autoguard.guards.Reference.of(() => exports.RSAPrivateKey));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Key": autoguard.guards.Reference.of(() => exports.Key),
            "AssymetricKey": autoguard.guards.Reference.of(() => exports.AssymetricKey),
            "ECKey": autoguard.guards.Reference.of(() => exports.ECKey),
            "ECPublicKey": autoguard.guards.Reference.of(() => exports.ECPublicKey),
            "ECPrivateKey": autoguard.guards.Reference.of(() => exports.ECPrivateKey),
            "RSAKey": autoguard.guards.Reference.of(() => exports.RSAKey),
            "RSAPublicKey": autoguard.guards.Reference.of(() => exports.RSAPublicKey),
            "RSAPrivateKey": autoguard.guards.Reference.of(() => exports.RSAPrivateKey),
            "PublicKey": autoguard.guards.Reference.of(() => exports.PublicKey),
            "PrivateKey": autoguard.guards.Reference.of(() => exports.PrivateKey)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/jwk/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/jwk/schema/index", "build/mod/jwk/schema/index"], function (require, exports, libcrypto, asn1, schema, schema_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.computeThumbprint = exports.getPublicKey = exports.getASN1Integer = exports.getJWKInteger = void 0;
    __exportStar(schema_2, exports);
    function getJWKInteger(string) {
        let bufferASN1 = Buffer.from(string, "base64url");
        let bigint = asn1.decodeInteger(bufferASN1);
        let bufferJWK = asn1.encodeInteger(bigint, { paddedUnsigned: false });
        return bufferJWK.toString("base64url");
    }
    exports.getJWKInteger = getJWKInteger;
    ;
    function getASN1Integer(string) {
        let bufferJWK = Buffer.from(string, "base64url");
        let bigint = asn1.decodeInteger(bufferJWK, { paddedUnsigned: false });
        let bufferASN1 = asn1.encodeInteger(bigint);
        return bufferASN1.toString("base64url");
    }
    exports.getASN1Integer = getASN1Integer;
    ;
    function getPublicKey(key) {
        if (schema.RSAPublicKey.is(key)) {
            let { n, e } = key;
            return {
                kty: "RSA",
                n,
                e
            };
        }
        if (schema.ECPublicKey.is(key)) {
            let { crv, x, y } = key;
            return {
                kty: "EC",
                crv,
                x,
                y
            };
        }
        throw `Expected code to be unreachable!`;
    }
    exports.getPublicKey = getPublicKey;
    ;
    function computeThumbprint(key) {
        let hash = libcrypto.createHash("sha256");
        if (schema.RSAPublicKey.is(key)) {
            let { kty, n, e } = key;
            hash.update(Buffer.from(`{"e":"${e}","kty":"${kty}","n":"${n}"}`));
            let buffer = hash.digest();
            return buffer.toString("base64url");
        }
        if (schema.ECPublicKey.is(key)) {
            let { kty, crv, x, y } = key;
            hash.update(Buffer.from(`{"crv":"${crv}","kty":"${kty}","x":"${x}","y":"${y}"}`));
            let buffer = hash.digest();
            return buffer.toString("base64url");
        }
        throw `Expected code to be unreachable!`;
    }
    exports.computeThumbprint = computeThumbprint;
    ;
});
define("build/mod/pkcs5/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, asn1_1, asn1_2, asn1_3, asn1_4, asn1_5, asn1_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.EncryptedPrivateKeyInfo = exports.PBES2Identifier = exports.PBKDF2Identifier = exports.PBKDF2Identifier2 = exports.PBKDF2Identifier1 = exports.HMACSHA512256Identifier = exports.HMACSHA512224Identifier = exports.HMACSHA512Identifier = exports.HMACSHA384Identifier = exports.HMACSHA256Identifier = exports.HMACSHA224Identifier = exports.HMACSHA1Identifier = exports.AES256CBCIdentifier = exports.AES192CBCIdentifier = exports.AES128CBCIdentifier = exports.SHA512WithRSAEncryption = exports.SHA384WithRSAEncryption = exports.SHA256WithRSAEncryption = exports.ECDSAWithSHA512 = exports.ECDSAWithSHA384 = exports.ECDSAWithSHA256 = exports.AlgorithmIdentifier = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Null = exports.ASN1Node = exports.ASN1Integer = void 0;
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_1.Integer);
    exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_2.Node);
    exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_3.Null);
    exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_4.ObjectIdentifier);
    exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_5.OctetString);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_6.Sequence);
    exports.AlgorithmIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1Node))
    }, {}));
    exports.ECDSAWithSHA256 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.2")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.ECDSAWithSHA384 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.3")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.ECDSAWithSHA512 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.10045.4.3.4")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.SHA256WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.11")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.SHA384WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.12")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.SHA512WithRSAEncryption = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.13")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.AES128CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.2")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.AES192CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.22")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.AES256CBCIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.16.840.1.101.3.4.1.42")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.HMACSHA1Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.7")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA224Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.8")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA256Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.9")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA384Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.10")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA512Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.11")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA512224Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.12")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.HMACSHA512256Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.2.13")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.PBKDF2Identifier1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12")
        }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
            "data": autoguard.guards.Tuple.of(autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ASN1OctetString), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier)), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
        }, {})))
    }, {}));
    exports.PBKDF2Identifier2 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.12")
        }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
            "data": autoguard.guards.Tuple.of(autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ASN1OctetString), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier)), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
        }, {})))
    }, {}));
    exports.PBKDF2Identifier = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.PBKDF2Identifier1), autoguard.guards.Reference.of(() => exports.PBKDF2Identifier2));
    exports.PBES2Identifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.5.13")
        }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier))
        }, {})))
    }, {}));
    exports.EncryptedPrivateKeyInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1Node": autoguard.guards.Reference.of(() => exports.ASN1Node),
            "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
            "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
            "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "AlgorithmIdentifier": autoguard.guards.Reference.of(() => exports.AlgorithmIdentifier),
            "ECDSAWithSHA256": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA256),
            "ECDSAWithSHA384": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA384),
            "ECDSAWithSHA512": autoguard.guards.Reference.of(() => exports.ECDSAWithSHA512),
            "SHA256WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA256WithRSAEncryption),
            "SHA384WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA384WithRSAEncryption),
            "SHA512WithRSAEncryption": autoguard.guards.Reference.of(() => exports.SHA512WithRSAEncryption),
            "AES128CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES128CBCIdentifier),
            "AES192CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES192CBCIdentifier),
            "AES256CBCIdentifier": autoguard.guards.Reference.of(() => exports.AES256CBCIdentifier),
            "HMACSHA1Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA1Identifier),
            "HMACSHA224Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA224Identifier),
            "HMACSHA256Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA256Identifier),
            "HMACSHA384Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA384Identifier),
            "HMACSHA512Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512Identifier),
            "HMACSHA512224Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512224Identifier),
            "HMACSHA512256Identifier": autoguard.guards.Reference.of(() => exports.HMACSHA512256Identifier),
            "PBKDF2Identifier1": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier1),
            "PBKDF2Identifier2": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier2),
            "PBKDF2Identifier": autoguard.guards.Reference.of(() => exports.PBKDF2Identifier),
            "PBES2Identifier": autoguard.guards.Reference.of(() => exports.PBES2Identifier),
            "EncryptedPrivateKeyInfo": autoguard.guards.Reference.of(() => exports.EncryptedPrivateKeyInfo)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/pkcs5/algorithm/cipher/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/pkcs5/schema/index"], function (require, exports, libcrypto, asn1, schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AES256CBCAlgorithm = exports.AES192CBCAlgorithm = exports.AES128CBCAlgorithm = exports.fromIdentifier = void 0;
    ;
    function fromIdentifier(node) {
        try {
            return AES128CBCAlgorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return AES192CBCAlgorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return AES256CBCAlgorithm.fromIdentifier(node);
        }
        catch (error) { }
        throw `Expected cipher algorithm to be known!`;
    }
    exports.fromIdentifier = fromIdentifier;
    ;
    class AES128CBCAlgorithm {
        constructor(options) {
            var _a;
            this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
        }
        decrypt(ciphertext, key) {
            let decipher = libcrypto.createDecipheriv("aes-128-cbc", key, this.iv);
            let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            return plaintext;
        }
        encrypt(plaintext, key) {
            let cipher = libcrypto.createCipheriv("aes-128-cbc", key, this.iv);
            let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
            return ciphertext;
        }
        getKeyLength() {
            return 16;
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.2" }),
                    Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
                ] });
        }
        static fromIdentifier(node) {
            if (schema.AES128CBCIdentifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let iv = Buffer.from(optionsNode.data, "base64url");
                return new AES128CBCAlgorithm({
                    iv
                });
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.AES128CBCAlgorithm = AES128CBCAlgorithm;
    ;
    class AES192CBCAlgorithm {
        constructor(options) {
            var _a;
            this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
        }
        decrypt(ciphertext, key) {
            let decipher = libcrypto.createDecipheriv("aes-192-cbc", key, this.iv);
            let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            return plaintext;
        }
        encrypt(plaintext, key) {
            let cipher = libcrypto.createCipheriv("aes-192-cbc", key, this.iv);
            let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
            return ciphertext;
        }
        getKeyLength() {
            return 24;
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.22" }),
                    Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
                ] });
        }
        static fromIdentifier(node) {
            if (schema.AES192CBCIdentifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let iv = Buffer.from(optionsNode.data, "base64url");
                return new AES192CBCAlgorithm({
                    iv
                });
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.AES192CBCAlgorithm = AES192CBCAlgorithm;
    ;
    class AES256CBCAlgorithm {
        constructor(options) {
            var _a;
            this.iv = (_a = options === null || options === void 0 ? void 0 : options.iv) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
        }
        decrypt(ciphertext, key) {
            let decipher = libcrypto.createDecipheriv("aes-256-cbc", key, this.iv);
            let plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
            return plaintext;
        }
        encrypt(plaintext, key) {
            let cipher = libcrypto.createCipheriv("aes-256-cbc", key, this.iv);
            let ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
            return ciphertext;
        }
        getKeyLength() {
            return 32;
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.16.840.1.101.3.4.1.42" }),
                    Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.iv.toString("base64url") })
                ] });
        }
        static fromIdentifier(node) {
            if (schema.AES256CBCIdentifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let iv = Buffer.from(optionsNode.data, "base64url");
                return new AES256CBCAlgorithm({
                    iv
                });
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.AES256CBCAlgorithm = AES256CBCAlgorithm;
    ;
});
define("build/mod/pkcs5/algorithm/digest/index", ["require", "exports", "build/mod/asn1/index", "build/mod/pkcs5/schema/index"], function (require, exports, asn1, schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HMACSHA512256Algorithm = exports.HMACSHA512224Algorithm = exports.HMACSHA512Algorithm = exports.HMACSHA384Algorithm = exports.HMACSHA256Algorithm = exports.HMACSHA224Algorithm = exports.HMACSHA1Algorithm = exports.fromIdentifier = void 0;
    ;
    function fromIdentifier(node) {
        try {
            return HMACSHA1Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA224Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA256Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA384Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA512Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA512224Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return HMACSHA512256Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        throw `Expected digest algorithm to be known!`;
    }
    exports.fromIdentifier = fromIdentifier;
    ;
    class HMACSHA1Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.7" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha1";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA1Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA1Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA1Algorithm = HMACSHA1Algorithm;
    ;
    class HMACSHA224Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.8" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha224";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA224Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA224Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA224Algorithm = HMACSHA224Algorithm;
    ;
    class HMACSHA256Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.9" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha256";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA256Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA256Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA256Algorithm = HMACSHA256Algorithm;
    ;
    class HMACSHA384Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.10" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha384";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA384Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA384Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA384Algorithm = HMACSHA384Algorithm;
    ;
    class HMACSHA512Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.11" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha512";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA512Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA512Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA512Algorithm = HMACSHA512Algorithm;
    ;
    class HMACSHA512224Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.12" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha512-224";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA512224Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA512224Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA512224Algorithm = HMACSHA512224Algorithm;
    ;
    class HMACSHA512256Algorithm {
        constructor(options) {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.2.13" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getType() {
            return "sha512-256";
        }
        static fromIdentifier(node) {
            if (schema.HMACSHA512256Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new HMACSHA512256Algorithm();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.HMACSHA512256Algorithm = HMACSHA512256Algorithm;
    ;
});
define("build/mod/pkcs5/algorithm/derivation/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/pkcs5/algorithm/digest/index", "build/mod/pkcs5/schema/index"], function (require, exports, libcrypto, asn1, digest, schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PBKDF2Algorithm = exports.fromIdentifier = void 0;
    ;
    function fromIdentifier(node) {
        try {
            return PBKDF2Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        throw `Expected derivation algorithm to be known!`;
    }
    exports.fromIdentifier = fromIdentifier;
    ;
    class PBKDF2Algorithm {
        constructor(options) {
            var _a, _b, _c;
            this.salt = (_a = options === null || options === void 0 ? void 0 : options.salt) !== null && _a !== void 0 ? _a : libcrypto.randomBytes(16);
            this.iterations = (_b = options === null || options === void 0 ? void 0 : options.iterations) !== null && _b !== void 0 ? _b : 2048;
            this.keyLength = options === null || options === void 0 ? void 0 : options.keyLength;
            this.digestAlgorithm = (_c = options === null || options === void 0 ? void 0 : options.digestAlgorithm) !== null && _c !== void 0 ? _c : new digest.HMACSHA256Algorithm();
        }
        deriveKey(passphrase, defaultKeyLength) {
            var _a;
            return libcrypto.pbkdf2Sync(passphrase, this.salt, this.iterations, (_a = this.keyLength) !== null && _a !== void 0 ? _a : defaultKeyLength, this.digestAlgorithm.getType());
        }
        getIdentifier() {
            if (this.keyLength == null) {
                return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.12" }),
                        Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.salt.toString("base64url") }),
                                Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url") }),
                                Object.assign({}, this.digestAlgorithm.getIdentifier())
                            ] })
                    ] });
            }
            else {
                return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.12" }),
                        Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: this.salt.toString("base64url") }),
                                Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.iterations)).toString("base64url") }),
                                Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(this.keyLength)).toString("base64url") }),
                                Object.assign({}, this.digestAlgorithm.getIdentifier())
                            ] })
                    ] });
            }
        }
        static fromIdentifier(node) {
            if (schema.PBKDF2Identifier1.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let [saltNode, iterationsNode, keyLengthNode, digestNode] = optionsNode.data;
                if (asn1.OctetString.is(saltNode)) {
                    let salt = Buffer.from(saltNode.data, "base64url");
                    let iterations = Buffer.from(iterationsNode.data, "base64url");
                    let keyLength = Buffer.from(keyLengthNode.data, "base64url");
                    let digestAlgorithm = digest.fromIdentifier(digestNode);
                    return new PBKDF2Algorithm({
                        salt,
                        iterations: Number(asn1.decodeInteger(iterations)),
                        keyLength: Number(asn1.decodeInteger(keyLength)),
                        digestAlgorithm
                    });
                }
            }
            if (schema.PBKDF2Identifier2.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let [saltNode, iterationsNode, digestNode] = optionsNode.data;
                if (asn1.OctetString.is(saltNode)) {
                    let salt = Buffer.from(saltNode.data, "base64url");
                    let iterations = Buffer.from(iterationsNode.data, "base64url");
                    let digestAlgorithm = digest.fromIdentifier(digestNode);
                    return new PBKDF2Algorithm({
                        salt,
                        iterations: Number(asn1.decodeInteger(iterations)),
                        digestAlgorithm
                    });
                }
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.PBKDF2Algorithm = PBKDF2Algorithm;
    ;
});
define("build/mod/pkcs5/algorithm/signature/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/pkcs5/schema/index"], function (require, exports, libcrypto, asn1, schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SHA512WithRSAEncryption = exports.SHA384WithRSAEncryption = exports.SHA256WithRSAEncryption = exports.ECDSAWithSHA512 = exports.ECDSAWithSHA384 = exports.ECDSAWithSHA256 = exports.fromJoseType = exports.fromIdentifier = void 0;
    ;
    function fromIdentifier(node) {
        try {
            return ECDSAWithSHA256.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return ECDSAWithSHA384.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return ECDSAWithSHA512.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return SHA256WithRSAEncryption.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return SHA384WithRSAEncryption.fromIdentifier(node);
        }
        catch (error) { }
        try {
            return SHA512WithRSAEncryption.fromIdentifier(node);
        }
        catch (error) { }
        throw `Expected signature algorithm to be known!`;
    }
    exports.fromIdentifier = fromIdentifier;
    ;
    function fromJoseType(joseType) {
        if (joseType === "ES256") {
            return new ECDSAWithSHA256();
        }
        if (joseType === "ES384") {
            return new ECDSAWithSHA384();
        }
        if (joseType === "ES512") {
            return new ECDSAWithSHA512();
        }
        if (joseType === "RS256") {
            return new SHA256WithRSAEncryption();
        }
        if (joseType === "RS384") {
            return new SHA384WithRSAEncryption();
        }
        if (joseType === "RS512") {
            return new SHA512WithRSAEncryption();
        }
        throw `Expected signature algorithm to be known!`;
    }
    exports.fromJoseType = fromJoseType;
    ;
    class ECDSAWithSHA256 {
        constructor(options) {
            var _a;
            this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.2" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "ES256";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha256");
            sign.update(buffer);
            return sign.sign({
                key,
                dsaEncoding: this.format
            });
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha256");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.ECDSAWithSHA256.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new ECDSAWithSHA256();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.ECDSAWithSHA256 = ECDSAWithSHA256;
    ;
    class ECDSAWithSHA384 {
        constructor(options) {
            var _a;
            this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.3" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "ES384";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha384");
            sign.update(buffer);
            return sign.sign({
                key,
                dsaEncoding: this.format
            });
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha384");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.ECDSAWithSHA384.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new ECDSAWithSHA384();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.ECDSAWithSHA384 = ECDSAWithSHA384;
    ;
    class ECDSAWithSHA512 {
        constructor(options) {
            var _a;
            this.format = (_a = options === null || options === void 0 ? void 0 : options.format) !== null && _a !== void 0 ? _a : "ieee-p1363";
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.4.3.4" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "ES512";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha512");
            sign.update(buffer);
            return sign.sign({
                key,
                dsaEncoding: this.format
            });
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha512");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.ECDSAWithSHA512.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new ECDSAWithSHA512();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.ECDSAWithSHA512 = ECDSAWithSHA512;
    ;
    class SHA256WithRSAEncryption {
        constructor() {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.11" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "RS256";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha256");
            sign.update(buffer);
            return sign.sign(key);
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha256");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.SHA256WithRSAEncryption.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new SHA256WithRSAEncryption();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.SHA256WithRSAEncryption = SHA256WithRSAEncryption;
    ;
    class SHA384WithRSAEncryption {
        constructor() {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.12" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "RS384";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha384");
            sign.update(buffer);
            return sign.sign(key);
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha384");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.SHA384WithRSAEncryption.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new SHA384WithRSAEncryption();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.SHA384WithRSAEncryption = SHA384WithRSAEncryption;
    ;
    class SHA512WithRSAEncryption {
        constructor() {
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.13" }),
                    Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                ] });
        }
        getJoseType() {
            return "RS512";
        }
        sign(buffer, key) {
            let sign = libcrypto.createSign("sha512");
            sign.update(buffer);
            return sign.sign(key);
        }
        verify(buffer, key, signature) {
            let verify = libcrypto.createVerify("sha512");
            verify.update(buffer);
            return verify.verify(key, signature);
        }
        static fromIdentifier(node) {
            if (schema.SHA512WithRSAEncryption.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                return new SHA512WithRSAEncryption();
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.SHA512WithRSAEncryption = SHA512WithRSAEncryption;
    ;
});
define("build/mod/pkcs5/algorithm/wrapping/index", ["require", "exports", "build/mod/asn1/index", "build/mod/pkcs5/algorithm/cipher/index", "build/mod/pkcs5/algorithm/derivation/index", "build/mod/pkcs5/schema/index"], function (require, exports, asn1, cipher, derivation, schema) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PBES2Algorithm = exports.fromIdentifier = void 0;
    ;
    function fromIdentifier(node) {
        try {
            return PBES2Algorithm.fromIdentifier(node);
        }
        catch (error) { }
        throw `Expected wrapping algorithm to be known!`;
    }
    exports.fromIdentifier = fromIdentifier;
    ;
    class PBES2Algorithm {
        constructor(options) {
            var _a, _b;
            this.derivationAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.derivationAlgorithm) !== null && _a !== void 0 ? _a : new derivation.PBKDF2Algorithm();
            this.cipherAlgorithm = (_b = options === null || options === void 0 ? void 0 : options.cipherAlgorithm) !== null && _b !== void 0 ? _b : new cipher.AES256CBCAlgorithm();
        }
        unwrap(ciphertext, passhprase) {
            let keyLength = this.cipherAlgorithm.getKeyLength();
            let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
            let plaintext = this.cipherAlgorithm.decrypt(ciphertext, key);
            return plaintext;
        }
        wrap(plaintext, passhprase) {
            let keyLength = this.cipherAlgorithm.getKeyLength();
            let key = this.derivationAlgorithm.deriveKey(passhprase, keyLength);
            let ciphertext = this.cipherAlgorithm.encrypt(plaintext, key);
            return ciphertext;
        }
        getIdentifier() {
            return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                    Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.5.13" }),
                    Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign({}, this.derivationAlgorithm.getIdentifier()),
                            Object.assign({}, this.cipherAlgorithm.getIdentifier())
                        ] })
                ] });
        }
        static fromIdentifier(node) {
            if (schema.PBES2Identifier.is(node)) {
                let [algorithmNode, optionsNode] = node.data;
                let [derivationNode, cipherNode] = optionsNode.data;
                let derivationAlgorithm = derivation.fromIdentifier(derivationNode);
                let cipherAlgorithm = cipher.fromIdentifier(cipherNode);
                return new PBES2Algorithm({
                    derivationAlgorithm,
                    cipherAlgorithm
                });
            }
            throw `Expected the algorithm expressed using ASN1 syntax!`;
        }
    }
    exports.PBES2Algorithm = PBES2Algorithm;
    ;
});
define("build/mod/pkcs5/algorithm/index", ["require", "exports", "build/mod/pkcs5/algorithm/cipher/index", "build/mod/pkcs5/algorithm/derivation/index", "build/mod/pkcs5/algorithm/digest/index", "build/mod/pkcs5/algorithm/signature/index", "build/mod/pkcs5/algorithm/wrapping/index"], function (require, exports, cipher, derivation, digest, signature, wrapping) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapping = exports.signature = exports.digest = exports.derivation = exports.cipher = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrapping = exports.signature = exports.digest = exports.derivation = exports.cipher = void 0;
    exports.cipher = cipher;
    exports.derivation = derivation;
    exports.digest = digest;
    exports.signature = signature;
    exports.wrapping = wrapping;
});
define("build/mod/der/utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeLength = exports.encodeLength = exports.decodeVarlen = exports.encodeVarlen = void 0;
    function encodeVarlen(number) {
        if (!Number.isInteger(number) || number < 0) {
            throw `Expected an unsigned integer!`;
        }
        let bytes = new Array();
        while (true) {
            let byte = number % 128;
            bytes.push(byte);
            number = Math.floor(number / 128);
            if (number === 0) {
                break;
            }
        }
        for (let i = 1; i < bytes.length; i++) {
            bytes[i] += 128;
        }
        bytes.reverse();
        return Buffer.from(bytes);
    }
    exports.encodeVarlen = encodeVarlen;
    ;
    function decodeVarlen(parser) {
        return parser.try(() => {
            let length = 0;
            for (let i = 0; true; i++) {
                let byte = parser.unsigned(1);
                let hi = (byte >> 7) & 0x01;
                let lo = (byte >> 0) & 0x7F;
                length = (length * 128) + lo;
                if (hi === 0) {
                    break;
                }
                if (i === 0 && lo === 0) {
                    throw `Expected a minimally encoded varlen!`;
                }
                if (i === 4) {
                    throw `Expected a reasonably long varlen encoding!`;
                }
            }
            return length;
        });
    }
    exports.decodeVarlen = decodeVarlen;
    ;
    function encodeLength(number) {
        if (!Number.isInteger(number) || number < 0) {
            throw `Expected an unsigned integer!`;
        }
        if (number <= 127) {
            return Buffer.of(number);
        }
        let bytes = new Array();
        while (true) {
            let byte = number % 256;
            bytes.push(byte);
            number = Math.floor(number / 256);
            if (number === 0) {
                break;
            }
        }
        bytes.push(bytes.length + 128);
        bytes.reverse();
        return Buffer.from(bytes);
    }
    exports.encodeLength = encodeLength;
    ;
    function decodeLength(parser) {
        return parser.try(() => {
            let byte = parser.unsigned(1);
            let hi = (byte >> 7) & 0x01;
            let lo = (byte >> 0) & 0x7F;
            if (hi === 0) {
                return lo;
            }
            if (lo === 0) {
                throw `Expected a definite length!`;
            }
            if (lo > 4) {
                throw `Expected a reasonably long length encoding!`;
            }
            let length = 0;
            for (let i = 0; i < lo; i++) {
                let byte = parser.unsigned(1);
                length = (length * 256) + byte;
                if (i === 0 && byte === 0) {
                    throw `Expected a minimally encoded length!`;
                }
            }
            if (length <= 127) {
                throw `Expected a minimally encoded length!`;
            }
            return length;
        });
    }
    exports.decodeLength = decodeLength;
    ;
});
define("build/mod/der/oid", ["require", "exports", "build/mod/der/utils"], function (require, exports, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = exports.parse = void 0;
    function parse(parser) {
        return parser.try(() => {
            let arcs = new Array();
            let arc = utils.decodeVarlen(parser);
            let root = Math.min(Math.floor(arc / 40), 2);
            let second = arc - (root * 40);
            arcs.push(root);
            arcs.push(second);
            while (!parser.eof()) {
                let arc = utils.decodeVarlen(parser);
                arcs.push(arc);
            }
            return arcs;
        });
    }
    exports.parse = parse;
    ;
    function serialize(arcs) {
        for (let arc of arcs) {
            if (!Number.isInteger(arc) || arc < 0) {
                throw `Expected an unsigned integer!`;
            }
        }
        if (arcs.length < 2) {
            throw `Expected at least two arcs!`;
        }
        let root = arcs[0];
        let second = arcs[1];
        if (root > 2) {
            throw `Expected the root arc to be at most 2!`;
        }
        else if (root < 2 && second >= 40) {
            throw `Expected the second arc to be at most 39!`;
        }
        let buffers = new Array();
        buffers.push(utils.encodeVarlen((root * 40) + second));
        for (let i = 2; i < arcs.length; i++) {
            buffers.push(utils.encodeVarlen(arcs[i]));
        }
        return Buffer.concat(buffers);
    }
    exports.serialize = serialize;
    ;
});
define("build/mod/parsing/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    class Parser {
        constructor(buffer, offset) {
            this.buffer = buffer;
            this.offset = offset !== null && offset !== void 0 ? offset : 0;
        }
        chunk(length) {
            if (this.offset + length > this.buffer.length) {
                throw `Expected to read at least ${length} bytes!`;
            }
            let buffer = this.buffer.slice(this.offset, this.offset + length);
            this.offset += length;
            return buffer;
        }
        eof() {
            return this.offset >= this.buffer.length;
        }
        signed(length, endian) {
            if (endian === "little") {
                let value = this.buffer.readIntLE(this.offset, length);
                this.offset += length;
                return value;
            }
            else {
                let value = this.buffer.readIntBE(this.offset, length);
                this.offset += length;
                return value;
            }
        }
        try(supplier) {
            let offset = this.offset;
            try {
                return supplier(this);
            }
            catch (error) {
                this.offset = offset;
                throw error;
            }
        }
        unsigned(length, endian) {
            if (endian === "little") {
                let value = this.buffer.readUIntLE(this.offset, length);
                this.offset += length;
                return value;
            }
            else {
                let value = this.buffer.readUIntBE(this.offset, length);
                this.offset += length;
                return value;
            }
        }
    }
    exports.Parser = Parser;
    ;
});
define("build/mod/der/node", ["require", "exports", "build/mod/asn1/index", "build/mod/der/oid", "build/mod/parsing/index", "build/mod/der/utils"], function (require, exports, asn1, oid, parsing, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeArray = exports.parseArray = exports.serialize = exports.parse = void 0;
    function parse(parser) {
        return parser.try(() => {
            let tag = parser.unsigned(1);
            let kind = asn1.Kind.keyFromValue((tag >> 6) & 0x03);
            let form = asn1.Form.keyFromValue((tag >> 5) & 0x01);
            let type = asn1.Type.keyFromValue((tag >> 0) & 0x1F);
            // The value 31 is special and denotes a varlen encoded type.
            if (asn1.Type[type] === 31) {
                let length = utils.decodeVarlen(parser);
                if (length < 31) {
                    throw `Expected a minimally encoded type!`;
                }
                type = asn1.Type.keyFromValue(length);
            }
            let length = utils.decodeLength(parser);
            let buffer = parser.chunk(length);
            let node = {
                kind,
                form,
                type,
                data: form === "CONSTRUCTED" ? parseArray(new parsing.Parser(buffer)) : buffer.toString("base64url")
            };
            if (asn1.ObjectIdentifier.is(node)) {
                let parser = new parsing.Parser(buffer);
                node.data = oid.parse(parser).join(".");
            }
            return node;
        });
    }
    exports.parse = parse;
    ;
    function serialize(node) {
        let buffers = new Array();
        let kind = asn1.Kind[node.kind];
        let form = asn1.Form[node.form];
        let type = asn1.Type[node.type];
        let data = node.data;
        let extended = type >= 31;
        let tag = 0;
        tag |= (kind << 6);
        tag |= (form << 5);
        tag |= ((extended ? 31 : type) << 0);
        buffers.push(Buffer.of(tag));
        if (extended) {
            buffers.push(utils.encodeVarlen(type));
        }
        if (typeof data === "string") {
            let buffer = Buffer.alloc(0);
            if (asn1.ObjectIdentifier.is(node)) {
                let numbers = node.data.split(".").map((part) => Number.parseInt(part));
                buffer = oid.serialize(numbers);
            }
            else {
                buffer = Buffer.from(data, "base64url");
            }
            buffers.push(utils.encodeLength(buffer.length));
            buffers.push(buffer);
        }
        else {
            let subbuffers = new Array();
            for (let node of data) {
                subbuffers.push(serialize(node));
            }
            let buffer = Buffer.concat(subbuffers);
            buffers.push(utils.encodeLength(buffer.length));
            buffers.push(buffer);
        }
        return Buffer.concat(buffers);
    }
    exports.serialize = serialize;
    ;
    function parseArray(parser) {
        return parser.try(() => {
            let nodes = new Array();
            while (!parser.eof()) {
                let node = parse(parser);
                nodes.push(node);
            }
            return nodes;
        });
    }
    exports.parseArray = parseArray;
    ;
    function serializeArray(nodes) {
        let buffers = new Array();
        for (let node of nodes) {
            let buffer = serialize(node);
            buffers.push(buffer);
        }
        return Buffer.concat(buffers);
    }
    exports.serializeArray = serializeArray;
    ;
});
define("build/mod/der/index", ["require", "exports", "build/mod/der/node", "build/mod/der/oid", "build/mod/der/utils"], function (require, exports, node, oid, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = exports.oid = exports.node = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.utils = exports.oid = exports.node = void 0;
    exports.node = node;
    exports.oid = oid;
    exports.utils = utils;
});
define("build/mod/pkcs5/index", ["require", "exports", "build/mod/pkcs5/algorithm/index", "build/mod/asn1/index", "build/mod/der/index", "build/mod/parsing/index", "build/mod/pkcs5/schema/index", "build/mod/pkcs5/algorithm/index", "build/mod/pkcs5/schema/index"], function (require, exports, algorithm, asn1, der, parsing, schema, algorithm_1, schema_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encrypt = exports.decrypt = void 0;
    __exportStar(algorithm_1, exports);
    __exportStar(schema_3, exports);
    function decrypt(buffer, passphrase) {
        let parser = new parsing.Parser(buffer);
        let node = der.node.parse(parser);
        if (schema.EncryptedPrivateKeyInfo.is(node)) {
            let [wrappingNode, ciphertextNode] = node.data;
            let wrappingAlgorithm = algorithm.wrapping.fromIdentifier(wrappingNode);
            let ciphertext = Buffer.from(ciphertextNode.data, "base64url");
            let plaintext = wrappingAlgorithm.unwrap(ciphertext, passphrase);
            return plaintext;
        }
        throw `Expected an encrypted buffer!`;
    }
    exports.decrypt = decrypt;
    ;
    function encrypt(plaintext, passphrase, options) {
        var _a;
        let wrappingAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.wrappingAlgorithm) !== null && _a !== void 0 ? _a : new algorithm.wrapping.PBES2Algorithm();
        let ciphertext = wrappingAlgorithm.wrap(plaintext, passphrase);
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign({}, wrappingAlgorithm.getIdentifier()),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: ciphertext.toString("base64url") })
            ] });
        return der.node.serialize(node);
    }
    exports.encrypt = encrypt;
    ;
});
define("build/mod/jws/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Body = exports.Protected = exports.SignatureAlgorithm = void 0;
    var SignatureAlgorithm;
    (function (SignatureAlgorithm) {
        SignatureAlgorithm[SignatureAlgorithm["HS256"] = 0] = "HS256";
        SignatureAlgorithm[SignatureAlgorithm["HS384"] = 1] = "HS384";
        SignatureAlgorithm[SignatureAlgorithm["HS512"] = 2] = "HS512";
        SignatureAlgorithm[SignatureAlgorithm["RS256"] = 3] = "RS256";
        SignatureAlgorithm[SignatureAlgorithm["RS384"] = 4] = "RS384";
        SignatureAlgorithm[SignatureAlgorithm["RS512"] = 5] = "RS512";
        SignatureAlgorithm[SignatureAlgorithm["ES256"] = 6] = "ES256";
        SignatureAlgorithm[SignatureAlgorithm["ES384"] = 7] = "ES384";
        SignatureAlgorithm[SignatureAlgorithm["ES512"] = 8] = "ES512";
        SignatureAlgorithm[SignatureAlgorithm["PS256"] = 9] = "PS256";
        SignatureAlgorithm[SignatureAlgorithm["PS384"] = 10] = "PS384";
        SignatureAlgorithm[SignatureAlgorithm["PS512"] = 11] = "PS512";
    })(SignatureAlgorithm = exports.SignatureAlgorithm || (exports.SignatureAlgorithm = {}));
    ;
    (function (SignatureAlgorithm) {
        SignatureAlgorithm.Key = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("HS256"), autoguard.guards.StringLiteral.of("HS384"), autoguard.guards.StringLiteral.of("HS512"), autoguard.guards.StringLiteral.of("RS256"), autoguard.guards.StringLiteral.of("RS384"), autoguard.guards.StringLiteral.of("RS512"), autoguard.guards.StringLiteral.of("ES256"), autoguard.guards.StringLiteral.of("ES384"), autoguard.guards.StringLiteral.of("ES512"), autoguard.guards.StringLiteral.of("PS256"), autoguard.guards.StringLiteral.of("PS384"), autoguard.guards.StringLiteral.of("PS512"));
        SignatureAlgorithm.Value = autoguard.guards.Union.of(autoguard.guards.NumberLiteral.of(0), autoguard.guards.NumberLiteral.of(1), autoguard.guards.NumberLiteral.of(2), autoguard.guards.NumberLiteral.of(3), autoguard.guards.NumberLiteral.of(4), autoguard.guards.NumberLiteral.of(5), autoguard.guards.NumberLiteral.of(6), autoguard.guards.NumberLiteral.of(7), autoguard.guards.NumberLiteral.of(8), autoguard.guards.NumberLiteral.of(9), autoguard.guards.NumberLiteral.of(10), autoguard.guards.NumberLiteral.of(11));
        function keyFromValue(value) {
            return SignatureAlgorithm.Key.as(SignatureAlgorithm[SignatureAlgorithm.Value.as(value)]);
        }
        SignatureAlgorithm.keyFromValue = keyFromValue;
        ;
        function valueFromKey(key) {
            return SignatureAlgorithm.Value.as(SignatureAlgorithm[SignatureAlgorithm.Key.as(key)]);
        }
        SignatureAlgorithm.valueFromKey = valueFromKey;
        ;
    })(SignatureAlgorithm = exports.SignatureAlgorithm || (exports.SignatureAlgorithm = {}));
    ;
    exports.Protected = autoguard.guards.Object.of({
        "alg": autoguard.guards.Reference.of(() => SignatureAlgorithm.Key)
    }, {});
    exports.Body = autoguard.guards.Object.of({
        "protected": autoguard.guards.String,
        "payload": autoguard.guards.String,
        "signature": autoguard.guards.String
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Protected": autoguard.guards.Reference.of(() => exports.Protected),
            "Body": autoguard.guards.Reference.of(() => exports.Body)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/jws/index", ["require", "exports", "build/mod/jwk/index", "build/mod/pkcs5/index", "build/mod/jws/schema/index", "build/mod/jws/schema/index"], function (require, exports, jwk, pkcs5, schema, schema_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.verify = exports.sign = exports.getDefaultAlgorithm = void 0;
    __exportStar(schema_4, exports);
    function encode(json) {
        if (json === undefined) {
            return "";
        }
        let string = JSON.stringify(json);
        let buffer = Buffer.from(string);
        return buffer.toString("base64url");
    }
    ;
    function getDefaultAlgorithm(key) {
        let keyJwk = key.export({ format: "jwk" });
        if (jwk.RSAPublicKey.is(keyJwk)) {
            return new pkcs5.signature.SHA256WithRSAEncryption();
        }
        if (jwk.ECPublicKey.is(keyJwk)) {
            if (keyJwk.crv === "P-256") {
                return new pkcs5.signature.ECDSAWithSHA256();
            }
            if (keyJwk.crv === "P-384") {
                return new pkcs5.signature.ECDSAWithSHA384();
            }
            if (keyJwk.crv === "P-521") {
                return new pkcs5.signature.ECDSAWithSHA512();
            }
        }
        throw `Expected code to be unreachable!`;
    }
    exports.getDefaultAlgorithm = getDefaultAlgorithm;
    ;
    function sign(key, options) {
        var _a;
        let signatureAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _a !== void 0 ? _a : getDefaultAlgorithm(key);
        let protected_base64url = encode(Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.protected), { alg: signatureAlgorithm.getJoseType() }));
        let payload_base64url = encode(options === null || options === void 0 ? void 0 : options.payload);
        let signature = signatureAlgorithm.sign(Buffer.from(`${protected_base64url}.${payload_base64url}`), key);
        let signature_base64url = signature.toString("base64url");
        return {
            protected: protected_base64url,
            payload: payload_base64url,
            signature: signature_base64url
        };
    }
    exports.sign = sign;
    ;
    function verify(body, key) {
        let signature = Buffer.from(body.signature, "base64url");
        let joseType = schema.Protected.as(JSON.parse(Buffer.from(body.protected, "base64url").toString())).alg;
        let signatureAlgorithm = pkcs5.signature.fromJoseType(joseType);
        return signatureAlgorithm.verify(Buffer.from(`${body.protected}.${body.payload}`), key, signature);
    }
    exports.verify = verify;
    ;
});
define("build/mod/acme/api/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/jwk/index", "build/mod/jws/index"], function (require, exports, autoguard, jwk_1, jws_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.FinalizeOrderPayload = exports.CreateOrderPayload = exports.CreateAccountPayload = exports.ProtectedWithKID = exports.ProtectedWithJWK = exports.Protected = exports.Order = exports.Identifier = exports.Directory = exports.ChallengeTLSALPN01 = exports.ChallengeDNS01 = exports.ChallengeHTTP01 = exports.Challenge = exports.Authorization = exports.Account = void 0;
    exports.Account = autoguard.guards.Object.of({
        "status": autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("valid"), autoguard.guards.StringLiteral.of("deactivated"), autoguard.guards.StringLiteral.of("revoked"))
    }, {
        "contact": autoguard.guards.Array.of(autoguard.guards.String),
        "externalAccountBinding": autoguard.guards.Object.of({}, {}),
        "orders": autoguard.guards.String,
        "termsOfServiceAgreed": autoguard.guards.Boolean
    });
    exports.Authorization = autoguard.guards.Object.of({
        "identifier": autoguard.guards.Reference.of(() => exports.Identifier),
        "status": autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("pending"), autoguard.guards.StringLiteral.of("valid"), autoguard.guards.StringLiteral.of("invalid"), autoguard.guards.StringLiteral.of("deactivated"), autoguard.guards.StringLiteral.of("expired"), autoguard.guards.StringLiteral.of("revoked")),
        "challenges": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Challenge))
    }, {
        "expires": autoguard.guards.String,
        "wildcard": autoguard.guards.Boolean
    });
    exports.Challenge = autoguard.guards.Object.of({
        "status": autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("pending"), autoguard.guards.StringLiteral.of("processing"), autoguard.guards.StringLiteral.of("valid"), autoguard.guards.StringLiteral.of("invalid")),
        "type": autoguard.guards.String,
        "url": autoguard.guards.String
    }, {
        "error": autoguard.guards.Object.of({}, {}),
        "validated": autoguard.guards.String
    });
    exports.ChallengeHTTP01 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Challenge), autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("http-01"),
        "token": autoguard.guards.String
    }, {}));
    exports.ChallengeDNS01 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Challenge), autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("dns-01"),
        "token": autoguard.guards.String
    }, {}));
    exports.ChallengeTLSALPN01 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Challenge), autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("tls-alpn-01"),
        "token": autoguard.guards.String
    }, {}));
    exports.Directory = autoguard.guards.Object.of({
        "keyChange": autoguard.guards.String,
        "newAccount": autoguard.guards.String,
        "newNonce": autoguard.guards.String,
        "newOrder": autoguard.guards.String,
        "revokeCert": autoguard.guards.String
    }, {
        "meta": autoguard.guards.Object.of({}, {
            "caaIdentities": autoguard.guards.Array.of(autoguard.guards.String),
            "externalAccountRequired": autoguard.guards.Boolean,
            "termsOfService": autoguard.guards.String,
            "website": autoguard.guards.String
        }),
        "newAuthz": autoguard.guards.String
    });
    exports.Identifier = autoguard.guards.Object.of({
        "type": autoguard.guards.StringLiteral.of("dns"),
        "value": autoguard.guards.String
    }, {});
    exports.Order = autoguard.guards.Object.of({
        "authorizations": autoguard.guards.Array.of(autoguard.guards.String),
        "finalize": autoguard.guards.String,
        "identifiers": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Identifier)),
        "status": autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("pending"), autoguard.guards.StringLiteral.of("ready"), autoguard.guards.StringLiteral.of("processing"), autoguard.guards.StringLiteral.of("valid"), autoguard.guards.StringLiteral.of("invalid"))
    }, {
        "certificate": autoguard.guards.String,
        "error": autoguard.guards.Object.of({}, {}),
        "expires": autoguard.guards.String,
        "notBefore": autoguard.guards.String,
        "notAfter": autoguard.guards.String
    });
    exports.Protected = autoguard.guards.Object.of({
        "nonce": autoguard.guards.String,
        "url": autoguard.guards.String
    }, {});
    exports.ProtectedWithJWK = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Protected), autoguard.guards.Object.of({
        "jwk": autoguard.guards.Reference.of(() => jwk_1.AssymetricKey)
    }, {}));
    exports.ProtectedWithKID = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.Protected), autoguard.guards.Object.of({
        "kid": autoguard.guards.String
    }, {}));
    exports.CreateAccountPayload = autoguard.guards.Object.of({}, {
        "contact": autoguard.guards.Array.of(autoguard.guards.String),
        "termsOfServiceAgreed": autoguard.guards.Boolean,
        "onlyReturnExisting": autoguard.guards.Boolean,
        "externalAccountBinding": autoguard.guards.Object.of({}, {})
    });
    exports.CreateOrderPayload = autoguard.guards.Object.of({
        "identifiers": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Identifier))
    }, {
        "notBefore": autoguard.guards.String,
        "notAfter": autoguard.guards.String
    });
    exports.FinalizeOrderPayload = autoguard.guards.Object.of({
        "csr": autoguard.guards.String
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Account": autoguard.guards.Reference.of(() => exports.Account),
            "Authorization": autoguard.guards.Reference.of(() => exports.Authorization),
            "Challenge": autoguard.guards.Reference.of(() => exports.Challenge),
            "ChallengeHTTP01": autoguard.guards.Reference.of(() => exports.ChallengeHTTP01),
            "ChallengeDNS01": autoguard.guards.Reference.of(() => exports.ChallengeDNS01),
            "ChallengeTLSALPN01": autoguard.guards.Reference.of(() => exports.ChallengeTLSALPN01),
            "Directory": autoguard.guards.Reference.of(() => exports.Directory),
            "Identifier": autoguard.guards.Reference.of(() => exports.Identifier),
            "Order": autoguard.guards.Reference.of(() => exports.Order),
            "Protected": autoguard.guards.Reference.of(() => exports.Protected),
            "ProtectedWithJWK": autoguard.guards.Reference.of(() => exports.ProtectedWithJWK),
            "ProtectedWithKID": autoguard.guards.Reference.of(() => exports.ProtectedWithKID),
            "CreateAccountPayload": autoguard.guards.Reference.of(() => exports.CreateAccountPayload),
            "CreateOrderPayload": autoguard.guards.Reference.of(() => exports.CreateOrderPayload),
            "FinalizeOrderPayload": autoguard.guards.Reference.of(() => exports.FinalizeOrderPayload)
        };
        Autoguard.Requests = {
            "downloadCertificate": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "finalizeChallenge": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "finalizeOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "getAccount": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "getAuthorization": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "getChallenge": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "getDirectory": autoguard.guards.Object.of({}, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            }),
            "getOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "newAccount": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            }),
            "newNonce": autoguard.guards.Object.of({}, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            }),
            "newOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "content-type": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => jws_1.Body)
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {
                    "path": autoguard.guards.Array.of(autoguard.guards.String)
                }), autoguard.api.Options)
            })
        };
        Autoguard.Responses = {
            "downloadCertificate": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers)
            }, {
                "status": autoguard.guards.Number,
                "payload": autoguard.api.Binary
            }),
            "finalizeChallenge": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Challenge)
            }, {
                "status": autoguard.guards.Number
            }),
            "finalizeOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Order)
            }, {
                "status": autoguard.guards.Number
            }),
            "getAccount": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Account)
            }, {
                "status": autoguard.guards.Number
            }),
            "getAuthorization": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Authorization)
            }, {
                "status": autoguard.guards.Number
            }),
            "getChallenge": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Challenge)
            }, {
                "status": autoguard.guards.Number
            }),
            "getDirectory": autoguard.guards.Object.of({
                "payload": autoguard.guards.Reference.of(() => exports.Directory)
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "getOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Order)
            }, {
                "status": autoguard.guards.Number
            }),
            "newAccount": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String,
                    "location": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Account)
            }, {
                "status": autoguard.guards.Number
            }),
            "newNonce": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String
                }, {}), autoguard.api.Headers)
            }, {
                "status": autoguard.guards.Number,
                "payload": autoguard.api.Binary
            }),
            "newOrder": autoguard.guards.Object.of({
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "replay-nonce": autoguard.guards.String,
                    "location": autoguard.guards.String
                }, {}), autoguard.api.Headers),
                "payload": autoguard.guards.Reference.of(() => exports.Order)
            }, {
                "status": autoguard.guards.Number
            })
        };
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-server/api", ["require", "exports", "fs", "http", "https", "path", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "node_modules/@joelek/ts-autoguard/dist/lib-shared/api"], function (require, exports, libfs, libhttp, libhttps, libpath, shared, api_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __asyncValues = (this && this.__asyncValues) || function (o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeReadStreamResponse = exports.makeDirectoryListing = exports.getContentTypeFromExtension = exports.parseRangeHeader = exports.route = exports.respond = exports.finalizeResponse = exports.acceptsMethod = exports.acceptsComponents = exports.makeNodeRequestHandler = exports.combineNodeRawHeaders = exports.DynamicRouteMatcher = exports.StaticRouteMatcher = exports.ClientRequest = exports.EndpointError = void 0;
    __exportStar(api_1, exports);
    class EndpointError {
        constructor(response) {
            this.response = response;
        }
        getResponse() {
            var _a, _b, _c;
            let status = (_a = this.response.status) !== null && _a !== void 0 ? _a : 500;
            let headers = (_b = this.response.headers) !== null && _b !== void 0 ? _b : [];
            let payload = (_c = this.response.payload) !== null && _c !== void 0 ? _c : [];
            return {
                status,
                headers,
                payload
            };
        }
    }
    exports.EndpointError = EndpointError;
    ;
    class ClientRequest {
        constructor(request, collect, auxillary) {
            this.request = request;
            this.collect = collect;
            this.auxillary = auxillary;
        }
        options() {
            let options = this.request.options;
            return Object.assign({}, options);
        }
        headers() {
            let headers = this.request.headers;
            return Object.assign({}, headers);
        }
        payload() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.collectedPayload !== undefined) {
                    return this.collectedPayload;
                }
                let payload = this.request.payload;
                let collectedPayload = (this.collect ? yield shared.api.collectPayload(payload) : payload);
                this.collectedPayload = collectedPayload;
                return collectedPayload;
            });
        }
        socket() {
            return this.auxillary.socket;
        }
    }
    exports.ClientRequest = ClientRequest;
    ;
    ;
    class StaticRouteMatcher {
        constructor(string) {
            this.string = string;
            this.accepted = false;
        }
        acceptComponent(component) {
            if (this.accepted) {
                return false;
            }
            this.accepted = component === this.string;
            return this.accepted;
        }
        getValue() {
            return this.string;
        }
        isSatisfied() {
            return this.accepted;
        }
    }
    exports.StaticRouteMatcher = StaticRouteMatcher;
    ;
    class DynamicRouteMatcher {
        constructor(minOccurences, maxOccurences, plain, guard) {
            this.minOccurences = minOccurences;
            this.maxOccurences = maxOccurences;
            this.plain = plain;
            this.guard = guard;
            this.values = new Array();
        }
        acceptComponent(component) {
            if (this.values.length >= this.maxOccurences) {
                return false;
            }
            try {
                let value = shared.api.deserializeValue(component, this.plain);
                if (this.guard.is(value)) {
                    this.values.push(value);
                    return true;
                }
            }
            catch (error) { }
            return false;
        }
        getValue() {
            if (this.maxOccurences === 1) {
                return this.values[0];
            }
            else {
                return this.values;
            }
        }
        isSatisfied() {
            return this.minOccurences <= this.values.length && this.values.length <= this.maxOccurences;
        }
    }
    exports.DynamicRouteMatcher = DynamicRouteMatcher;
    ;
    function combineNodeRawHeaders(raw) {
        let headers = new Array();
        for (let i = 0; i < raw.length; i += 2) {
            headers.push(`${raw[i + 0]}: ${raw[i + 1]}`);
        }
        return headers;
    }
    exports.combineNodeRawHeaders = combineNodeRawHeaders;
    ;
    function makeNodeRequestHandler(options) {
        return (raw, clientOptions) => {
            var _a;
            let urlPrefix = (_a = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.urlPrefix) !== null && _a !== void 0 ? _a : "";
            let lib = urlPrefix.startsWith("https:") ? libhttps : libhttp;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let payload = yield shared.api.collectPayload(raw.payload);
                let headers = {
                    "Content-Length": `${payload.length}`
                };
                for (let header of raw.headers) {
                    let key = header[0];
                    let value = header[1];
                    let values = headers[key];
                    if (values === undefined) {
                        headers[key] = value;
                    }
                    else if (Array.isArray(values)) {
                        values.push(value);
                    }
                    else {
                        headers[key] = [values, value];
                    }
                }
                let url = urlPrefix;
                url += shared.api.combineComponents(raw.components);
                url += shared.api.combineParameters(raw.parameters);
                let request = lib.request(url, Object.assign(Object.assign({}, options), { method: raw.method, headers: headers }), (response) => {
                    var _a;
                    let status = (_a = response.statusCode) !== null && _a !== void 0 ? _a : 200;
                    let headers = shared.api.splitHeaders(combineNodeRawHeaders(response.rawHeaders));
                    let payload = {
                        [Symbol.asyncIterator]: () => response[Symbol.asyncIterator]()
                    };
                    let raw = {
                        status,
                        headers,
                        payload
                    };
                    resolve(raw);
                });
                request.on("abort", reject);
                request.on("error", reject);
                request.write(payload);
                request.end();
            }));
        };
    }
    exports.makeNodeRequestHandler = makeNodeRequestHandler;
    ;
    function acceptsComponents(components, matchers) {
        let currentMatcher = 0;
        outer: for (let component of components) {
            let decoded = decodeURIComponent(component);
            if (decoded === undefined) {
                throw `Expected component to be properly encoded!`;
            }
            inner: for (let matcher of matchers.slice(currentMatcher)) {
                if (matcher.acceptComponent(decoded)) {
                    continue outer;
                }
                else {
                    if (matcher.isSatisfied()) {
                        currentMatcher += 1;
                        continue inner;
                    }
                    else {
                        break outer;
                    }
                }
            }
            break outer;
        }
        if (currentMatcher >= matchers.length) {
            return false;
        }
        for (let matcher of matchers.slice(currentMatcher)) {
            if (!matcher.isSatisfied()) {
                return false;
            }
        }
        return true;
    }
    exports.acceptsComponents = acceptsComponents;
    ;
    function acceptsMethod(one, two) {
        return one === two;
    }
    exports.acceptsMethod = acceptsMethod;
    ;
    function finalizeResponse(raw, defaultHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            let payload = raw.payload;
            if (shared.api.SyncBinary.is(payload)) {
                let collectedPayload = yield shared.api.collectPayload(payload);
                defaultHeaders.push(["Content-Length", `${collectedPayload.length}`]);
                payload = [collectedPayload];
            }
            let headersToAppend = defaultHeaders.filter((defaultHeader) => {
                let found = raw.headers.find((header) => header[0].toLowerCase() === defaultHeader[0].toLowerCase());
                return found === undefined;
            });
            return Object.assign(Object.assign({}, raw), { headers: [
                    ...raw.headers,
                    ...headersToAppend
                ], payload });
        });
    }
    exports.finalizeResponse = finalizeResponse;
    ;
    function respond(httpResponse, raw, serverOptions) {
        var e_1, _a;
        var _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let rawHeaders = new Array();
            for (let header of (_b = raw.headers) !== null && _b !== void 0 ? _b : []) {
                rawHeaders.push(...header);
            }
            httpResponse.writeHead((_c = raw.status) !== null && _c !== void 0 ? _c : 200, rawHeaders);
            try {
                for (var _e = __asyncValues((_d = raw.payload) !== null && _d !== void 0 ? _d : []), _f; _f = yield _e.next(), !_f.done;) {
                    let chunk = _f.value;
                    if (!httpResponse.write(chunk)) {
                        yield new Promise((resolve, reject) => {
                            httpResponse.once("drain", resolve);
                        });
                    }
                }
            }
            catch (e_1_1) {
                e_1 = { error: e_1_1 };
            }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return))
                        yield _a.call(_e);
                }
                finally {
                    if (e_1)
                        throw e_1.error;
                }
            }
            httpResponse.end();
            yield new Promise((resolve, reject) => {
                httpResponse.once("finish", resolve);
            });
        });
    }
    exports.respond = respond;
    ;
    function route(endpoints, httpRequest, httpResponse, serverOptions) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let urlPrefix = (_a = serverOptions === null || serverOptions === void 0 ? void 0 : serverOptions.urlPrefix) !== null && _a !== void 0 ? _a : "";
            let method = (_b = httpRequest.method) !== null && _b !== void 0 ? _b : "GET";
            let url = (_c = httpRequest.url) !== null && _c !== void 0 ? _c : "";
            if (!url.startsWith(urlPrefix)) {
                throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
            }
            url = url.slice(urlPrefix.length);
            try {
                let components = shared.api.splitComponents(url);
                let parameters = shared.api.splitParameters(url);
                let headers = shared.api.splitHeaders(combineNodeRawHeaders(httpRequest.rawHeaders));
                let payload = {
                    [Symbol.asyncIterator]: () => httpRequest[Symbol.asyncIterator]()
                };
                let socket = httpRequest.socket;
                let raw = {
                    method,
                    components,
                    parameters,
                    headers,
                    payload
                };
                let auxillary = {
                    socket
                };
                let filteredEndpoints = endpoints.map((endpoint) => endpoint(raw, auxillary));
                filteredEndpoints = filteredEndpoints.filter((endpoint) => endpoint.acceptsComponents());
                if (filteredEndpoints.length === 0) {
                    return respond(httpResponse, {
                        status: 404
                    }, serverOptions);
                }
                filteredEndpoints = filteredEndpoints.filter((endpoint) => endpoint.acceptsMethod());
                if (filteredEndpoints.length === 0) {
                    return respond(httpResponse, {
                        status: 405
                    }, serverOptions);
                }
                let endpoint = filteredEndpoints[0];
                let valid = yield endpoint.validateRequest();
                try {
                    let handled = yield valid.handleRequest();
                    try {
                        let raw = yield handled.validateResponse();
                        return yield respond(httpResponse, raw, serverOptions);
                    }
                    catch (error) {
                        return respond(httpResponse, {
                            status: 500,
                            payload: shared.api.serializeStringPayload(String(error))
                        }, serverOptions);
                    }
                }
                catch (error) {
                    if (typeof error === "number" && Number.isInteger(error) && error >= 100 && error <= 999) {
                        return respond(httpResponse, {
                            status: error
                        }, serverOptions);
                    }
                    if (error instanceof EndpointError) {
                        let raw = error.getResponse();
                        return respond(httpResponse, raw, serverOptions);
                    }
                    return respond(httpResponse, {
                        status: 500
                    }, serverOptions);
                }
            }
            catch (error) {
                return respond(httpResponse, {
                    status: 400,
                    payload: shared.api.serializeStringPayload(String(error))
                }, serverOptions);
            }
        });
    }
    exports.route = route;
    ;
    // TODO: Move to Nexus in v6.
    function parseRangeHeader(value, size) {
        var _a, _b, _c;
        if (value === undefined) {
            return {
                status: 200,
                offset: 0,
                length: size,
                size: size
            };
        }
        let s416 = {
            status: 416,
            offset: 0,
            length: 0,
            size: size
        };
        let parts;
        parts = (_a = /^bytes[=]([0-9]+)[-]$/.exec(String(value))) !== null && _a !== void 0 ? _a : undefined;
        if (parts !== undefined) {
            let one = Number.parseInt(parts[1], 10);
            if (one >= size) {
                return s416;
            }
            return {
                status: 206,
                offset: one,
                length: size - one,
                size: size
            };
        }
        parts = (_b = /^bytes[=]([0-9]+)[-]([0-9]+)$/.exec(String(value))) !== null && _b !== void 0 ? _b : undefined;
        if (parts !== undefined) {
            let one = Number.parseInt(parts[1], 10);
            let two = Number.parseInt(parts[2], 10);
            if (two < one) {
                return s416;
            }
            if (one >= size) {
                return s416;
            }
            if (two >= size) {
                two = size - 1;
            }
            return {
                status: 206,
                offset: one,
                length: two - one + 1,
                size: size
            };
        }
        parts = (_c = /^bytes[=][-]([0-9]+)$/.exec(String(value))) !== null && _c !== void 0 ? _c : undefined;
        if (parts !== undefined) {
            let one = Number.parseInt(parts[1], 10);
            if (one < 1) {
                return s416;
            }
            if (size < 1) {
                return s416;
            }
            if (one > size) {
                one = size;
            }
            return {
                status: 206,
                offset: size - one,
                length: one,
                size: size
            };
        }
        return s416;
    }
    exports.parseRangeHeader = parseRangeHeader;
    ;
    // TODO: Move to Nexus in v6.
    function getContentTypeFromExtension(extension) {
        let extensions = {
            ".aac": "audio/aac",
            ".bmp": "image/bmp",
            ".css": "text/css",
            ".csv": "text/csv",
            ".gif": "image/gif",
            ".htm": "text/html",
            ".html": "text/html",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".js": "text/javascript",
            ".json": "application/json",
            ".mid": "audio/midi",
            ".mp3": "audio/mpeg",
            ".mp4": "video/mp4",
            ".otf": "font/otf",
            ".pdf": "application/pdf",
            ".png": "image/png",
            ".svg": "image/svg+xml",
            ".tif": "image/tiff",
            ".tiff": "image/tiff",
            ".ttf": "font/ttf",
            ".txt": "text/plain",
            ".wav": "audio/wav",
            ".woff": "font/woff",
            ".woff2": "font/woff2",
            ".xml": "text/xml"
        };
        return extensions[extension];
    }
    exports.getContentTypeFromExtension = getContentTypeFromExtension;
    ;
    // TODO: Move to Nexus in v6.
    function makeDirectoryListing(pathPrefix, pathSuffix, request) {
        let pathSuffixParts = libpath.normalize(pathSuffix).split(libpath.sep);
        if (pathSuffixParts[0] === "..") {
            throw 400;
        }
        if (pathSuffixParts[pathSuffixParts.length - 1] !== "") {
            pathSuffixParts.push("");
        }
        let fullPath = libpath.join(pathPrefix, ...pathSuffixParts);
        if (!libfs.existsSync(fullPath) || !libfs.statSync(fullPath).isDirectory()) {
            throw 404;
        }
        let entries = libfs.readdirSync(fullPath, { withFileTypes: true });
        let directories = entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => {
            return {
                name: entry.name
            };
        })
            .sort((one, two) => one.name.localeCompare(two.name));
        let files = entries
            .filter((entry) => entry.isFile())
            .map((entry) => {
            let stat = libfs.statSync(libpath.join(fullPath, entry.name));
            return {
                name: entry.name,
                size: stat.size,
                timestamp: stat.mtime.valueOf()
            };
        })
            .sort((one, two) => one.name.localeCompare(two.name));
        let components = pathSuffixParts;
        return {
            components,
            directories,
            files
        };
    }
    exports.makeDirectoryListing = makeDirectoryListing;
    ;
    // TODO: Move to Nexus in v6.
    function makeReadStreamResponse(pathPrefix, pathSuffix, request) {
        if (libpath.normalize(pathSuffix).split(libpath.sep)[0] === "..") {
            throw 400;
        }
        let path = libpath.join(pathPrefix, pathSuffix);
        while (libfs.existsSync(path) && libfs.statSync(path).isDirectory()) {
            path = libpath.join(path, "index.html");
        }
        if (!libfs.existsSync(path)) {
            throw 404;
        }
        let stat = libfs.statSync(path);
        let range = parseRangeHeader(request.headers().range, stat.size);
        let stream = libfs.createReadStream(path, {
            start: range.offset,
            end: range.offset + range.length
        });
        return {
            status: range.status,
            headers: {
                "Accept-Ranges": "bytes",
                "Content-Length": `${range.length}`,
                "Content-Range": range.length > 0 ? `bytes ${range.offset}-${range.offset + range.length - 1}/${range.size}` : `bytes */${range.size}`,
                "Content-Type": getContentTypeFromExtension(libpath.extname(path)),
                "Last-Modified": stat.mtime.toUTCString()
            },
            payload: stream
        };
    }
    exports.makeReadStreamResponse = makeReadStreamResponse;
    ;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-server/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "node_modules/@joelek/ts-autoguard/dist/lib-server/api"], function (require, exports, lib_shared_1, api) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    __exportStar(lib_shared_1, exports);
    exports.api = api;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-client/api", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "node_modules/@joelek/ts-autoguard/dist/lib-shared/api"], function (require, exports, shared, api_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.finalizeRequest = exports.xhr = exports.ServerResponse = void 0;
    __exportStar(api_2, exports);
    class ServerResponse {
        constructor(response, collect) {
            this.response = response;
            this.collect = collect;
        }
        status() {
            let status = this.response.status;
            return status !== null && status !== void 0 ? status : 200;
        }
        headers() {
            let headers = this.response.headers;
            return Object.assign({}, headers);
        }
        payload() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.collectedPayload !== undefined) {
                    return this.collectedPayload;
                }
                let payload = this.response.payload;
                let collectedPayload = (this.collect ? yield shared.api.collectPayload(payload) : payload);
                this.collectedPayload = collectedPayload;
                return collectedPayload;
            });
        }
    }
    exports.ServerResponse = ServerResponse;
    ;
    function xhr(raw, clientOptions) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onabort = reject;
            xhr.onload = () => {
                let status = xhr.status;
                // Header values for the same header name are joined by he XHR implementation.
                let headers = shared.api.splitHeaders(xhr.getAllResponseHeaders().split("\r\n").slice(0, -1));
                let payload = [new Uint8Array(xhr.response)];
                let raw = {
                    status,
                    headers,
                    payload
                };
                resolve(raw);
            };
            let url = (_a = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.urlPrefix) !== null && _a !== void 0 ? _a : "";
            url += shared.api.combineComponents(raw.components);
            url += shared.api.combineParameters(raw.parameters);
            xhr.open(raw.method, url, true);
            xhr.responseType = "arraybuffer";
            for (let header of raw.headers) {
                // Header values for the same header name are joined by he XHR implementation.
                xhr.setRequestHeader(header[0], header[1]);
            }
            xhr.send(yield shared.api.collectPayload(raw.payload));
        }));
    }
    exports.xhr = xhr;
    ;
    function finalizeRequest(raw, defaultHeaders) {
        let headersToAppend = defaultHeaders.filter((defaultHeader) => {
            let found = raw.headers.find((header) => header[0].toLowerCase() === defaultHeader[0].toLowerCase());
            return found === undefined;
        });
        return Object.assign(Object.assign({}, raw), { headers: [
                ...raw.headers,
                ...headersToAppend
            ] });
    }
    exports.finalizeRequest = finalizeRequest;
    ;
});
define("node_modules/@joelek/ts-autoguard/dist/lib-client/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "node_modules/@joelek/ts-autoguard/dist/lib-client/api"], function (require, exports, lib_shared_2, api) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.api = void 0;
    __exportStar(lib_shared_2, exports);
    exports.api = api;
});
define("build/mod/acme/api/client", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-client/index", "build/mod/acme/api/index"], function (require, exports, autoguard, shared) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeClient = void 0;
    const makeClient = (clientOptions) => ({
        "downloadCertificate": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["downloadCertificate"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_b = (_a = request.options) === null || _a === void 0 ? void 0 : _a["path"]) !== null && _b !== void 0 ? _b : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_c = request.options) !== null && _c !== void 0 ? _c : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_d = request.headers) === null || _d === void 0 ? void 0 : _d["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_e = request.headers) !== null && _e !== void 0 ? _e : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_f = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _f !== void 0 ? _f : autoguard.api.xhr;
            let defaultHeaders = (_h = (_g = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _g === void 0 ? void 0 : _g.slice()) !== null && _h !== void 0 ? _h : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/octet-stream"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = raw.payload;
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["downloadCertificate"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, true);
            }
        }),
        "finalizeChallenge": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _j, _k, _l, _m, _o, _p, _q, _r;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["finalizeChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_k = (_j = request.options) === null || _j === void 0 ? void 0 : _j["path"]) !== null && _k !== void 0 ? _k : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_l = request.options) !== null && _l !== void 0 ? _l : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_m = request.headers) === null || _m === void 0 ? void 0 : _m["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_o = request.headers) !== null && _o !== void 0 ? _o : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_p = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _p !== void 0 ? _p : autoguard.api.xhr;
            let defaultHeaders = (_r = (_q = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _q === void 0 ? void 0 : _q.slice()) !== null && _r !== void 0 ? _r : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["finalizeChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "finalizeOrder": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _s, _t, _u, _v, _w, _x, _y, _z;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["finalizeOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_t = (_s = request.options) === null || _s === void 0 ? void 0 : _s["path"]) !== null && _t !== void 0 ? _t : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_u = request.options) !== null && _u !== void 0 ? _u : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_v = request.headers) === null || _v === void 0 ? void 0 : _v["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_w = request.headers) !== null && _w !== void 0 ? _w : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_x = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _x !== void 0 ? _x : autoguard.api.xhr;
            let defaultHeaders = (_z = (_y = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _y === void 0 ? void 0 : _y.slice()) !== null && _z !== void 0 ? _z : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["finalizeOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "getAccount": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _0, _1, _2, _3, _4, _5, _6, _7;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_1 = (_0 = request.options) === null || _0 === void 0 ? void 0 : _0["path"]) !== null && _1 !== void 0 ? _1 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_2 = request.options) !== null && _2 !== void 0 ? _2 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_3 = request.headers) === null || _3 === void 0 ? void 0 : _3["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_4 = request.headers) !== null && _4 !== void 0 ? _4 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_5 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _5 !== void 0 ? _5 : autoguard.api.xhr;
            let defaultHeaders = (_7 = (_6 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _6 === void 0 ? void 0 : _6.slice()) !== null && _7 !== void 0 ? _7 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "getAuthorization": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _8, _9, _10, _11, _12, _13, _14, _15;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getAuthorization"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_9 = (_8 = request.options) === null || _8 === void 0 ? void 0 : _8["path"]) !== null && _9 !== void 0 ? _9 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_10 = request.options) !== null && _10 !== void 0 ? _10 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_11 = request.headers) === null || _11 === void 0 ? void 0 : _11["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_12 = request.headers) !== null && _12 !== void 0 ? _12 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_13 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _13 !== void 0 ? _13 : autoguard.api.xhr;
            let defaultHeaders = (_15 = (_14 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _14 === void 0 ? void 0 : _14.slice()) !== null && _15 !== void 0 ? _15 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getAuthorization"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "getChallenge": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _16, _17, _18, _19, _20, _21, _22, _23;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_17 = (_16 = request.options) === null || _16 === void 0 ? void 0 : _16["path"]) !== null && _17 !== void 0 ? _17 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_18 = request.options) !== null && _18 !== void 0 ? _18 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_19 = request.headers) === null || _19 === void 0 ? void 0 : _19["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_20 = request.headers) !== null && _20 !== void 0 ? _20 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_21 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _21 !== void 0 ? _21 : autoguard.api.xhr;
            let defaultHeaders = (_23 = (_22 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _22 === void 0 ? void 0 : _22.slice()) !== null && _23 !== void 0 ? _23 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getChallenge"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "getDirectory": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _24, _25, _26, _27, _28, _29, _30, _31;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getDirectory"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "GET";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_25 = (_24 = request.options) === null || _24 === void 0 ? void 0 : _24["path"]) !== null && _25 !== void 0 ? _25 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_26 = request.options) !== null && _26 !== void 0 ? _26 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_27 = request.headers) !== null && _27 !== void 0 ? _27 : {}, headers.map((header) => header[0])));
            let payload = (_28 = request.payload) !== null && _28 !== void 0 ? _28 : [];
            let requestHandler = (_29 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _29 !== void 0 ? _29 : autoguard.api.xhr;
            let defaultHeaders = (_31 = (_30 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _30 === void 0 ? void 0 : _30.slice()) !== null && _31 !== void 0 ? _31 : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getDirectory"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "getOrder": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _32, _33, _34, _35, _36, _37, _38, _39;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["getOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_33 = (_32 = request.options) === null || _32 === void 0 ? void 0 : _32["path"]) !== null && _33 !== void 0 ? _33 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_34 = request.options) !== null && _34 !== void 0 ? _34 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_35 = request.headers) === null || _35 === void 0 ? void 0 : _35["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_36 = request.headers) !== null && _36 !== void 0 ? _36 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_37 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _37 !== void 0 ? _37 : autoguard.api.xhr;
            let defaultHeaders = (_39 = (_38 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _38 === void 0 ? void 0 : _38.slice()) !== null && _39 !== void 0 ? _39 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["getOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "newAccount": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _40, _41, _42, _43, _44, _45, _46, _47;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_41 = (_40 = request.options) === null || _40 === void 0 ? void 0 : _40["path"]) !== null && _41 !== void 0 ? _41 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_42 = request.options) !== null && _42 !== void 0 ? _42 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_43 = request.headers) === null || _43 === void 0 ? void 0 : _43["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_44 = request.headers) !== null && _44 !== void 0 ? _44 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_45 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _45 !== void 0 ? _45 : autoguard.api.xhr;
            let defaultHeaders = (_47 = (_46 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _46 === void 0 ? void 0 : _46.slice()) !== null && _47 !== void 0 ? _47 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers["location"] = autoguard.api.decodeHeaderValue(raw.headers, "location", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newAccount"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "newNonce": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _48, _49, _50, _51, _52, _53, _54, _55;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newNonce"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "HEAD";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_49 = (_48 = request.options) === null || _48 === void 0 ? void 0 : _48["path"]) !== null && _49 !== void 0 ? _49 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_50 = request.options) !== null && _50 !== void 0 ? _50 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_51 = request.headers) !== null && _51 !== void 0 ? _51 : {}, headers.map((header) => header[0])));
            let payload = (_52 = request.payload) !== null && _52 !== void 0 ? _52 : [];
            let requestHandler = (_53 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _53 !== void 0 ? _53 : autoguard.api.xhr;
            let defaultHeaders = (_55 = (_54 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _54 === void 0 ? void 0 : _54.slice()) !== null && _55 !== void 0 ? _55 : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/octet-stream"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = raw.payload;
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newNonce"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, true);
            }
        }),
        "newOrder": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _56, _57, _58, _59, _60, _61, _62, _63;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["newOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push(...autoguard.api.encodeComponents((_57 = (_56 = request.options) === null || _56 === void 0 ? void 0 : _56["path"]) !== null && _57 !== void 0 ? _57 : [], true));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_58 = request.options) !== null && _58 !== void 0 ? _58 : {}, [...["path"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeHeaderPairs("content-type", [(_59 = request.headers) === null || _59 === void 0 ? void 0 : _59["content-type"]], true));
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_60 = request.headers) !== null && _60 !== void 0 ? _60 : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_61 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _61 !== void 0 ? _61 : autoguard.api.xhr;
            let defaultHeaders = (_63 = (_62 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _62 === void 0 ? void 0 : _62.slice()) !== null && _63 !== void 0 ? _63 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers["replay-nonce"] = autoguard.api.decodeHeaderValue(raw.headers, "replay-nonce", true);
                headers["location"] = autoguard.api.decodeHeaderValue(raw.headers, "location", true);
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["newOrder"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
    });
    exports.makeClient = makeClient;
});
define("build/mod/acme/handler", ["require", "exports", "crypto", "url", "node_modules/@joelek/ts-autoguard/dist/lib-server/index", "build/mod/acme/api/client", "build/mod/jwk/index", "build/mod/jws/index"], function (require, exports, libcrypto, liburl, autoguard, apiclient, jwk, jws) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Handler = void 0;
    function makeClient(clientOptions) {
        let client = apiclient.makeClient(Object.assign({ requestHandler: autoguard.api.makeNodeRequestHandler() }, clientOptions));
        return client;
    }
    ;
    function getUrlPath(url, urlPrefix) {
        if (!url.startsWith(urlPrefix)) {
            throw `Expected url "${url}" to have prefix "${urlPrefix}"!`;
        }
        url = url.slice(urlPrefix.length);
        let components = autoguard.api.splitComponents(url);
        return components.map((component) => decodeURIComponent(component));
    }
    ;
    const CONTENT_TYPE = "application/jose+json";
    class Handler {
        constructor(key, client, directory, urlPrefix) {
            this.key = key;
            this.client = client;
            this.directory = directory;
            this.urlPrefix = urlPrefix;
            this.nextReplayNonce = undefined;
        }
        createAccount(payloadData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let key = jwk.PublicKey.as(libcrypto.createPublicKey(this.key).export({ format: "jwk" }));
                let protectedData = {
                    jwk: key,
                    nonce: this.nextReplayNonce,
                    url: this.directory.newAccount
                };
                let response = yield this.client.newAccount({
                    options: {
                        path: getUrlPath(this.directory.newAccount, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData,
                        payload: payloadData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                let url = response.headers()["location"];
                return {
                    payload,
                    url
                };
            });
        }
        createNonce() {
            return __awaiter(this, void 0, void 0, function* () {
                let response = yield this.client.newNonce({
                    options: {
                        path: getUrlPath(this.directory.newNonce, this.urlPrefix)
                    }
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
            });
        }
        createOrder(kid, payloadData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: this.directory.newOrder
                };
                let response = yield this.client.newOrder({
                    options: {
                        path: getUrlPath(this.directory.newOrder, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData,
                        payload: payloadData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                let url = response.headers()["location"];
                return {
                    payload,
                    url
                };
            });
        }
        downloadCertificate(kid, url) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.downloadCertificate({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let buffer = Buffer.from((_a = yield response.payload()) !== null && _a !== void 0 ? _a : new Uint8Array());
                return buffer;
            });
        }
        finalizeChallenge(kid, url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.finalizeChallenge({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData,
                        payload: {}
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
            });
        }
        finalizeOrder(kid, url, payloadData) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.finalizeOrder({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData,
                        payload: payloadData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
            });
        }
        getAccount(url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: url,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.getAccount({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                return {
                    payload,
                    url
                };
            });
        }
        getAuthorization(kid, url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.getAuthorization({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                return {
                    payload,
                    url
                };
            });
        }
        getChallenge(kid, url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.getChallenge({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                return {
                    payload,
                    url
                };
            });
        }
        getOrder(kid, url) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.nextReplayNonce == null) {
                    throw `Expected next replay nonce to be set!`;
                }
                let protectedData = {
                    kid: kid,
                    nonce: this.nextReplayNonce,
                    url: url
                };
                let response = yield this.client.getOrder({
                    options: {
                        path: getUrlPath(url, this.urlPrefix)
                    },
                    headers: {
                        "content-type": CONTENT_TYPE
                    },
                    payload: jws.sign(this.key, {
                        protected: protectedData
                    })
                });
                this.nextReplayNonce = response.headers()["replay-nonce"];
                let payload = yield response.payload();
                return {
                    payload,
                    url
                };
            });
        }
        static make(url, key, clientOptions) {
            return __awaiter(this, void 0, void 0, function* () {
                let urlPrefix = new liburl.URL(url).origin;
                let client = makeClient(Object.assign({ urlPrefix }, clientOptions));
                let response = yield client.getDirectory({
                    options: {
                        path: getUrlPath(url, urlPrefix)
                    }
                });
                let payload = yield response.payload();
                return new Handler(key, client, payload, urlPrefix);
            });
        }
        ;
    }
    exports.Handler = Handler;
    ;
});
define("build/mod/acme/index", ["require", "exports", "crypto", "build/mod/jwk/index", "build/mod/acme/api/index", "build/mod/acme/handler"], function (require, exports, libcrypto, jwk, api, handler) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handler = exports.api = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.computeKeyAuthorization = exports.handler = exports.api = void 0;
    exports.api = api;
    exports.handler = handler;
    function computeKeyAuthorization(token, key) {
        let thumbprint = jwk.computeThumbprint(key);
        let hash = libcrypto.createHash("sha256");
        hash.update(Buffer.from(`${token}.${thumbprint}`));
        let buffer = hash.digest();
        return buffer.toString("base64url");
    }
    exports.computeKeyAuthorization = computeKeyAuthorization;
    ;
});
define("build/mod/dns/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
});
define("build/mod/dynu/api/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.DomainRecord = exports.DomainRecordTXT = exports.DomainRecordGeneric = exports.DomainRecordBase = exports.DomainRecordStub = exports.DomainRecordStubTXT = exports.DomainRecordStubGeneric = exports.Domain = void 0;
    exports.Domain = autoguard.guards.Object.of({
        "id": autoguard.guards.Number,
        "name": autoguard.guards.String
    }, {});
    exports.DomainRecordStubGeneric = autoguard.guards.Object.of({
        "nodeName": autoguard.guards.String,
        "recordType": autoguard.guards.String
    }, {
        "ttl": autoguard.guards.Number,
        "state": autoguard.guards.Boolean
    });
    exports.DomainRecordStubTXT = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric), autoguard.guards.Object.of({
        "recordType": autoguard.guards.StringLiteral.of("TXT"),
        "textData": autoguard.guards.String
    }, {}));
    exports.DomainRecordStub = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric), autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT));
    exports.DomainRecordBase = autoguard.guards.Object.of({
        "id": autoguard.guards.Number,
        "domainId": autoguard.guards.Number
    }, {});
    exports.DomainRecordGeneric = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordBase), autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric));
    exports.DomainRecordTXT = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.DomainRecordBase), autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT));
    exports.DomainRecord = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.DomainRecordGeneric), autoguard.guards.Reference.of(() => exports.DomainRecordTXT));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Domain": autoguard.guards.Reference.of(() => exports.Domain),
            "DomainRecordStubGeneric": autoguard.guards.Reference.of(() => exports.DomainRecordStubGeneric),
            "DomainRecordStubTXT": autoguard.guards.Reference.of(() => exports.DomainRecordStubTXT),
            "DomainRecordStub": autoguard.guards.Reference.of(() => exports.DomainRecordStub),
            "DomainRecordBase": autoguard.guards.Reference.of(() => exports.DomainRecordBase),
            "DomainRecordGeneric": autoguard.guards.Reference.of(() => exports.DomainRecordGeneric),
            "DomainRecordTXT": autoguard.guards.Reference.of(() => exports.DomainRecordTXT),
            "DomainRecord": autoguard.guards.Reference.of(() => exports.DomainRecord)
        };
        Autoguard.Requests = {
            "listDomains": autoguard.guards.Object.of({}, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            }),
            "listDomainRecords": autoguard.guards.Object.of({
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "domainid": autoguard.guards.Number
                }, {}), autoguard.api.Options)
            }, {
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            }),
            "createDomainRecord": autoguard.guards.Object.of({
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "domainid": autoguard.guards.Number
                }, {}), autoguard.api.Options),
                "payload": autoguard.guards.Reference.of(() => exports.DomainRecordStub)
            }, {
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "updateDomainRecord": autoguard.guards.Object.of({
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "domainid": autoguard.guards.Number,
                    "recordid": autoguard.guards.Number
                }, {}), autoguard.api.Options),
                "payload": autoguard.guards.Reference.of(() => exports.DomainRecordStub)
            }, {
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "deleteDomainRecord": autoguard.guards.Object.of({
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({
                    "domainid": autoguard.guards.Number,
                    "recordid": autoguard.guards.Number
                }, {}), autoguard.api.Options)
            }, {
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            })
        };
        Autoguard.Responses = {
            "listDomains": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "domains": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Domain))
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "listDomainRecords": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "dnsRecords": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.DomainRecord))
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "createDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Reference.of(() => exports.DomainRecord)
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "updateDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Reference.of(() => exports.DomainRecord)
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "deleteDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({}, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            })
        };
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/dynu/api/client", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-client/index", "build/mod/dynu/api/index"], function (require, exports, autoguard, shared) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeClient = void 0;
    const makeClient = (clientOptions) => ({
        "listDomains": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["listDomains"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "GET";
            let components = new Array();
            components.push("dns");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_a = request.options) !== null && _a !== void 0 ? _a : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_b = request.headers) !== null && _b !== void 0 ? _b : {}, headers.map((header) => header[0])));
            let payload = (_c = request.payload) !== null && _c !== void 0 ? _c : [];
            let requestHandler = (_d = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _d !== void 0 ? _d : autoguard.api.xhr;
            let defaultHeaders = (_f = (_e = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _e === void 0 ? void 0 : _e.slice()) !== null && _f !== void 0 ? _f : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["listDomains"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "listDomainRecords": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _g, _h, _j, _k, _l, _m, _o;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["listDomainRecords"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "GET";
            let components = new Array();
            components.push("dns");
            components.push(...autoguard.api.encodeComponents([(_g = request.options) === null || _g === void 0 ? void 0 : _g["domainid"]], false));
            components.push("record");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_h = request.options) !== null && _h !== void 0 ? _h : {}, [...["domainid"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_j = request.headers) !== null && _j !== void 0 ? _j : {}, headers.map((header) => header[0])));
            let payload = (_k = request.payload) !== null && _k !== void 0 ? _k : [];
            let requestHandler = (_l = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _l !== void 0 ? _l : autoguard.api.xhr;
            let defaultHeaders = (_o = (_m = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _m === void 0 ? void 0 : _m.slice()) !== null && _o !== void 0 ? _o : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["listDomainRecords"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "createDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _p, _q, _r, _s, _t, _u;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["createDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("dns");
            components.push(...autoguard.api.encodeComponents([(_p = request.options) === null || _p === void 0 ? void 0 : _p["domainid"]], false));
            components.push("record");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_q = request.options) !== null && _q !== void 0 ? _q : {}, [...["domainid"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_r = request.headers) !== null && _r !== void 0 ? _r : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_s = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _s !== void 0 ? _s : autoguard.api.xhr;
            let defaultHeaders = (_u = (_t = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _t === void 0 ? void 0 : _t.slice()) !== null && _u !== void 0 ? _u : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["createDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "updateDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _v, _w, _x, _y, _z, _0, _1;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["updateDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("dns");
            components.push(...autoguard.api.encodeComponents([(_v = request.options) === null || _v === void 0 ? void 0 : _v["domainid"]], false));
            components.push("record");
            components.push(...autoguard.api.encodeComponents([(_w = request.options) === null || _w === void 0 ? void 0 : _w["recordid"]], false));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_x = request.options) !== null && _x !== void 0 ? _x : {}, [...["domainid", "recordid"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_y = request.headers) !== null && _y !== void 0 ? _y : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_z = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _z !== void 0 ? _z : autoguard.api.xhr;
            let defaultHeaders = (_1 = (_0 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _0 === void 0 ? void 0 : _0.slice()) !== null && _1 !== void 0 ? _1 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["updateDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "deleteDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _2, _3, _4, _5, _6, _7, _8, _9;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["deleteDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "DELETE";
            let components = new Array();
            components.push("dns");
            components.push(...autoguard.api.encodeComponents([(_2 = request.options) === null || _2 === void 0 ? void 0 : _2["domainid"]], false));
            components.push("record");
            components.push(...autoguard.api.encodeComponents([(_3 = request.options) === null || _3 === void 0 ? void 0 : _3["recordid"]], false));
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_4 = request.options) !== null && _4 !== void 0 ? _4 : {}, [...["domainid", "recordid"], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_5 = request.headers) !== null && _5 !== void 0 ? _5 : {}, headers.map((header) => header[0])));
            let payload = (_6 = request.payload) !== null && _6 !== void 0 ? _6 : [];
            let requestHandler = (_7 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _7 !== void 0 ? _7 : autoguard.api.xhr;
            let defaultHeaders = (_9 = (_8 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _8 === void 0 ? void 0 : _8.slice()) !== null && _9 !== void 0 ? _9 : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["deleteDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
    });
    exports.makeClient = makeClient;
});
define("build/mod/dynu/config/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Config = void 0;
    exports.Config = autoguard.guards.Object.of({
        "key": autoguard.guards.String
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Config": autoguard.guards.Reference.of(() => exports.Config)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/dynu/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-server/index", "build/mod/dynu/api/client", "build/mod/dynu/config/index"], function (require, exports, autoguard, api, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeStandardClient = exports.makeClient = void 0;
    __exportStar(config_1, exports);
    const URL_PREFIX = "https://api.dynu.com/v2";
    function makeClient(config, options) {
        let client = api.makeClient(Object.assign({ urlPrefix: URL_PREFIX, requestHandler: autoguard.api.makeNodeRequestHandler(), defaultHeaders: [
                ["API-Key", config.key]
            ] }, options));
        return client;
    }
    exports.makeClient = makeClient;
    ;
    function makeStandardClient(config, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = makeClient(config, options);
            let domains = (yield (yield client.listDomains({})).payload()).domains;
            return {
                listDomains() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return domains.map((domain) => domain.name);
                    });
                },
                provisionTextRecord(details) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const domain = domains.find((domain) => domain.name === details.domain);
                        if (domain == null) {
                            throw `Expected a domain matching "${details.domain}"!`;
                        }
                        let record = yield (yield client.createDomainRecord({
                            options: {
                                domainid: domain.id
                            },
                            payload: {
                                nodeName: details.subdomain,
                                recordType: "TXT",
                                textData: details.content,
                                ttl: 60,
                                state: true
                            }
                        })).payload();
                        return {
                            undo() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield client.deleteDomainRecord({
                                        options: {
                                            domainid: domain.id,
                                            recordid: record.id
                                        }
                                    });
                                });
                            }
                        };
                    });
                }
            };
        });
    }
    exports.makeStandardClient = makeStandardClient;
    ;
});
define("build/mod/ec/index", ["require", "exports", "crypto", "build/mod/jwk/index"], function (require, exports, libcrypto, jwk) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generatePrivateKeyJWK = exports.generatePrivateKeySEC1 = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKey = void 0;
    function generatePrivateKey(options) {
        var _a;
        let namedCurve = (_a = options === null || options === void 0 ? void 0 : options.namedCurve) !== null && _a !== void 0 ? _a : "prime256v1";
        let pair = libcrypto.generateKeyPairSync("ec", {
            namedCurve: namedCurve
        });
        return pair.privateKey;
    }
    exports.generatePrivateKey = generatePrivateKey;
    ;
    function generatePrivateKeyPKCS8(options) {
        let key = generatePrivateKey(options);
        return key.export({
            format: "der",
            type: "pkcs8"
        });
    }
    exports.generatePrivateKeyPKCS8 = generatePrivateKeyPKCS8;
    ;
    function generatePrivateKeySEC1(options) {
        let key = generatePrivateKey(options);
        return key.export({
            format: "der",
            type: "sec1"
        });
    }
    exports.generatePrivateKeySEC1 = generatePrivateKeySEC1;
    ;
    function generatePrivateKeyJWK(options) {
        let key = generatePrivateKey(options);
        let json = key.export({
            format: "jwk"
        });
        return jwk.ECPrivateKey.as(json);
    }
    exports.generatePrivateKeyJWK = generatePrivateKeyJWK;
    ;
});
define("build/mod/glesys/api/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.DomainRecord = exports.DomainRecordType = exports.DomainRecordHost = exports.Domain = exports.RegistrarInfo = exports.DomainPrice = void 0;
    exports.DomainPrice = autoguard.guards.Object.of({
        "amount": autoguard.guards.Number,
        "currency": autoguard.guards.String,
        "years": autoguard.guards.Number
    }, {});
    exports.RegistrarInfo = autoguard.guards.Object.of({
        "autorenew": autoguard.guards.String,
        "state": autoguard.guards.String
    }, {
        "statedescription": autoguard.guards.String,
        "expire": autoguard.guards.String,
        "tld": autoguard.guards.String,
        "invoicenumber": autoguard.guards.String
    });
    exports.Domain = autoguard.guards.Object.of({
        "domainname": autoguard.guards.String
    }, {
        "available": autoguard.guards.Boolean,
        "createtime": autoguard.guards.String,
        "displayname": autoguard.guards.String,
        "expire": autoguard.guards.Number,
        "minimum": autoguard.guards.Number,
        "prices": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.DomainPrice)),
        "primarynameserver": autoguard.guards.String,
        "recordcount": autoguard.guards.Number,
        "refresh": autoguard.guards.Number,
        "registrarinfo": autoguard.guards.Reference.of(() => exports.RegistrarInfo),
        "responsibleperson": autoguard.guards.String,
        "retry": autoguard.guards.Number,
        "ttl": autoguard.guards.Number,
        "usingglesysnameserver": autoguard.guards.String
    });
    exports.DomainRecordHost = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("@"), autoguard.guards.String);
    exports.DomainRecordType = autoguard.guards.Union.of(autoguard.guards.StringLiteral.of("A"), autoguard.guards.StringLiteral.of("NS"), autoguard.guards.StringLiteral.of("MX"), autoguard.guards.StringLiteral.of("TXT"), autoguard.guards.String);
    exports.DomainRecord = autoguard.guards.Object.of({
        "domainname": autoguard.guards.String,
        "data": autoguard.guards.String,
        "host": autoguard.guards.Reference.of(() => exports.DomainRecordHost),
        "recordid": autoguard.guards.Number,
        "ttl": autoguard.guards.Number,
        "type": autoguard.guards.Reference.of(() => exports.DomainRecordType)
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "DomainPrice": autoguard.guards.Reference.of(() => exports.DomainPrice),
            "RegistrarInfo": autoguard.guards.Reference.of(() => exports.RegistrarInfo),
            "Domain": autoguard.guards.Reference.of(() => exports.Domain),
            "DomainRecordHost": autoguard.guards.Reference.of(() => exports.DomainRecordHost),
            "DomainRecordType": autoguard.guards.Reference.of(() => exports.DomainRecordType),
            "DomainRecord": autoguard.guards.Reference.of(() => exports.DomainRecord)
        };
        Autoguard.Requests = {
            "listDomains": autoguard.guards.Object.of({}, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers),
                "payload": autoguard.api.Binary
            }),
            "listDomainRecords": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "domainname": autoguard.guards.String
                }, {})
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "createDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "domainname": autoguard.guards.String,
                    "data": autoguard.guards.String,
                    "host": autoguard.guards.Reference.of(() => exports.DomainRecordHost),
                    "type": autoguard.guards.Reference.of(() => exports.DomainRecordType)
                }, {
                    "ttl": autoguard.guards.Number
                })
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "updateDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "recordid": autoguard.guards.Number
                }, {
                    "data": autoguard.guards.String,
                    "host": autoguard.guards.Reference.of(() => exports.DomainRecordHost),
                    "type": autoguard.guards.Reference.of(() => exports.DomainRecordType),
                    "ttl": autoguard.guards.Number
                })
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "deleteDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "recordid": autoguard.guards.Number
                }, {})
            }, {
                "options": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Options),
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            })
        };
        Autoguard.Responses = {
            "listDomains": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "response": autoguard.guards.Object.of({
                        "domains": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Domain))
                    }, {})
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "listDomainRecords": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "response": autoguard.guards.Object.of({
                        "records": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.DomainRecord))
                    }, {})
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "createDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "response": autoguard.guards.Object.of({
                        "record": autoguard.guards.Reference.of(() => exports.DomainRecord)
                    }, {})
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "updateDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "response": autoguard.guards.Object.of({
                        "record": autoguard.guards.Reference.of(() => exports.DomainRecord)
                    }, {})
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            }),
            "deleteDomainRecord": autoguard.guards.Object.of({
                "payload": autoguard.guards.Object.of({
                    "response": autoguard.guards.Object.of({}, {})
                }, {})
            }, {
                "status": autoguard.guards.Number,
                "headers": autoguard.guards.Intersection.of(autoguard.guards.Object.of({}, {}), autoguard.api.Headers)
            })
        };
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/glesys/api/client", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-client/index", "build/mod/glesys/api/index"], function (require, exports, autoguard, shared) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeClient = void 0;
    const makeClient = (clientOptions) => ({
        "listDomains": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["listDomains"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("domain");
            components.push("list");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_a = request.options) !== null && _a !== void 0 ? _a : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_b = request.headers) !== null && _b !== void 0 ? _b : {}, headers.map((header) => header[0])));
            let payload = (_c = request.payload) !== null && _c !== void 0 ? _c : [];
            let requestHandler = (_d = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _d !== void 0 ? _d : autoguard.api.xhr;
            let defaultHeaders = (_f = (_e = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _e === void 0 ? void 0 : _e.slice()) !== null && _f !== void 0 ? _f : [];
            defaultHeaders.push(["Content-Type", "application/octet-stream"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["listDomains"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "listDomainRecords": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _g, _h, _j, _k, _l;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["listDomainRecords"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("domain");
            components.push("listrecords");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_g = request.options) !== null && _g !== void 0 ? _g : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_h = request.headers) !== null && _h !== void 0 ? _h : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_j = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _j !== void 0 ? _j : autoguard.api.xhr;
            let defaultHeaders = (_l = (_k = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _k === void 0 ? void 0 : _k.slice()) !== null && _l !== void 0 ? _l : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["listDomainRecords"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "createDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _m, _o, _p, _q, _r;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["createDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("domain");
            components.push("addrecord");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_m = request.options) !== null && _m !== void 0 ? _m : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_o = request.headers) !== null && _o !== void 0 ? _o : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_p = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _p !== void 0 ? _p : autoguard.api.xhr;
            let defaultHeaders = (_r = (_q = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _q === void 0 ? void 0 : _q.slice()) !== null && _r !== void 0 ? _r : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["createDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "updateDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _s, _t, _u, _v, _w;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["updateDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("domain");
            components.push("updaterecord");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_s = request.options) !== null && _s !== void 0 ? _s : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_t = request.headers) !== null && _t !== void 0 ? _t : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_u = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _u !== void 0 ? _u : autoguard.api.xhr;
            let defaultHeaders = (_w = (_v = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _v === void 0 ? void 0 : _v.slice()) !== null && _w !== void 0 ? _w : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["updateDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
        "deleteDomainRecord": (request) => __awaiter(void 0, void 0, void 0, function* () {
            var _x, _y, _z, _0, _1;
            let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Requests["deleteDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
            guard.as(request, "request");
            let method = "POST";
            let components = new Array();
            components.push("domain");
            components.push("deleterecord");
            let parameters = new Array();
            parameters.push(...autoguard.api.encodeUndeclaredParameterPairs((_x = request.options) !== null && _x !== void 0 ? _x : {}, [...[], ...parameters.map((parameter) => parameter[0])]));
            let headers = new Array();
            headers.push(...autoguard.api.encodeUndeclaredHeaderPairs((_y = request.headers) !== null && _y !== void 0 ? _y : {}, headers.map((header) => header[0])));
            let payload = autoguard.api.serializePayload(request.payload);
            let requestHandler = (_z = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.requestHandler) !== null && _z !== void 0 ? _z : autoguard.api.xhr;
            let defaultHeaders = (_1 = (_0 = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.defaultHeaders) === null || _0 === void 0 ? void 0 : _0.slice()) !== null && _1 !== void 0 ? _1 : [];
            defaultHeaders.push(["Content-Type", "application/json; charset=utf-8"]);
            defaultHeaders.push(["Accept", "application/json; charset=utf-8"]);
            let raw = yield requestHandler(autoguard.api.finalizeRequest({ method, components, parameters, headers, payload }, defaultHeaders), clientOptions);
            {
                let status = raw.status;
                let headers = {};
                headers = Object.assign(Object.assign({}, headers), autoguard.api.decodeUndeclaredHeaders(raw.headers, Object.keys(headers)));
                let payload = yield autoguard.api.deserializePayload(raw.payload);
                let guard = autoguard.api.wrapMessageGuard(shared.Autoguard.Responses["deleteDomainRecord"], clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.debugMode);
                let response = guard.as({ status, headers, payload }, "response");
                return new autoguard.api.ServerResponse(response, false);
            }
        }),
    });
    exports.makeClient = makeClient;
});
define("build/mod/glesys/config/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index"], function (require, exports, autoguard) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Config = void 0;
    exports.Config = autoguard.guards.Object.of({
        "account": autoguard.guards.String,
        "key": autoguard.guards.String
    }, {});
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "Config": autoguard.guards.Reference.of(() => exports.Config)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/glesys/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-server/index", "build/mod/glesys/api/client", "build/mod/glesys/config/index"], function (require, exports, autoguard, api, config_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeStandardClient = exports.makeClient = void 0;
    __exportStar(config_2, exports);
    const URL_PREFIX = "https://api.glesys.com";
    function makeClient(config, options) {
        let token = Buffer.from(`${config.account}:${config.key}`).toString("base64");
        let client = api.makeClient(Object.assign({ urlPrefix: URL_PREFIX, requestHandler: autoguard.api.makeNodeRequestHandler(), defaultHeaders: [
                ["Authorization", `Basic ${token}`]
            ] }, options));
        return client;
    }
    exports.makeClient = makeClient;
    ;
    function makeStandardClient(config, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = makeClient(config, options);
            let domains = (yield (yield client.listDomains({})).payload()).response.domains;
            return {
                listDomains() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return domains.map((domain) => domain.domainname);
                    });
                },
                provisionTextRecord(details) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const domain = domains.find((domain) => domain.domainname === details.domain);
                        if (domain == null) {
                            throw `Expected a domain!`;
                        }
                        let record = yield (yield client.createDomainRecord({
                            payload: {
                                domainname: details.domain,
                                host: details.subdomain || "@",
                                type: "TXT",
                                data: details.content,
                                ttl: 60
                            }
                        })).payload();
                        return {
                            undo() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield client.deleteDomainRecord({
                                        payload: {
                                            recordid: record.response.record.recordid
                                        }
                                    });
                                });
                            }
                        };
                    });
                }
            };
        });
    }
    exports.makeStandardClient = makeStandardClient;
    ;
});
define("build/mod/json/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("build/mod/pem/index", ["require", "exports", "crypto"], function (require, exports, libcrypto) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = exports.parse = exports.parseHeaders = exports.encrypt = exports.decrypt = exports.deriveKey = void 0;
    function deriveKey(data, salt, keyLength) {
        let last = Buffer.alloc(0);
        let key = Buffer.alloc(0);
        while (key.length < keyLength) {
            let hash = libcrypto.createHash("MD5");
            hash.update(last);
            hash.update(data);
            hash.update(salt);
            last = hash.digest();
            key = Buffer.concat([key, last]);
        }
        return key.slice(0, keyLength);
    }
    exports.deriveKey = deriveKey;
    ;
    function decrypt(section, passphrase) {
        var _a, _b, _c, _d, _e;
        let procTypes = (_b = (_a = section.headers) === null || _a === void 0 ? void 0 : _a.filter((header) => header.key.toLowerCase() === "proc-type")) !== null && _b !== void 0 ? _b : [];
        if (procTypes.length !== 1) {
            throw `Expected exactly one "Proc-Type" header!`;
        }
        let procType = procTypes[0].value.trim().split(",");
        if (procType.length < 2) {
            throw `Expected "Proc-Type" to contain at least 2 values!`;
        }
        if (procType[0] !== "4" || procType[1] !== "ENCRYPTED") {
            throw `Expected an encrypted section!`;
        }
        let dekInfos = (_d = (_c = section.headers) === null || _c === void 0 ? void 0 : _c.filter((header) => header.key.toLowerCase() === "dek-info")) !== null && _d !== void 0 ? _d : [];
        if (dekInfos.length !== 1) {
            throw `Expected exactly one "DEK-Info" header!`;
        }
        let dekInfo = dekInfos[0].value.trim().split(",");
        if (dekInfo.length < 2) {
            throw `Expected "DEK-Info" to contain at least 2 values!`;
        }
        let algorithm = dekInfo[0];
        let { ivLength, keyLength } = Object.assign({}, libcrypto.getCipherInfo(algorithm));
        if (ivLength == null || keyLength == null) {
            throw `Expected "${algorithm}" to be a supported cipher!`;
        }
        let iv = Buffer.from(dekInfo[1], "hex");
        let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
        let decipher = libcrypto.createDecipheriv(algorithm, key, iv);
        let buffer = Buffer.concat([decipher.update(section.buffer), decipher.final()]);
        return Object.assign(Object.assign({}, section), { headers: [
                ...((_e = section.headers) !== null && _e !== void 0 ? _e : []).filter((header) => {
                    let key = header.key.toLowerCase();
                    return key !== "proc-type" && key !== "dek-info";
                }),
            ], buffer });
    }
    exports.decrypt = decrypt;
    ;
    function encrypt(section, passphrase, options) {
        var _a, _b, _c;
        let algorithm = (_a = options === null || options === void 0 ? void 0 : options.algorithm) !== null && _a !== void 0 ? _a : "AES-128-CBC";
        let { ivLength, keyLength } = Object.assign({}, libcrypto.getCipherInfo(algorithm));
        if (ivLength == null || keyLength == null) {
            throw `Expected "${algorithm}" to be a supported cipher!`;
        }
        let iv = (_b = options === null || options === void 0 ? void 0 : options.iv) !== null && _b !== void 0 ? _b : libcrypto.randomBytes(ivLength);
        let key = deriveKey(Buffer.from(passphrase), iv.slice(0, 8), keyLength);
        let cipher = libcrypto.createCipheriv(algorithm, key, iv);
        let buffer = Buffer.concat([cipher.update(section.buffer), cipher.final()]);
        return Object.assign(Object.assign({}, section), { headers: [
                ...((_c = section.headers) !== null && _c !== void 0 ? _c : []),
                {
                    key: "Proc-TYPE",
                    value: ["4", "ENCRYPTED"].join(",")
                },
                {
                    key: "DEK-Info",
                    value: [algorithm, iv.toString("hex").toUpperCase()].join(",")
                }
            ], buffer });
    }
    exports.encrypt = encrypt;
    ;
    function parseHeaders(lines) {
        for (let i = 1; i < lines.length;) {
            let parts = /^[ \t]([\x09\x20-\x7E]*)$/u.exec(lines[i]);
            if (parts != null) {
                lines.splice(i, 1);
                lines[i - 1] += parts[1];
            }
            else {
                i += 1;
            }
        }
        return lines.map((line) => {
            let parts = /^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)[:]([\x09\x20-\x7E]*)$/u.exec(line);
            if (parts == null) {
                throw `Expected a valid header!`;
            }
            let key = parts[1];
            let value = parts[2];
            return {
                key,
                value
            };
        });
    }
    exports.parseHeaders = parseHeaders;
    ;
    function parse(string) {
        let sections = new Array();
        let lines = string.split(/\r\n|\r|\n/);
        let index = 0;
        let preamble = new Array();
        outer: while (index < lines.length) {
            let line = lines[index++];
            let parts = /^-----BEGIN ((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)-----$/u.exec(line);
            if (parts == null) {
                preamble.push(line);
                continue outer;
            }
            let label = parts[1];
            let start = index;
            inner: while (index < lines.length) {
                if (lines[index++] !== `-----END ${label}-----`) {
                    continue inner;
                }
                let end = index;
                let message = lines.slice(start, end - 1);
                let emptyIndex = Math.max(0, message.indexOf(""));
                let head = message.slice(0, emptyIndex);
                let body = message.slice(emptyIndex);
                let headers = parseHeaders(head);
                sections.push({
                    preamble: preamble.splice(0, preamble.length),
                    label: label,
                    headers: headers,
                    buffer: Buffer.from(body.join(""), "base64")
                });
                continue outer;
            }
            throw `Expected end of label "${label}"!`;
        }
        let postamble = preamble;
        return {
            sections,
            postamble
        };
    }
    exports.parse = parse;
    ;
    function serialize(document) {
        var _a, _b, _c;
        let lines = new Array();
        for (let section of document.sections) {
            if (!/^((?:[\x21-\x2C\x2E-\x7E][\x21-\x2C\x2E-\x7E \-]*)?)$/u.test(section.label)) {
                throw `Expected a valid label!`;
            }
            lines.push(...((_a = section.preamble) !== null && _a !== void 0 ? _a : []));
            lines.push(`-----BEGIN ${section.label}-----`);
            if (section.headers != null && section.headers.length > 0) {
                for (let { key, value } of section.headers) {
                    if (!/^([\x21\x23-\x27\x2A-\x2B\x2D-\x2E\x30-\x39\x41-\x5A\x5E-\x7A\x7C\x7E]+)$/u.test(key)) {
                        throw `Expected a valid header key!`;
                    }
                    if (!/^([\x09\x20-\x7E]*)$/u.test(value)) {
                        throw `Expected a valid header value!`;
                    }
                    let parts = (_b = value.match(/.{1,64}/g)) !== null && _b !== void 0 ? _b : [];
                    if (key.length + 1 + parts[0].length > 64) {
                        parts.unshift("");
                    }
                    lines.push(`${key}:${parts[0]}`);
                    for (let part of parts.slice(1)) {
                        lines.push(`\t${part}`);
                    }
                }
                lines.push("");
            }
            let base64 = section.buffer.toString("base64");
            for (let i = 0; i < base64.length; i += 64) {
                let line = base64.substr(i, 64);
                lines.push(line);
            }
            lines.push(`-----END ${section.label}-----`);
        }
        lines.push(...((_c = document.postamble) !== null && _c !== void 0 ? _c : []));
        return lines.join("\r\n");
    }
    exports.serialize = serialize;
    ;
});
define("build/mod/pkcs1/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, asn1_1, asn1_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.RSAPrivateKey = exports.RSAPublicKey = exports.OtherPrimeInfos = exports.OtherPrimeInfo = exports.ASN1Sequence = exports.ASN1Integer = void 0;
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_1.Integer);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_2.Sequence);
    exports.OtherPrimeInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer))
    }, {}));
    exports.OtherPrimeInfos = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.OtherPrimeInfo))
    }, {}));
    exports.RSAPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer))
    }, {}));
    exports.RSAPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.OtherPrimeInfos), autoguard.guards.Undefined))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "OtherPrimeInfo": autoguard.guards.Reference.of(() => exports.OtherPrimeInfo),
            "OtherPrimeInfos": autoguard.guards.Reference.of(() => exports.OtherPrimeInfos),
            "RSAPublicKey": autoguard.guards.Reference.of(() => exports.RSAPublicKey),
            "RSAPrivateKey": autoguard.guards.Reference.of(() => exports.RSAPrivateKey)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/pkcs1/index", ["require", "exports", "build/mod/asn1/index", "build/mod/der/index", "build/mod/jwk/index", "build/mod/parsing/index", "build/mod/pkcs1/schema/index", "build/mod/pkcs1/schema/index"], function (require, exports, asn1, der, jwk, parsing, schema, schema_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeRSAPrivateKey = exports.parseRSAPrivateKey = exports.serializeRSAPublicKey = exports.parseRSAPublicKey = void 0;
    __exportStar(schema_5, exports);
    function parseRSAPublicKey(buffer) {
        try {
            let { n, e } = parseRSAPrivateKey(buffer);
            return {
                kty: "RSA",
                n,
                e
            };
        }
        catch (error) { }
        let parser = new parsing.Parser(buffer);
        let node = schema.RSAPublicKey.as(der.node.parse(parser));
        let [nNode, eNode] = node.data;
        let n = jwk.getJWKInteger(nNode.data);
        let e = jwk.getJWKInteger(eNode.data);
        return {
            kty: "RSA",
            n,
            e
        };
    }
    exports.parseRSAPublicKey = parseRSAPublicKey;
    ;
    function serializeRSAPublicKey(key) {
        let { n, e } = key;
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(n) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(e) })
            ] });
        return der.node.serialize(node);
    }
    exports.serializeRSAPublicKey = serializeRSAPublicKey;
    ;
    function parseRSAPrivateKey(buffer) {
        let parser = new parsing.Parser(buffer);
        let node = schema.RSAPrivateKey.as(der.node.parse(parser));
        let [vNode, nNode, eNode, dNode, pNode, qNode, dpNode, dqNode, qiNode, othNode] = node.data;
        let n = jwk.getJWKInteger(nNode.data);
        let e = jwk.getJWKInteger(eNode.data);
        let d = jwk.getJWKInteger(dNode.data);
        let p = jwk.getJWKInteger(pNode.data);
        let q = jwk.getJWKInteger(qNode.data);
        let dp = jwk.getJWKInteger(dpNode.data);
        let dq = jwk.getJWKInteger(dqNode.data);
        let qi = jwk.getJWKInteger(qiNode.data);
        let oth = othNode === null || othNode === void 0 ? void 0 : othNode.data.map((node) => {
            let r = jwk.getJWKInteger(node.data[0].data);
            let d = jwk.getJWKInteger(node.data[1].data);
            let t = jwk.getJWKInteger(node.data[2].data);
            return {
                r,
                d,
                t
            };
        });
        return {
            kty: "RSA",
            n,
            e,
            d,
            p,
            q,
            dp,
            dq,
            qi,
            oth
        };
    }
    exports.parseRSAPrivateKey = parseRSAPrivateKey;
    ;
    function serializeRSAPrivateKey(key) {
        let { n, e, d, p, q, dp, dq, qi, oth } = key;
        if (p == null || q == null || dp == null || dq == null || qi == null) {
            throw `Expected a full RSA private key!`;
        }
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(0).toString("base64url") }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(n) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(e) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(d) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(p) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(q) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(dp) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(dq) }),
                Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(qi) })
            ] });
        if (oth != null) {
            node.data.push(Object.assign(Object.assign({}, asn1.SEQUENCE), { data: oth.map((prime) => {
                    return Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.r) }),
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.d) }),
                            Object.assign(Object.assign({}, asn1.INTEGER), { data: jwk.getASN1Integer(prime.t) })
                        ] });
                }) }));
        }
        return der.node.serialize(node);
    }
    exports.serializeRSAPrivateKey = serializeRSAPrivateKey;
    ;
});
define("build/mod/pkcs8/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/pkcs5/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, pkcs5_1, asn1_1, asn1_2, asn1_3, asn1_4, asn1_5, asn1_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.RSAPrivateKey = exports.RSAPublicKey = exports.RSAIdentifier = exports.ECPrivateKey = exports.ECPublicKey = exports.ECIdentifier = exports.ECCurve = exports.ECCurveSecp521r1 = exports.ECCurveSecp384r1 = exports.ECCurvePrime256v1 = exports.PrivateKeyInfo = exports.PublicKeyInfo = exports.PKCS5AlgorithmIdentifier = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Null = exports.ASN1Integer = exports.ASN1BitString = void 0;
    exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_2.Integer);
    exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_3.Null);
    exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_4.ObjectIdentifier);
    exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_5.OctetString);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_6.Sequence);
    exports.PKCS5AlgorithmIdentifier = autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier);
    exports.PublicKeyInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.PKCS5AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
    }, {}));
    exports.PrivateKeyInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.PKCS5AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.ECCurvePrime256v1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.2.840.10045.3.1.7")
    }, {}));
    exports.ECCurveSecp384r1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.3.132.0.34")
    }, {}));
    exports.ECCurveSecp521r1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.StringLiteral.of("1.3.132.0.35")
    }, {}));
    exports.ECCurve = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.ECCurvePrime256v1), autoguard.guards.Reference.of(() => exports.ECCurveSecp384r1), autoguard.guards.Reference.of(() => exports.ECCurveSecp521r1));
    exports.ECIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PKCS5AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.10045.2.1")
        }, {})), autoguard.guards.Reference.of(() => exports.ECCurve))
    }, {}));
    exports.ECPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PublicKeyInfo), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ECIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
    }, {}));
    exports.ECPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PrivateKeyInfo), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ECIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.RSAIdentifier = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PKCS5AlgorithmIdentifier), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.1.1")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Null))
    }, {}));
    exports.RSAPublicKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PublicKeyInfo), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.RSAIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
    }, {}));
    exports.RSAPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.PrivateKeyInfo), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.RSAIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1BitString": autoguard.guards.Reference.of(() => exports.ASN1BitString),
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
            "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
            "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "PKCS5AlgorithmIdentifier": autoguard.guards.Reference.of(() => exports.PKCS5AlgorithmIdentifier),
            "PublicKeyInfo": autoguard.guards.Reference.of(() => exports.PublicKeyInfo),
            "PrivateKeyInfo": autoguard.guards.Reference.of(() => exports.PrivateKeyInfo),
            "ECCurvePrime256v1": autoguard.guards.Reference.of(() => exports.ECCurvePrime256v1),
            "ECCurveSecp384r1": autoguard.guards.Reference.of(() => exports.ECCurveSecp384r1),
            "ECCurveSecp521r1": autoguard.guards.Reference.of(() => exports.ECCurveSecp521r1),
            "ECCurve": autoguard.guards.Reference.of(() => exports.ECCurve),
            "ECIdentifier": autoguard.guards.Reference.of(() => exports.ECIdentifier),
            "ECPublicKey": autoguard.guards.Reference.of(() => exports.ECPublicKey),
            "ECPrivateKey": autoguard.guards.Reference.of(() => exports.ECPrivateKey),
            "RSAIdentifier": autoguard.guards.Reference.of(() => exports.RSAIdentifier),
            "RSAPublicKey": autoguard.guards.Reference.of(() => exports.RSAPublicKey),
            "RSAPrivateKey": autoguard.guards.Reference.of(() => exports.RSAPrivateKey)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/pkcs8/index", ["require", "exports", "build/mod/asn1/index", "build/mod/der/index", "build/mod/parsing/index", "build/mod/pkcs1/index", "build/mod/pkcs8/schema/index", "build/mod/pkcs8/schema/index"], function (require, exports, asn1, der, parsing, pkcs1, schema, schema_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeRSAPrivateKey = exports.parseRSAPrivateKey = exports.serializeRSAPublicKey = exports.parseRSAPublicKey = void 0;
    __exportStar(schema_6, exports);
    function parseRSAPublicKey(bufferPKCS8) {
        try {
            let { n, e } = parseRSAPrivateKey(bufferPKCS8);
            return {
                kty: "RSA",
                n,
                e
            };
        }
        catch (error) { }
        let parser = new parsing.Parser(bufferPKCS8);
        let node = schema.RSAPublicKey.as(der.node.parse(parser));
        let [algoNode, keyNode] = node.data;
        let bitstring = Buffer.from(keyNode.data, "base64url");
        if (bitstring[0] !== 0x00) {
            throw `Expected zero unused bits!`;
        }
        let bufferPKCS1 = bitstring.slice(1);
        return pkcs1.parseRSAPublicKey(bufferPKCS1);
    }
    exports.parseRSAPublicKey = parseRSAPublicKey;
    ;
    function serializeRSAPublicKey(key) {
        let bufferPKCS1 = pkcs1.serializeRSAPublicKey(key);
        let bitstring = Buffer.alloc(bufferPKCS1.length + 1);
        bitstring[0] = 0x00;
        bitstring.set(bufferPKCS1, 1);
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.1" }),
                        Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                    ] }),
                Object.assign(Object.assign({}, asn1.BIT_STRING), { data: bitstring.toString("base64url") })
            ] });
        let bufferPKCS8 = der.node.serialize(node);
        return bufferPKCS8;
    }
    exports.serializeRSAPublicKey = serializeRSAPublicKey;
    ;
    function parseRSAPrivateKey(bufferPKCS8) {
        let parser = new parsing.Parser(bufferPKCS8);
        let node = schema.RSAPrivateKey.as(der.node.parse(parser));
        let [versionNode, algoNode, keyNode] = node.data;
        let bufferPKCS1 = Buffer.from(keyNode.data, "base64url");
        return pkcs1.parseRSAPrivateKey(bufferPKCS1);
    }
    exports.parseRSAPrivateKey = parseRSAPrivateKey;
    ;
    function serializeRSAPrivateKey(key) {
        let bufferPKCS1 = pkcs1.serializeRSAPrivateKey(key);
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(0).toString("base64url") }),
                Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                        Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.1.1" }),
                        Object.assign(Object.assign({}, asn1.NULL), { data: "" })
                    ] }),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: bufferPKCS1.toString("base64url") })
            ] });
        let bufferPKCS8 = der.node.serialize(node);
        return bufferPKCS8;
    }
    exports.serializeRSAPrivateKey = serializeRSAPrivateKey;
    ;
});
define("build/mod/pkcs10/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/pkcs5/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/pkcs8/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, pkcs5_1, asn1_1, asn1_2, asn1_3, asn1_4, asn1_5, asn1_6, asn1_7, pkcs8_1, asn1_8, asn1_9, asn1_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.CertificationRequest = exports.CertificationRequestInfo = exports.ExtensionRequests = exports.Extensions = exports.Extension = exports.SubjectAlternativeNameExtension = exports.Extension2 = exports.Extension1 = exports.CRIAttribute = exports.Name = exports.RDNSequence = exports.RelativeDistinguishedName = exports.CommonName = exports.AttributeTypeAndValue = exports.ASN1Boolean = exports.ASN1UTF8String = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Set = exports.ASN1Node = exports.ASN1Null = exports.ASN1Integer = exports.ASN1BitString = void 0;
    exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_3.Integer);
    exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_5.Null);
    exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_4.Node);
    exports.ASN1Set = autoguard.guards.Reference.of(() => asn1_9.Set);
    exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_6.ObjectIdentifier);
    exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_7.OctetString);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_8.Sequence);
    exports.ASN1UTF8String = autoguard.guards.Reference.of(() => asn1_10.UTF8String);
    exports.ASN1Boolean = autoguard.guards.Reference.of(() => asn1_2.Boolean);
    exports.AttributeTypeAndValue = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1Node))
    }, {}));
    exports.CommonName = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.AttributeTypeAndValue), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.5.4.3")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1UTF8String))
    }, {}));
    exports.RelativeDistinguishedName = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Set), autoguard.guards.Object.of({
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.AttributeTypeAndValue))
    }, {}));
    exports.RDNSequence = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.RelativeDistinguishedName))
    }, {}));
    exports.Name = autoguard.guards.Reference.of(() => exports.RDNSequence);
    exports.CRIAttribute = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1Set))
    }, {}));
    exports.Extension1 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1Boolean), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.Extension2 = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.SubjectAlternativeNameExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.5.29.17")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.Extension = autoguard.guards.Union.of(autoguard.guards.Reference.of(() => exports.Extension1), autoguard.guards.Reference.of(() => exports.Extension2));
    exports.Extensions = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.Extension))
    }, {}));
    exports.ExtensionRequests = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.CRIAttribute), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("1.2.840.113549.1.9.14")
        }, {})), autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Set), autoguard.guards.Object.of({
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.Extensions))
        }, {})))
    }, {}));
    exports.CertificationRequestInfo = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.Name), autoguard.guards.Reference.of(() => pkcs8_1.PublicKeyInfo), autoguard.guards.Object.of({
            "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
            "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
            "type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
            "data": autoguard.guards.Array.of(autoguard.guards.Reference.of(() => exports.CRIAttribute))
        }, {}))
    }, {}));
    exports.CertificationRequest = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.CertificationRequestInfo), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1BitString": autoguard.guards.Reference.of(() => exports.ASN1BitString),
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
            "ASN1Node": autoguard.guards.Reference.of(() => exports.ASN1Node),
            "ASN1Set": autoguard.guards.Reference.of(() => exports.ASN1Set),
            "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
            "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "ASN1UTF8String": autoguard.guards.Reference.of(() => exports.ASN1UTF8String),
            "ASN1Boolean": autoguard.guards.Reference.of(() => exports.ASN1Boolean),
            "AttributeTypeAndValue": autoguard.guards.Reference.of(() => exports.AttributeTypeAndValue),
            "CommonName": autoguard.guards.Reference.of(() => exports.CommonName),
            "RelativeDistinguishedName": autoguard.guards.Reference.of(() => exports.RelativeDistinguishedName),
            "RDNSequence": autoguard.guards.Reference.of(() => exports.RDNSequence),
            "Name": autoguard.guards.Reference.of(() => exports.Name),
            "CRIAttribute": autoguard.guards.Reference.of(() => exports.CRIAttribute),
            "Extension1": autoguard.guards.Reference.of(() => exports.Extension1),
            "Extension2": autoguard.guards.Reference.of(() => exports.Extension2),
            "SubjectAlternativeNameExtension": autoguard.guards.Reference.of(() => exports.SubjectAlternativeNameExtension),
            "Extension": autoguard.guards.Reference.of(() => exports.Extension),
            "Extensions": autoguard.guards.Reference.of(() => exports.Extensions),
            "ExtensionRequests": autoguard.guards.Reference.of(() => exports.ExtensionRequests),
            "CertificationRequestInfo": autoguard.guards.Reference.of(() => exports.CertificationRequestInfo),
            "CertificationRequest": autoguard.guards.Reference.of(() => exports.CertificationRequest)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/pkcs10/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/der/index", "build/mod/jwk/index", "build/mod/parsing/index", "build/mod/pkcs5/index", "build/mod/pkcs8/index", "build/mod/pkcs10/schema/index"], function (require, exports, libcrypto, asn1, der, jwk, parsing, pkcs5, pkcs8, schema_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createCertificateRequest = exports.createSANExtension = exports.getDefaultAlgorithm = void 0;
    __exportStar(schema_7, exports);
    function getDefaultAlgorithm(key) {
        let keyJwk = key.export({ format: "jwk" });
        if (jwk.RSAPublicKey.is(keyJwk)) {
            return new pkcs5.signature.SHA256WithRSAEncryption();
        }
        if (jwk.ECPublicKey.is(keyJwk)) {
            if (keyJwk.crv === "P-256") {
                return new pkcs5.signature.ECDSAWithSHA256({ format: "der" });
            }
            if (keyJwk.crv === "P-384") {
                return new pkcs5.signature.ECDSAWithSHA384({ format: "der" });
            }
            if (keyJwk.crv === "P-521") {
                return new pkcs5.signature.ECDSAWithSHA512({ format: "der" });
            }
        }
        throw `Expected code to be unreachable!`;
    }
    exports.getDefaultAlgorithm = getDefaultAlgorithm;
    ;
    function createSANExtension(hostnames) {
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: hostnames.map((hostname) => {
                let buffer = Buffer.from(hostname);
                return {
                    kind: "CONTEXT",
                    form: "PRIMITIVE",
                    type: "INTEGER",
                    data: buffer.toString("base64url")
                };
            }) });
        return der.node.serialize(node);
    }
    exports.createSANExtension = createSANExtension;
    ;
    function createCertificateRequest(hostnames, key, options) {
        var _a;
        if (hostnames.length === 0) {
            throw `Expected at least one hostname!`;
        }
        let signatureAlgorithm = (_a = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _a !== void 0 ? _a : getDefaultAlgorithm(key);
        let subject = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.SET), { data: [
                        Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.4.3" }),
                                Object.assign(Object.assign({}, asn1.UTF8_STRING), { data: Buffer.from(hostnames[0]).toString("base64url") })
                            ] })
                    ] })
            ] });
        let spki = pkcs8.PublicKeyInfo.as(der.node.parse(new parsing.Parser(libcrypto.createPublicKey(key).export({ format: "der", type: "spki" }))));
        let extensionRequests = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.113549.1.9.14" }),
                Object.assign(Object.assign({}, asn1.SET), { data: [
                        Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                                        Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.29.17" }),
                                        Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: createSANExtension(hostnames).toString("base64url") })
                                    ] })
                            ] })
                    ] })
            ] });
        let cri = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(0)).toString("base64url") }),
                Object.assign({}, subject),
                Object.assign({}, spki),
                {
                    kind: "CONTEXT",
                    form: "CONSTRUCTED",
                    type: "END_OF_CONTENT",
                    data: [
                        extensionRequests
                    ]
                }
            ] });
        let signature = Buffer.concat([Buffer.alloc(1), signatureAlgorithm.sign(der.node.serialize(cri), key)]);
        let cr = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign({}, cri),
                Object.assign({}, signatureAlgorithm.getIdentifier()),
                Object.assign(Object.assign({}, asn1.BIT_STRING), { data: signature.toString("base64url") })
            ] });
        return der.node.serialize(cr);
    }
    exports.createCertificateRequest = createCertificateRequest;
    ;
});
define("build/mod/rsa/index", ["require", "exports", "crypto", "build/mod/jwk/index"], function (require, exports, libcrypto, jwk) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generatePrivateKeyJWK = exports.generatePrivateKeyPKCS8 = exports.generatePrivateKeyPKCS1 = exports.generatePrivateKey = void 0;
    function generatePrivateKey(options) {
        var _a;
        let modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 4096;
        let pair = libcrypto.generateKeyPairSync("rsa", {
            modulusLength: modulusLength
        });
        return pair.privateKey;
    }
    exports.generatePrivateKey = generatePrivateKey;
    ;
    function generatePrivateKeyPKCS1(options) {
        let key = generatePrivateKey(options);
        return key.export({
            format: "der",
            type: "pkcs1"
        });
    }
    exports.generatePrivateKeyPKCS1 = generatePrivateKeyPKCS1;
    ;
    function generatePrivateKeyPKCS8(options) {
        let key = generatePrivateKey(options);
        return key.export({
            format: "der",
            type: "pkcs8"
        });
    }
    exports.generatePrivateKeyPKCS8 = generatePrivateKeyPKCS8;
    ;
    function generatePrivateKeyJWK(options) {
        let key = generatePrivateKey(options);
        let json = key.export({
            format: "jwk"
        });
        return jwk.RSAPrivateKey.as(json);
    }
    exports.generatePrivateKeyJWK = generatePrivateKeyJWK;
    ;
});
define("build/mod/sec1/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/asn1/index", "build/mod/pkcs8/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, asn1_1, pkcs8_1, asn1_2, asn1_3, asn1_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.ECPrivateKey = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1Integer = exports.ASN1BitString = void 0;
    exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_2.Integer);
    exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_3.OctetString);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_4.Sequence);
    exports.ECPrivateKey = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1Integer), autoguard.guards.Reference.of(() => exports.ASN1OctetString), autoguard.guards.Object.of({
            "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
            "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
            "type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => pkcs8_1.ECCurve))
        }, {}), autoguard.guards.Object.of({
            "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
            "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
            "type": autoguard.guards.StringLiteral.of("BOOLEAN"),
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1BitString))
        }, {}))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1BitString": autoguard.guards.Reference.of(() => exports.ASN1BitString),
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "ECPrivateKey": autoguard.guards.Reference.of(() => exports.ECPrivateKey)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/sec1/index", ["require", "exports", "build/mod/asn1/index", "build/mod/der/index", "build/mod/jwk/index", "build/mod/parsing/index", "build/mod/pkcs8/index", "build/mod/sec1/schema/index", "build/mod/sec1/schema/index"], function (require, exports, asn1, der, jwk, parsing, pkcs8, schema, schema_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeECPrivateKey = exports.parseECPrivateKey = exports.serializePoint = exports.parsePoint = exports.serializeCurve = exports.parseCurve = void 0;
    __exportStar(schema_8, exports);
    function parseCurve(node) {
        if (pkcs8.ECCurvePrime256v1.is(node)) {
            return "P-256";
        }
        if (pkcs8.ECCurveSecp384r1.is(node)) {
            return "P-384";
        }
        if (pkcs8.ECCurveSecp521r1.is(node)) {
            return "P-521";
        }
        throw `Expected curve to be known!`;
    }
    exports.parseCurve = parseCurve;
    ;
    function serializeCurve(curve) {
        if (curve === "P-256") {
            let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.2.840.10045.3.1.7" });
            return node;
        }
        if (curve === "P-384") {
            let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.3.132.0.34" });
            return node;
        }
        if (curve === "P-521") {
            let node = Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "1.3.132.0.35" });
            return node;
        }
        throw `Expected curve to be known!`;
    }
    exports.serializeCurve = serializeCurve;
    ;
    function parsePoint(node) {
        let buffer = Buffer.from(node.data, "base64url");
        if (buffer[0] !== 0x00) {
            throw `Expected zero unused bits!`;
        }
        if (buffer[1] !== 0x04) {
            throw `Expected an uncompressed point!`;
        }
        buffer = buffer.slice(2);
        if ((buffer.length % 2) !== 0) {
            throw `Expected an even number of octets!`;
        }
        let xBuffer = buffer.slice(0, buffer.length / 2);
        let yBuffer = buffer.slice(buffer.length / 2);
        let xEncoded = asn1.encodeInteger(asn1.decodeInteger(xBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
        let yEncoded = asn1.encodeInteger(asn1.decodeInteger(yBuffer, { paddedUnsigned: false }), { paddedUnsigned: false });
        let x = xEncoded.toString("base64url");
        let y = yEncoded.toString("base64url");
        return {
            x,
            y
        };
    }
    exports.parsePoint = parsePoint;
    ;
    function serializePoint(x, y) {
        let xBuffer = Buffer.from(x, "base64url");
        let yBuffer = Buffer.from(y, "base64url");
        let width = Math.max(xBuffer.length, yBuffer.length);
        let buffer = Buffer.alloc(2 + width + width);
        buffer[0] = 0x00;
        buffer[1] = 0x04;
        buffer.set(xBuffer, 2 + width - xBuffer.length);
        buffer.set(yBuffer, 2 + width + width - yBuffer.length);
        let data = buffer.toString("base64url");
        return Object.assign(Object.assign({}, asn1.BIT_STRING), { data });
    }
    exports.serializePoint = serializePoint;
    ;
    function parseECPrivateKey(buffer) {
        let parser = new parsing.Parser(buffer);
        let node = schema.ECPrivateKey.as(der.node.parse(parser));
        let [vNode, dNode, crvNode, xyNode] = node.data;
        let d = jwk.getJWKInteger(dNode.data);
        let crv = parseCurve(crvNode.data[0]);
        let { x, y } = parsePoint(xyNode.data[0]);
        return {
            kty: "EC",
            crv,
            x,
            y,
            d
        };
    }
    exports.parseECPrivateKey = parseECPrivateKey;
    ;
    function serializeECPrivateKey(key) {
        let { crv, x, y, d } = key;
        let node = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.INTEGER), { data: Buffer.of(1).toString("base64url") }),
                Object.assign(Object.assign({}, asn1.OCTET_STRING), { data: jwk.getASN1Integer(d) }),
                {
                    kind: "CONTEXT",
                    form: "CONSTRUCTED",
                    type: "END_OF_CONTENT",
                    data: [
                        Object.assign({}, serializeCurve(crv))
                    ]
                },
                {
                    kind: "CONTEXT",
                    form: "CONSTRUCTED",
                    type: "BOOLEAN",
                    data: [
                        Object.assign({}, serializePoint(x, y))
                    ]
                }
            ] });
        return der.node.serialize(node);
    }
    exports.serializeECPrivateKey = serializeECPrivateKey;
    ;
});
define("build/mod/x509/schema/index", ["require", "exports", "node_modules/@joelek/ts-autoguard/dist/lib-shared/index", "build/mod/pkcs5/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/pkcs10/index", "build/mod/pkcs10/index", "build/mod/asn1/index", "build/mod/pkcs10/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/pkcs8/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index", "build/mod/asn1/index"], function (require, exports, autoguard, pkcs5_1, asn1_1, asn1_2, pkcs10_1, pkcs10_2, asn1_3, pkcs10_3, asn1_4, asn1_5, asn1_6, asn1_7, pkcs8_1, asn1_8, asn1_9, asn1_10, asn1_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // This file was auto-generated by @joelek/ts-autoguard. Edit at own risk.
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autoguard = exports.Certificate = exports.TBSCertificate = exports.BasicConstraintsExtension = exports.AuthorityKeyIdentifierExtension = exports.SubjectKeyIdentifierExtension = exports.Validity = exports.CertificateSerialNumber = exports.Version = exports.ASN1Boolean = exports.ASN1UTCTime = exports.ASN1UTF8String = exports.ASN1Set = exports.ASN1Sequence = exports.ASN1OctetString = exports.ASN1ObjectIdentifier = exports.ASN1Node = exports.ASN1Null = exports.ASN1Integer = exports.ASN1BitString = void 0;
    exports.ASN1BitString = autoguard.guards.Reference.of(() => asn1_1.BitString);
    exports.ASN1Integer = autoguard.guards.Reference.of(() => asn1_3.Integer);
    exports.ASN1Null = autoguard.guards.Reference.of(() => asn1_5.Null);
    exports.ASN1Node = autoguard.guards.Reference.of(() => asn1_4.Node);
    exports.ASN1ObjectIdentifier = autoguard.guards.Reference.of(() => asn1_6.ObjectIdentifier);
    exports.ASN1OctetString = autoguard.guards.Reference.of(() => asn1_7.OctetString);
    exports.ASN1Sequence = autoguard.guards.Reference.of(() => asn1_8.Sequence);
    exports.ASN1Set = autoguard.guards.Reference.of(() => asn1_9.Set);
    exports.ASN1UTF8String = autoguard.guards.Reference.of(() => asn1_11.UTF8String);
    exports.ASN1UTCTime = autoguard.guards.Reference.of(() => asn1_10.UTCTime);
    exports.ASN1Boolean = autoguard.guards.Reference.of(() => asn1_2.Boolean);
    exports.Version = autoguard.guards.Reference.of(() => exports.ASN1Integer);
    exports.CertificateSerialNumber = autoguard.guards.Reference.of(() => exports.ASN1Integer);
    exports.Validity = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.ASN1UTCTime), autoguard.guards.Reference.of(() => exports.ASN1UTCTime))
    }, {}));
    exports.SubjectKeyIdentifierExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.5.29.14")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.AuthorityKeyIdentifierExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.5.29.35")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.BasicConstraintsExtension = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => pkcs10_1.Extension), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier), autoguard.guards.Object.of({
            "data": autoguard.guards.StringLiteral.of("2.5.29.19")
        }, {})), autoguard.guards.Reference.of(() => exports.ASN1Boolean), autoguard.guards.Reference.of(() => exports.ASN1OctetString))
    }, {}));
    exports.TBSCertificate = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Object.of({
            "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
            "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
            "type": autoguard.guards.StringLiteral.of("END_OF_CONTENT"),
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.Version))
        }, {}), autoguard.guards.Reference.of(() => exports.CertificateSerialNumber), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => pkcs10_3.Name), autoguard.guards.Reference.of(() => exports.Validity), autoguard.guards.Reference.of(() => pkcs10_3.Name), autoguard.guards.Reference.of(() => pkcs8_1.PublicKeyInfo), autoguard.guards.Object.of({
            "kind": autoguard.guards.StringLiteral.of("CONTEXT"),
            "form": autoguard.guards.StringLiteral.of("CONSTRUCTED"),
            "type": autoguard.guards.StringLiteral.of("BIT_STRING"),
            "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => pkcs10_2.Extensions))
        }, {}))
    }, {}));
    exports.Certificate = autoguard.guards.Intersection.of(autoguard.guards.Reference.of(() => exports.ASN1Sequence), autoguard.guards.Object.of({
        "data": autoguard.guards.Tuple.of(autoguard.guards.Reference.of(() => exports.TBSCertificate), autoguard.guards.Reference.of(() => pkcs5_1.AlgorithmIdentifier), autoguard.guards.Reference.of(() => exports.ASN1BitString))
    }, {}));
    var Autoguard;
    (function (Autoguard) {
        Autoguard.Guards = {
            "ASN1BitString": autoguard.guards.Reference.of(() => exports.ASN1BitString),
            "ASN1Integer": autoguard.guards.Reference.of(() => exports.ASN1Integer),
            "ASN1Null": autoguard.guards.Reference.of(() => exports.ASN1Null),
            "ASN1Node": autoguard.guards.Reference.of(() => exports.ASN1Node),
            "ASN1ObjectIdentifier": autoguard.guards.Reference.of(() => exports.ASN1ObjectIdentifier),
            "ASN1OctetString": autoguard.guards.Reference.of(() => exports.ASN1OctetString),
            "ASN1Sequence": autoguard.guards.Reference.of(() => exports.ASN1Sequence),
            "ASN1Set": autoguard.guards.Reference.of(() => exports.ASN1Set),
            "ASN1UTF8String": autoguard.guards.Reference.of(() => exports.ASN1UTF8String),
            "ASN1UTCTime": autoguard.guards.Reference.of(() => exports.ASN1UTCTime),
            "ASN1Boolean": autoguard.guards.Reference.of(() => exports.ASN1Boolean),
            "Version": autoguard.guards.Reference.of(() => exports.Version),
            "CertificateSerialNumber": autoguard.guards.Reference.of(() => exports.CertificateSerialNumber),
            "Validity": autoguard.guards.Reference.of(() => exports.Validity),
            "SubjectKeyIdentifierExtension": autoguard.guards.Reference.of(() => exports.SubjectKeyIdentifierExtension),
            "AuthorityKeyIdentifierExtension": autoguard.guards.Reference.of(() => exports.AuthorityKeyIdentifierExtension),
            "BasicConstraintsExtension": autoguard.guards.Reference.of(() => exports.BasicConstraintsExtension),
            "TBSCertificate": autoguard.guards.Reference.of(() => exports.TBSCertificate),
            "Certificate": autoguard.guards.Reference.of(() => exports.Certificate)
        };
        Autoguard.Requests = {};
        Autoguard.Responses = {};
    })(Autoguard = exports.Autoguard || (exports.Autoguard = {}));
    ;
});
define("build/mod/x509/index", ["require", "exports", "crypto", "build/mod/asn1/index", "build/mod/der/index", "build/mod/pkcs5/index", "build/mod/pkcs10/index", "build/mod/parsing/index", "build/mod/x509/schema/index"], function (require, exports, libcrypto, asn1, der, pkcs5, pkcs10, parsing, schema_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateSignedCertificate = exports.signCertificationRequest = void 0;
    const DEFAULT_VALIDITY_PERIOD_DAYS = 90;
    __exportStar(schema_9, exports);
    function signCertificationRequest(buffer, issuer, key, options) {
        var _a, _b;
        let serialNumber = (_a = options === null || options === void 0 ? void 0 : options.serialNumber) !== null && _a !== void 0 ? _a : BigInt(1);
        let signatureAlgorithm = (_b = options === null || options === void 0 ? void 0 : options.signatureAlgorithm) !== null && _b !== void 0 ? _b : pkcs10.getDefaultAlgorithm(key);
        let now = new Date();
        now.setUTCSeconds(0);
        now.setUTCMilliseconds(0);
        let notBefore = options === null || options === void 0 ? void 0 : options.notBefore;
        if (notBefore == null) {
            notBefore = new Date(now);
        }
        let notAfter = options === null || options === void 0 ? void 0 : options.notAfter;
        if (notAfter == null) {
            notAfter = new Date(now);
            notAfter.setDate(notAfter.getDate() + DEFAULT_VALIDITY_PERIOD_DAYS);
        }
        let cr = pkcs10.CertificationRequest.as(der.node.parse(new parsing.Parser(buffer)));
        let [cri, crSignatureAlgorithmIdentifier, crSignature] = cr.data;
        let [criVersion, criSubject, criSubjectPublicKeyInfo, criAttributes] = cri.data;
        let crSignatureAlgorithm = pkcs5.signature.fromIdentifier(crSignatureAlgorithmIdentifier);
        let crKey = libcrypto.createPublicKey({
            key: der.node.serialize(criSubjectPublicKeyInfo),
            format: "der",
            type: "spki"
        });
        if (!crSignatureAlgorithm.verify(der.node.serialize(cri), crKey, Buffer.from(crSignature.data, "base64url").slice(1))) {
            throw `Expected signature to match certification request info!`;
        }
        let validity = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.UTC_TIME), { data: Buffer.from(asn1.encodeUTCTime(notBefore)).toString("base64url") }),
                Object.assign(Object.assign({}, asn1.UTC_TIME), { data: Buffer.from(asn1.encodeUTCTime(notAfter)).toString("base64url") })
            ] });
        let extensions = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [] });
        for (let criAttribute of criAttributes.data) {
            if (pkcs10.ExtensionRequests.is(criAttribute)) {
                for (let extension of criAttribute.data[1].data[0].data) {
                    if (pkcs10.SubjectAlternativeNameExtension.is(extension)) {
                        extensions.data.push(extension);
                    }
                }
            }
        }
        let tbsc = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                {
                    kind: "CONTEXT",
                    form: "CONSTRUCTED",
                    type: "END_OF_CONTENT",
                    data: [
                        Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(BigInt(2)).toString("base64url") })
                    ]
                },
                Object.assign(Object.assign({}, asn1.INTEGER), { data: asn1.encodeInteger(serialNumber).toString("base64url") }),
                Object.assign({}, crSignatureAlgorithmIdentifier),
                Object.assign({}, issuer),
                Object.assign({}, validity),
                Object.assign({}, criSubject),
                Object.assign({}, criSubjectPublicKeyInfo),
                {
                    kind: "CONTEXT",
                    form: "CONSTRUCTED",
                    type: "BIT_STRING",
                    data: [
                        extensions
                    ]
                }
            ] });
        let signature = Buffer.concat([Buffer.alloc(1), signatureAlgorithm.sign(der.node.serialize(tbsc), key)]);
        let certficate = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign({}, tbsc),
                Object.assign({}, signatureAlgorithm.getIdentifier()),
                Object.assign(Object.assign({}, asn1.BIT_STRING), { data: signature.toString("base64url") })
            ] });
        return der.node.serialize(certficate);
    }
    exports.signCertificationRequest = signCertificationRequest;
    ;
    function generateSignedCertificate(hostnames, subjectKey, issuerKey, csrOptions, options) {
        let buffer = pkcs10.createCertificateRequest(hostnames, subjectKey, csrOptions);
        let commonName = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.OBJECT_IDENTIFER), { data: "2.5.4.3" }),
                Object.assign(Object.assign({}, asn1.UTF8_STRING), { data: Buffer.from("multipass").toString("base64url") })
            ] });
        let issuer = Object.assign(Object.assign({}, asn1.SEQUENCE), { data: [
                Object.assign(Object.assign({}, asn1.SET), { data: [
                        commonName
                    ] })
            ] });
        return signCertificationRequest(buffer, issuer, issuerKey, options);
    }
    exports.generateSignedCertificate = generateSignedCertificate;
    ;
});
define("build/mod/index", ["require", "exports", "build/mod/acme/index", "build/mod/asn1/index", "build/mod/der/index", "build/mod/dns/index", "build/mod/dynu/index", "build/mod/ec/index", "build/mod/glesys/index", "build/mod/json/index", "build/mod/jwk/index", "build/mod/jws/index", "build/mod/parsing/index", "build/mod/pem/index", "build/mod/pkcs1/index", "build/mod/pkcs5/index", "build/mod/pkcs8/index", "build/mod/pkcs10/index", "build/mod/rsa/index", "build/mod/sec1/index", "build/mod/x509/index"], function (require, exports, acme, asn1, der, dns, dynu, ec, glesys, json, jwk, jws, parsing, pem, pkcs1, pkcs5, pkcs8, pkcs10, rsa, sec1, x509) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x509 = exports.sec1 = exports.rsa = exports.pkcs10 = exports.pkcs8 = exports.pkcs5 = exports.pkcs1 = exports.pem = exports.parsing = exports.jws = exports.jwk = exports.json = exports.glesys = exports.ec = exports.dynu = exports.dns = exports.der = exports.asn1 = exports.acme = void 0;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x509 = exports.sec1 = exports.rsa = exports.pkcs10 = exports.pkcs8 = exports.pkcs5 = exports.pkcs1 = exports.pem = exports.parsing = exports.jws = exports.jwk = exports.json = exports.glesys = exports.ec = exports.dynu = exports.dns = exports.der = exports.asn1 = exports.acme = void 0;
    exports.acme = acme;
    exports.asn1 = asn1;
    exports.der = der;
    exports.dns = dns;
    exports.dynu = dynu;
    exports.ec = ec;
    exports.glesys = glesys;
    exports.json = json;
    exports.jwk = jwk;
    exports.jws = jws;
    exports.parsing = parsing;
    exports.pem = pem;
    exports.pkcs1 = pkcs1;
    exports.pkcs5 = pkcs5;
    exports.pkcs8 = pkcs8;
    exports.pkcs10 = pkcs10;
    exports.rsa = rsa;
    exports.sec1 = sec1;
    exports.x509 = x509;
});
define("build/lib/index", ["require", "exports", "crypto", "dns", "fs", "path", "build/lib/config/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/mod/index", "build/lib/config/index"], function (require, exports, libcrypto, libdns, libfs, libpath, config, mod_1, mod_2, mod_3, mod_4, mod_5, mod_6, mod_7, mod_8, mod_9, config_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (this && this.__exportStar) || function (m, exports) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
                __createBinding(exports, m, p);
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.run = exports.loadConfig = void 0;
    __exportStar(config_3, exports);
    const LETS_ENCRYPT_STAGING = "https://acme-staging-v02.api.letsencrypt.org/directory";
    const LETS_ENCRYPT = "https://acme-v02.api.letsencrypt.org/directory";
    function loadConfig(value) {
        let string = libfs.readFileSync(value, "utf-8");
        let json = JSON.parse(string);
        return config.Options.as(json);
    }
    exports.loadConfig = loadConfig;
    ;
    function getDurationFromMilliseconds(ms) {
        let s = Math.floor(ms / 1000);
        ms -= s * 1000;
        let m = Math.floor(s / 60);
        s -= m * 60;
        let h = Math.floor(m / 60);
        m -= h * 60;
        let d = Math.floor(h / 24);
        h -= d * 24;
        return `${d} days, ${h} hours, ${m} minutes and ${s} seconds`;
    }
    ;
    function wait(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Waiting ${getDurationFromMilliseconds(ms)}...`);
            while (ms > 0) {
                let current = Math.min(ms, 2147483647);
                yield new Promise((resolve, reject) => {
                    setTimeout(resolve, current);
                });
                ms -= current;
            }
        });
    }
    ;
    function makeClient(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            if (config.ProviderDynu.is(credentials)) {
                return mod_4.dynu.makeStandardClient(credentials);
            }
            if (config.ProviderGlesys.is(credentials)) {
                return mod_6.glesys.makeStandardClient(credentials);
            }
            throw `Expected code to be unreachable!`;
        });
    }
    ;
    function getCanonicalName(hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Resolving canonical name for ${hostname}...`);
            let path = new Array(hostname);
            while (true) {
                let hostnames = new Array();
                try {
                    hostnames = yield libdns.promises.resolveCname(hostname);
                }
                catch (error) {
                    break;
                }
                if (hostnames.length !== 1) {
                    throw `Expected exactly one hostname!`;
                }
                console.log(`Found redirect between ${hostname} and ${hostnames[0]}.`);
                hostname = hostnames[0];
                if (path.includes(hostname)) {
                    throw `Expected canonical name to resolve properly!`;
                }
                path.push(hostname);
            }
            console.log(`Canonical name is ${hostname}.`);
            return hostname;
        });
    }
    ;
    function makeResolver(hostname) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Creating resolver for ${hostname}...`);
            let parts = hostname.split(".");
            for (let i = 0; i <= parts.length - 2; i++) {
                try {
                    let hostname = parts.slice(i).join(".");
                    console.log(`Attempting to locate nameserver for ${hostname}.`);
                    let response = yield libdns.promises.resolveSoa(hostname);
                    console.log(`Primary nameserver is ${response.nsname}.`);
                    let addresses = yield libdns.promises.resolve4(response.nsname);
                    for (let address of addresses) {
                        console.log(`Primary nameserver can be reached through ${address}.`);
                    }
                    let resolver = new libdns.promises.Resolver();
                    resolver.setServers(addresses);
                    return resolver;
                }
                catch (error) { }
            }
            throw `Expected a primary nameserver!`;
        });
    }
    ;
    function getTextRecords(hostname, resolver) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield resolver.resolveTxt(hostname);
            let records = response.map((parts) => parts.join(""));
            return records;
        });
    }
    ;
    function makeProvisionHostname(hostname) {
        if (hostname.startsWith("*.")) {
            return `_acme-challenge.${hostname.slice(2)}`;
        }
        else {
            return `_acme-challenge.${hostname}`;
        }
    }
    ;
    function getClientDetails(hostname, clients) {
        let hostnameParts = hostname.split(".").reverse();
        provider: for (let { client, domains } of clients) {
            domain: for (let domain of domains) {
                let domainParts = domain.split(".").reverse();
                for (let i = 0; i < domainParts.length; i++) {
                    if (domainParts[i] !== hostnameParts[i]) {
                        continue domain;
                    }
                }
                let subdomain = hostnameParts.slice(domainParts.length).reverse().join(".");
                return {
                    client,
                    domain,
                    subdomain
                };
            }
        }
        throw `Expected to find a DNS client for "${hostname}"!`;
    }
    ;
    function retryWithExponentialBackoff(seconds, attempts, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            let milliseconds = seconds * 1000;
            for (let i = 0; i < attempts; i++) {
                yield wait(milliseconds);
                try {
                    return yield handler();
                }
                catch (error) {
                    let randomness = 2.0 * Math.random() - 1.0;
                    let factor = 2.0 + (0.5 * randomness);
                    milliseconds = Math.round(milliseconds * factor);
                }
            }
            throw `Expected operation to succeed!`;
        });
    }
    ;
    function getPrivateKey(path) {
        libfs.mkdirSync(libpath.dirname(path), { recursive: true });
        if (!libfs.existsSync(path)) {
            let key = mod_5.ec.generatePrivateKey();
            let buffer = key.export({ format: "pem", type: "sec1" });
            libfs.writeFileSync(path, buffer);
            return key;
        }
        let buffer = libfs.readFileSync(path);
        try {
            return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "sec1" });
        }
        catch (error) { }
        try {
            return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs8" });
        }
        catch (error) { }
        try {
            return libcrypto.createPrivateKey({ key: buffer, format: "pem", type: "pkcs1" });
        }
        catch (error) { }
        throw `Expected a private key!`;
    }
    ;
    function processEntry(acmeUrl, entry, clients) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Processing entry...`);
            for (let hostname of entry.hostnames) {
                console.log(`Entry contains ${hostname}.`);
            }
            if (entry.validity != null) {
                let { notBefore, notAfter } = entry.validity;
                console.log(`Current certificate is valid between ${new Date(notBefore).toLocaleString()} and ${new Date(notAfter).toLocaleString()}.`);
            }
            if (entry.renewAfter > Date.now()) {
                console.log(`Process should start no sooner than ${new Date(entry.renewAfter).toLocaleString()}.`);
                return;
            }
            console.log(`Starting certification process...`);
            let undoables = new Array();
            try {
                let accountKey = getPrivateKey(entry.account);
                let certificateKey = getPrivateKey(entry.key);
                let handler = yield mod_1.acme.handler.Handler.make(acmeUrl, accountKey);
                yield handler.createNonce();
                let account = yield handler.createAccount({
                    termsOfServiceAgreed: true
                });
                let order = yield handler.createOrder(account.url, {
                    identifiers: entry.hostnames.map((hostname) => ({
                        type: "dns",
                        value: hostname
                    }))
                });
                if (order.payload.status === "pending") {
                    for (let url of order.payload.authorizations) {
                        let authorization = yield handler.getAuthorization(account.url, url);
                        if (authorization.payload.status === "pending") {
                            let challenges = authorization.payload.challenges.filter((challenge) => {
                                return mod_1.acme.api.ChallengeDNS01.is(challenge);
                            });
                            let challenge = challenges.pop();
                            if (challenge == null) {
                                throw `Expected a "dns-01" challenge!`;
                            }
                            if (challenge.status === "pending") {
                                let hostnameToAuthorize = makeProvisionHostname(authorization.payload.identifier.value);
                                console.log(`Proving authority over ${hostnameToAuthorize}...`);
                                let hostname = yield getCanonicalName(hostnameToAuthorize);
                                let content = mod_1.acme.computeKeyAuthorization(challenge.token, accountKey.export({ format: "jwk" }));
                                let { client, domain, subdomain } = getClientDetails(hostname, clients);
                                let resolver = yield makeResolver(hostname);
                                console.log(`Provisioning record at ${hostname}...`);
                                let undoable = yield client.provisionTextRecord({
                                    domain,
                                    subdomain,
                                    content
                                });
                                undoables.push(undoable);
                                console.log(`Waiting for record to propagate...`);
                                yield retryWithExponentialBackoff(60, 4, () => __awaiter(this, void 0, void 0, function* () {
                                    let records = yield getTextRecords(hostname, resolver);
                                    if (!records.includes(content)) {
                                        throw ``;
                                    }
                                }));
                                console.log(`Signaling that authority can be validated...`);
                                yield handler.finalizeChallenge(account.url, challenge.url);
                            }
                        }
                    }
                    console.log(`Waiting for authority to be proven...`);
                    order = yield retryWithExponentialBackoff(15, 4, () => __awaiter(this, void 0, void 0, function* () {
                        let updated = yield handler.getOrder(account.url, order.url);
                        if (updated.payload.status === "pending") {
                            throw ``;
                        }
                        return updated;
                    }));
                }
                if (order.payload.status === "ready") {
                    let csr = mod_9.pkcs10.createCertificateRequest(order.payload.identifiers.map((identifier) => identifier.value), certificateKey);
                    console.log(`Requesting certificate to be issued...`);
                    yield handler.finalizeOrder(account.url, order.payload.finalize, {
                        csr: csr.toString("base64url")
                    });
                }
                console.log(`Waiting for certificate to become ready...`);
                order = yield retryWithExponentialBackoff(15, 4, () => __awaiter(this, void 0, void 0, function* () {
                    let updated = yield handler.getOrder(account.url, order.url);
                    if (updated.payload.status === "processing") {
                        throw ``;
                    }
                    return updated;
                }));
                let url = order.payload.certificate;
                if (url == null) {
                    throw `Expected a certificate url!`;
                }
                let certificate = yield handler.downloadCertificate(account.url, url);
                if (libfs.existsSync(entry.cert)) {
                    libfs.renameSync(entry.cert, `${entry.cert}.old`);
                }
                libfs.mkdirSync(libpath.dirname(entry.cert), { recursive: true });
                libfs.writeFileSync(entry.cert, certificate);
                console.log(`Certificate successfully downloaded.`);
                entry.validity = getValidityFromCertificate(entry.cert);
                if (entry.validity != null) {
                    let { notBefore, notAfter } = entry.validity;
                    console.log(`Certificate is valid between ${new Date(notBefore).toLocaleString()} and ${new Date(notAfter).toLocaleString()}.`);
                }
                entry.renewAfter = getRenewAfter(entry.validity);
                console.log(`Certification process succeeded!`);
            }
            catch (error) {
                console.log(String(error));
                console.log(`Certification process failed!`);
                let randomness = 2.0 * Math.random() - 1.0;
                let factor = 1.0 + (0.5 * randomness);
                let msPerDay = 24 * 60 * 60 * 1000;
                entry.renewAfter = Date.now() + Math.round(msPerDay * factor);
                console.log(`Retry may be attempted no sooner than ${new Date(entry.renewAfter).toLocaleString()}.`);
            }
            for (let undoable of undoables) {
                yield undoable.undo();
            }
        });
    }
    ;
    function parseUTCTime(node) {
        var _a;
        let string = Buffer.from(node.data, "base64url").toString();
        let parts = /^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/.exec(string);
        if (parts == null) {
            throw `Expected a valid UTC time!`;
        }
        let century = (Number.parseInt(string[0]) < 5) ? "20" : "19";
        let year = parts[1];
        let month = parts[2];
        let day = parts[3];
        let hour = parts[4];
        let minute = parts[5];
        let second = (_a = parts[6]) !== null && _a !== void 0 ? _a : "00";
        let iso = `${century}${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
        return Date.parse(iso);
    }
    ;
    function getValidityFromCertificate(path) {
        if (!libfs.existsSync(path)) {
            return;
        }
        let document = mod_8.pem.parse(libfs.readFileSync(path, "utf-8"));
        let section = document.sections.find((section) => section.label === "CERTIFICATE");
        if (section == null) {
            throw `Expected a CERTIFICATE label!`;
        }
        let node = mod_3.der.node.parse(new mod_7.parsing.Parser(section.buffer));
        let datesNode = mod_2.asn1.Sequence.as(mod_2.asn1.Sequence.as(mod_2.asn1.Sequence.as(node).data[0]).data[4]);
        let notBeforeNode = mod_2.asn1.UTCTime.as(datesNode.data[0]);
        let notAfterNode = mod_2.asn1.UTCTime.as(datesNode.data[1]);
        let notBefore = parseUTCTime(notBeforeNode);
        let notAfter = parseUTCTime(notAfterNode);
        return {
            notBefore,
            notAfter
        };
    }
    ;
    function getRenewAfter(validity) {
        if (validity == null) {
            return 0;
        }
        let renewAfter = validity.notBefore + Math.round((validity.notAfter - validity.notBefore) * 2 / 3);
        return renewAfter;
    }
    ;
    function run(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let acme = (_a = options.acme) !== null && _a !== void 0 ? _a : LETS_ENCRYPT_STAGING;
            if (acme === "le") {
                acme = LETS_ENCRYPT;
            }
            let clients = new Array();
            for (let credentials of options.providers) {
                let client = yield makeClient(credentials);
                let domains = yield client.listDomains();
                for (let domain of domains) {
                    console.log(`Provisioning configured for ${domain}.`);
                }
                clients.push({
                    client,
                    domains
                });
            }
            let queue = options.certificates
                .filter((certificate) => certificate.hostnames.length > 0)
                .map((certificate) => {
                var _a;
                let hostnames = certificate.hostnames;
                let root = (_a = certificate.root) !== null && _a !== void 0 ? _a : "./";
                let account = libpath.join(root, "account_key.pem");
                let key = libpath.join(root, "certificate_key.pem");
                let cert = libpath.join(root, "full_chain.pem");
                let validity = getValidityFromCertificate(cert);
                let renewAfter = getRenewAfter(validity);
                return {
                    hostnames,
                    account,
                    key,
                    cert,
                    validity,
                    renewAfter
                };
            })
                .sort((one, two) => one.renewAfter - two.renewAfter);
            if (queue.length === 0) {
                return;
            }
            if (options.monitor) {
                while (true) {
                    let entry = queue.shift();
                    if (entry != null) {
                        let duration = Math.max(0, entry.renewAfter - Date.now());
                        yield wait(duration);
                        yield processEntry(acme, entry, clients);
                        let index = 0;
                        for (; index < queue.length; index++) {
                            if (entry.renewAfter < queue[index].renewAfter) {
                                break;
                            }
                        }
                        queue.splice(index, 0, entry);
                    }
                }
            }
            else {
                for (let entry of queue) {
                    yield processEntry(acme, entry, clients);
                }
            }
        });
    }
    exports.run = run;
    ;
});
define("build/cli/index", ["require", "exports", "build/lib/index"], function (require, exports, lib) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                }
                catch (e) {
                    reject(e);
                }
            }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            let certificate = {
                hostnames: [],
            };
            let options = {
                providers: [],
                certificates: []
            };
            let foundUnrecognizedArgument = false;
            for (let argv of process.argv.slice(2)) {
                let parts = null;
                if ((parts = /^--acme=(.*)$/.exec(argv)) != null) {
                    options.acme = parts[1] || undefined;
                }
                else if ((parts = /^--config=(.*)$/.exec(argv)) != null) {
                    options = lib.loadConfig(parts[1]);
                    break;
                }
                else if ((parts = /^--dns=dynu[:]([^:]*)$/.exec(argv)) != null) {
                    options.providers.push({
                        type: "dynu",
                        key: parts[1]
                    });
                }
                else if ((parts = /^--dns=glesys[:]([^:]*)[:]([^:]*)$/.exec(argv)) != null) {
                    options.providers.push({
                        type: "glesys",
                        account: parts[1],
                        key: parts[2]
                    });
                }
                else if ((parts = /^--hostname=(.*)$/.exec(argv)) != null) {
                    certificate.hostnames.push(parts[1]);
                }
                else if ((parts = /^--monitor=(true|false)$/.exec(argv)) != null) {
                    options.monitor = parts[1] === "true";
                }
                else if ((parts = /^--root=(.*)$/.exec(argv)) != null) {
                    certificate.root = parts[1] || undefined;
                    options.certificates.push(certificate);
                    certificate = {
                        hostnames: []
                    };
                }
                else {
                    foundUnrecognizedArgument = true;
                    console.log(`Unrecognized argument "${argv}"!`);
                }
            }
            if (foundUnrecognizedArgument) {
                console.log(`Arguments:`);
                console.log(`	--acme=string`);
                console.log(`		Set ACME directory URL.`);
                console.log(`	--config=string`);
                console.log(`		Load specified config.`);
                console.log(`	--dns=string`);
                console.log(`		Set DNS provider and associated credentials.`);
                console.log(`	--hostname=string`);
                console.log(`		Set hostname for which to request certificate.`);
                console.log(`	--monitor=boolean`);
                console.log(`		Configure automatic monitoring and renewal of certificates.`);
                console.log(`	--root=string`);
                console.log(`		Set directory for which to store associated files.`);
                return 1;
            }
            else {
                if (options.certificates.length === 0) {
                    options.certificates.push(certificate);
                }
                yield lib.run(options);
                return 0;
            }
        });
    }
    ;
    run()
        .catch((error) => {
        console.log(String(error));
        return 1;
    })
        .then((code) => {
        process.exit(code);
    });
});
function define(e,t,l){let n=define;function u(e){return require(e)}null==n.moduleStates&&(n.moduleStates=new Map),null==n.dependentsMap&&(n.dependentsMap=new Map);let d=n.moduleStates.get(e);if(null!=d)throw"Duplicate module found with name "+e+"!";d={callback:l,dependencies:t,module:null},n.moduleStates.set(e,d);for(let l of t){let t=n.dependentsMap.get(l);null==t&&(t=new Set,n.dependentsMap.set(l,t)),t.add(e)}!function e(t){let l=n.moduleStates.get(t);if(null==l||null!=l.module)return;let d=Array(),o={exports:{}};for(let e of l.dependencies){if("require"===e){d.push(u);continue}if("module"===e){d.push(o);continue}if("exports"===e){d.push(o.exports);continue}try{d.push(u(e));continue}catch(e){}let t=n.moduleStates.get(e);if(null==t||null==t.module)return;d.push(t.module.exports)}l.callback(...d),l.module=o;let p=n.dependentsMap.get(t);if(null!=p)for(let t of p)e(t)}(e)}