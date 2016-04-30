var Sequelize = require('sequelize');
var password = require('../config.mysqlsetup.js');

var db = new Sequelize('moodb', 'root', password, {
  define: {
    timestamps: false // true by default
  }
});

module.exports = db;