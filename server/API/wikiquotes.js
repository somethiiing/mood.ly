var request = require('request');


//////////////////// HELPER FUNCTIONS ////////////////////
// Modularized Functions to improve clarity on what is happening
// getPageID is called through the wikiQuoteAPI to retrive the page ID.
  // Because of how the structure of how the returned data body, retriving pageID is needed
  // also checks whether or not the page exists
// redirectCheck is used when wikiQuoteCall is used
  // if the keyword typed would redirect (e.g. from "happy" to "Happiness")
  // would check whether to return the redirectKey or "false"
  // also parses the data retrived from the API
// parseData parses the retrived wikiquote data.
  // data retrived is within a number of nested objects/arrays and is retrived in one long string
// functionChain is the logic/order used to call the above functions

var getPageID = function (body) {
  var pageID;
  for(var key in body.query.pages) {
    if(typeof Number(key) === 'number'){
      if(Number(key) === -1 ) {
        pageID = -1;
      } else {
        pageID = body.query.pages[key].pageid;
      }
    }
  }
  return pageID;
};

var redirectCheck = function (body, pageID) {
  if(pageID === -1) {
    return null;
  } else {
    var redirectKey = body.query.pages[pageID].revisions[0]['*'];
    var lowercaseRedirectCheck = (redirectKey.slice(0,9)).toLowerCase();
    if(lowercaseRedirectCheck === '#redirect'){
      redirectKey = redirectKey.slice(12);
      redirectKey = redirectKey.replace(']]', '');
      return redirectKey;
    } else {
      return false;
    }
  }
};

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
  return {status: "success", body: cleanData};
};

var functionChain = function (body, callback) {
  var pageID = getPageID(body);
  var redirect = redirectCheck(body, pageID);
  if(redirect === false) {
    callback(parseData(body, pageID));
  } 
  else if (redirect === null) {
    callback("Page not found, please try again.")
  } 
  else {
    wikiQuoteCall(redirect, callback);
  }
}

var wikiQuoteCall = function (keyword, callback) {
  var url = 'https://en.wikiquote.org/w/api.php?action=query&titles=' + keyword + '&prop=revisions&rvprop=content&format=json';
  request.get(url)
  .on('response', function(response) {
    var body = [];
    response.on('data', function(chunk) {
      body.push(chunk);
  }).on('end', function() {
      body = JSON.parse(Buffer.concat(body).toString());
      functionChain(body, callback);
    });
  });
};

var frontEndCall = function (req, res) {
  var keyword = req.query.keyword;
  wikiQuoteCall(keyword, function (response) {
    // if(err){
    //   console.log(err);
    //   res.status(500).send(err);
    // } else {
    //   res.status(200).send(response.body);
    // }
    res.json(response.body);
  })
};

module.exports = {
  getPageID: getPageID,
  redirectCheck: redirectCheck,
  wikiQuoteCall: wikiQuoteCall,
  frontEndCall: frontEndCall  
};
