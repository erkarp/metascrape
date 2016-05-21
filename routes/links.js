var http = require('https');
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
    links = [];

  c('a').each(function(i, elem) {
    var href = c(this).attr('href');

    if (!href ||
        href.length < 2 ||
        href.includes('mailto')) {
      return;
    }

    var hrefHostname = parse(href).hostname;
    if (hrefHostname && hrefHostname !== url.hostname) {
      return;
    }

    var hash = href.indexOf('#');
    if (hash > -1) {
      href = href.slice(0, hash);
    }

    if (href[0] === '/') {
      href = parts[0] + '//' + parts[2] + href;
    }

    if (href.length > 0) {
      links.push({
        url: href
      });
    }
  });

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

      console.log(body);
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
