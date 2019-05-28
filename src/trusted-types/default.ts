/// <reference types="trusted-types" />

const ALLOWED_HTML = [
      // Jquery does that.
      `<textarea>x</textarea>`,
      `<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>`,
      `<a href='#'></a>`,
      `<input/>`,
];

const ALLOWED_HTML_REGEXP: RegExp[] = [
  // jQuery.
  new RegExp(`^<a id='sizzle[0-9]+'></a><select id='sizzle[0-9]+-\\s*\\\\' msallowcapture=''><option selected=''></option></select>$`),
];

const ALLOWED_SCRIPTS_REGEXP = [
      // YT API loads that.
      new RegExp(`^https://s\.ytimg\.com/yts/jsbin/www-widgetapi-[a-zA-Z0-9]+/www-widgetapi\.js$`),
];

export const TrustedTypesAvailable = typeof TrustedTypes !== 'undefined';

// tslint:disable-next-line: trusted-types-no-create-policy
export const DefaultPolicy = TrustedTypesAvailable ? TrustedTypes.createPolicy('default', {
  createHTML(i) {
    if (ALLOWED_HTML.includes(i)) {
      return i;
    }
    if (ALLOWED_HTML_REGEXP.find((regexp) => regexp.test(i))) {
      return i;
    }
    throw new TypeError('Disallowed HTML');
  },
  createScriptURL(i) { // script.src
    if (ALLOWED_SCRIPTS_REGEXP.find((regexp) => regexp.test(i))) {
      return i;
    }
    console.error('Please refactor, script URL: ' + i);
    return i;
  },
  createURL(i) { // all other URLs
    const url = new URL(i, document.baseURI);
    if (['http:', 'https:'].includes(url.protocol)) {
      return i;
    }
    throw new TypeError('Disallowed URL');
  },
  createScript(i) { // eval & friends
    throw new TypeError();
  }
}, true) : null;
