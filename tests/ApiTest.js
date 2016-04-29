var expect = require('chai').expect;
var request = require('request');

describe('Quotes API', function() {
 it('should get quotes', function(done) {
   request.get('https://en.wikiquote.org/w/api.php?action=query&titles=happiness&prop=revisions&rvprop=content&format=json')
   .on('response', function(response) {
     // console.log(response);
     var body = [];
     response.on('data', function(chunk) {
       body.push(chunk);
     }).on('end', function() {
       body = JSON.parse(Buffer.concat(body).toString());
       console.log(body.query.pages['126432'].revisions[0]['*']);
       expect(response.statusCode).to.equal(200);
       done();
     });
   });
 });

    request.get('https://en.wikiquote.org/w/api.php?action=query&titles=happiness&prop=revisions&rvprop=content&format=json')
    .on('response', function(response) {
      var body = [];
      response.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        body = JSON.parse(Buffer.concat(body).toString());
        // console.log(body.query.pages['126432'].revisions[0]['*']);
        testData = body.query.pages['126432'].revisions[0]['*'];
        var splitData = testData.split('\n');
        var filtData = [];
        var cleanData = [];
        for(var i = 0; i<splitData.length; i++) {
          if(splitData[i].charAt(0) === '*' && splitData[i].charAt(1) !== '*'){
            filtData.push(splitData[i]);
          }
        }
        for(var j = 0; j<filtData.length; j++){
          for(var k = 0; k<filtData[j].length; k++){
            if(filtData[j].slice(k, k+4) === 'http' || filtData[j].charAt(k) === '\'' || filtData[j].slice(k, k+4) === '<br>' || filtData[j].charAt(k) === '|') {
              filtData[j] = "";
            }
            filtData[j] = filtData[j].replace('[[', '');
            filtData[j] = filtData[j].replace(']]', '');
            filtData[j] = filtData[j].replace('* ', '');
            filtData[j] = filtData[j].replace('*', '');
          }
        }
        for(var i = 0; i<filtData.length; i++){
          if (filtData[i] !== "") {
            cleanData.push(filtData[i]);
          }
        }
        // console.log(cleanData);
        expect(response.statusCode).to.equal(200);
        expect(Array.isArray(cleanData)).to.equal(true);
        done(); 
      });
    });

  
  });

  it('should get one quote', function(done) {
    request.get('https://en.wikiquote.org/w/api.php?action=query&titles=happiness&prop=revisions&rvprop=content&format=json')
    .on('response', function(response) {
      var body = [];
      response.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        body = JSON.parse(Buffer.concat(body).toString());
        // console.log(body.query.pages['126432'].revisions[0]['*']);
        testData = body.query.pages['126432'].revisions[0]['*'];
        var splitData = testData.split('\n');
        var filtData = [];
        var cleanData = [];
        for(var i = 0; i<splitData.length; i++) {
          if(splitData[i].charAt(0) === '*' && splitData[i].charAt(1) !== '*'){
            filtData.push(splitData[i]);
          }
        }
        for(var j = 0; j<filtData.length; j++){
          for(var k = 0; k<filtData[j].length; k++){
            if(filtData[j].slice(k, k+4) === 'http' || filtData[j].charAt(k) === '\'' || filtData[j].slice(k, k+4) === '<br>' || filtData[j].charAt(k) === '|') {
              filtData[j] = "";
            }
            filtData[j] = filtData[j].replace('[[', '');
            filtData[j] = filtData[j].replace(']]', '');
            filtData[j] = filtData[j].replace('* ', '');
            filtData[j] = filtData[j].replace('*', '');
          }
        }
        for(var i = 0; i<filtData.length; i++){
          if (filtData[i] !== "") {
            cleanData.push(filtData[i]);
          }
        }
        expect(response.statusCode).to.equal(200);
        var randomIndex = Math.floor(Math.random() * cleanData.length);
        // console.log(cleanData[randomIndex]);
        expect(typeof cleanData[randomIndex]).to.equal('string');
        done(); 
      });
    });
  });

  it('should redirect to another page if redirect exists', function(done) {
    done();
  });

});
