// // import request from 'request';
var request = require('request');

// var getData = (req, res) => {
//   var keyword = req.query.keyword;
// };

// var giphyCall = (keyword, callback) => {
//   var url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC`;
//   request.get(url, (err, response) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(JSON.parse(response.body.data));
//     }
//   });
// };

// var parseData = body => {
//   var pluckedURLS = [];
//   for (var i = 0; i < body.length; i++) {
//     console.log(body[i]);
//     pluckedURLS.push(body[i].url);
//   }
//   console.log(pluckedURLS);
// };


// giphyCall('sad', parseData);

var keywordValidityCheck = function (keyword) {
  keywordArr = keyword.split(' ');
  var result = keywordArr[0];
  if(keywordArr.length > 1) {
    for(var i = 1; i<keywordArr.length; i++){
      result += "+" + keywordArr[i];
    }
  }
  return result;
};

var giphyCall = function (keyword, callback) {
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + keyword + '&api_key=dc6zaTOxFJmzC';
  request.get(url, function (err, resp) {
    if(err) {
      callback(err);
    } else {
      callback(JSON.parse(resp.body));
    }
  });
};

var parseData = function (body) {
  var result = [];
  for(var i = 0; i<body.data.length; i++) {
    result.push(body.data[0].images.fixed_height.url);
  }
  return result;
};

giphyCall('sad', parseData);