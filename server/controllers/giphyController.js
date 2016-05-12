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
  getOne: (req, res) => {
    const id = +req.params.id;
    Giphy.findById(id)
    .then(foundGiphy => {
      const giphy = foundGiphy.url;
      res.send(`<img src="${giphy}" alt>`);
    });
  },
  saveUserGiphy: (req, res) => {
    const user = req.body.user;
    const giphy = req.body.giphy;

    User.findOne({ where: { username: user.username } })
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
  getUserGiphys: (req, res) => {
    const user = req.body.user;
    User.findOne({
      where: { username: user.username },
    })
    .then(foundUser => foundUser.getGiphys())
    .then(foundGiphys => {
      res.json(foundGiphys);
    });
  },
  retrieveAll: (req, res) => {
    Giphy.findAll({})
    .then(foundGiphys => {
      res.json(foundGiphys);
    });
  },
};
