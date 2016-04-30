var expect = require('chai').expect;
var request = require('request');
var wikiAPI = require('../server/API/wikiquotes.js');

describe('Quotes API', function() {
  it('should get quotes for keywords that exist', function(done) {
    var keyword = "happiness";
    wikiAPI.wikiQuoteCall(keyword, function(data) {
      if(data) {
        expect(Array.isArray(data.body)).to.equal(true);
        done();
      }
    })
  });

  it('should return one quote', function(done) {
    var keyword = "happiness";
    wikiAPI.wikiQuoteCall(keyword, function(data) {
      if(data) {
        expect(typeof data.body[0]).to.equal('string');
        done();
      }
    })
  });

  it('should redirect to another page if redirect exists', function(done) {
    var keyword = "happy";
    wikiAPI.wikiQuoteCall(keyword, function(data) {
      if(data) {
        expect(typeof data.body[0]).to.equal('string');
        done();
      }
    })
  });

  it('return something if page and redirect both do not', function(done) {
    var keyword = "asdfafdsklj";
    wikiAPI.wikiQuoteCall(keyword, function(data) {
      if(data) {
        expect(data).to.equal("Page not found, please try again.");
        done();
      }
    })
  });

});
