import renderIndex from './requestHandler';

//REQUIRE CONTROLLERS
//=================================
// var userController = require('../controllers/userController');
var wiki = require('../API/wikiquotes.js');

//MODULE EXPORT
//=================================
export default function(app, express, passport) {

  //LOCAL ROUTES
  //=================================
  app.get('/', renderIndex);

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true //OPTIONAL
  }));

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('loginMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true //OPTIONAL
  }));

  // app.get('/profile', function(req, res) {
  //   res.render('profile', { user: req.user });
  // });

  app.get('/logout', function(req, res) {
    //LOG USER OUT AND DESTROY SESSION
    req.session.destroy(function(err) {
      //REDIRECT USER TO HOME PAGE
      res.redirect('/');
    });
  });

  //CHECK IF LOGGED IN
  var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    //REDIRECT
    res.redirect('/');
  };

  //FACEBOOK ROUTES
  //=================================
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
      successRedirect: '/profile',
      failureRedirect: '/'
  }));

  //WIKI ROUTES
  //=================================
    
  app.get('/wikiInfo', wiki.frontEndCall);

};


