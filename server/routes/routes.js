//REQUIRE CONTROLLERS
//=================================
var userController = require('../controllers/userController');

//MODULE EXPORT
//=================================
module.exports = function(app, express, passport) {

  //LOCAL ROUTES
  //=================================
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.get('/login', function(req, res) {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('loginMessage') });
  });

  app.get('/profile', function(req, res) {
    res.render('profile', { user: req.user });
  });

  app.get('/logout', function(req, res) {
    //LOG USER OUT
    req.logout();
    //REDIRECT USER TO HOME PAGE
    res.redirect('/');
  });

};