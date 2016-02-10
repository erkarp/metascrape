var express = require('express'),
    bodyparser = require('body-parser'),
	  React = require('react/addons'),
    hbs = require('express-handlebars'),
	  components = require('./js/app.js'),
	  LinkList = React.createFactory(components.LinkList);

app = express();

app.use(express.static('public'))
app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function home(req,res,next) {
  console.log('at root');
  res.render('layout', {
    reactHtml:React.renderToString(<LinkList/>)
  });
});

app.post('/up', function (req, res) {
  var up = req.body.url.toUpperCase();
  res.status(200).send({data: up});
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

app.listen(process.env.PORT||3000);
