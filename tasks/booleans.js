
module.exports = {

  nothing: function(href) {
    return (
      ! href ||
      href === '#' ||
      href === '/' ||
      href.includes('mailto')
    )
  },

  startAtRoot: function(link) {
    return link[0] === '/';
  },

  linkClimbDir: function(link) {
    return link.includes('./') || link.includes('..');
  },

  stringHaveMatch: function(a, b) {
    return (a.includes(b) || b.includes(a));
  },

  haveExternalHost: function(url) {
    return url.hostname.length > 2;  
  },

  haveValidInternalFile: function(url) {
    return (
       ! url.hostname.includes('.')
      || url.hostname.includes('./')
      || this.haveValidFile(url.pathname)
    );
  },

  haveValidFile: function(path) {
    return (
      !  path.includes('.')
      || path.includes('.htm')
      || path.includes('.php')
      || path.includes('.xml')
      || path.includes('.asp')
    );
  }

}
