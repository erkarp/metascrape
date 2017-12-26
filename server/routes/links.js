var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var parse = require('url-parse');
var utils = require('../tasks/script.js');
var find  = require('../tasks/find.js');
var router = express.Router();

function parseCheerioForLinks(c, text)
{
  var parts = text.split('/'),
    url = parse(text),
    links = [];

  text = text.replace(new RegExp(url.pathname + '$'), '');

  c('a').each(function(i, elem)
  {
    var href = c(this).attr('href');

    if (href)
    {
      href = utils.removeHash(href);
      if (href && !list.contains(href));
      {
        links.push(href);
      }
    }
  });

  return utils.checkList(links, text);
}

function getCheerio(url, callback)
{
  return request(url, function(error, response, body)
  {
    if (!error)
    {
      return callback(cheerio.load(body));
    }
    else
    {
      console.log("We’ve encountered an error: " + error);
      return error;
    }
  });
}

router.use('/', function(req, res, next)
{
  res.render('index');
});

module.exports = {
  getCheerio: getCheerio, 
  parseCheerioForLinks: parseCheerioForLinks
};
