/// <reference types="trusted-types" />

const ConstPolicy = TrustedTypes.createPolicy('literal-script-url', {
    createScriptURL: (s: string) => s,
    createURL: (s: string) => s,
    createScript: (s: string) => s,
    createHTML: (s: string) => s,
}, false);


type LiteralString<S extends string> = string extends S ? 'Not a string literal' : S;


export function scriptUrlFromLiteralString<S extends string>(literalString: LiteralString<S>): TrustedScriptURL&string {
    console.log('You\'re a good programmer and you are loading script from ', literalString);
    return ConstPolicy.createScriptURL(literalString) as TrustedScriptURL&string;
}

