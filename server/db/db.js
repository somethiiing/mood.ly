import Sequelize from 'sequelize';
import password from '../config/mysqlsetup.js';

const db = new Sequelize('moodb', 'root', password, {
  define: {
    timestamps: false // true by default
  },
  logging: false
});

 export default db;