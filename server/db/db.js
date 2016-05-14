import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup.js';

export default new Sequelize(
  'moodb',
  'root',
  'HR41',
  {
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
