import React from 'react'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { render } from 'react-dom';
import App from './containers/App.jsx';

const store = createStore(reducer)


render((
  <Provider store={store}>
    <App />
  </Provider>
  ), document.getElementById('container')
);

