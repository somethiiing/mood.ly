var db = require('db/db.js');
var User = require('models/userModel.js');
var Quote = require('models/quoteModel.js');
var Mood = require('models/moodModel.js');

User.hasMany(Mood, {as: 'moodHistory', foreignKey: 'User'});
User.hasMany(Quote, {as: 'savedQuotes', foreignKey: 'User'});
Mood.belongsTo(User, {foreignKey: 'User'});
Quote.belongsTo(User, {foreignKey: 'User'});

db.sync({force: true});