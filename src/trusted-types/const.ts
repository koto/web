/// <reference types="trusted-types" />

import { TrustedTypesAvailable } from './default';

// tslint:disable-next-line: trusted-types-no-create-policy
const ConstPolicy = TrustedTypesAvailable ? TrustedTypes.createPolicy('literal-script-url', {
    createScriptURL: (s: string) => s
}, false) : null;


type LiteralString<S extends string> = string extends S ? 'Not a string literal' : S;


export function scriptUrlFromLiteralString<S extends string>(literalString: LiteralString<S>): TrustedScriptURL&string {
    console.log('You\'re a good programmer and you are loading script from ', literalString);
    if (!TrustedTypesAvailable) {
        // For legacy browsers, do nothing. The type system asserts that the function was called with a compile-time
        // constant, so this is safe.
        return literalString as unknown as TrustedScriptURL&string;
    }
    return ConstPolicy.createScriptURL(literalString) as TrustedScriptURL&string;
}

