import chai from 'chai';
import Quote from '../../server/models/quoteModel';
import '../../server/index';

const expect = chai.expect;

describe('Quote model', () => {

  it('should create a new Quote', () => {
    let newQuote = Quote.create();
    expect(newQuote).to.be.instanceOf(Object);
  });

});