import db from './db/db';
import User from './models/userModel';
import Quote from './models/quoteModel';
import Mood from './models/moodModel';

Mood.belongsToMany(User, {through: 'UserMood'});
User.belongsToMany(Mood, {through: 'UserMood'});
Quote.belongsToMany(User, {through: 'UserQuote'});
User.belongsToMany(Quote, {through: 'UserQuote'});

db.sync({force: true});
