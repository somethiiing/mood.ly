import request from 'request';
import key from '../config/authConfig';

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

const titleConverter = (songObj) => {
  const songTitle = songObj.title.split(' ');
  const songArtist = songObj.artist.split(' ');
  const song = songTitle.concat(songArtist);
  let result = song[0];

  for (let i = 1; i < song.length; i++) {
    result += `+ ${song[i]}`;
  }
  return result;
};

const searchYouTube = (song, trackInfo, callback) => {
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
        if (body.pageInfo.totalResults === 0) {
          callback({ status: 'FAIL', trackInfo, body: 'No videos found' });
        }
        const youtubeArr = body.items;
        const randInd = Math.floor(Math.random() * youtubeArr.length);
        callback({ status: 'SUCCESS', trackInfo, videoID: youtubeArr[randInd].id.videoId });
      });
    });
};

const getYouTubeLink = (keyword, data, callback) => {
  if (data === undefined) {
    const keywordArr = keyword.split(' ');
    let song = keyword[0];
    for (let i = 1; i < keywordArr.length; i++) {
      song += `+ ${keywordArr[i]}`;
    }
    return searchYouTube(song, keyword, callback);
  }
  const songArr = parseData(data);
  const randInd = Math.floor(Math.random() * songArr.length);
  const song = songArr[randInd];
  return searchYouTube(titleConverter(song), song, callback);
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
      getYouTubeLink(keyword, body.root.tracks.track, callback);
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
// musicoveryCall('fantastic', (data) => {
//   console.log(data);
// });

export default { parseData, titleConverter,
  searchYouTube, getYouTubeLink,
  musicoveryCall, frontEndCall };
