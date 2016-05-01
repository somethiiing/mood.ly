//PASSPORT STRATEGIES
//============================================
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//IMPORT MODELS
//============================================
var User = require('../models/userModel').User;

//IMPORT AUTH CONFIG
//============================================
var authConfig = require('./authConfig');

//MODULE EXPORT
//============================================
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
  // app.use(flash());

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

  //FACEBOOK STRATEGY
  //============================================
  // passport.use(new FacebookStrategy({
  //   //GET INFO FROM AUTHCONFIG
  //   clientID: authConfig.facebookAuth.appID,
  //   clientSecret: authConfig.facebookAuth.appSecret,
  //   callbackURL: authConfig.facebookAuth.callbackUrl,
  //   profileFields: ['id', 'displayName', 'first_name', 'last_name', 'email', 'gender', 'birthday', 'picture.type(large)'],
  // },

  //   function(accesstoken, refreshToken, profile, done) {
  //     console.log('PROFILE:=============');
  //     console.log(profile);

  //     console.log('TOKEN:=============');
  //     console.log(accesstoken);

  //     //FIND USER IN DATABASE BASED ON FACEBOOK ID
  //     User.findOne( { where: { 'userName' : profile._json.email.toLowerCase() } } )
  //     .then(function(user) {
  //       console.log('Found User', user);
  //       if (user) {
  //         done(null, user);
  //       } else {
  //         User.create({
  //           firstName: profile.name.givenName,
  //           lastName: profile.name.familyName,
  //           userName: profile.emails[0].value.toLowerCase(),
  //           password: '1234',
  //           email: profile._json.email.toLowerCase(),
  //           facebookId: profile.id,
  //           picture: profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'
  //         })
  //         .then(function(newUser) {
  //           console.log('user created ', newUser);
  //           done(null, newUser);
  //         })
  //         .catch(function(err) {
  //           console.log('Error saving Facebook user! ', err);
  //         });
  //       }
  //     })
  //     .catch(function(err) {
  //       console.log('Error Searching For Existing FB User: ', err);
  //     });
  //   }
  // ));
};

