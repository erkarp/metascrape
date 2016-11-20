var express = require('express');
var router = express.Router();

var tasks = require('./../tasks/script');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Scrape',
    test: tasks.metalist
  });
});

module.exports = router;
