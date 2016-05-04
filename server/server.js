import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 8080;

require('babel-core/register')({
  presets: ['es2015', 'react']
});

//MIDDLEWARE
//==============================================
//configure our server with all the middleware and routing
import middleware from './config/middleware';
middleware(app, express);

//PASSPORT & ROUTES
//==============================================
// Passport Configuration
require('./config/passport.js')(app, session, passport);

import './index';
import routes from './routes/routes';
routes(app, express, passport);

//LISTEN
//==============================================
app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Mood.ly is listening on ' + port);
});
