var http = require('https');
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var scrape = require('../tasks/script.js');
var router = express.Router();
var parse = require('url-parse');


function getCheerio(res, url, follow, callback) {
  request(url, function(error, response, body) {
    if (!error) {

      var $ = cheerio.load(body),
        links = callback($, res);

/*
      links.forEach(function(link) {
        getCheerio(link, false, callback);
      });
*/

      return links;
    } else {
      console.log("We’ve encountered an error: " + error);
    }

  });
};

function getMetaData(c) {
  var title = c('title').html(),
      description = c('meta[name=description]');
  return {
    title: title,
    description: description
  }
};

function parseCheerioForLinks(c, text) {
  var parts = text.split('/'),
    url = parse(text),
    links = [];

  c('a').each(function(i, elem) {
    var href = c(this).attr('href');

    if (!href ||
        href.length < 2 ||
        href.indexOf('#') === 0 ||
        href.includes('mailto')) {
      return;
    }

    var hrefHostname = parse(href).hostname;
    if (hrefHostname && hrefHostname !== url.hostname) {
      return;
    }

    if (href[0] === '/') {
      href = parts[0] + '//' + parts[2] + href;
    }

    if (href.length > 0) {
      links.push(href);
    }
  });

  return links;
};

router.post('/', function(req, res, next) {
    var text = req.body.website, title = 'title', links;

    getCheerio(res, text, true, function($, res) {

      var list = parseCheerioForLinks($, text);

      links = list.sort().filter(function(elem, i, arr) {
        return arr[i] === arr[i-1] ? false : true;
      });

      res.render('links', {
        title: title,
        links: links
      });

    });

});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
