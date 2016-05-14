import MusicVideo from '../models/musicVideoModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const musicVideo = req.body;
    MusicVideo.findOrCreate({ where: musicVideo })
    .then(() => {
      res.status(201).send({ status: 'SUCCESS', body: 'Successfully created music video.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create music video.' });
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
      res.status(500).send({ status: 'FAIL', body: 'Failed to find or create music video.' });
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
            'SUCCESS', body: 'Successfully saved user music video.' });
        })
        .catch(() => {
          res.status(500).send({ status: 'FAIL', body: 'Failed to find or create music video.' });
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
    .then(() => {
      res.status(200).send({ status: 'SUCCESS', body: 'Found user.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to get user music video.' });
    });
  },
  retrieveAll: (req, res) => {
    MusicVideo.findAll({})
    .then(() => {
      res.status(200).send({ status: 'SUCCESS', body: 'Successfully retrieved all music videos.' });
    })
    .catch(() => {
      res.status(500).send({ status: 'FAIL', body: 'Failed to retrieve all music videos.' });
    });
  },
};
