import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup-example.js';

export default new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password, // FOR TRAVISCI TESTING - USUALLY IS 'HR41'
  {
    host: dbConfig.host,
    dialect: 'mysql',
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
