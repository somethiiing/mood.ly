import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup.js';

export default new Sequelize(
  'moodb',
  'root',
  'HR41', // FOR TRAVISCI TESTING - USUALLY IS 'HR41'
  {
    host: dbConfig.host,
    dialect: 'mysql',
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
