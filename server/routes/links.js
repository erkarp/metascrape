const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const debug   = require('debug');
const { URL } = require('url');
const utils   = require('../tasks/script.js');
const find    = require('../tasks/find.js');
const router  = express.Router();

function findLinks(text, input, io)
{
  const url = new URL(input), 
        list = [url.origin + url.pathname],
        inputHostname = url.hostname;

  cheerio('a', text).each(function(i, elem)
  {
    let href = cheerio(this).attr('href');

    try 
    {
      href = new URL(href)
    } 
    catch(e) 
    {
      href = new URL(href, url.origin + url.pathname)
    }
    finally 
    {
      let link = href.origin + href.pathname;

      if (href && href.hostname === inputHostname && !list.includes(link))
      {
        list.push(link);

        request(link, function(error, response, body)
        {
          const elements = ['h1', 'h2', 'p'];

          let linkObject = find.metaData(body, { link });
              linkObject = find.elements(body, linkObject, elements);

          io.emit('news', linkObject);
        });
      }
    }
  });

  console.log('\nLIST:\n', list);
  // return utils.checkList(links, text);
}

function init(url, io)
{
  var validLinkObjects = [], hrefs = [];

  request(url, function(error, response, body)
  {
    if (!error)
    {
      hrefs = findLinks(body, url, io); 
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
  const io  = req.app.get('socketio');

  res.render('links', {url});
  init(url, io);
});

router.get('/', function(req, res, next)
{
  res.redirect('/');
});

module.exports = router;