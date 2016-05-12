import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('MusicVideo',
  {
    videoId: Sequelize.STRING,
    mood: Sequelize.STRING,
  },
  {
    freezeTableName: true,
  }
);
