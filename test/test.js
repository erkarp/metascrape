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

        mockLinks = [
          'favicon.ico',
          'style.css',
          'https://www.linkedin.com/in/emilykarp',
          'http://codepen.io/emilykarp/',
          'https://github.com/erkarp/',
          'http://www.webdevelopersstudio.com/'
        ];

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
  });

  it('checks removeLinkRelativity fn', function() {
    var links = [
      '../hello',
      '/link_two',
      '../../test-link',
      './anotherTest'
    ]
    var validated = [
      'hello',
      'link_two',
      'test-link',
      'anotherTest'
    ]
    for (var i=0; i<links.length; i++) {
      var val = scrape.removeLinkRelativity(links[i]);
      expect(val).to.equal(validated[i]);
    }
  });

  it('checks that all links are valid as part of current url', function() {
    var mockUrl = "www.emilykarp.com";
    var validLinks = scrape.checkLinks(mockLinks, mockUrl);
    expect(validLinks.length).to.equal(0);
    console.log('test loop:');
    for(var i=0; i < validLinks.length; i++) {
      console.log(validLinks[i]);
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
