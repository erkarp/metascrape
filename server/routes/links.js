const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const debug   = require('debug');
const { URL } = require('url');
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
      if (href && href.hostname === inputHostname)
      {
          let pathname = href.pathname.replace(/\/$/, '');
          let link = href.origin + pathname;

          if (list.includes(link))
          {
            (function(linkIndex) {

              const index = linkIndex;
              
              setTimeout(function() {
                io.emit('count', { link, index })
              }, 5000);

            })(list.length)
          }

          else {
            let index = list.length;

            request(link, function(error, response, body)
            {
              const elements = ['h1', 'h2', 'p'];
              let linkObject = { link, index:[index], count: 1 };
      
              linkObject = find.metaData(body, linkObject);
              linkObject = find.elements(body, linkObject, elements);

              io.emit('news', linkObject);
            });
          }

          list.push(link);
      }
    }
  });

  console.log('\nLIST:\n', list);
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