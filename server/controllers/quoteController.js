import Quote from '../models/quoteModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    let quote = req.body;
    Quote.findOrCreate({where: quote})
    .then(createdQuote => {
      res.status(201).json(createdQuote);
    });
  },
  saveUserQuote: (req, res) => {
    var user = req.body.user;
    var quote = req.body.quote;

    User.findOne({where: user})
    .then(foundUser => {
      Quote.findOrCreate({where: quote})
      .spread(foundOrCreatedQuote => {
        foundUser.addQuote(foundOrCreatedQuote)
        .then(() => {
          res.json(foundOrCreatedQuote);
        });
      });
    });
  }
};