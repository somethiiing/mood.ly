var Sequelize = require('sequelize');
var db = require('../db/db.js');

var Quote = db.define('Quote',
  {
    text: Sequelize.STRING,
    author: Sequelize.STRING,
    mood: Sequelize.STRING
  },
  {
    freezeTableName: true
  }
);

// Quote.belongsTo(User, {foreignKey: 'User'});

module.exports = Quote;
