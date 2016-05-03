import Sequelize from 'sequelize';
import db from '../db/db';

export default db.define('User',
  {
    name: { type: Sequelize.STRING, required: true, unique: true},
    email: Sequelize.STRING,
    password: { type: Sequelize.STRING, required: true },
    facebookId: Sequelize.STRING,
    avatar: Sequelize.STRING
  },
  {
    instanceMethods: {
      comparePasswords: (inputPassword, callback) => {
        callback(bcrypt.compareSync(inputPassword, this.password));
      }
    }
  },
  {
    freezeTableName: true
  }
);
