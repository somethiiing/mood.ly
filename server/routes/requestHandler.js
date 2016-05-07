import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../../client/app/app';
import renderFullPage from '../views/index';
import rootReducer from '../../client/app/reducers/index';

export default (req, res) => {
  const user = {};
  const savedQuotes = [];

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
    <div>
      <App />
    </div>
  );
  */
 
  // const initialState = store.getState();


  // const initialState = store.getState();

  // res.send(renderFullPage(html, initialState));
 
  res.send(renderFullPage(html));
};
