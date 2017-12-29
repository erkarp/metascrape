var socket = io();

import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'

// socket.on('news', function (data) {
//   console.log(data); 
// });

if (socket)
{
	socket.on('counting', function (data) {
	  console.log('counting', data);
	});
}

var app = render(<App/>, document.getElementById('main'));