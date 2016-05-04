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
          res.json(foundOrCreatedMood);
        });
      });
    });
  }
};
