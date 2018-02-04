const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const debug   = require('debug');
const { URL } = require('url');
const scrape  = require('../tasks/init.js');
const router  = express.Router();


router.post('/', function(req, res, next)
{
  const url = req.body.url;
  const io  = req.app.get('socketio');

  res.render('links', {url});
  scrape(url, io);
});

router.get('/', function(req, res, next)
{
  res.redirect('/');
});

module.exports = router;