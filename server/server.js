var express = require('express');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var app = express();

var port = process.env.PORT || 8080;

//MIDDLEWARE
//==============================================
//configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

//PASSPORT & ROUTES
//==============================================
// Passport Configuration
require('./config/passport.js')(app, session, passport);
require('./routes/routes.js')(app, express, passport);

//LISTEN
//==============================================
app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Mood.ly is listening on ' + port);
});