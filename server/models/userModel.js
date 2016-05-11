import Sequelize from 'sequelize';
import db from '../db/db';
import bcrypt from 'bcrypt-nodejs';

export default db.define('User',
  {
    name: { type: Sequelize.STRING, required: true, unique: true },
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: { type: Sequelize.STRING },
    facebookId: Sequelize.STRING,
    googleId: Sequelize.STRING,
    avatar: Sequelize.STRING,
  },
  { // BEGIN OPTIONS
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync(10);
        // ENCRYPT AND ADD SALT TO USER PASSWORD BEFORE CREATE
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
    instanceMethods: {
      comparePasswords: (user, inputPassword, callback) => {
        callback(bcrypt.compareSync(inputPassword, user.dataValues.password));
      },
    },
  },
  {
    freezeTableName: true,
  }
);
