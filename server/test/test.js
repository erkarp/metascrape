var request   = require('supertest'),
    expect    = require('chai').expect,
    cheerio   = require('cheerio'),
    parse     = require('url-parse'),
    mock      = require('./mocks'),
    validate  = require('./../tasks/validate/validate'),
    remove    = require('./../tasks/validate/remove'),
    does      = require('./../tasks/validate/booleans');

var setCheck = function(link) {
  var parsed = parse(link),
      rmProt = remove.protocol(parsed);

  return {
    link: link,
    url: parsed,
    domain: rmProt
  };
};

var check = setCheck('http://www.same-domain.com');
/*

describe('html file return and parse', function () {

  it('gets a title and description', function () {
    var $ = cheerio.load(mock.page),
      obj = validate.getMetaData($, {});

    expect(obj.title).to.be.a('string' || null);
    expect(obj.description).to.be.a('string' || null);
  });

});

*/

describe('VALIDATION HELPER FUNCTIONS', function() {

  it('should return everything up to "#"', function() {
    var linkWithHash = check.link + '#hash-value';
    expect(remove.hash(linkWithHash)).to.equal(check.link);
  });

  it('does linkClimbsDir', function() {
    expect(does.linkClimbDir(check.link)).to.not.be.true;
    expect(does.linkClimbDir('../utils.js')).to.be.true;
  });

  it('check if link startsAtRoot', function() {
    expect(does.startAtRoot(check.link)).to.not.be.true;
    expect(does.startAtRoot('/about.html')).to.be.true;
  });

});



describe('Domain Match', function() {

  mock.sameDomain.forEach(function(linkObj, i) {
    it(i+' - checking '+mock.sameDomain[i].href, function() {
      var validation = validate.link(mock.sameDomain[i].href, check);
      expect(validation).to.equal(mock.sameDomain[i].result);
    })
  });

});


describe('External Domain', function() {
  it('returns undefined for external links', function() {
    expect(validate.link('http://example.com', check)).to.be.undefined;
    expect(validate.link('www.example.com', check)).to.be.undefined;
    expect(validate.link('sample.com', check)).to.be.undefined;
    expect(validate.link('hello.co.uk', check)).to.be.undefined;
    expect(validate.link('example.info/index', check)).to.be.undefined;
  });

  it('returns undefined (links from mocks)', function() {

    mock.externalLinks.forEach(function(linkObj, i) {
      it(i+' - checking '+mock.externalLinks[i].href, function() {

        expect(validate.link(mock.externalLinks[i].href, check))
          .to.be.undefined;

      });
    });

  });

});




describe('Relative Paths', function() {

    it('goes back to root', function() {
      var newlink = validate.link('/hello', setCheck('www.sample-link.com'));
      expect(newlink).to.equal('http://www.sample-link.com/hello');
    });

    it('removes "./"', function() {
      expect(validate.link('/hello', setCheck('www.sample-link.com/src/big/')))
        .to.equal('http://www.sample-link.com/hello');
    });

    it('../hello', function() {
      expect(validate.link('../hello', setCheck('www.sample-link.com/src/to')))
        .to.equal('http://www.sample-link.com/src/hello');
    });

    it('../../hello', function() {
      expect(validate.link('../../hello', setCheck('www.sample-link.com/one/two')))
        .to.equal('http://www.sample-link.com/hello');
    });

    it('../../hello (II)', function() {
      expect(validate.link('../../hello', setCheck('www.sample-link.com/one/two/three')))
        .to.equal('http://www.sample-link.com/one/hello');
    });

    it('../../../hello', function() {
      expect(validate.link('../../../hello', setCheck('www.sample-link.com/one/two/three/four/five/six')))
        .to.equal('http://www.sample-link.com/one/two/three/hello');
    });

    it('../../../hello with 7 directories', function() {
      expect(validate.link('../../../hello',
        setCheck('www.sample-link.com/one/two/three/four/five/six/seven')))
        .to.equal('http://www.sample-link.com/one/two/three/four/hello');
    });

    it('../hello with 7 directories', function() {
      expect(validate.link('../hello',
        setCheck('www.sample-link.com/one/two/three/four/five/six/seven')))
        .to.equal('http://www.sample-link.com/one/two/three/four/five/six/hello');
    });

});



/*

describe('Same Folder', function() {

  it('checks about', function() {
    expect(validate.link('about', check)).to.equal('same-domain.com/about');
  });

  it('checks about.php', function() {
    expect(validate.link('about.php', check)).to.equal('same-domain.com/about.php');
  });

  it('checks about/us.html', function() {
    expect(validate.link('about/us.html', check)).to.equal('same-domain.com/about/us.html');
  });

  it('checks about.jpg', function() {
    expect(validate.link('about.jpg', check)).to.be.undefined;
  });

});
*/
