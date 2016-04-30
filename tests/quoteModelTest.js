var expect = require('chai').expect;
var Quote = require('../server/models/quoteModel.js');
describe('Quote model', function() {

  it('should create a new Mood', function() {
    var newQuote = Quote.create();
    expect(newQuote).to.be.instanceOf(Object);
  });

});