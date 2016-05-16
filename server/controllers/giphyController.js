import Giphy from '../models/giphyModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const giphy = req.body;
    Giphy.findOrCreate({ where: giphy })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully found or created giphy.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create giphy.' });
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
      res.status(500).send({ status: 'FAIL', body: 'Failed to retrieve giphy.' });
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
            body: 'Successfully found or created user giphy.' });
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
    .then(() => {
      res.status(200).send({ status: 'SUCCESS',
        body: 'Successfully found user giphys.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create user giphy.' });
    });
  },
  retrieveAll: (req, res) => {
    Giphy.findAll({})
    .then(() => {
      res.status(200).send({ status: 'SUCCESS',
        body: 'Successfully retrieved user giphys.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find user giphy.' });
    });
  },
};
