import Giphy from '../models/giphyModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const giphy = req.body;
    Giphy.findOrCreate({ where: giphy })
    .then(createdGiphy => {
      res.status(201).json(createdGiphy);
    });
  },
  saveUserGiphy: (req, res) => {
    const user = req.body.user;
    const giphy = req.body.giphy;

    User.findOne({ where: { name: user.name } })
    .then(foundUser => {
      Giphy.findOrCreate({ where: giphy })
      .spread(foundOrCreatedGiphy => {
        foundUser.addGiphy(foundOrCreatedGiphy)
        .then(() => {
          res.status(201).json(foundOrCreatedGiphy);
        });
      });
    });
  },
  getAll: (req, res) => {
    const user = req.body.user;

    User.findOne({
      where: { name: user.name },
    })
    .then(foundUser => foundUser.getGiphys())
    .then(foundGiphys => {
      res.json(foundGiphys);
    });
  },
};
