const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const { URL } = require('url');
const utils   = require('../tasks/script.js');
const find    = require('../tasks/find.js');
const router  = express.Router();

function findLinks(text, input, io)
{
  const url = new URL(input), 
        list = [],
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
        io.emit('news', {link});
        list.push(link);
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
      console.log('\ninit: first fetch\n');
      hrefs = findLinks(body, url, io); 

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
  const io  = req.app.get('socketio');

  res.render('links', {url});
  init(url, io);
});

router.get('/', function(req, res, next)
{
  res.redirect('/');
});

module.exports = router;