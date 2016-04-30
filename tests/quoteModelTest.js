var expect = require('chai').expect;
var Quote = require('../server/models/quoteModel.js');

require(__dirname + '/../server/index.js');

describe('Quote model', function() {

  it('should create a new Quote', function() {
    var newQuote = Quote.create();
    expect(newQuote).to.be.instanceOf(Object);
  });

});