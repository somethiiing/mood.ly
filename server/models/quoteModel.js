import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('Quote',
  {
    text: Sequelize.STRING,
    author: Sequelize.STRING,
    mood: Sequelize.STRING
  },
  {
    freezeTableName: true
  }
);
