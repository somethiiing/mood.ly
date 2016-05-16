import Quote from '../models/quoteModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const quote = req.body;
    Quote.findOrCreate({ where: quote })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Succesfully saved user to database.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to save user to database.' });
    });
  },

  getOne: (req, res) => {
    const id = +req.params.id;
    Quote.findById(id)
    .then((quote) => {
      res.status(200).send({ status: 'SUCCESS', body: quote });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get quote.' });
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
          res.status(201).send({ status: 'SUCCESS', body: 'Successfully saved user quote.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Failed to save user quote.' });
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
    .then((userQuotes) => {
      res.status(200).send({ status: 'SUCCESS', body: userQuotes });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get user quotes.' });
    });
  },

  retrieveAll: (req, res) => {
    Quote.findAll({})
    .then((allQuotes) => {
      res.status(200).send({ status: 'SUCCESS', body: allQuotes });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to retrieve all user quotes.' });
    });
  },
};
