
var does = require('./booleans');




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

      var directory = url.pathname.split('/'),
          relative = link.split('/'),
          file = relative.reverse()[0];

      var count = relative.filter(function(i) {
        return i === '..';
      }).length+1;


      var newdir = directory.splice(1, directory.length-count);
      newdir.push(file);
      return newdir.join('/');
    }
}
