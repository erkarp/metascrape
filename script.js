var http = require('http'),
    val = require('validator');

module.exports = {
  getHTML: function(link) {
    return http.get(link, function(e, response) {
      if (e) {
        return e
      }
  		return response;
    });
  },

  addPage: function(arr, obj) {
    return arr.push(obj);
  },

  getTitle: function(html) {
    if (typeof html !== 'string') {
      return
    }
    var matches = html.match(/<title>(.*)<\/title>/);
    return matches[1];
  },

  getLinks: function(html, url, array) {
    if (html.length  <= 0 || typeof url !== 'string' || typeof array !== 'object') {
      return;
    }

    var r = /href="(.*)" /.exec(html);

    if (r != null && r != undefined) {
        if (array.indexOf(r[1]) == -1) {
          array.push(r[1]);
        }
        sub = html.substr(r[1].length);
        match = this.getLinks(sub, url, array);
    }
    return array;
  },

  removeLinkRelativity: function(link) {
    if (link.charAt(0) === '/' || link.charAt(0) === '.') {
      link = this.removeLinkRelativity(link.substr(1));
    }
    return link;
  },

  checkLinks: function(links, url) {
    if (typeof links !== 'object' || links.length < 1) {
      return;
    }

    return links.filter(function(link){
      if (link.indexOf(url) > -1 || link.indexOf('mailto:') === 0) {
        return;
      }
      if (link.indexOf('.') > -1) {
        link = link.substr(link.lastIndexOf('.'));
        console.log(link);
        link = link.substr(link.indexOf('/'));
        console.log(link);
      }
      if (val.isURL(link + '/' + url)) {
        console.log('made:', link + '/' + url + '\n');
        return link;
      }
    })
  }

/*

5.
metalist - []

6.
byId get item by id return item

7.
meta - path, html, rec=true
	if !byId(html)
		addPage(metalist, {path:path,title:getTitle()})
	if rec
		arr = find()
		arr.foreach(g - this link, false)

8.
FROM_USER - path
  validate path
  html = getFn(path)
  meta(path, html)
*/
}
