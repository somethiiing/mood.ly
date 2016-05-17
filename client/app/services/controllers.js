import $ from 'jquery';

const addUserMood = (mood, user, callback) => {
  const moodData = {
    user,
    mood: {
      name: mood,
      timedate: new Date(),
    },
  };
  $.ajax({
    url: '/api/moods',
    type: 'POST',
    data: JSON.stringify(moodData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      callback({ status: 'SUCCESS' });
    },
  });
};

// This file will send users' likes to the database
const likeQuote = (quote, user, callback) => {
  const quoteData = {
    user,
    quote,
  };

  // TODO: refactor to using req.query instead of req.body?
  $.ajax({
    url: '/api/quotes',
    type: 'POST',
    data: JSON.stringify(quoteData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: (data) => {
      callback({ status: 'SUCCESS', body: data });
    },
  });
};

const likeGiphy = (giphy, user, callback) => {
  const giphyData = {
    user,
    giphy,
  };

  // TODO: refactor to using req.query instead of req.body?
  $.ajax({
    url: '/api/giphys',
    type: 'POST',
    data: JSON.stringify(giphyData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      callback({ status: 'SUCCESS' });
    },
  });
};

const likeMusic = (musicVideo, user, callback) => {
  const musicData = {
    user,
    musicVideo,
  };

  $.ajax({
    url: '/api/music',
    type: 'POST',
    data: JSON.stringify(musicData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      callback({ status: 'SUCCESS' });
    },
  });
};

const getAllUserData = (endpoint, username, callback) => {
  $.get(`api/user/${endpoint}?keyword=${username}`, data => {
    callback(data);
  });
};

const getMoodData = (callback) => {
  $.get('/api/moods', data => {
    callback(data);
  });
};

// const getUserMoodData = (username, callback) => {
//   $.get(`api/user/moods?keyword=${username}`, data => {
//     callback(data);
//   });
// };

export default {
  addUserMood,
  likeQuote,
  likeGiphy,
  likeMusic,
  getAllUserData,
  getMoodData,
  // getUserMoodData,
};
