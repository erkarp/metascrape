var fs = require('fs'),
    request = require('supertest'),
    expect = require('chai').expect,
    scrape = require('./../tasks/script'),
    remove = require('./../tasks/remove'),
    does = require('./../tasks/booleans'),
    cheerio = require("cheerio"),
    parse = require('url-parse'),
    mock = require('./mocks');

var check = "http://www.same-domain.com";

describe('html file return and parse', function () {

  it('gets a title and description', function () {
    var $ = cheerio.load(mock.page),
      obj = scrape.getMetaData($, {});

    expect(obj.title).to.be.a('string' || null);
    expect(obj.description).to.be.a('string' || null);
  });

});

describe('VALIDATION HELPER FUNCTIONS', function() {

  it('check if "http://www.same-domain.com" is internal', function() {
    var shouldBeUndefined = scrape.isInternalHTML(parse(check).hostname);
    expect(shouldBeUndefined).to.not.be.true;
  });

  it('should return everything up to "#"', function() {
    var linkWithHash = check + '#hash-value';
    expect(remove.hash(linkWithHash)).to.equal(check);
  });

  it('does linkClimbsDir', function() {
    expect(does.linkClimbDir(check)).to.not.be.true;
    expect(does.linkClimbDir('../utils.js')).to.be.true;
  });

  it('check if link startsAtRoot', function() {
    expect(does.startAtRoot(check)).to.not.be.true;
    expect(does.startAtRoot('/about.html')).to.be.true;
  });

});
/*
describe('HIGHER LEVEL Validation Helper Functions', function() {

  it( )

});
*/

describe('LINK VALIDATION', function() {

  mock.sameDomain.forEach(function(linkObj, i) {
    it(i+' - checking '+mock.sameDomain[i].href, function() {
      var validation = scrape.validate(mock.sameDomain[i].href, check);
      expect(validation).to.equal(mock.sameDomain[i].result);
    })
  });

});


describe('DEPRECIATED -- link mankipulation functions', function() {

  it('removeLinkRelativity fn', function() {
    var links = mock.relativePaths,
        valid = mock.validatedPaths;

    for (var i=0; i<links.length; i++) {
      var part = scrape.removeLinkRelativity(links[i]);
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
        valid = mock.validatedAbsolutes,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      var validated = scrape.removeDomainAddress(links[i], url);
      expect(validated).to.equal(valid[i]);
    }
  });

});

/*
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
  });

  it('for externalLinks', function() {
    var links = mock.externalLinks,
        url = mock.url;

    for (var i=0; i<links.length; i++) {
      var validated = scrape.validateLink(links[i], url);
      expect(validated).to.equal(undefined);
    }
  })
})

  5. metadata.alltrue(fn - typeof i == obj)

  6. byId(mock.meta id) == mock.node.id

  7, 8. FROM_USER - mock.path
    metalist == mock.meta
*/
