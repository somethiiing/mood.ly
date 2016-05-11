import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('Giphy',
  {
    url: Sequelize.STRING,
    mood: Sequelize.STRING,
  },
  {
    freezeTableName: true,
  }
);
