import renderIndex from './requestHandler';

// REQUIRE CONTROLLERS
// =================================
import userController from '../controllers/userController';
import moodController from '../controllers/moodController';
import quoteController from '../controllers/quoteController';
import giphyController from '../controllers/giphyController';
import wiki from '../API/wikiquotes';
import gif from '../API/giphy';

// MODULE EXPORT
// =================================
export default (app, express, passport) => {
  // LOCAL ROUTES
  // =================================
  app.get('/', renderIndex);

  // app.get('/api/users/signup', (req, res) => {
  //   res.render('signup', { message: req.flash('loginMessage') });
  // });

  app.post('/api/users/signup', userController.saveOne);
  app.post('/api/users/login', userController.verifyLogin);

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

  // app.get('/api/users/login', (req, res) => {
  //   res.render('login', { message: req.flash('loginMessage') });
  // });

  app.post('/api/users/login', passport.authenticate('local-signup', {
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
    // LOG USER OUT
    req.logout();
    // REDIRECT USER TO HOME PAGE
    res.redirect('/');
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
  app.post('/api/giphys', giphyController.saveUserGiphy);
  app.get('/api/giphys', giphyController.getAll);

  // DATABASE ROUTES
  // =================================
  // app.get('/api/moods/saved', databaseSaveTEMP);
  // app.post('/api/quotes/saved', databaseSaveTEMP);
};
