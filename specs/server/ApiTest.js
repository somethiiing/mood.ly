import chai from 'chai';
import wikiAPI from '../../server/API/wikiquotes.js';

const expect = chai.expect;

describe('Quotes API', () => {
  it('should get quotes for keywords that exist', (done) => {
    const keyword = 'happiness';
    wikiAPI.wikiQuoteCall(keyword, (data) => {
      if (data) {
        expect(Array.isArray(data.body)).to.equal(true);
        done();
      }
    });
  });

  it('should return one quote', (done) => {
    const keyword = 'happiness';
    wikiAPI.wikiQuoteCall(keyword, (data) => {
      if (data) {
        expect(typeof data.body[0]).to.equal('string');
        done();
      }
    });
  });

  it('should redirect to another page if redirect exists', (done) => {
    const keyword = 'happy';
    wikiAPI.wikiQuoteCall(keyword, (data) => {
      if (data) {
        expect(typeof data.body[0]).to.equal('string');
        done();
      }
    });
  });

  it('return something if page and redirect both do not', (done) => {
    const keyword = 'asdfafdsklj';
    wikiAPI.wikiQuoteCall(keyword, (data) => {
      if (data) {
        expect(data).to.equal('Page not found, please try again.');
        done();
      }
    });
  });
});
