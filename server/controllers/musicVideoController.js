import MusicVideo from '../models/musicVideoModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const musicVideo = req.body;
    MusicVideo.findOrCreate({ where: musicVideo })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS',
        body: 'Successfully saved music video to database.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to save music video to database.' });
    });
  },

  getOne: (req, res) => {
    const id = +req.params.id;
    MusicVideo.findById(id)
    .then(foundMusicVideo => {
      const musicVideo = foundMusicVideo.url;
      res.status(200).send({ status: 'SUCCESS', body: `<img src="${musicVideo}" alt>` });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get music video.' });
    });
  },
  saveUserMusicVideo: (req, res) => {
    const user = req.body.user;
    const musicVideo = req.body.musicVideo;

    User.findOne({ where: { username: user.username } })
    .then(foundUser => {
      MusicVideo.findOrCreate({ where: musicVideo })
      .spread(foundOrCreatedMusicVideo => {
        foundUser.addMusicVideo(foundOrCreatedMusicVideo)
        .then(() => {
          res.status(201).send({ status:
            'SUCCESS', body: 'Successfully saved user music video to database.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL',
            body: 'Failed to save user music video to database.' });
        });
      });
    });
  },
  getUserMusicVideos: (req, res) => {
    const username = req.query.keyword;
    User.findOne({
      where: { username },
    })
    .then(foundUser => foundUser.getMusicVideos())
    .then((userMusicVideos) => {
      res.status(200).send({ status: 'SUCCESS', body: userMusicVideos });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get user music videos.' });
    });
  },
  retrieveAll: (req, res) => {
    MusicVideo.findAll({})
    .then((allMusicVideos) => {
      res.status(200).send({ status: 'SUCCESS', body: allMusicVideos });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL',
        body: 'Failed to retrieve all music videos.' });
    });
  },
};
