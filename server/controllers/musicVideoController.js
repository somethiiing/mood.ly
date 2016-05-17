import MusicVideo from '../models/musicVideoModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const musicVideo = req.body;
    MusicVideo.findOrCreate({ where: musicVideo })
    .then((savedMusicVideo) => {
      res.status(201).send({ success: true,
        body: savedMusicVideo });
    })
    .catch((err) => {
      res.status(500).send({ success: false, body: err });
    });
  },

  getOne: (req, res) => {
    const id = +req.params.id;
    MusicVideo.findById(id)
    .then(foundMusicVideo => {
      const musicVideo = foundMusicVideo.url;
      res.status(200).send({ success: true, body: `<img src="${musicVideo}" alt>` });
    })
    .catch((err) => {
      res.status(500).send({ success: false, body: err });
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
        .then((savedUserMusicVideo) => {
          res.status(201).send({ success: true, body: savedUserMusicVideo });
        })
        .catch((err) => {
          res.status(500).send({ success: false,
            body: err });
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
      res.status(200).send({ success: true, body: userMusicVideos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, body: err });
    });
  },
  retrieveAll: (req, res) => {
    MusicVideo.findAll({})
    .then((allMusicVideos) => {
      res.status(200).send({ success: true, body: allMusicVideos });
    })
    .catch((err) => {
      res.status(500).send({ success: false,
        body: err });
    });
  },
};
