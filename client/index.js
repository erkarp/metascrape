var socket = io();

import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'

socket.on('news', function (data) {
  console.log(data); 
});

socket.on('counting', function (data) {
  consle.log('counting');
});

var app = render(<App/>, document.getElementById('main'));