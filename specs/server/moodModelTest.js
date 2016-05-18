import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import Mood from '../../server/models/moodModel';
import '../../server/index';

const expect = chai.expect;

describe('Mood model', () => {
  it('should create a new Mood', () => {
    // CREATE TEST DATABASE OF MOODS
    const moods = [
      {
        name: 'funny',
        timedate: new Date(),
      },
      {
        name: 'angry',
        timedate: new Date(),
      },
      {
        name: 'stoked',
        timedate: new Date(),
      },
      {
        name: 'serene',
        timedate: new Date(),
      },
    ];

    // CREATE MOODS BEFORE EACH TEST
    beforeEach(done => {
      moods.forEach(mood => {
        Mood.findOrCreate({ where: mood })
        .then(() => {
          console.log('mood=========> ', mood);
        })
        .catch(err => {
          console.log('Error! ', err);
        });
      });
      done();
    });

    it('should create a new mood', done => {
      const newMood = Mood.create();
      expect(newMood).to.be.instanceOf(Object);
      done();
    });

    it('should have a property of name', done => {
      const moodTest = {
        method: 'GET',
        uri: 'http://127.0.0.1:8080/api/moods',
      };
      request(moodTest, (err, res, body) => {
        expect(JSON.parse(body[0])).to.have.property('name');
      });
      done();
    });

    it('should retrieve all moods from database', done => {
      const fetchMoods = {
        method: 'GET',
        uri: 'http://127.0.0.1:8080/api/moods',
      };
      request(fetchMoods, (err, res, body) => {
        expect(JSON.parse(body).length).to.equal(3);
      });
      done();
    });
  });
});
