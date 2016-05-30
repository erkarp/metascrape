var parse = require('url-parse');
var does = require('./booleans');
var remove = require('./remove');


var util = {

  cleanPath: function(href) {

    if (!href) { return; }
    if (href.length === 1) { return href;}
    
    return remove.trailingSlash(href);
  },


  composeUrl: function(href, url) {

    var protocol = url.protocol ? url.protocol : 'http://',
        slashes = url.slashes ? '//' : '',
        href = remove.leadingSlash(href);

    return protocol + slashes + url.hostname + '/' + href;
  }

};


// h = Link to be validated
// t = URL from user input

var validate = {

  link: function(h, input) {

    // Make sure the link exists
    if (does.nothing(h)) { return; }

    var hrefURL = parse(h),
        origURL = input.url,
        a = remove.protocol(hrefURL),
        b = input.domain,
        href = hrefURL.href;

    if (does.startAtRoot(h)) {
      return util.composeUrl(h, origURL);
    }



    //  Handle links with matching hostnames
    console.log(a, b);
    if (does.stringHaveMatch(a, b)) {

      if (!hrefURL.pathname) {
        return util.composeUrl('', hrefURL)
      }
      if (hrefURL.pathname === '/') {
        return util.composeUrl('/', hrefURL);
      }

      href = hrefURL.pathname;
      href = util.cleanPath(href);

      if (href && does.haveValidFile(href)) {
        return util.composeUrl(href, hrefURL);
      }
      return;
    }


    //  Return undefined for non-internal links
    if (! does.haveValidInternalFile(href)) { return; }



    // Handle relative paths
    href = util.cleanPath(href);

    if (href && does.linkClimbDir(href)) {
      href = remove.relativity(href, origURL);
    }


    return util.composeUrl(href, origURL);
  }
};

module.exports = validate;
