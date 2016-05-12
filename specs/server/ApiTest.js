import chai from 'chai';
import { describe, it } from 'mocha';
import wikiAPI from '../../server/API/wikiquotes';
import musicAPI from '../../server/API/music';

const expect = chai.expect;

// WIKI API TESTS
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

// MUSIC/YOUTUBE API TESTS
describe('Music API', () => {
  it('should return a videoId for a YouTube video when given a keyword', (done) => {
    musicAPI.musicoveryCall('excitement', (resp) => {
      if (resp) {
        expect(resp.length).to.equal(11);
        done();
      }
    });
  });

  it('should return a concatenated string when the function is called', (done) => {
    const songObj = {
      title: 'California Love',
      artist: 'Tupac Shakur',
    };
    const resp = musicAPI.songConverter(songObj);
    expect(typeof resp).to.equal('string');
    done();
  });

  xit('should return a YouTube URL when invoked', (done) => {
    const testData = [
      {
        // ADD SOME SAMPLE DATA
      },
      {
        // ADD SOME SAMPLE DATA
      },
      {
        // ADD SOME SAMPLE DATA
      },
      {
        // ADD SOME SAMPLE DATA
      },
      {
        // ADD SOME SAMPLE DATA
      },
    ];
    musicAPI.getYouTubeLink(testData, (resp) => {
      expect(resp.length).to.equal(11);
      done();
    });
  });
});
