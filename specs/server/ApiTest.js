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
        expect(typeof data.body[0]).to.equal('string');
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
        expect(typeof data.body[0]).to.equal('string');
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
        expect(resp.videoID.length).to.equal(11);
        done();
      }
    });
  });

  it('should return a concatenated string when the function is called', (done) => {
    const songObj = {
      title: 'California Love',
      artist: 'Tupac Shakur',
    };
    const resp = musicAPI.titleConverter(songObj);
    expect(typeof resp).to.equal('string');
    done();
  });

  it('should return a YouTube URL when invoked', (done) => {
    const testData = [
      {
        id: '84910',
        title: 'Geezer\'s Need Excitement',
        subtitle: [],
        work: [],
        artist: [
          {
            mbid: '6f607087-9c46-4bb2-a884-e4efc764554c',
            name: 'The Streets',
          },
        ],
        releasedate: '2002-01-01',
        genre: 'hip hop',
        album: 'Original Pirate Material',
        version: [],
        match: '59',
      },
    ];
    musicAPI.getYouTubeLink('hip hop', testData, (resp) => {
      expect(resp.trackInfo).to.have.property('title');
      done();
    });
  });
});
