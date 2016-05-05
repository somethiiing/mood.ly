let Sequelize = require('sequelize');
let password = require('../config/mysqlsetup.js');

let db = new Sequelize('moodb', 'root', password, {
  define: {
    timestamps: false // true by default
  },
  logging: false
});

module.exports = db;