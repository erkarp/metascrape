module.exports = {

  nothing: function(href) {
    return (
      ! href ||
      href === '/' ||
      href[0] === '#' ||
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

  haveValidInternalFile: function(url) {
    return (
       ! url.includes('.')
      || url.includes('./')
      || this.haveValidFile(url)
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
