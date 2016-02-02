var fs = require('fs');
var path = 'mock-html.html';

module.exports = {
 emptyarr: [],

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
    'terrikarp.com',
    'www.terrikarp.com',
    'http://terrikarp.com/info.html',
    'https://terrikarp.com/about',
    'mailto:emilykarp@gmail.com'
  ]
}
