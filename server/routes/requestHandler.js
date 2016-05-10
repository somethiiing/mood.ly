import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../../client/app/app';
import renderFullPage from '../views/index';

export default (req, res) => {
  let user = {};
  const savedQuotes = [];

  // RENDER SIMPLE CLIENT PAGE WITHOUT REDUX
  const html = ReactDOMServer.renderToString(
    <div>
      <App />
    </div>
  );

  res.send(renderFullPage(html));
};
