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

export default (app) => {
  app.get('/', renderIndex);
// AUTH
// =================================
  app.post('/signup', userController.saveOne);
  app.post('/login', userController.verifyLogin);

// MOODS
// =================================
  app.post('/api/moods', moodController.saveUserMood);
  app.get('/api/moods', moodController.getAll);

// QUOTES
// =================================
  app.post('/api/quotes', quoteController.saveUserQuote);
  app.get('/api/quotes', quoteController.retrieveAll);
  app.get('/api/quotes/:id', quoteController.getOne);

// WIKI ROUTES
// =================================
  app.get('/api/wikiInfo', wiki.frontEndCall);

// GIPHY ROUTES
// =================================
  app.get('/api/giphyInfo', gif.frontEndCall);
  app.post('/api/giphys', giphyController.saveUserGiphy);
  app.get('/api/giphys', giphyController.retrieveAll);
  app.get('/api/giphys/:id', giphyController.getOne);

// MUSIC ROUTES
// =================================
  app.get('/api/musicInfo', music.frontEndCall);
  app.post('/api/music', musicVideoController.saveUserMusicVideo);
  app.get('/api/music', musicVideoController.retrieveAll);
  app.get('/api/music/:id', musicVideoController.getOne);

// USERS
// =================================
  app.get('/api/user/quotes', quoteController.getUserQuotes);
  app.get('/api/user/giphys', giphyController.getUserGiphys);
  app.get('/api/user/music', musicVideoController.getUserMusicVideos);
  app.get('/api/users', userController.retrieveAll);
  app.put('/api/users', userController.updateOne);
  app.delete('/api/users', userController.deleteOne);
};
