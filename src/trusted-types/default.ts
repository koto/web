/// <reference types="trusted-types" />

import {environment} from '../environments/environment';

// TODO: Remove when Chrome renames the property.
if (window.TrustedTypes) {
  window.trustedTypes = window.TrustedTypes;
}

const ALLOWED_HTML = [
      // jQuery does that.
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
      new RegExp(`^https://s\.ytimg\.com/yts/jsbin/www-widgetapi-[-a-zA-Z0-9]+/www-widgetapi\.js$`),
      new RegExp(`^/assets/logo-layers/[^/]+\.svg`), // Loading svg assets via <object>,
];

export const TrustedTypesAvailable = typeof window.trustedTypes !== 'undefined';

// tslint:disable-next-line: trusted-types-no-create-policy
export const DefaultPolicy = TrustedTypesAvailable ? window.trustedTypes.createPolicy('default', {
  createHTML(i) {
    if (ALLOWED_HTML.includes(i)) {
      return i;
    }
    if (ALLOWED_HTML_REGEXP.find((regexp) => regexp.test(i))) {
      return i;
    }
  },
  createScriptURL(i) { // script.src
    if (ALLOWED_SCRIPTS_REGEXP.find((regexp) => regexp.test(i))) {
      return i;
    }
    console.error('Please refactor, script URL: ' + i);
  },
  createURL(i) { // DEPRECATED, to be removed in Chrome 79
    const url = new URL(i, document.baseURI);
    if (['http:', 'https:'].includes(url.protocol)) {
      return i;
    }
  },
  createScript(i) { // eval & friends
    if (environment.production) {
      return; // No eval in production, please.
    }
    if (i.match('jit_')) {
      return i; // JIT compiler-generated code, only enabled in development.
    }
  }
}) : null;
