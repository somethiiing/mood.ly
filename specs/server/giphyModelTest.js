import chai from 'chai';
import Giphy from '../../server/models/giphyModel';
import '../../server/index';

const expect = chai.expect;

describe('Giphy model', () => {

  it('should create a new Giphy', () => {
    let newGiphy = Giphy.create();
    expect(newQuote).to.be.instanceOf(Object);
  });

});