const express = require('express');
const socket = require('socket.io');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//serve up static files
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

var routes = require('./routes/index');
var users = require('./routes/users');
var links = require('./routes/links');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/users', users);
app.use('/links', links);

var server = app.listen(PORT, function () {
  console.log("Rockin out on port " + PORT + " homie");
});

app.set('socketio', socket.listen(server));