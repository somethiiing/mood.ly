import Sequelize from 'sequelize';
import Config from '../config/mysqlsetup.js';

const travisCI = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

if (!process.env.TRAVIS) {
  travisCI.username = Config.dbConfig.username;
  travisCI.password = Config.dbConfig.password;
  travisCI.database = Config.dbConfig.database;
}
export default new Sequelize(
  travisCI.database,
  // 'moodb',
  travisCI.username,
  // 'root',
  travisCI.password, // FOR TRAVISCI TESTING - USUALLY IS 'HR41'
  // '',
  {
    // host: 'http://127.0.0.1', // Config.dbConfig.host,
    dialect: 'mysql',
    define: {
      timestamps: false, // true by default
    },
    logging: false,
  });
