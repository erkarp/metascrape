var parse = require('url-parse');
var does = require('./booleans');
var remove = require('./remove');


var util = {
  cleanPath: function(href) {

    href = remove.hash(href);
    if (!href) { return; }

    if (href.length === 1) {
      return href;
    }

    return remove.trailingSlash(href);
  }
};


// h = Link to be validated
// t = URL from user input

var validate = {

  link: function(h, t) {

    // Make sure the link exists
    if (does.nothing(h)) { return; }


    var hrefURL = parse(h),
        origURL = parse(t),
        a = remove.protocol(hrefURL),
        b = remove.protocol(origURL),
        root = b.replace(origURL.pathname, ''),
        href = hrefURL.href;


    //
    if (does.startAtRoot(h)) {
      return root + remove.hash(h);
    }

    //  Handle links with matching hostnames
    if (does.stringHaveMatch(a, b)) {

      if (!hrefURL.pathname || hrefURL.pathname === '/') {
        return a;
      }

      href = hrefURL.pathname;
      href = util.cleanPath(href);

      if (href && does.haveValidFile(href)) {
        return root + href;
      }
      return;
    }


    //  Return undefined for non-internal links
    if (does.haveExternalHost(hrefURL)) { return; }


    // Handle relative paths
    href = util.cleanPath(href);

    if (does.linkClimbDir(href)) {
      href = remove.relativity(href, origURL);
    }

    return root + '/' + href;
  }
};

module.exports = validate;
