import db from './db/db';
import User from './models/userModel';
import Quote from './models/quoteModel';
import Mood from './models/moodModel';
import Giphy from './models/giphyModel';

Mood.belongsToMany(User, { through: 'UserMood' });
User.belongsToMany(Mood, { through: 'UserMood' });
Quote.belongsToMany(User, { through: 'UserQuote' });
User.belongsToMany(Quote, { through: 'UserQuote' });
Giphy.belongsToMany(User, { through: 'UserGiphy' });
User.belongsToMany(Giphy, { as: 'Giphys', through: 'UserGiphy' });

db.sync({ force: true });
