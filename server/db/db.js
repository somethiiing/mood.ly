import Sequelize from 'sequelize';
import dbConfig from '../config/mysqlsetup.js';

export default new Sequelize(
  '',
  'root',
  '',
  {
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
