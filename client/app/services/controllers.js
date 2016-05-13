import $ from 'jquery';

// This file will send users' likes to the database
const likeQuote = (quote, user, callback) => {
  const quoteData = {
    user,
    quote: { text: quote },
  };

  // TODO: refactor to using req.query instead of req.body?
  $.ajax({
    url: '/api/quotes',
    type: 'POST',
    data: JSON.stringify(quoteData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      console.log('SUCCESS: ', quoteData);
    },
  });
};

const likeGiphy = (giphy, user, callback) => {
  const giphyData = {
    user,
    giphy: { url: giphy },
  };

  // TODO: refactor to using req.query instead of req.body?
  $.ajax({
    url: '/api/giphys',
    type: 'POST',
    data: JSON.stringify(giphyData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      console.log('SUCCESS: ', giphyData);
    },
  });
};

const likeMusic = (videoId, user, callback) => {
  const musicData = {
    user,
    musicVideo: { videoId },
  };

  // TODO: refactor to using req.query instead of req.body?
  $.ajax({
    url: '/api/music',
    type: 'POST',
    data: JSON.stringify(musicData),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: () => {
      console.log('SUCCESS: ', musicData);
    },
  });
};

export default {
  likeQuote,
  likeGiphy,
  likeMusic,
};
