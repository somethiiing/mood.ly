//passport.js
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user'); //CHANGE AS NEEDED

module.exports = function(passport) {
  //SERIALIZE USER
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //DESERIALIZE USER
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //PASSPORT SESSION
  app.use(session({ secret: 'shhsecret' }));  
  app.use(passport.initialize());  
  app.use(passport.session());  
  app.use(flash());


};

