import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../client/app/app';
import renderFullPage from '../views/index';

export default (req, res) => {
  let user = {};
  const savedQuotes = [];

  // const store = createStore(rootReducer, {
  //   user: user,
  //   quotes: [],
  //   savedQuotes: savedQuotes,
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
