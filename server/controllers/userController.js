import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const user = req.body;
    User.findOrCreate({ where: user })
    .then(() => {
      res.send({ status: 'SUCCESS', body: user });
    })
    .catch(err => {
      res.send({ status: 'FAIL', body: err });
    });
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
    const userName = req.body.username;
    const password = req.body.password;

    User.findOne({ where: { userName } })
    .then(user => {
      if (!user) {
        res.send({ status: 'FAIL', body: 'Invalid username or password' });
      } else {
        user.comparePasswords(user, password, (compareResult) => {
          if (compareResult) {
            res.status(200).send({ status: 'SUCCESS', body: user });
          } else {
            res.status(500).send({ status: 'FAIL', body: 'Invalid username or password.' });
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

    if (!userId) {
      res.status(500).send({ status: 'FAIL', body: 'userId is undefined.' });
      return;
    }

    User.findOne({
      attributes: {
        exclude: ['password', 'salt'],
      },
      where: { id: userId },
    })
    .then(foundUser => {
      if (foundUser) {
        res.status(200).send({ status: 'SUCCESS', body: foundUser });
      }
    })
    .catch(err => {
      res.status(500).send({ status: 'FAIL', body: err });
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
        res.status(500).send({ status: 'FAIL', body: 'No users.' });
      }
      return res.json(results);
    })
    .catch(err => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },

  // UPDATE USER
  updateOne: (req, res) => {
    const query = { id: req.params.userid };

    const updatedProps = req.body;

    User.update(updatedProps, { where: query })
    .then(matchingUser => {
      res.json(matchingUser);
    })
    .catch(err => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },

  // DELETE USER
  deleteOne: (req, res) => {
    const query = { id: req.params.userid };

    User.destroy({ where: query })
    .catch(err => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },
};
