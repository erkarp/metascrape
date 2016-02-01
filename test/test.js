/*
emptyarr = []
mockpage = file
mockpath = filename
mocknode = {..}
mockmeta = [{..}..]
mocklinks = number
mocktitle = string
*/

var fs = require('fs'),
    expect = require('chai').expect,
    scrape = require('./../script.js');

var mockPath = './mock-html.html';

var mockPage = fs.readFileSync(require.resolve(mockPath), 'utf-8', function (err, html) {
        if (err) { return err; }
        return html.toString();
    });

beforeEach(function() {

});


/*
1.
getFn(mockpath) == mockpage
*/

it('should print out html', function () {
  console.log('page:',mockPage);
});


/*
2.
addFn(emptyarr, mocknode)
emptyarr.length == 1

3.
page = html
linkArr = [link...]
find(page) == linkArr

4.
getTitle(mockpage) == mocktitle

5.
metadata.alltrue(fn - typeof i == obj)

6.
byId(mockmeta id) == mocknode.id

7, 8.
FROM_USER - mockpath
  metalist == mockmeta

*/
