var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var parse = require('url-parse');
var utils = require('../tasks/script.js');
var router = express.Router();


function parseCheerioForLinks(c, text) {
  var parts = text.split('/'),
    url = parse(text),
    links = [];

  text = text.replace(new RegExp(url.pathname + '$'), '');
  console.log(url, text);

  c('a').each(function(i, elem) {
    var href = c(this).attr('href');
    console.log('about to validate link: ', href);

    var link = utils.validate(href, text);
    console.log('about to push link: ', link);

    if (link) {
      links.push({ url: link });
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

      var $ = cheerio.load(body);
      callback($, res);

    } else {
      console.log("We’ve encountered an error: " + error);
      return;
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

            links[count] = utils.getMetaData($, links[count]);

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
