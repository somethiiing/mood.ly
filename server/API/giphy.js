import request from 'request';
// var request = require('request');

const standardizeKeyword = keyword => {
  const keywordArr = keyword.split(' ');
  let result = keywordArr[0];
  if (keywordArr.length > 1) {
    for (let i = 1; i < keywordArr.length; i++) {
      result += `+${keywordArr[i]}`;
    }
  }
  return result;
};

const parseData = body => {
  const result = [];
  for (let i = 0; i < body.data.length; i++) {
    result.push(body.data[i].images.fixed_height.url);
  }
  return result;
};

const giphyCall = (keyword, callback) => {
  const url = `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=dc6zaTOxFJmzC`;
  request.get(url, (err, resp) => {
    const body = resp.body;
    if (err) {
      return callback(err);
    }
    return callback(parseData(JSON.parse(body)));
  });
};

const frontEndCall = (req, res) => {
  const keyword = standardizeKeyword(req.query.keyword);
  giphyCall(keyword, response => {
    res.json(response);
  });
};

// giphyCall('sad', parseData);

export default { giphyCall, frontEndCall };
