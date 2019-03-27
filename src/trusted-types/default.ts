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

const ALLOWED_SCRIPTS = [
      // YT API loads that.
      'https://s.ytimg.com/yts/jsbin/www-widgetapi-vfljrlvNi/www-widgetapi.js',
];

export const DefaultPolicy = TrustedTypes.createPolicy('default', {
  createHTML(i) {
    if (ALLOWED_HTML.includes(i)) {
      return i;
    }
    if (ALLOWED_HTML_REGEXP.find((regexp) => regexp.test(i))) {
      return i;
    }
    throw new TypeError('Disallowed HTML');
  },
  createURL(i) {
    const url = new URL(i, document.baseURI);
    if (['http:', 'https:'].includes(url.protocol)) {
      return i;
    }
    throw new TypeError('Disallowed URL');
  },
  createScriptURL(i) {
    if (ALLOWED_SCRIPTS.includes(i)) {
      return i;
    }
    console.error('Called with script URL: ' + i);
    return i;
  },
  createScript(i) {
    throw new TypeError();
  }
}, true);

