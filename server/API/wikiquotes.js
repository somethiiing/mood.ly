import request from 'request';

// ////////////////// HELPER FUNCTIONS ////////////////////
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
// getData is the logic/order used to call the above functions

// wikiAPI returns an object, theres a key that is the pageID
// inside that key, there is a property called the pageID
// -1 means the page doesnt exist and redirect can't happen.
// another number means that the page exists, and has a possibility of redirect
// getPageID is ONLY responsible for returning the pageID

const emptyCheck = str => {
  let response = true;
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] !== ' ') {
      response = false;
    }
  }
  return response;
};

const getPageID = body => {
  let index;
  for (const key of Object.keys(body.query.pages)) {
    if (typeof Number(key) === 'number') {
      index = Number(key);
      break;
    }
  }
  if (index === -1) {
    return -1;
  }
  return body.query.pages[index].pageid;
};

// redirectCheck finds whether or not there is a redirect involved.
// wikipedia has automatic redirects such as "happy" to "Happiness"
// "-1" means the page does NOT exist and a redirect doesn't even happen
// example: if someone typed in "asdfadfsasf", page would return -1
// redirectCheck is responsible for setting one of the three "paths" it can go
// null, redirectKey, or false
const redirectCheck = (body, pageID) => {
  if (pageID === -1) {
    return null;
  }
  // because of the way the API returns the data
  // data formatting is inconsistent between the different pages
  // example: sometimes it's #redirect, #REDIRECT, or #Redirect
  // manual parsing to track is necessary
  let redirectKey = body.query.pages[pageID].revisions[0]['*'];
  const lowercaseRedirectCheck = (redirectKey.slice(0, 9)).toLowerCase();
  if (lowercaseRedirectCheck === '#redirect') {
    redirectKey = redirectKey.slice(12);
    redirectKey = redirectKey.replace(']]', '');
    return redirectKey;
  }
  return false;
};

// wikiAPI returns all data in a single string.
// manual parsing was done here to clean up the data
// steps:
// 1. split by <br>
// 2. quotes started with *, so kept all of those
// 3. removed special characters
// 4. deleted more special characters
// 5. filtered more data into cleanData array
// 6. return object, with success and body with clean data
const parseData = (body, pageID) => {
  let rawData = body.query.pages[pageID].revisions[0]['*'];
  const filteredData = [];
  const cleanData = [];
  rawData = rawData.split('\n');
  for (let i = 0; i < rawData.length; i++) {
    if (rawData[i].charAt(0) === '*' && rawData[i].charAt(1) !== '*') {
      filteredData.push(rawData[i]);
    }
  }
  for (let j = 0; j < filteredData.length; j++) {
    for (let k = 0; k < filteredData[j].length; k++) {
      if (filteredData[j].slice(k, k + 4) === 'http' || filteredData[j].charAt(k) === '\'' ||
      filteredData[j].slice(k, k + 4) === '<br>' || filteredData[j].slice(k, k + 6) === '<br />' ||
      filteredData[j].charAt(k) === '|') {
        filteredData[j] = '';
      }
      filteredData[j] = filteredData[j].replace('[[', '');
      filteredData[j] = filteredData[j].replace(']]', '');
      filteredData[j] = filteredData[j].replace('* ', '');
      filteredData[j] = filteredData[j].replace('*', '');
    }
  }
  for (let i = 0; i < filteredData.length; i++) {
    if (filteredData[i] !== '') {
      cleanData.push(filteredData[i]);
    }
  }
  return cleanData;
};

// RESTful API call, called asynchronously.
// data was processed using data stream because it wasn't parsable
// because of a large number of special characters
// asynchronous call after data stream calls getData (function chain logic)
// LINTER has "getData(body, callback)" because function is called before it's defined
// but since the function is called asynchronously and the hoisting of ES6
const wikiQuoteCall = (keyword, callback) => {
  const url = `https://en.wikiquote.org/w/api.php?action=query&titles=${keyword}&prop=revisions&rvprop=content&format=json`;
  request.get(url)
  .on('response', response => {
    let body = [];
    response.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      getData(body, callback);
    });
  });
};

// function was written in function declaration because of ES6 hoisting rules
// logic was refactored to simplify
// gets pageID -> checks redirectKey -> then proceeds in 1 of 3 paths
// 1. null: no path found, return one of the redirectFailMessages
// 2. redirectKey: recall wikiQuoteCall on the new redirectKey
// 3. false: no redirect necessary, proceed to parsing.
function getData(body, callback) {
  const pageID = getPageID(body);
  const redirect = redirectCheck(body, pageID);
  if (redirect === false) {
    const quotesArr = parseData(body, pageID);
    const randomIndex = Math.floor((Math.random() * quotesArr.length) + 1);
    return callback({ success: true, body: quotesArr[randomIndex] });
  }
  if (redirect === null) {
    return callback({ sucess: false, body: 'Unable to produce quote.' });
  }
  return wikiQuoteCall(redirect, callback);
}

// frontEndCall handles the AJAX call from the front end.
// modularized to be able to test better
const frontEndCall = (req, res) => {
  const keyword = req.query.keyword;
  if (emptyCheck(keyword) === false) {
    return wikiQuoteCall(keyword, (response) => {
      res.json(response);
    });
  }
  throw new Error('keyword is empty string');
};

export default { getPageID, redirectCheck, wikiQuoteCall, frontEndCall };

// // TEST

// wikiQuoteCall('happy', (data) => {
//   console.log(data);
// });

