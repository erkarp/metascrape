var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var parse = require('url-parse');
var utils = require('../tasks/script.js');
var find  = require('../tasks/find.js');
var router = express.Router();

function findLinks(text, io)
{
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
    console.log('findLinks:', i, href);
    io.emit('news', {href});
  });

  return utils.checkList(links, text);
}

function init(url, io)
{
  var validLinkObjects = [], hrefs = [];

  request(url, function(error, response, body)
  {
    if (!error)
    {
      console.log('\ninit: first fetch\n');
      hrefs = findLinks(body, io); 

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
    }
    else
    {
      console.log("We’ve encountered an error: " + error);
      return error;
    }
  });
}

router.post('/', function(req, res, next)
{
  const url = req.body.url;
  console.log('1', 'hello!', req.body.url);

  const io = req.app.get('socketio');
  console.log('io', io.sockets.name);

  res.render('links', {url});
  init(url, io);
});

router.get('/', function(req, res, next)
{
  res.redirect('/');
});

module.exports = router;