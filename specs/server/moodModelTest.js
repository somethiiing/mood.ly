import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import Mood from '../../server/models/moodModel';
import '../../server/index';

const expect = chai.expect;

describe('Mood model', () => {
  const moodFetch = {
    method: 'GET',
    uri: 'http://127.0.0.1:8080/api/moods',
  };

  it('should have a name property', done => {
    request(moodFetch, (err, res, body) => {
      expect(JSON.parse(body)[0]).to.have.property('name');
      done();
    });
  });

  it('should return a status code of 200', done => {
    request(moodFetch, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
