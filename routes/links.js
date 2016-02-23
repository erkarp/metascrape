var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next){
  var userName = req.body.url;
  var html = 'Hello: ' + userName + '.<br>' +
             '<a href="/">Try again.</a>';
  res.send(html);
});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
