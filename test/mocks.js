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
    'http://www.webdevelopersstudio.com/'
  ],
  sameDomain: [
    'http://www.same-domain.com',
    'http://www.same-domain.com/',
    'http://www.same-domain.com/index',
    'http://www.same-domain.com/index.html',
    'http://www.same-domain.com/index.pdf',
    'http://www.same-domain.com/indexdir/index',
    'http://www.same-domain.com/indexdir/index.html',
    'http://www.same-domain.com/indexdir/anotherdir/index.html',
    'http://www.same-domain.com/indexdir/anotherdir/index.html',
    'http://same-domain.com',
    'http://same-domain.com/',
    'http://same-domain.com/index',
    'http://same-domain.com/index.html',
    'http://same-domain.com/index.pdf',
    'http://same-domain.com/indexdir/index',
    'http://same-domain.com/indexdir/index.html',
    'http://same-domain.com/indexdir/anotherdir/index.html',
    'http://same-domain.com/indexdir/anotherdir/index.html',
    'http://super.same-domain.com',
    'http://super.same-domain.com/',
    'http://super.same-domain.com/index',
    'http://super.same-domain.com/index.html',
    'http://super.same-domain.com/index.pdf',
    'http://super.same-domain.com/indexdir/index',
    'http://super.same-domain.com/indexdir/index.html',
    'http://super.same-domain.com/indexdir/anotherdir/index.html',
    'http://super.same-domain.com/indexdir/anotherdir/index.html',
    ''
  ],
  linksPaths: [
    '',
    '',
    'in/emilykarp',
    'emilykarp/',
    'erkarp/',
    ''
  ],
  relativePaths: [
    '../hello',
    '/link_two',
    '../../test-link',
    './anotherTest'
  ],
  validatedPaths: [
    'hello',
    'link_two',
    'test-link',
    'anotherTest'
  ],
  matchingAbsLinks: [
    'emilykarp.com',
    'www.emilykarp.com/',
    'http://emilykarp.com',
    'https://emilykarp.com/info',
    'wd3.emilykarp.com/hello.html'
  ],
  validatedAbsolutes: [
    '',
    '',
    '',
    'info',
    'hello.html'
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
