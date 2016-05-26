var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var parse = require('url-parse');
var clean = require('./unescape');
var router = express.Router();

module.exports = {

  getMetaData: function(c, obj) {
    var desc = c('meta[name=description]').attr('content');
    obj.description = clean(desc) || null;
    obj.title = clean(c('title').html()) || null;
    return obj;
  },

  numberOfDots: function(host) {
    return host.replace(/[^.]/g, "").length;
  },


  startsAtRoot: function(link) {
    return link[0] === '/';
  },

  removeLeadingSlash: function(domain) {
    var hasLeadingSlash = this.startsAtRoot(domain);
    console.log(hasLeadingSlash, domain);
    return hasLeadingSlash ? domain.slice(1) : domain;
  },

  removeTrailingSlash: function(href) {
    var length = href.length;

    return href.lastIndexOf('/') === length ?
           href.slice(0, length) : href;
  },


  removeHash: function(href) {
    var hash = href.indexOf('#');

    if (hash > -1) {
      href = href.slice(0, hash);
    }

    if (href.length > 0) {
      return href;
    }
  },


  linkClimbsDir: function(link) {
    return  link.includes('./') || link.includes('..');
  },

  replaceDirStep: function(link, pathPiece) {
    return link.replace(/\.\.\/(?=[^.]*$)/, pathPiece);
  },

  removeRelativity: function(link, url) {

    if (this.linkClimbsDir(link)) {
      var dir = url.pathname.split('/'),
        count = 0;

      console.log('IN removeRelativity', link, dir);
      while (link.includes('../')) {
        link.replace(link, dir[dir.length-1]);
        count++;
      }
      link.replace('./', '');
      //count back segments from url.pathname
      dir = dir.slice(0, dir.length-count);
      return url.hostname + '/' + dir.join('/');
    }
    return link;

  },

  domainMatch: function(linkHost, thisHost) {
    return (linkHost.includes(thisHost) || linkHost.includes(thisHost));
  },

  removeMatchingHostname: function(text, url) {
    if (text.includes(url.hostname) || url.hostname.includes(text)) {
      return parse(text).pathname;
    } else {
      return text;
    }
  },

  acceptableFileExt: function(path) {
    return (!path.includes('.') ||
      path.includes('.html' || '.php' || '.xml' || '.asp'));
  },

  isInternalHTML: function(hUrl, oUrl) {
    if (!hUrl.hostname.includes('.' || './')
      || this.acceptableFileExt(oUrl.pathname)) {
      return true;
    }
  },

  composeNewLink: function(href, text, url) {
    if (url.pathname) {
      return text.replace(url.pathname, '/' + href);
    }
    return text + '/' + href;
  },

  validate: function(href, text) {
    var origURL = parse(text),
        hrefURL = parse(href);

        console.log(hrefURL);
    href = this.removeMatchingHostname(href, origURL);
    href = this.removeTrailingSlash(href);

    if (!href || !this.isInternalHTML(hrefURL, origURL)) {
    console.log('it\'s not internal', href, hrefURL.hostname);
      return;
    }

    href = this.removeLeadingSlash(href);
    if (!href) {
    console.log('after removed leading slash', href);
    return; }

    href = this.removeRelativity(href, origURL);
    if (!href) {
    console.log('after removed relativity', href);
    return; }

    href = this.removeHash(href);
    if (!href) {
    console.log('after removed hash', href);
    return; }

    if (this.acceptableFileExt(href)) {
      return this.composeNewLink(href, text, origURL);
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
