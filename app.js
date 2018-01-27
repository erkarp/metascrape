var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
};

var app = express();
// app.settings.env = 'production';
var config = require('./webpack.config.js');
var compiler = webpack(config);


webpackDevServer.addDevServerEntrypoints(config, options);
const server = new webpackDevServer(compiler, options);



var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var links = require('./server/routes/links');

if ( app.settings.env === 'development' ) 
{
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(compiler)); 
  app.use(logger('dev'));
} else {
  var webpackServerMiddleware = require('webpack-server-middleware');
  app.use(webpackServerMiddleware(compiler));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/links', links);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development')
{
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next)
{
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;