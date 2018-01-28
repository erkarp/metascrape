const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//serve up static files
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));
// app.use(express.static(path.resolve(__dirname, '..', 'client', 'styles', 'mainSheet', 'main.css')));

// app.get('/client/styles/mainSheet', function (request, response){
//   console.log("I HIT DA STYLES");
//   response.sendFile(path.resolve(__dirname, '..', 'styles', 'mainSheet', 'main.css'))
// });
// app.use(express.static(path.resolve(__dirname, 'client', 'styles', 'mainSheet', 'main.css')));

// view engine setup
/// BEGIN FROM APP.JS
var routes = require('./routes/index');
var users = require('./routes/users');
var links = require('./routes/links');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/users', users);
app.use('/links', links);
/// END FROM APP.JS

// app.use(function (err, req, res, next) {
//   console.error(err);
//   console.error(err.stack);
//   res.status(err.status || 500).send(err.message || 'Internal server error.');
// });


// handle every other route with index.html, which will contain
// a script tag to our application's JavaScript file(s).
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
// });

var server = app.listen(PORT, function () {
  console.log("Rockin out on port " + PORT + " homie");
});


//// FROM BIN/WWW
// #!/usr/bin/env node

/**
 * Module dependencies.
 */
// var debug = require('debug')('test:server');
// var http = require('http');

/**
 * Get port from environment and store in Express.
 */
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 */
// var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);


var io = require('socket.io').listen(server) ;
// next line is the money
app.set('socketio', io);

/**
 * Normalize a port into a number, string, or false.
 */
// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

/**
 * Event listener for HTTP server "error" event.
 */
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

/**
 * Event listener for HTTP server "listening" event.
 */
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }
