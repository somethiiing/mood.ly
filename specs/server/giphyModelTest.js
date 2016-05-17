import chai from 'chai';
import { describe, it } from 'mocha';
import Giphy from '../../server/models/giphyModel';
import '../../server/index';

const expect = chai.expect;

describe('Giphy model', () => {
  it('should create a new Giphy', (done) => {
    const newGiphy = Giphy.create();
    expect(newGiphy).to.be.instanceOf(Object);
    done();
  });
});
