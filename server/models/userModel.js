var Sequelize = require('sequelize');
var db = require('../db/db.js');

var User = db.define('User',
  {
    name: { type: Sequelize.STRING, required: true, unique: true},
    email: Sequelize.STRING,
    password: { type: Sequelize.STRING, required: true },
    facebookId: Sequelize.STRING,
    avatar: Sequelize.STRING
  },
  instanceMethods: {
    comparePasswords: function(inputPassword, callback) {
      callback(bcrypt.compareSync(inputPassword, this.password));
    }
  }
);

// User.hasMany(Mood, {as: 'moodHistory', foreignKey: 'User'});
// User.hasMany(Quote, {as: 'savedQuotes', foreignKey: 'User'});

module.exports = User;