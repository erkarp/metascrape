var http = require('https');
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var scrape = require('../tasks/script.js');
var router = express.Router();

router.post('/', function(req, res, next){
    var text = req.body.website;

    request(text, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body),
          title = $('title').html(),
          links = [];

        $('a').each(function(i, elem) {
          var href = $(this).attr('href');

          if (href[0] === '/') {
            href = href.slice(1);
          }

          if (href.length > 0) {
            links.push(href);
          }

        });

        links = links.sort().filter(function(elem, i, arr) {
          if (arr[i] === arr[i-1]) {
            return false;
          } else {
            return true;
          }
        });

       res.render('links', {
         title: title,
         links: links
       });

        console.log("It’s " + title + " degrees Fahrenheit.");
      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });
});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
