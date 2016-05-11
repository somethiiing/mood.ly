// import request from 'request';
var request = require('request');

var parseData = (data) => {
  var result = [];

  for (var i = 0; i < data.length; i++) {
    result.push({
      title: data[i].title,
      artist: data[i].artist[0].name,
    });
  }
  console.log(result);
};

var musicoveryCall = (keyword, callback) => {
  var url = `http://musicovery.com/api/V3/search.php?fct=search&q=${keyword}&location=false&format=json`;
  request.get(url)
  .on('response', response => {
    var body = [];
    response.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      // console.log('body ', body.root.tracks.track[0].artist[0].name);
      parseData(body.root.tracks.track);
    });
  });
};

musicoveryCall('happy');

// export default musicoveryCall;