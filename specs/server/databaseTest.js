import chai from 'chai';
import { describe, it } from 'mocha';
import User from '../../server/models/userModel';
import Mood from '../../server/models/moodModel';
import Quote from '../../server/models/quoteModel';
import MusicVideo from '../../server/models/musicVideoModel';
import request from 'request';

const expect = chai.expect;

describe('Database', () => {
  // CREATE TEST DATABASE OF USERS
  const users = [
    {
      name: 'Toby',
      email: 'toby@toby.com',
      username: 'Toby',
      password: '1234',
    },
    {
      name: 'Stephanie',
      email: 'stephanie@stephanie.com',
      username: 'Stephanie',
      password: '4321',
    },
    {
      name: 'Rob',
      email: 'rob@rob.com',
      username: 'Rob',
      password: '7890',
    },
    {
      name: 'Tiffany',
      email: 'tiffany@tiffany.com',
      username: 'Tiffany',
      password: '0987',
    },
    {
      name: 'Bubba',
      email: 'bubba@bubba.com',
      username: 'Bubba',
      password: '4567',
    },
  ];

  // CREATE TEST DATABASE OF MOODS
  const moods = [
    {
      name: 'happy',
      timedate: new Date(),
    },
    {
      name: 'sad',
      timedate: new Date(),
    },
    {
      name: 'excited',
      timedate: new Date(),
    },
    {
      name: 'calm',
      timedate: new Date(),
    },
  ];

  // CREATE TEST DATABASE OF QUOTES
  const quotes = [
    {
      text: 'wassup',
      mood: 'happy',
    },
    {
      text: 'blahblahblah',
      mood: 'sad',
    },
    {
      text: 'this is so cool',
      mood: 'excited',
    },
  ];

  // CREATE TEST DATABASE OF MUSIC VIDEOS
  const musicVideos = [
    {
      videoId: 'FaJMpkREBNo',
      mood: 'Happy',
    },
    {
      videoId: 'cqKefsaTbLM ',
      mood: 'Sentimental',
    },
    {
      videoId: 'ZfkqqY-GrWI',
      mood: 'Romantic',
    },
    {
      videoId: '_sZ6K9r7qcY',
      mood: 'Serene',
    },
    {
      videoId: 'o8fJmpuPH7w ',
      mood: 'Excited',
    },
  ];

  // CREATE USERS BEFORE EACH TEST
  beforeEach(done => {
    quotes.forEach(quote => {
      Quote.findOrCreate({ where: quote })
      .then(() => {
        // console.log('quote==========> ', quote);
      })
      .catch(err => {
        console.log('Error! ', err);
      });
    });

    users.forEach(user => {
      User.findOrCreate({ where: user })
      .then(() => {
        // console.log('user==========> ', user);
      })
      .catch(err => {
        console.log('Error! ', err);
      });
    });

    moods.forEach(mood => {
      Mood.findOrCreate({ where: mood })
      .then(() => {
        // console.log('mood==========> ', mood);
      })
      .catch(err => {
        console.log('Error! ', err);
      });
    });

    musicVideos.forEach(musicVideo => {
      MusicVideo.findOrCreate({ where: musicVideo })
      .then(() => {
        // console.log('musicVideo==========> ', musicVideo);
      })
      .catch(err => {
        console.log('Error! ', err);
      });
    });
    done();
  });

  it('should retrieve all users from the database', done => {
    const userDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/users',
    };
    request(userDB, (err, res, body) => {
      console.log('body (USERS)=========> ', body);
      expect((JSON.parse(body)).length).to.equal(5);
      done();
    });
  });

  it('should retrieve all quotes from the database', done => {
    const quoteDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/quotes',
    };
    request(quoteDB, (err, res, body) => {
      // console.log('body (QUOTES)=========> ', body);
      expect(((JSON.parse(body)).body).length).to.equal(3);
      done();
    });
  });

  it('should get all moods in the database', done => {
    const moodDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/moods',
    };

    request(moodDB, (err, res, body) => {
      // console.log('body (MOODS)=========> ', body);
      expect((JSON.parse(body)).length).to.equal(4);
      done();
    });
  });

  it('should get all music videos in the database', done => {
    const musicVideoDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/music',
    };

    request(musicVideoDB, (err, res, body) => {
      // console.log('body (MUSIC VIDEOS)=========> ', body);
      expect((JSON.parse(body)).body.length).to.equal(5);
      done();
    });
  });
});
