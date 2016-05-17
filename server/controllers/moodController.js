import Mood from '../models/moodModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const mood = req.body;
    Mood.findOrCreate({ where: mood })
    .then(savedMood => {
      res.status(201).send({ success: true, body: savedMood });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
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
        .then(savedMood => {
          res.status(201).send({ success: true,
            body: savedMood });
        })
        .catch(err => {
          res.status(500).send({ success: false, body: err });
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
    .then(allMoods => {
      res.status(201).send({ success: true, body: allMoods });
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
  getUserMoodData: (req, res) => {
    // const user = req.body.user;
    const username = req.query.keyword;
    // let moodData = [];
    User.findOne({
      where: { username },
    })
    .then(foundUser => foundUser.getMoods())
    .then(allMoods => {
      // res.json(allMoods);
      const moodObj = {};
      const moodArr = [];
      for (let i = 0; i < allMoods.length; i++) {
        if (moodObj[allMoods[i].name] === undefined) {
          moodObj[allMoods[i].name] = { name: allMoods[i].name, count: 1 };
        } else {
          moodObj[allMoods[i].name].count++;
        }
      }
      for (const key of Object.keys(moodObj)) {
        moodArr.push(moodObj[key]);
      }
      res.json(moodArr);
    })
    .catch(err => {
      res.status(500).send({ success: false, body: err });
    });
  },
  getMoodData: (req, res) => {
    const moodData = [];
    // Mood.findAll({})
    Mood.aggregate('name', 'DISTINCT', { plain: false })
    .then(foundMoods => {
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
    })
    .catch(err => {
      // No moods are found in database
      res.json({ success: false, body: err });
    });
  },
};
