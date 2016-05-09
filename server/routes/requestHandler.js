import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../../client/app/app';
import renderFullPage from '../views/index';
import rootReducer from '../../client/app/reducers/index';
import User from '../models/userModel';

export default (req, res) => {
  let user = {};
  const savedQuotes = [];

  const sendInitialState = () => {
    // Create a new instance of a Redux store
    const store = createStore(rootReducer, {
      user,
      quotes: [],
      savedQuotes,
    });

    // Render the component to a string
    const html = ReactDOMServer.renderToString(
      <div>
        <App />
      </div>
    );

    const initialState = store.getState();

    res.send(renderFullPage(html, initialState));
  };

  // PASSPORT
  if (req.session.passport && req.session.passport.user) {
    user = {
      facebookId: req.session.passport.user.facebookId,
      googleId: req.session.passport.user.googleId,
      firstName: req.session.passport.user.name.givenName || null, // CONFIRM 'givenName'
      lastName: req.session.passport.user.name.familyName || null, // CONFIRM 'familyName'
    };

    User.findOne({ where: user })
    .then(foundUser => {
      // RETURN USER
    })
    .then(foundMood => {
      // RETURN MOOD
    })
    .then(foundLikes => {
      // RETURN LIKED CONTENT
    })
    .catch((err) => {
      console.log('There was an error finding the User.', err);
      throw new Error(err);
    });
  } else {
    sendInitialState();
  }
};
