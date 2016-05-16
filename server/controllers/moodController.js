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
  getMoodData: (req, res) => {
    let moodData = [];
    // Mood.findAll({})
    Mood.aggregate('name', 'DISTINCT', { plain: false })
    .then(foundMoods => {
      console.log(foundMoods);
      let itemsProcessed = 0;
      foundMoods.forEach((mood, index, array) => {
        Mood.count({ where: { name: mood.DISTINCT } })
        .then(count => {
          itemsProcessed++;
          moodData.push({ name: mood.DISTINCT, count });
          if (itemsProcessed === array.length) {
            res.json(moodData);
          }
        });
      });
      // console.log(data);
      // return data;
      // return foundMoods.map((mood) => {
      //   return Mood.count({ where: { name: mood.name } })
      //   .then(count => {
      //     console.log({ name: mood.name, count });
      //     return { name: mood.name, count };
      //   });
      // });
    });
    // .then(result => {
    //   res.json(result);
    // });
  },
};
