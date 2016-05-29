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

  replaceDirStep: function(link, pathPiece) {
    return link.replace(/\.\.\/(?=[^.]*$)/, pathPiece);
  },

  removeMatchingHostname: function(text, url) {
    if (text.includes(url.hostname) || url.hostname.includes(text)) {
      return parse(text).pathname;
    } else {
      return text;
    }
  },

  isInternalHTML: function(hUrl, oUrl) {
    if (!hUrl.hostname.includes('.' || './')
      || does.haveAcceptableFile(oUrl.pathname)) {
      return true;
    }
  },

  cleanPath: function(href) {

    href = remove.trailingSlash(href);
    href = remove.leadingSlash(href);
    if (!href) { return; }

    href = remove.hash(href);
    if (!href) { return; }

    return href;
  },

  composeNewLink: function(href, hUrl) {
    if (hUrl.pathname) {
      console.log('pathname', hUrl.pathname);
      console.log(hUrl.hostname + hUrl.pathname);
      return hUrl.hostname + hUrl.pathname;
    }
    return hUrl.href + '/' + href;
  },

  validate: function(h, t) {

    if (does.nothing(h)) {
      return;
    }

    var hrefURL = parse(h);

    if (!hrefURL.pathname || hrefURL.pathname === '/') {
      return;
    }

    var origURL = parse(t),
        a = remove.protocol(hrefURL),
        b = remove.protocol(origURL),
        href = hrefURL.href;

    if (does.stringHaveMatch(a, b)) {
      href = hrefURL.pathname;
      href = this.cleanPath(href);
      return a.replace(hrefURL.pathname, '') + '/' + href;
    }

    if (!this.isInternalHTML(hrefURL, origURL)) {
      return;
    }

    href = this.cleanPath(href);

    if (does.linkClimbDir(href)) {
      href = remove.relativity(href, origURL);
    }

    console.error('href', href);

    if (does.haveAcceptableFile(href)) {
      return remove.protocol(hrefURL) + '/' + href;
      return this.composeNewLink(href, hrefURL);
    }
  },

  links: function(html, url) {
    if (html.length  <= 0 || typeof url !== 'string') {
      return;
    }
    var r = /href="(.*)" /.exec(html);

    if (r != null && r != undefined) {
        if (this.metalist.indexOf(r[1]) == -1 && this.validateLink(r[1], url)) {

          this.metalist.push({
            url: r[1]
          });

        }
        sub = html.substr(r[1].length);
        match = this.links(sub, url);2
    }
  },

  removeDomainAddress: function(link, url) {
    var domains = ['.co', '.org', '.net', '.co', '.uk', '.me', '.io'];

    if (link.indexOf(url) > -1) {
      var rm = link.substr(0, link.indexOf(url)+url.length+1);
      return link.replace(rm, '');
    }

    for (var i=0; i<domains.length; i++) {
      if (link.indexOf(domains[i]) > -1) {
        return;
      }
    }
    return link;
  },

  removeLinkRelativity: function(link) {
    if (link.charAt(0) === '/' || link.charAt(0) === '.') {
      link = this.removeLinkRelativity(link.substr(1));
    }
    return link;
  },

  checkLinkExtension: function(link) {
    var extensions = ['.html', '.txt', '.pdf'];

    for (var i=0; i<extensions.length; i++) {
      if (link.includes(extensions[i])) {
        return link;
      }
    }
  },

  validateLink: function(link, url) {
    if (link.length < 2 || link.indexOf('mailto:') > -1 ) {
      return;
    }

    link = this.removeDomainAddress(link, url);
    if (link) {
      link = this.reduceLinkToPath(link);
      if (link) {
        return this.removeLinkRelativity(link);
      }
    }
  }
}
