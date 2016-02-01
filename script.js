var http = require('http');

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
  }

/*

3.
find : links w same url, return arr

4.
getTitle(html) return title.inner

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
