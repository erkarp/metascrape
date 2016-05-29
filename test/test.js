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



describe('Domain Match', function() {

  mock.sameDomain.forEach(function(linkObj, i) {
    it(i+' - checking '+mock.sameDomain[i].href, function() {
      var validation = scrape.validate(mock.sameDomain[i].href, check);
      expect(validation).to.equal(mock.sameDomain[i].result);
    })
  });

});



describe('External Domain', function() {
  it('returns undefined for external links', function() {
    expect(scrape.validate('http://example.com', check)).to.be.undefined;
    expect(scrape.validate('www.example.com', check)).to.be.undefined;
    expect(scrape.validate('sample.com', check)).to.be.undefined;
    expect(scrape.validate('hello.co.uk', check)).to.be.undefined;
    expect(scrape.validate('example.info/index', check)).to.be.undefined;
  });

  it('returns undefined (links from mocks)', function() {

    mock.externalLinks.forEach(function(linkObj, i) {
      it(i+' - checking '+mock.externalLinks[i].href, function() {

        expect(scrape.validate(mock.externalLinks[i].href, check))
          .to.be.undefined;

      });
    });

  })

});




describe('Relative Paths', function() {

});
