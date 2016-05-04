import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('Mood',
  {
    name: Sequelize.STRING,
    timedate: Sequelize.DATE
  },
  {
    freezeTableName: true
  }
);
