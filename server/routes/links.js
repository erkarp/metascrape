var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var parse = require('url-parse');
var utils = require('../tasks/script.js');
var find  = require('../tasks/find.js');
var router = express.Router();

function findLinks(text, emit)
{
  console.log('\nfindLinks: text is\n', typeof text, text);
  // var parts = text.split('/'),
  //   url = parse(text),
  //   links = [];

  // text = text.replace(new RegExp(url.pathname + '$'), '');
  var links = [];

  cheerio('a', text).each(function(i, elem)
  {
    var href = cheerio(this).attr('href');

    if (href)
    {
      href = utils.removeHash(href);
      if (href && !links.includes(href));
      {
        links.push(href);
      }
    }
    console.log('findLinks: within link iteration', 
      i, 'of', links.length, href);
  });

  return utils.checkList(links, text, emit);
}

function init(url, emit)
{
  var validLinkObjects = [], hrefs = [];

  request(url, function(error, response, body)
  {
    if (!error)
    {
      console.log('\ninit: first fetch\n');
      hrefs = findLinks(body, emit); 

      // Get the html for each link in the inital page
      // hrefs.forEach(function (link, i)
      // {
      //   console.log('\ninit: fetch iteration\n', i, link);

      //   fetchHtml(link, function(body)
      //   {
      //     let linkObject = {url: link};

      //     linkObject = find.metaData(cheerio, linkObject);
      //     linkObject = find.elements(cheerio, linkObject, ['h1','h2']);

      //     // socket.emit('foundLink', {linkObject: linkObject});
      //     emit(linkObject);
      //   })
      // })

      console.log('\nfetchHtml: cheerio.load(body)\n', cheerio.load(body));
    }
    else
    {
      console.log("We’ve encountered an error: " + error);
      return error;
    }
  });
}

module.exports = function (io) 
{
  router.post('/', function(req, res, next)
  {
    const url = req.body.url;
    res.render('links', {url});

    console.log('1', 'hello!', req.body.url);

    init(url, function(validLinkObject) {
      io.emit('counting', validLinkObject);
    });
  });

  router.get('/', function(req, res, next)
  {
    res.redirect('/');
  });

  return router;
};