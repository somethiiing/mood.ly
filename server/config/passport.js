//passport.js
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user'); //CHANGE AS NEEDED

module.exports = function(app, session, passport) {
  //SERIALIZE USER
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  //DESERIALIZE USER
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //PASSPORT SESSION
  app.use(session({
    secret: 'shhsecret',
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
    }));

  //PASSPORT INITIALIZE & SESSION
  app.use(passport.initialize());  
  app.use(passport.session());

  //FLASH MESSAGES  
  app.use(flash());

//LOCAL STRATEGY
//============================================
  //SIGNUP
  passport.use('local-signup', new LocalStrategy({
    username: 'email',
    password: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
      //SEARCH DATABASE FOR USER
      User.findOne({ where: { 'local.email': email } })
      .then(function(user) {
        console.log('Found user ', user);
        // if (err) {
        //   return done(err);
        // }
        // if (user) {
        //   return done(null, false, req.flash('signupMessage', 'That email is already in use.'));
        if (user) {
          done(null, user);
        } else {
          //CREATE NEW USER
          User.create({
            username: email,
            password: generateHash(password), //NEED TO WRITE METHOD FOR GENERATEHASH
          })
          .then(function(newUser) {
            console.log('user created ', newUser);
            done(null, newUser);
          }
          .catch(function(err) {
            console.log('Error creating a new user! ', err);
          }));
        }
      })
      .catch(function(err) {
        console.log('Cannot find user! ', err);
      });
  }));

  //LOGIN
  passport.use('local-login', new LocalStrategy({
    username: 'email',
    password: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ where: { 'local.email': email } })
    .then(function(user) {
      if (user) {
        done(null, user);
      }
    })
    .catch(function(err) {
      console.log('User not found ', err);
    });
  }));
};

