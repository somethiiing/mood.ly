import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../../client/app/app';
import renderFullPage from '../views/index';
import rootReducer from '../../client/app/reducers/index';

export default function(req, res) {
  var user = {};
  var savedQuotes = [];

  console.log('RENDER PAGE');

  // const store = createStore(rootReducer, {
  //   user: user,
  //   quotes: [],
  //   savedQuotes: savedQuotes
  // });

  // RENDER SIMPLE CLIENT PAGE WITHOUT REDUX
  const html = ReactDOMServer.renderToString(
    <div>
      <App />
    </div>
  );

  // TODO: CREATE STORE
  /*
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  */
  
  // const initialState = store.getState();

  // res.send(renderFullPage(html, initialState));
  res.send(renderFullPage(html));
}