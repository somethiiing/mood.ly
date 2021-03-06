// PASSPORT STRATEGIES
// ============================================
import LocalStrategy from 'passport-local';
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth2').Strategy;

// IMPORT MODELS
// ============================================
import User from '../models/userModel';

// IMPORT AUTH CONFIG
// ============================================
// import authConfig from './authConfig';

// MODULE EXPORT
// ============================================
export default (app, session, passport) => {
  // SERIALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // DESERIALIZE USER
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // PASSPORT SESSION
  app.use(session({
    secret: 'shhsecret',
    resave: true,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
  }));

  // PASSPORT INITIALIZE & SESSION
  app.use(passport.initialize());
  app.use(passport.session());

  // FLASH MESSAGES
  // app.use(flash());

  // LOCAL STRATEGY
  // ============================================
  // SIGNUP
  passport.use('local-signup', new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    const user = req.body;
    // SEARCH DATABASE FOR USER
    User.findOrCreate({ where: {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    } })
    .then(() => {
      console.log('user created \n', user);
      done(null, user);
    })
    .catch(err => {
      console.log('There was an error finding or creating the user (error line 65).', err);
    });
  }));

  // LOGIN
  passport.use('local-login', new LocalStrategy({
    username: 'username',
    password: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    User.findOne({ where: { username } })
    .then(user => {
      if (user) {
        console.log('User found\n', user.dataValues);
        done(null, user);
      }
    })
    .catch(err => {
      console.log('There was an error finding the user (error line 84).', err);
    });
  }));

  // FACEBOOK STRATEGY
  // ============================================
  // passport.use(new FacebookStrategy({
  //   // GET INFO FROM AUTHCONFIG
  //   clientID: authConfig.facebookAuth.appID,
  //   clientSecret: authConfig.facebookAuth.appSecret,
  //   callbackURL: authConfig.facebookAuth.callbackUrl,
  //   profileFields: ['id', 'displayName', 'first_name', 'last_name',
  //    'email', 'gender', 'birthday', 'picture.type(large)'],
  // },

  //   function(accesstoken, refreshToken, profile, done) {
  //     console.log('FACEBOOK PROFILE:=============');
  //     console.log(profile);

  //     console.log('FACEBOOK TOKEN:=============');
  //     console.log(accesstoken);

  //     // FIND USER IN DATABASE BASED ON FACEBOOK ID
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

  // GOOGLE STRATEGY
  // ============================================
  // passport.use(new GoogleStrategy({
  //   clientID: authConfig.googleAuth.clientID,
  //   clientSecret: authConfig.googleAuth.clientSecret,
  //   callbackURL: authConfig.googleAuth.callbackURL,
  //   passReqToCallback: true,
  // },
  // function(request, accessToken, refreshToken, profile, done) {
  //   console.log('GOOGLE PROFILE:=============');
  //   console.log(profile);

  //   console.log('GOOGLE TOKEN:=============');
  //   console.log(accessToken);

  //   // FIND OR CREATE USER
  //   User.findOrCreate({ 'googleId': profile.id }, function(err, user) {
  //     console.log('user:==============');
  //     console.log(user);
  //     return done(err, user);
  //   });
  // }));
};

