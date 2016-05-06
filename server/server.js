import express from 'express';
import session from 'express-session';
import passport from 'passport';
// import flash from 'connect-flash';
// import bodyParser from 'body-parser';

const app = express();

const port = process.env.PORT || 8080;

require('babel-core/register')({
  presets: ['es2015', 'react'],
});

// MIDDLEWARE
// ==============================================
// configure our server with all the middleware and routing
import middleware from './config/middleware';
middleware(app, express);

// PASSPORT & ROUTES
// ==============================================
// Passport Configuration
import config from './config/passport';
config(app, session, passport);

// initialize mySQL associations
import './index';

import routes from './routes/routes';
routes(app, express, passport);

// LISTEN
// ==============================================
console.log(`Mood.ly is listening on ${port}`);

app.listen(port);
