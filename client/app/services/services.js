import $ from 'jquery';

const wikiCall = (keyword, callback) => {
  $.get(`/wikiInfo?keyword=${keyword}`, data => {
    callback(data);
  });
};

const giphyCall = (keyword, callback) => {
  $.get(`/giphyInfo?keyword=${keyword}`, data => {
    callback(data);
  });
};

export default { wikiCall, giphyCall };
