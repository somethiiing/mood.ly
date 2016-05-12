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

export default { likeQuote };
