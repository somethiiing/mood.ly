import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    let mood = req.body;
    Mood.findOrCreate({where: mood})
    .then(createdMood => {
      res.status(201).json(createdMood);
    });
  },
  saveUserMood: (req, res) => {
    var user = req.body.user;
    var mood = req.body.mood;

    User.findOne({where: user})
    .then(foundUser => {
      Mood.findOrCreate({where: mood})
      .spread(foundOrCreatedMood => {
        foundUser.addMood(foundOrCreatedMood)
        .then(() => {
          res.status(201).json(foundOrCreatedMood);
        });
      });
    });
  },
  getAll: (req, res) => {
    var user = req.body.user;

    User.findOne({
      where: user
    })
    .then(foundUser => foundUser.getMoods())
    .then(foundMoods => {
      res.json(foundMoods);
    });
  }
};
