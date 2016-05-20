import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import '../../server/index';

const expect = chai.expect;

describe('User model', () => {
  const userFetch = {
    method: 'GET',
    uri: 'http://127.0.0.1:8080/api/users',
  };

  it('should match the username property of the specified user', done => {
    done();
    request(userFetch, (err, res, body) => {
      expect(JSON.parse(body)[1].username).to.equal('Toby');
    });
  });

  it('should return a status code of 200', done => {
    request(userFetch, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the number of users in the database', done => {
    request(userFetch, (err, res, body) => {
      expect(JSON.parse(body).length).to.equal(5);
      done();
    });
  });
});
