var http = require('https');
var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var scrape = require('../tasks/script.js');
var router = express.Router();

router.post('/', function(req, res, next){
    var text = req.body.website,
        text = 'http://emilykarp.com/';

    request(text, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body),
          temperature = $("h2");

         res.render('links', {
           title: temperature,
           links: text
         });

        console.log("It’s " + temperature + " degrees Fahrenheit.");
      } else {
        console.log("We’ve encountered an error: " + error);
      }
    });
});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
