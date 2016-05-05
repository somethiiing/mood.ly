import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    let user = req.body;
    User.findOrCreate({where: user})
    .then(() => {
      res.redirect(201, '/');
    });
    // .then(createdUser => {
    //   res.status(201).json(createdUser);
    // });
  },

  //SEND ERROR (403)
  sendError: (res, errorString) => {
    error = {
      success: false,
    };

    if (errorString) {
      error['error'] = errorString;
    }
    res.status(403).json(error);
  },

  //VERIFY LOGIN
  verifyLogin: (req, res) => {
    let userName = req.body.name;
    let password = req.body.password;

    User.findOne({where: { userName: userName }})
    .then((user) => {
      if (!user) {
        sendError(res, 'Invalid username or password');
      } else {
        user.comparePasswords(password, (compareResult) => {
          if (compareResult) {
            res.status(200);
          } else {
            sendError(res, 'Invalid username or password');
          }
        });
      }
    });
  },

  //GET A USER
  retrieveOne: (req, res) => {
    let userId = req.params.id;

    if (userId === 'me') {
      userId = req.currentUser.id;
    }

    let isMe = (userId.toString() === req.currentUser.id.toString());

    if (!userId) {
      res.status(500).send('userId undefined');
      return;
    }

    User.findOne({
      attributes: {
        exclude: ['password', 'salt']
      },
      where: {id: userId}
    })
    .then((foundUser) => {
      if (foundUser) {
        res.status(200).send('user found!');
      }
    })
    .catch((err) => {
      console.log('Error finding user', err);
    });
  },

  //GET ALL USERS
  retrieveAll: (req, res) => {
    User.findAll({
      attributes: {
        exclude: ['password', 'salt']
      }
    })
    .then((results) => {
      if (!results || results.length < 1) {
        return sendError(res, 'No users');
      }
      res.json(results);
    })
    .catch((err) => {
      console.log('An error occurred retrieving all users.', err);
      res.status(500).send(err);
    });
  },

  //UPDATE USER
  updateOne: (req, res) => {
    let query = {id: req.params.userid};

    var updatedProps = req.body;

    User.update(updatedProps, { where: query })
    .then((matchingUser) => {
      res.json(matchingUser);
    })
    .catch((err) => {
      console.log('An error occurred updating the user.', err);
      res.status(500).send(err);
    });
  },

  //DELETE USER
  deleteOne: (req, res) => {
    let query = {id: req.params.userid};

    User.destroy({ where: query })
    .catch((err) => {
      console.log('An error occurred deleting the user.', err);
      res.status(500).send(err);
    });
  }
};
