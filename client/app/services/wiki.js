import $ from 'jquery';

const wikiQuoteCall = (keyword, callback) => {
  $.get(`/wikiInfo?keyword=${keyword}`, data => {
    callback(data);
  });
};

export default wikiQuoteCall;
