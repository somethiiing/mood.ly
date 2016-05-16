import Giphy from '../models/giphyModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const giphy = req.body;
    Giphy.findOrCreate({ where: giphy })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully saved giphy to database.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to save giphy to database.' });
    });
  },
  getOne: (req, res) => {
    const id = +req.params.id;
    Giphy.findById(id)
    .then(foundGiphy => {
      const giphy = foundGiphy.url;
      res.status(200).send({ status: 'SUCCESS', body: `<img src="${giphy}" alt>` });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get giphy.' });
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
          res.status(200).send({ status: 'SUCCESS',
            body: 'Successfully saved user giphy.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Failed to save user giphy.' });
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
    .then((userGiphys) => {
      res.status(200).send({ status: 'SUCCESS',
        body: userGiphys });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get user giphys.' });
    });
  },
  retrieveAll: (req, res) => {
    Giphy.findAll({})
    .then((retrievedGiphys) => {
      res.status(200).send({ status: 'SUCCESS',
        body: retrievedGiphys });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to retrieve all giphys.' });
    });
  },
};
