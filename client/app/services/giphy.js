import $ from 'jquery';

const giphyCall = (keyword, callback) => {
  $.get(`/giphyInfo?keyword=${keyword}`, data => {
    callback(data);
  });
};

export default giphyCall;
