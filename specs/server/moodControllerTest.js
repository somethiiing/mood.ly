import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import Mood from '../../server/models/moodModel';
import User from '../../server/models/userModel';
import moodController from '../../server/controllers/moodController';
const expect = chai.expect;

describe('Mood Controller', () => {
  const user = {
    username: 'Superman',
    email: 'superman@superman.com',
    password: '0697',
  };
  const mood1 = {
    name: 'meh',
    timedate: new Date(),
  };
  const mood2 = {
    name: 'derp',
    timedate: new Date(),
  };
  const mood3 = {
    name: 'yipee',
    timedate: new Date(),
  };

  it('should add user\'s mood to the database', done => {
    let options1 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user,
        mood: mood1,
      },
    };

    let options2 = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user,
      },
    };

    User.findOrCreate({ where: user })
    .then(() => {
      request(options1, (err, res, body) => {
        console.log('body=========> ', body);
        expect(res.statusCode).to.equal(201);

        request(options2, (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    })
    .catch(err => {
      // User data already exists
      request(options2, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('users should be able to have many moods', done => {
    let options2 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user,
        mood: mood2,
      },
    };

    let options3 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user,
        mood: mood3,
      },
    };

    request(options2, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      request(options3, (err, res, body) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should get all user moods', done => {
    let options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/moods',
      json: {
        user,
      },
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body).to.have.length.above(1);
      done();
    });
  });
});
