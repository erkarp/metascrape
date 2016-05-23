var http = require('http');

module.exports = {
  metalist: ['hi'],


  unescape: function(safe) {
    if (safe) {
      return safe
       .replace(/&amp;/g, "&")
       .replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">")
       .replace(/&#xA0;/g, " ")
       .replace(/&quot;/g, "\"")
       .replace(/&#039;/g, "'")
       .replace(/&apos;/g, "'");
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
        match = this.links(sub, url);
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

  reduceLinkToPath: function(link) {
    if (link.indexOf('.') > -1) {
      link = link.substr(link.lastIndexOf('.'));

      if (link.indexOf('/') > -1) {
        return link.substr(link.indexOf('/')+1);

      } else {
        return '';
      }
    }
    return link;
  },

  checkLinkExtension: function(link) {
    var extensions = ['.html', '.txt', '.pdf'];

    for (var i=0; i<extensions.length; i++) {
      if (link.indexOf(extensions[i]) > -1) {
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
