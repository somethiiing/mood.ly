import db from './db/db';
import User from './models/userModel';
import Quote from './models/quoteModel';
import Mood from './models/moodModel';
import Giphy from './models/giphyModel';
import MusicVideo from './models/musicVideoModel';

Mood.belongsToMany(User, { through: 'UserMood' });
User.belongsToMany(Mood, { through: 'UserMood' });
Quote.belongsToMany(User, { through: 'UserQuote' });
User.belongsToMany(Quote, { through: 'UserQuote' });
Giphy.belongsToMany(User, { through: 'UserGiphy' });
User.belongsToMany(Giphy, { as: 'Giphys', through: 'UserGiphy' });
MusicVideo.belongsToMany(User, { through: 'UserMusicVideo' });
User.belongsToMany(MusicVideo, { as: 'MusicVideos', through: 'UserMusicVideo' });

db.sync({ force: true });
