import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const mood = req.body;
    Mood.findOrCreate({ where: mood })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully created mood.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create mood.' });
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
          res.status(201).send({ status: 'SUCCESS', body: 'Successfully saved user mood.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Failed to find or create user mood.' });
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
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully retrieved all moods.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get all moods.' });
    });
  },
};
