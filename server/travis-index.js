var db = require('./db/db');
var User = require('./models/userModel');
var Quote = require('./models/quoteModel');
var Mood = require('./models/moodModel');
var Giphy = require('./models/giphyModel');
var MusicVideo = require('./models/musicVideoModel');

Mood.belongsToMany(User, { through: 'UserMood' });
User.belongsToMany(Mood, { through: 'UserMood' });
Quote.belongsToMany(User, { through: 'UserQuote' });
User.belongsToMany(Quote, { through: 'UserQuote' });
Giphy.belongsToMany(User, { through: 'UserGiphy' });
User.belongsToMany(Giphy, { as: 'Giphys', through: 'UserGiphy' });
MusicVideo.belongsToMany(User, { through: 'UserMusicVideo' });
User.belongsToMany(MusicVideo, { as: 'MusicVideos', through: 'UserMusicVideo' });

db.sync({ force: true });
