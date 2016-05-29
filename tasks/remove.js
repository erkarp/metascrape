
var does = require('./booleans');

var replaceDirStep = function(link, pathPiece) {
  return link.replace(/\.\.\/(?=[^.]*$)/, pathPiece);
};


module.exports = {

    hash: function(href) {
      var hash = href.indexOf('#');
      if (hash > -1) {
        href = href.slice(0, hash);
      }

      if (href.length > 0) {
        return href;
      }
    },

    leadingSlash: function(domain) {
      var hasLeadingSlash = does.startAtRoot(domain);
      return hasLeadingSlash ? domain.slice(1) : domain;
    },

    trailingSlash: function(href) {
      var length = href.length;

      return href.lastIndexOf('/') === length ?
             href.slice(0, length) : href;
    },

    protocol: function(urlObj) {
      return urlObj.href
        .replace(urlObj.protocol, '')
        .replace('www.', '')
        .replace('//', '');
    },

    relativity: function(link, url) {

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
}
