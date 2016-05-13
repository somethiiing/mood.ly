import renderIndex from './requestHandler';

// REQUIRE CONTROLLERS
// =================================
import userController from '../controllers/userController';
import moodController from '../controllers/moodController';
import quoteController from '../controllers/quoteController';
import giphyController from '../controllers/giphyController';
import musicVideoController from '../controllers/musicVideoController';
import wiki from '../API/wikiquotes';
import gif from '../API/giphy';
import music from '../API/music';

// MODULE EXPORT
// =================================
export default (app, express, passport) => {
  // LOCAL ROUTES
  // =================================
  app.get('/', renderIndex);

  app.post('/api/users/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
  }));

  // app.post('/api/users/signup', userController.saveOne);

  app.post('/api/users/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

  // app.post('/api/users/login', userController.verifyLogin);

  app.get('/logout', (req, res) => {
    // LOG USER OUT
    req.session.destroy((err) => {
      if (err) {
        throw new Error('Error logging out!', err);
      } else {
        // REDIRECT USER TO HOME PAGE
        // res.redirect('/');
        console.log('user logged out');
        res.send({ status: 'LOGGEDOUT', body: 'Successfully logged out.' });
      }
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

  app.get('/', isLoggedIn, (req, res) => {
    res.render('/', { user: req.user });
  });

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
  app.get('/api/user/quotes', quoteController.getUserQuotes);
  app.get('/api/quotes', quoteController.retrieveAll);
  app.get('/api/quotes/:id', quoteController.getOne);

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
  app.get('/api/user/giphys', giphyController.getUserGiphys);
  app.get('/api/giphys', giphyController.retrieveAll);
  app.get('/api/giphys/:id', giphyController.getOne);

  // MUSIC ROUTES
  // =================================
  app.get('/musicInfo', music.frontEndCall);
  app.post('/api/music', musicVideoController.saveUserMusicVideo);
  app.get('/api/user/music', musicVideoController.getUserMusicVideos);
  app.get('/api/music', musicVideoController.retrieveAll);
  app.get('/api/music/:id', musicVideoController.getOne);

  // DATABASE ROUTES
  // =================================
  // app.get('/api/moods/saved', databaseSaveTEMP);
  // app.post('/api/quotes/saved', databaseSaveTEMP);
};
