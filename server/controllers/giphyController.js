import Giphy from '../models/giphyModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const giphy = req.body;
    Giphy.findOrCreate({ where: giphy })
    .then((createdGiphy) => {
      res.status(201).send({ status: 'SUCCESS', body: createdGiphy });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },
  getOne: (req, res) => {
    const id = +req.params.id;
    Giphy.findById(id)
    .then(foundGiphy => {
      const giphy = foundGiphy.url;
      res.status(200).send({ status: 'SUCCESS', body: `<img src="${giphy}" alt>` });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
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
        .then((savedGiphy) => {
          res.status(200).send({ status: 'SUCCESS',
            body: savedGiphy });
        })
        .catch((err) => {
          res.status(500).send({ status: 'FAIL', body: err });
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
    .then((userGiphy) => {
      res.status(200).send({ status: 'SUCCESS',
        body: userGiphy });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },
  retrieveAll: (req, res) => {
    Giphy.findAll({})
    .then((retrievedGiphys) => {
      res.status(200).send({ status: 'SUCCESS',
        body: retrievedGiphys });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },
};
