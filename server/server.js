var express = require('express');
var session = require('express-session');
var passport = require('passport');

var app = express();

var port = process.env.PORT || 3000;

//MIDDLEWARE
//==============================================
//configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

//PASSPORT & ROUTES
//==============================================
// Passport Configuration
require('./config/passportConfig.js')(app, session, passport);
require('./config/routes.js')(app, express, passport);

//LISTEN
//==============================================
app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Mood.ly is listening on ' + port);
});