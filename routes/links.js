var express = require('express');
var http = require('https');
var scrape = require('../tasks/script.js');
var router = express.Router();


router.post('/', function(req, res, next){
    var text = req.body.website;
    /*
    for(var key in keys) {
      code += key + '=' + keys[key] + '\n';
    }
    var options = {
        host: text,
        port: 80,
        path: '/'
    };

    http.get(options, function (http_res) {
      // initialize the container for our data
      var data = "";
    });
    */

   res.render('links', {
     title: text,
     links: text
   });
});

router.use('/', function(req, res, next) {
  res.send('respond with a hngg x');
});

module.exports = router;
