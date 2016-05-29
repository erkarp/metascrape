
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

  haveAcceptableFile: function(path) {
    return (!path.includes('.') ||
      path.includes('.html' || '.php' || '.xml' || '.asp'));
  }

}
