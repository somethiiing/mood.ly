// import request from 'request';
// import key from '../config/authConfig';


// FOR TESTING WITH NODE, can't use import
const request = require('request');
const key = require('youtubeconfig');

const parseData = (data) => {
  const result = [];

  for (let i = 0; i < data.length; i++) {
    result.push({
      title: data[i].title,
      artist: data[i].artist[0].name,
    });
  }
  // console.log(result);
  return result;
};

const songConverter = (songObj) => {
  const songTitle = songObj.title.split(' ');
  const songArtist = songObj.artist.split(' ');
  const song = songTitle.concat(songArtist);
  let result = song[0];

  for (let i = 1; i < song.length; i++) {
    result += `+ ${song[i]}`;
  }
  return result;
};

const searchYouTube = (song, callback) => {
  const youtubeURL = `
  https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${song}&type=video&videoEmbeddable=true&vq=hd1080&key=${key.YOUTUBE_API_KEY}`;

  request.get(youtubeURL)
    .on('response', response => {
      let body = [];
      response.on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        const youtubeArr = body.items;
        const randInd = Math.floor(Math.random() * youtubeArr.length);
        callback(youtubeArr[randInd].id.videoId);
      });
    });
};

const getYouTubeLink = (data, callback) => {
  const songArr = parseData(data);
  const randInd = Math.floor(Math.random() * songArr.length);
  const randSong = songConverter(songArr[randInd]);

  searchYouTube(randSong, callback);
};

const musicoveryCall = (keyword, callback) => {
  const url = `http://musicovery.com/api/V3/search.php?fct=search&q=${keyword}&location=false&format=json`;
  request.get(url)
  .on('response', response => {
    let body = [];
    response.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      // console.log('body ', body.root.tracks.track[0].artist[0].name);
      getYouTubeLink(body.root.tracks.track, callback);
    });
  });
};

const frontEndCall = (req, res) => {
  const keyword = req.query.keyword;
  musicoveryCall(keyword, (resp) => {
    res.json(resp);
  });
};

// TEST
// musicoveryCall('happy', (data) => {
//   console.log(data);
// });

export default { parseData, songConverter,
  searchYouTube, getYouTubeLink,
  musicoveryCall, frontEndCall };
