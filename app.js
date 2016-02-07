var scrape = require('./script'),
    express = require('express'),
    bodyparser = require('body-parser'),
    app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
  res.status(200).send(req.url);
});

app.post('/up', function (req, res) {
  var up = req.body.url.toUpperCase();
  res.status(200).send({data: up});
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});
module.exports = server;
