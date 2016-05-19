import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';

const expect = chai.expect;

describe('User Controller', () => {
  // RETRIEVE ALL
  it('should have a method that retrieves all users from the database', done => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/users',
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(body).length).to.equal(5);
      done();
    });
  });

  it('should have a property of username', done => {
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/users',
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(body)[0]).to.have.property('username');
      done();
    });
  });

  it('should update a user in the database given new information', done => {
    const options = {
      method: 'PUT',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        name: 'Toby',
        username: 'Toby the blockhead',
        email: 'toby@blockhead.com',
      },
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(res.request.body).email).to.equal('toby@blockhead.com');
      done();
    });
  });

  xit('should delete a user from the database', done => {
    const options = {
      method: 'DELETE',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        name: 'Toby',
        username: 'Toby the blockhead',
        email: 'toby@blockhead.com',
      },
    };

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(body).length).to.equal(4);
      done();
    });
  });
});
