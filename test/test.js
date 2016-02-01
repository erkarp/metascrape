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


  it('checks that mockPage is a string and longer than 0', function () {
    expect(mockPage).to.be.a('string');
    expect(mockPage.length).to.be.above(0);
  });

  it('should add mocknode to emptyarr', function() {
    scrape.addPage(emptyarr, mockNode);
    expect(emptyarr.length).to.equal(1);
  });

  it('gets a string equal to mockNode.title', function() {
    var testTitle = scrape.getTitle(mockPage);
    expect(testTitle).to.equal(mockNode.title);
  });

  it('prints all <a> hrefs in the page', function() {
    var links = scrape.getLinks(mockPage, '', []);

    for(var i=0; i < links.length; i++) {
      console.log(links[i]);
    }
  })
  /*

  5.
  metadata.alltrue(fn - typeof i == obj)

  6.
  byId(mockmeta id) == mocknode.id

  7, 8.
  FROM_USER - mockpath
    metalist == mockmeta

  */
});
