import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const mood = req.body;
    Mood.findOrCreate({ where: mood })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully saved mood to database.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to save mood to database.' });
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
          res.status(201).send({ status: 'SUCCESS',
            body: 'Successfully saved user mood to database.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Failed to save user mood to database.' });
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
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get all moods.' });
    });
  },
};
