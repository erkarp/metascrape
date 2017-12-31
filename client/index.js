var socket = io();

import React from 'react'
import { render } from 'react-dom' 
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import metaScrape from './reducers'
import incomingLink from './actions'
import App from './components/App.js'

let store = createStore(metaScrape);

socket.on('news', function (data) {
	console.log(data);
});

socket.on('counting', function (data) {
	console.log('counting', data);
});

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('main')
);