var socket = io();

import React from 'react'
import { render } from 'react-dom' 
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { addIncomingLink } from './actions'
import metaScrape from './reducers'
import App from './components/App.js'

let store = createStore(metaScrape,
   window.__REDUX_DEVTOOLS_EXTENSION__ && 
   window.__REDUX_DEVTOOLS_EXTENSION__()
);

socket.on('news', function (data) {
	console.log(data);
	store.dispatch(addIncomingLink(data))
});

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('main')
);