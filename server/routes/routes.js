import renderIndex from './requestHandler';

// REQUIRE CONTROLLERS
// =================================
import userController from '../controllers/userController';
import moodController from '../controllers/moodController';
import quoteController from '../controllers/quoteController';
import wiki from '../API/wikiquotes';
import gif from '../API/giphy';

// MODULE EXPORT
// =================================
export default (app, express, passport) => {
  // LOCAL ROUTES
  // =================================
  app.get('/', renderIndex);

  app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('loginMessage') });
  });

  app.post('/signup', userController.saveOne);

  // USERS
  // =================================
  app.get('/api/users', userController.retrieveAll);
  app.put('/api/users', userController.updateOne);
  app.delete('/api/users', userController.deleteOne);

  // MOODS
  // =================================
  app.post('/api/moods', moodController.saveUserMood);
  app.get('/api/moods', moodController.getAll);

  // QUOTES
  // =================================
  app.post('/api/quotes', quoteController.saveUserQuote);
  app.get('/api/quotes', quoteController.getAll);

  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true, // OPTIONAL
  }));


  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/profile',
  //   failureRedirect: '/signup',
  //   failureFlash: true //OPTIONAL
  // }));


  // app.get('/profile', isLoggedIn, (req, res) => {
  //   res.render('profile', { user: req.user });
  // });

  app.get('/logout', (req, res) => {
    // LOG USER OUT AND DESTROY SESSION
    req.session.destroy(err => {
      // REDIRECT USER TO HOME PAGE
      res.redirect('/');
    });
  });

  // CHECK IF LOGGED IN
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // REDIRECT
    return res.redirect('/');
  };

  // FACEBOOK ROUTES
  // =================================
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));

  // GOOGLE ROUTES
  // =================================
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));

  // WIKI ROUTES
  // =================================
  app.get('/wikiInfo', wiki.frontEndCall);

  // GIPHY ROUTES
  // =================================
  app.get('/giphyInfo', gif.frontEndCall);

  // DATABASE ROUTES
  // =================================
  // app.get('/api/moods/saved', databaseSaveTEMP);
  // app.post('/api/quotes/saved', databaseSaveTEMP);
};
