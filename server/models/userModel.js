import Sequelize from 'sequelize';
import db from '../db/db';
import bcrypt from 'bcrypt-nodejs';

export default db.define('User',
  {
    name: { type: Sequelize.STRING, required: true, unique: true},
    email: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      set:  function(v) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(v, salt);
        this.setDataValue('password', hash);
      }
    },
    salt: Sequelize.STRING,
    facebookId: Sequelize.STRING,
    avatar: Sequelize.STRING
  },
  {
    hooks: {
      beforeCreate: function(user) {
        user.salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, user.salt);
      }
    },
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
