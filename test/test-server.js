var request = require('supertest'),
    expect = require('chai').expect;

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('./../app');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('pass info via json', function() {

     request(server)
      .post('/up')
      .send({url: 'hello this is the "url".'})
      .end(function(req, res) {
        console.log(res.body);
      });

//      console.log(r);
  });
});
