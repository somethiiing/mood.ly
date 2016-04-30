var db = require('./db/db.js');
var User = require('./models/userModel.js');
var Quote = require('./models/quoteModel.js');
var Mood = require('./models/moodModel.js');

Mood.belongsToMany(User, {through: 'UserMood'});
User.belongsToMany(Mood, {through: 'UserMood'});
Quote.belongsToMany(User, {through: 'UserQuote'});
User.belongsToMany(Quote, {through: 'UserQuote'});

db.sync({force: true});
