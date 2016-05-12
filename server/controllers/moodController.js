import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const mood = req.body;
    Mood.findOrCreate({ where: mood })
    .then(createdMood => {
      res.status(201).json(createdMood);
    });
  },
  saveUserMood: (req, res) => {
    const user = req.body.user;
    const mood = req.body.mood;

    User.findOne({ where: { username: user.username } })
    .then(foundUser => {
      Mood.findOrCreate({ where: mood })
      .spread(foundOrCreatedMood => {
        foundUser.addMood(foundOrCreatedMood)
        .then(() => {
          res.status(201).json(foundOrCreatedMood);
        });
      });
    });
  },
  getAll: (req, res) => {
    const user = req.body.user;

    User.findOne({
      where: { username: user.username },
    })
    .then(foundUser => foundUser.getMoods())
    .then(foundMoods => {
      res.json(foundMoods);
    });
  },
};
