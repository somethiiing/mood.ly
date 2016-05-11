import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const user = req.body;
    User.findOrCreate({ where: user })
    .then(() => {
      res.redirect(201, '/');
      // res.send({ data: user });
    });
    console.log(user);
  },

  // SEND ERROR (403)
  sendError: (res, errorString) => {
    const error = {
      success: false,
    };

    if (errorString) {
      error.error = errorString;
    }
    res.status(403).json(error);
  },

  // VERIFY LOGIN
  verifyLogin: (req, res) => {
    console.log('req.body ', req.body);
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({ where: { userName } })
    .then((user) => {
      if (!user) {
        self.sendError(res, 'Invalid username or password');
      } else {
        user.comparePasswords(user, password, (compareResult) => {
          if (compareResult) {
            console.log('SUCCESS!');
            res.status(200);
          } else {
            console.log('FAIL');
            res.send({ response: 'Incorrect Password. Try again.' });
          }
        });
      }
    });
  },

  // GET A USER
  retrieveOne: (req, res) => {
    let userId = req.params.id;

    if (userId === 'me') {
      userId = req.currentUser.id;
    }

    const isMe = (userId.toString() === req.currentUser.id.toString());

    if (!userId) {
      res.status(500).send('userId undefined');
      return;
    }

    User.findOne({
      attributes: {
        exclude: ['password', 'salt'],
      },
      where: { id: userId },
    })
    .then((foundUser) => {
      if (foundUser) {
        res.status(200).send('user found!');
      }
    })
    .catch((err) => {
      throw new Error('Error finding user', err);
    });
  },

  // GET ALL USERS
  retrieveAll: (req, res) => {
    User.findAll({
      attributes: {
        exclude: ['password', 'salt'],
      },
    })
    .then(results => {
      if (!results || results.length < 1) {
        return this.sendError(res, 'No users');
      }
      return res.json(results);
    })
    .catch((err) => {
      throw new Error('An error occurred retrieving all users.', err);
    });
  },

  // UPDATE USER
  updateOne: (req, res) => {
    const query = { id: req.params.userid };

    const updatedProps = req.body;

    User.update(updatedProps, { where: query })
    .then((matchingUser) => {
      res.json(matchingUser);
    })
    .catch((err) => {
      throw new Error('An error occurred updating the user.', err);
    });
  },

  // DELETE USER
  deleteOne: (req) => {
    const query = { id: req.params.userid };

    User.destroy({ where: query })
    .catch((err) => {
      throw new Error('An error occurred deleting the user.', err);
    });
  },
};
