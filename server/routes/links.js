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

// module.exports = {
//   getCheerio: getCheerio, 
//   parseCheerioForLinks: parseCheerioForLinks
// };

app.post('/', function(req, res, next)
{
  // var serverIo = require('http').createServer(express());
  // var io = require('socket.io').listen(serverIo);

  // io.on('connection', function (data)
  // {
  //   console.log('chelo chelo');
  //   var validLinkObjects = [], hrefs = [];

  //   // Get the html at the requested link
  //   linkUtils.getCheerio(data.url, function()
  //   {
  //     hrefs = parseCheerioForLinks($, text); 

  //     // Get the html for each link in the inital page
  //     hrefs.forEach(function (link, i)
  //     {
  //       linkUtils.getCheerio(link, function(body)
  //       {
  //           var linkObject = {url: link};

  //           linkObject = find.metaData($, linkObject);
  //           linkObject = find.elements($, linkObject, ['h1','h2']);

  //           socket.emit('foundLink', {linkObject: linkObject});
  //           return linkObject;
  //       })
  //     })
  //   })
  // });
});

module.exports = router;
