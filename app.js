var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var debug = require('debug')('test:server');

var linkUtils = require('./server/routes/links.js');
var cheerio = require("cheerio");

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var routes = require('./server/routes/index');
// var users = require('./server/routes/users');
// var links = require('./server/routes/links');

var app = express();
var config = require('./webpack.config.js');
var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, 
  publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// app.use('/links', links);
var io = require('socket.io').listen(server);
io.on('hello', function (socket)
{
  var date = new Date();
  socket.emit('news', { hello: date });
  console.log('Connection made:', date);
});

io.on('submit', function (data)
{
  console.log('chelo chelo');
  var validLinkObjects = [], hrefs = [];

  // Get the html at the requested link
  linkUtils.getCheerio(data.url, function()
  {
    hrefs = parseCheerioForLinks($, text); 

    // Get the html for each link in the inital page
    hrefs.forEach(function (link, i)
    {
      linkUtils.getCheerio(link, function(body)
      {
          var linkObject = {url: link};

          linkObject = find.metaData($, linkObject);
          linkObject = find.elements($, linkObject, ['h1','h2']);

          socket.emit('foundLink', {linkObject: linkObject});
          return linkObject;
      })
    })
  })
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': 
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}