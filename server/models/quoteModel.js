import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('Quote',
  {
    text: Sequelize.TEXT,
    mood: Sequelize.STRING,
  },
  {
    freezeTableName: true,
  }
);
