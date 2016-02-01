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

describe('Scrape', function () {

  beforeEach(function() {
        emptyarr = [],
        mockPath = 'mock-html.html',
        mockNode = {
          path: mockPath,
          title: 'Emily Karp | Web developer'
        };

        mockPage = fs.readFileSync(require.resolve('./'+mockPath), 'utf-8', function (err, html) {
            if (err) { return err; }
            return html.toString();
        });
  });


  it('should print out html', function () {
    console.log('page:',mockPage);
  });

  it('should add mocknode to emptyarr', function() {
    scrape.addPage(emptyarr, mockNode);
    expect(emptyarr.length).to.equal(1);
  })

  it('gets a string equal to mockNode.title', function() {
    var testTitle = scrape.getTitle(mockPage);
    expect(testTitle).to.equal(mockNode.title);
  })
  /*

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
});
