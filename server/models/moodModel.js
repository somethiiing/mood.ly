var Sequelize = require('sequelize');
var db = require('../db/db.js');

var Mood = db.define('Mood',
  {
    state: Sequelize.STRING,
    timedate: Sequelize.STRING
  }
);

// Mood.belongsTo(User, {foreignKey: 'User'});

module.exports = Mood;