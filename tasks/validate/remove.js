var does = require('./booleans');

module.exports = {

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
  //    console.log('RELATIVITY', url, link);

      var directory = url.pathname.split('/'),
          relative = link.split('/'),
          file = link.replace(/\.\.\/(?=[^.]*$)/, '');

      var count = relative.filter(function(i) {
        return i === '..';
      }).length+1;

  //    console.log('directory', directory);

      var newdir = directory.splice(1, directory.length-count);
      newdir.push(file);
      return newdir.join('/');
    }
}
