import $ from 'jquery';

let wikiQuoteCall = function (keyword, callback) {
  $.get('/wikiInfo?keyword=' + keyword, function(data) {
    callback(data);
  });
}


export default wikiQuoteCall