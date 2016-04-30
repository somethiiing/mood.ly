var request = require('request');

var getPageID = function (body) {
  var pageID;
  for(var key in body.query.pages) {
    if(typeof Number(key) === 'number'){
      pageID = body.query.pages[key].pageid;
    }
  }
  console.log(pageID);
  return pageID;
};

var redirectCheck = function (body, pageID) {
  var redirectKey = body.query.pages[pageID].revisions[0]['*'];
  var lowercaseRedirectCheck = (redirectKey.slice(0,9)).toLowerCase();
  if(lowercaseRedirectCheck === '#redirect'){
    redirectKey = redirectKey.slice(12);
    redirectKey = redirectKey.replace(']]', '');
    console.log(redirectKey);
    return redirectKey;
  } else {
    return false;
  }
}

var parseData = function (body, pageID) {
  var rawData = body.query.pages[pageID].revisions[0]['*'];
  var filteredData = [];
  var cleanData = [];
  rawData = rawData.split('\n');
  for(var i = 0; i<rawData.length; i++) {
    if(rawData[i].charAt(0) === '*' && rawData[i].charAt(1) !== '*') {
      filteredData.push(rawData[i]);
    }
  }
  for(var j = 0; j<filteredData.length; j++){
    for(var k = 0; k<filteredData[j].length; k++){
      if(filteredData[j].slice(k, k+4) === 'http' || filteredData[j].charAt(k) === '\'' || filteredData[j].slice(k, k+4) === '<br>'|| filteredData[j].slice(k, k+6) === '<br />' || filteredData[j].charAt(k) === '|') {
        filteredData[j] = "";
      }
      filteredData[j] = filteredData[j].replace('[[', '');
      filteredData[j] = filteredData[j].replace(']]', '');
      filteredData[j] = filteredData[j].replace('* ', '');
      filteredData[j] = filteredData[j].replace('*', '');
    }
  }
  for(var i = 0; i<filteredData.length; i++) {
    if (filteredData[i] !== "") {
      cleanData.push(filteredData[i]);
    } 
  }
  console.log(cleanData);
  return cleanData;
}

var functionChain = function (body) {
  var pageID = getPageID(body);
  var redirect = redirectCheck(body, pageID);
  if(redirect === false) {
    parseData(body, pageID);
  } else {
    wikiQuoteCall(redirect);
  }
}

var wikiQuoteCall = function (keyword) {
  var url = 'https://en.wikiquote.org/w/api.php?action=query&titles=' + keyword + '&prop=revisions&rvprop=content&format=json';
  request.get(url)
  .on('response', function(response) {
    var body = [];
    response.on('data', function(chunk) {
      body.push(chunk);
  }).on('end', function() {
      body = JSON.parse(Buffer.concat(body).toString());
      functionChain(body);
    });
  });
};



module.export = {
  wikiQuoteCall: wikiQuoteCall
};
