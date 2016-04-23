var express = require('express');
var scrape = require('../tasks/script.js')
var router = express.Router();


router.post('/', function(req, res, next){
  var text = req.body.url;
  res.render('links', {
    title: text,
    links: scrape.html(text)
   });
});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
