import Giphy from '../models/giphyModel';
import User from '../models/userModel';
import template from '../views/default';
import giphyShareHandler from '../routes/giphyShareHandler';

export default {
  saveOne: (req, res) => {
    const giphy = req.body;
    Giphy.findOrCreate({ where: giphy })
    .then(savedGiphy => {
      res.status(201).send({ success: true, body: savedGiphy });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
  getOne: (req, res) => {
    const id = +req.params.id;
    Giphy.findById(id)
    .then(foundGiphy => {
      // res.status(200).send({ success: true, body: foundGiphy });
      res.status(200).send(template(giphyShareHandler(foundGiphy.url)));
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
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
        .then(userGiphy => {
          res.status(200).send({ success: true,
            body: userGiphy });
        })
        .catch(err => {
          res.status(500).send({ success: false, body: err });
        });
      });
    });
  },
  getUserGiphys: (req, res) => {
    const username = req.query.keyword;
    User.findOne({
      where: { username },
    })
    .then(foundUser => foundUser.getGiphys())
    .then(userGiphys => {
      res.status(200).send({ success: true,
        body: userGiphys });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
  retrieveAll: (req, res) => {
    Giphy.findAll({})
    .then(retrievedGiphys => {
      res.status(200).send({ success: true,
        body: retrievedGiphys });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
};
