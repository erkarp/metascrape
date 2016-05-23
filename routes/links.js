//var http = require('https');
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var utils = require('../tasks/script.js');
var router = express.Router();
var parse = require('url-parse');


function getMetaData(c, obj) {
  obj.title = utils.unescape(c('title').html());
  var desc = c('meta[name=description]').attr('content');
  obj.description = utils.unescape(desc);
  return obj;
};

function parseCheerioForLinks(c, text) {
  var parts = text.split('/'),
    url = parse(text),
    links = [],
    domainMatch;

    console.log(url.pathname);

  text = text.replace(new RegExp(url.pathname + '$'), '');
  console.log(url, text);

  c('a').each(function(i, elem) {
    var href = c(this).attr('href');

    if (!href || href.includes('mailto')) {
      return;
    }

    console.log(i, parse(href));
    var hrefHostname = parse(href).hostname;
    console.log('hrefHostname: ',hrefHostname);
    console.log('url.hostname: ',url.hostname);

    if ( hrefHostname.includes('.') &&
        !hrefHostname.includes('.html')) {

          domainMatch =
          hrefHostname.includes(url.hostname) ||
          url.hostname.includes(hrefHostname);

          console.log(domainMatch);
          if (!domainMatch) { return; }
    }

    var hash = href.indexOf('#');
    if (hash > -1) {

      href = href.slice(0, hash);

      if (href.length < 1) {
        return;
      }
    }

    if (href[0] === '/' ) {
      href = url.hostname + href;
    }
    else if (href.includes('..')) {
      var lastSlash = url.pathname.lastIndexOf('/');
      href = text + '/' + url.pathname.slice(0, lastSlash) + href;
    }
    else if (!domainMatch) {
      href = text + '/' + href;
    }

    console.log('about to push href: ', href, text);
    links.push({ url: href });
  });
  links.forEach(function(link){
    console.log(link);
  })

  return links;
};

function sortAndFilter(list) {

  return list.sort(function(a,b) {
    return (a.url > b.url) ? 1 : ((b.url > a.url) ? -1 : 0);
  })

  .filter(function(elem, i, arr) {
    if (i === 0) { return true; }

    if (arr[i].url === arr[i-1].url ||
      arr[i].url === arr[i-1].url + '/') {
        return false;
      }

    return true;
  });
}

function getCheerio(res, url, callback) {
  request(url, function(error, response, body) {
    if (!error) {

      var $ = cheerio.load(body);
      callback($, res);

    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
};

router.post('/', function(req, res, next) {
    var text = req.body.website;

    getCheerio(res, text, function($, res) {

      var list = parseCheerioForLinks($, text),
          links = sortAndFilter(list),
          count = 0;


      function subLinks() {
        if (links[count]) {
          getCheerio(res, links[count].url, function($, rest) {

            links[count] = getMetaData($, links[count]);

            if (links[++count]) {
              console.log('Count: '+count);
              getCheerio(res, links[count].url, subLinks, links, count);
            }
            else {
              res.render('links', {
                title: 'title',
                links: links,
                site: text
              });
            }
          }, links, count);
        };
      }
      subLinks();
    });

});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
