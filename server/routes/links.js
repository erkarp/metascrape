const express = require('express');
const cheerio = require('cheerio');
const debug   = require('debug');
const init    = require('../tasks/init.js');
const router  = express.Router();

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