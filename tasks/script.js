var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var parse = require('url-parse');
var remove = require('./remove');
var does = require('./booleans');
var clean = require('./unescape');
var router = express.Router()

module.exports = {

  getMetaData: function(c, obj) {
    var desc = c('meta[name=description]').attr('content');
    obj.description = clean(desc) || null;
    obj.title = clean(c('title').html()) || null;
    return obj;
  },

  cleanPath: function(href) {

    href = remove.hash(href);
    if (!href) { return; }

    if (href.length === 1) {
      return href;
    }

    return remove.trailingSlash(href);
  },

  composeNewLink: function(href, url) {
    if (url.hostname) {
      return url.hostname + href;
    }
  },


  // Returns either a valid link (string) or undefined

  validate: function(h, t) {

    // h = Link to be validated
    // t = URL from user input

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
      href = this.cleanPath(href);

      if (href && does.haveValidFile(href)) {
        return a.replace(hrefURL.pathname, '') + href;
      }
      return;
    }


    //  Return undefined for non-internal links
    if (does.haveExternalHost(hrefURL)) { return; }



    console.log(a);

    // Handle relative paths
    href = this.cleanPath(href);

    if (does.linkClimbDir(href)) {
      href = remove.relativity(href, origURL);
    }

    console.error('HREF', href);
    return root + '/' + href;


  }

}
