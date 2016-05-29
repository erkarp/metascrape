var fs = require('fs');
var path = 'mock-html.html';

module.exports = {
 url: 'emilykarp.com',
 node: {
    path: path,
    title: 'Emily Karp | Web developer'
  },
 page: fs.readFileSync(require.resolve('./'+path), 'utf-8', function (err, html) {
    if (err) { return err; }
    return html.toString();
  }),

 links: [
    'favicon.ico',
    'style.css',
    'https://www.linkedin.com/in/emilykarp',
    'http://codepen.io/emilykarp/',
    'https://github.com/erkarp/',
    'http://www.webdevelopersstudio.com/',
    'about.html',
    '/about.html'
  ],

  sameDomain: [
    {
      href: 'http://www.same-domain.com',
      result: 'same-domain.com'
    }, {
      href: 'http://www.same-domain.com/',
      result: 'same-domain.com/'
    }, {
      href: 'http://www.same-domain.com/index',
      result: 'same-domain.com/index'
    }, {
      href: 'http://www.same-domain.com/index.html',
      result: 'same-domain.com/index.html'
    }, {
      href: 'http://www.same-domain.com/index.pdf',
      result: undefined
    }, {
      href: 'http://www.same-domain.com/indexdir/index',
      result: 'same-domain.com/indexdir/index'
    }, {
      href: 'http://www.same-domain.com/indexdir/index.html',
      result: 'same-domain.com/indexdir/index.html'
    }, {
      href: 'http://www.same-domain.com/indexdir/anotherdir/index.html',
      result: 'same-domain.com/indexdir/anotherdir/index.html'
    }, {
      href: 'http://same-domain.com',
      result: 'same-domain.com'
    }, {
      href: 'http://same-domain.com/index',
      result: 'same-domain.com/index'
    }, {
      href: 'http://same-domain.com/index',
      result: 'same-domain.com/index'
    }, {
      href: 'http://same-domain.com/index.php',
      result: 'same-domain.com/index.php'
    }, {
      href: 'http://same-domain.com/index.pdf',
      result: undefined
    }, {
      href: 'http://same-domain.com/indexdir/index',
      result: 'same-domain.com/indexdir/index'
    }, {
      href: 'http://same-domain.com/indexdir/index.html',
      result: 'same-domain.com/indexdir/index.html'
    }, {
      href: 'http://same-domain.com/indexdir/anotherdir/index',
      result: 'same-domain.com/indexdir/anotherdir/index'
    }
  ],

  relativePaths: [
    '../hello',
    '/link_two',
    '../../test-link',
    './anotherTest'
  ],

  matchingAbsLinks: [
    'emilykarp.com',
    'www.emilykarp.com/',
    'http://emilykarp.com',
    'https://emilykarp.com/info',
    'wd3.emilykarp.com/hello.html'
  ],

  externalLinks: [
    'external.com',
    'www.external.com',
    'super.external.co.uk',
    'http://external.com/info.html',
    'https://external.com/about',
    'mailto:external@mail.com'
  ]
}
