import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup.js';

export default new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
