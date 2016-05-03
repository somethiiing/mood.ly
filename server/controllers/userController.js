import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    let user = req.body;
    User.findOrCreate({where: user})
    .then(createdUser => {
      res.status(201).json(createdUser);
    });
  }
};
