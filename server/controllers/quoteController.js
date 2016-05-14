import Quote from '../models/quoteModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const quote = req.body;
    Quote.findOrCreate({ where: quote })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully created quote.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create quote.' });
    });
  },

  getOne: (req, res) => {
    const id = +req.params.id;
    Quote.findById(id)
    .then(() => {
      res.status(200).send({ status: 'SUCCESS', body: 'Found quote.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find quote.' });
    });
  },

  saveUserQuote: (req, res) => {
    const user = req.body.user;
    const quote = req.body.quote;
    User.findOne({ where: { username: user.username } })
    .then(foundUser => {
      Quote.findOrCreate({ where: quote })
      .spread(foundOrCreatedQuote => {
        foundUser.addQuote(foundOrCreatedQuote)
        .then(() => {
          res.status(201).send({ status: 'SUCCESS', body: 'Successfully saved quote.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Did not save quote.' });
        });
      });
    });
  },

  getUserQuotes: (req, res) => {
    // const user = req.body.user;
    const username = req.query.keyword;
    User.findOne({
      where: { username },
    })
    .then(foundUser => foundUser.getQuotes())
    .then(() => {
      res.status(200).send({ status: 'SUCCESS', body: 'Found user quote.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find user quote.' });
    });
  },

  retrieveAll: (req, res) => {
    Quote.findAll({})
    .then(() => {
      res.status(200).send({ status: 'SUCCESS', body: 'Found all quotes in database.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find all quotes.' });
    });
  },
};
