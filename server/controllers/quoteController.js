import Quote from '../models/quoteModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const quote = req.body;
    Quote.findOrCreate({ where: quote })
    .then(savedQuote => {
      res.status(201).send({ success: true, body: savedQuote });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },

  getOne: (req, res) => {
    const id = +req.params.id;
    Quote.findById(id)
    .then(quote => {
      res.status(200).send({ success: true, body: quote });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
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
        .then(savedUserQuote => {
          res.status(201).send({ success: true, body: savedUserQuote });
        })
        .catch(err => {
          res.status(500).send({ success: false, body: err });
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
    .then(userQuotes => {
      res.status(200).send({ success: true, body: userQuotes });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },

  retrieveAll: (req, res) => {
    Quote.findAll({})
    .then(allQuotes => {
      res.status(200).send({ success: true, body: allQuotes });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
};
