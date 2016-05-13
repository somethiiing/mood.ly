import MusicVideo from '../models/musicVideoModel';
import User from '../models/userModel';

export default {
  saveOne: (req, res) => {
    const musicVideo = req.body;
    MusicVideo.findOrCreate({ where: musicVideo })
    .then(createdMusicVideo => {
      res.status(201).json(createdMusicVideo);
    });
  },
  getOne: (req, res) => {
    const id = +req.params.id;
    MusicVideo.findById(id)
    .then(foundMusicVideo => {
      const musicVideo = foundMusicVideo.url;
      res.send(`<img src="${musicVideo}" alt>`);
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
          res.status(201).json(foundOrCreatedMusicVideo);
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
    .then(foundMusicVideos => {
      res.json(foundMusicVideos);
    });
  },
  retrieveAll: (req, res) => {
    MusicVideo.findAll({})
    .then(foundMusicVideos => {
      res.json(foundMusicVideos);
    });
  },
};
