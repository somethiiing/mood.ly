import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const mood = req.body;
    Mood.findOrCreate({ where: mood })
    .then((savedMood) => {
      res.status(201).send({ status: 'SUCCESS', body: savedMood });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
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
        .then((userMood) => {
          res.status(201).send({ status: 'SUCCESS', body: userMood });
        })
        .catch((err) => {
          res.status(500).send({ status: 'FAIL', body: err });
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
    .then((allMoods) => {
      res.status(201).send({ status: 'SUCCESS', body: allMoods });
    })
    .catch((err) => {
      res.status(500).send({ status: 'FAIL', body: err });
    });
  },
};
