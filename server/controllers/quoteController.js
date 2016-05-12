import Quote from '../models/quoteModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const quote = req.body;
    Quote.findOrCreate({ where: quote })
    .then(createdQuote => {
      res.status(201).json(createdQuote);
    });
  },
  getOne: (req, res) => {
    const id = +req.params.id;
    Quote.findById(id)
    .then(foundQuote => {
      res.json(foundQuote.text);
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
          res.status(201).json(foundOrCreatedQuote);
        });
      });
    });
  },
  getUserQuotes: (req, res) => {
    const user = req.body.user;
    User.findOne({
      where: { username: user.username },
    })
    .then(foundUser => foundUser.getQuotes())
    .then(foundQuotes => {
      res.json(foundQuotes);
    });
  },
  retrieveAll: (req, res) => {
    Quote.findAll({})
    .then(foundQuotes => {
      res.json(foundQuotes);
    });
  },
};
