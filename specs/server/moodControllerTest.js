import chai from 'chai';
import request from 'request';
import Mood from '../../server/models/moodModel';
import User from '../../server/models/userModel';
import moodController from '../../server/controllers/moodController';
const expect = chai.expect;

describe('Mood Controller', function() {
  var user = {
    name: 'Toby',
    email: 'toby@toby.com',
    password: '1234'
  };
  var mood = {
    name: 'happy',
    timedate: new Date()
  };

  beforeEach(done => {
    User.findOrCreate({where: user})
    .then(() => {
      done();
    });
  });

  it('should add users mood to the database', done => {
    let options = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user: user,
        mood: mood
      }
    }

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      done();
      let options = {
        method: 'GET',
        uri: 'http://127.0.0.1:8080/api/moods',
        json: {
          user: user
        }
      }

      request(options, (err, res, body) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.mood.name).to.equal('happy');
        done();
      });
    });
  });

  xit('users should have many moods', done => {

  });
});