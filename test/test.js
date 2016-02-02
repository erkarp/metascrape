var fs = require('fs'),
    expect = require('chai').expect,
    scrape = require('./../script'),
    mock = require('./mocks');


describe('checks that', function () {

  it('mock.page is a string and longer than 0', function () {
    expect(mock.page).to.be.a('string');
    expect(mock.page.length).to.be.above(0);
  });

  it('mock.node is added to emptyarr', function() {
    scrape.addPage(mock.emptyarr, mock.node);
    expect(mock.emptyarr.length).to.equal(1);
  });

  it('a title is mined that is equal to mock.node.title', function() {
    var testTitle = scrape.getTitle(mock.page);
    expect(testTitle).to.equal(mock.node.title);
  });

  it('prints all <a> hrefs in the page', function() {
    var links = scrape.getLinks(mock.page, '', []);

    for(var i=0; i < links.length; i++) {
      console.log(links[i]);
    }
  });

  it('removeLinkRelativity fn', function() {
    var links = mock.relativePaths,
        valid = mock.validatedPaths;

    for (var i=0; i<links.length; i++) {
      var part = scrape.removeLinkRelativity(links[i]);
      expect(part).to.equal(valid[i]);
    }
  });

  it('reduceLinkToPath fn', function() {
    var links = mock.links,
        valid = mock.linksPaths;

    for (var i=0; i<links.length; i++) {
      var part = scrape.reduceLinkToPath(links[i]);
      expect(part).to.equal(valid[i]);
    }
  })

  it('all links are valid as part of current url', function() {
    var testURL = "www.emilykarp.com";
    var validLinks = scrape.checkLinks(mock.links, testURL);
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
  byId(mock.meta id) == mock.node.id

  7, 8.
  FROM_USER - mock.path
    metalist == mock.meta

  */
});
