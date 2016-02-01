var http = require('http');

/*
1.
getFn - path return html
*/

function getHTML(link, callback) {
    return http.get(link, function(response) {
			return response;
    });
}

/*
2.
addPage - arr, obj noreturn arr.push(obj)

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
  html = getFn(path)
  meta(path, html)
*/
