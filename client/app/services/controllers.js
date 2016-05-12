import $ from 'jquery';

// This file will send users' likes to the database
const likeQuote = (quote, user, callback) => {
  const quoteData = {
    user,
    quote,
  };
  console.log(quoteData);
  // $.post('/api/quotes', quoteData, data => {
  //   callback(data);
  // });
};

export default { likeQuote };
