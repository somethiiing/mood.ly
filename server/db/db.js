import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup.js';

export default new Sequelize(
  'test',
  'root',
  '',
  {
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
