var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var parse = require('url-parse');
var utils = require('../tasks/script.js');
var find  = require('../tasks/find.js');
var router = express.Router();

// io.on('connection', function (socket)
// {
//   console.log('Connection made');
//   socket.emit('news', { hello: 'LINKS' });
// });

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
      if (href)
      {
        links.push(href);
      }
    }
  });

  return utils.checkList(links, text);
}



function getCheerio(res, url, callback)
{
  request(url, function(error, response, body)
  {
    if (!error)
    {
      var $ = cheerio.load(body);
      callback($, res);
    }
    else
    {
      console.log("We’ve encountered an error: " + error);
      res.render('error');
    }
  });
}

router.post('/', function(req, res, next)
{
    var text = req.body.website;

    getCheerio(res, text, function($, res)
    {
      var links = parseCheerioForLinks($, text),
          count = 0;

      function subLinks()
      {
        if (links[count])
        {
          getCheerio(res, links[count], function($, rest)
          {
            links[count] = find.metaData($, {url: links[count]});
            links[count] = find.elements($, links[count], ['h1','h2']);

            if (links[++count])
            {
              console.log('Count:', count, 'of', links.length, '--', links[count]);
              getCheerio(res, links[count], subLinks, links, count);
            }
            else
            {
              res.render('links', {title: 'title', links: links, site: text});
            }

          }, links, count);
        }
      }

      subLinks();
    });

});

router.use('/', function(req, res, next)
{
  res.render('index');
});

module.exports = router;
