var fs = require('fs'),
    expect = require('chai').expect,
    scrape = require('./../script'),
    mock = require('./mocks');


describe('html file return and parse', function () {

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
    expect(links.length).to.be.above(0);
  });
});


describe('link mankipulation functions', function() {

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
  });

  it('checkLinkExtension fn', function() {
    expect(scrape.checkLinkExtension(mock.node.path)).to.be.a('string');
    expect(scrape.checkLinkExtension(mock.links[2])).to.equal(undefined);
  });

  it('removeDomainAddress for externalLinks', function() {
    var links = mock.externalLinks,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      expect(scrape.removeDomainAddress(links[i], url)).to.equal(undefined);
    }
  });

  it('removeDomainAddress for matchingAbsLinks', function() {
    var links = mock.matchingAbsLinks,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      expect(scrape.removeDomainAddress(links[i], url)).to.equal('');
    }
  });

});


describe('link validation', function() {
  it('for mock.links', function() {
    var links = mock.links,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      var validated = scrape.validateLink(links[i], url);
      expect(validated).to.equal('' || undefined);
    }
  });

  it('for relativePaths', function() {
    var links = mock.relativePaths,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      var validated = scrape.validateLink(links[i], url);
      expect(validated).to.equal(mock.validatedPaths[i]);
    }
  })
})

/*
  5. metadata.alltrue(fn - typeof i == obj)

  6. byId(mock.meta id) == mock.node.id

  7, 8. FROM_USER - mock.path
    metalist == mock.meta
*/
