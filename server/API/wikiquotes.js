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


const redirectFailMessages = [
  'Page not found, please try again.1',
  'Page not found, please try again.2',
  'Page not found, please try again.3',
  'Page not found, please try again.4',
  'Page not found, please try again.5',
  'Page not found, please try again.6',
];


const getPageID = body => {
  let pageID;
  for (const key of Object.keys(body.query.pages)) {
    if (typeof Number(key) === 'number') {
      if (Number(key) === -1) {
        pageID = -1;
      } else {
        pageID = body.query.pages[key].pageid;
      }
    }
  }
  return pageID;
};

const redirectCheck = (body, pageID) => {
  if (pageID === -1) {
    return null;
  }
  let redirectKey = body.query.pages[pageID].revisions[0]['*'];
  const lowercaseRedirectCheck = (redirectKey.slice(0, 9)).toLowerCase();
  if (lowercaseRedirectCheck === '#redirect') {
    redirectKey = redirectKey.slice(12);
    redirectKey = redirectKey.replace(']]', '');
    return redirectKey;
  }
  return false;
};

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
  return { status: 'success', body: cleanData };
};

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

function getData(body, callback) {
  const pageID = getPageID(body);
  const redirect = redirectCheck(body, pageID);
  if (redirect === false) {
    return callback(parseData(body, pageID));
  }
  if (redirect === null) {
    return callback({ status: 'not found', body: redirectFailMessages });
  }
  return wikiQuoteCall(redirect, callback);
}

const frontEndCall = (req, res) => {
  const keyword = req.query.keyword;
  wikiQuoteCall(keyword, (response) => {
    // if(err){
    //   console.log(err);
    //   res.status(500).send(err);
    // } else {
    //   res.status(200).send(response.body);
    // }
    res.json(response.body);
  });
};

export default { getPageID, redirectCheck, wikiQuoteCall, frontEndCall };

// // TEST

// wikiQuoteCall('happy', (data) => {
//   console.log(data);
// });

