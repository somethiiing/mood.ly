const expect = require('chai').expect;

import request from 'request';
import User from '../../server/models/userModel';

describe('Server', () => {
  // beforeEach(() => {
    //LOGOUT
    //===================================
    // request('http://127.0.0.1:8080/logout', (err, res, body) => {});
  // });

  it('should return "Success" for the route "/"', (done) => {
    request('http://127.0.0.1:8080').on('response', (resp) => {
      resp.on('end', () => {
        expect(resp.statusCode).to.equal(200);
        done();
      });
    });
  });

    //PRIVILEGED ACCESS
    //===================================
    describe('Privileged Access', () => {
      it('redirects to login page if user is not signed in', (done) => {
        request('http://127.0.0.1:8080', (err, res, body) => {
          expect(res.req.path).to.equal('/login');
          done();
        });
      });
    });

    //ACCOUNT CREATION
    //===================================
    describe('Account Creation', () => {
      it('should respond with a 201 when a user has been created and added to the database', (done) => {
        let options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:8080/signup',
          json: {
            name: 'Chris',
            email: 'chris@chris.com',
            password: '1234'
          }
        };

        request(options, (err, res, body) => {
          //CHECK STATUS CODE
          expect(res.statusCode).to.equal(201);
          //CHECK USER DETAILS
          expect('user').to.equal('Chris');
          done();
        });
      });

      it('signup logs in a new user', (done) => {
        let options = {
          'method': 'POST',
          'uri': 'http://127.0.0.1:8080/signup',
          json: {
            name: 'Arun',
            email: 'arun@arun.com',
            password: '4321'
          }
        };

        request(options, (err, res, body) => {
          expect(res.headers.location).to.equal('/');
          done();
        });
      });
    });

    //ACCOUNT LOGIN
    //===================================
    describe('Account Login', () => {
      beforeEach((done) => {
        let options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:8080/signup',
          json: {
            name: 'Kim',
            email: 'kim@kim.com',
            password: '7890'
          }
        };

        request(options, (err, res, body) => {
          //SIGN UP A NEW USER
          done();
        });
      });

      it('logs in existing user', (done) => {
        let options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:8080/signup',
          json: {
            name: 'Kim',
            email: 'kim@kim.com',
            password: '7890'
          }
        };

        requestWithSession(options, (err, res, body) => {
          expect(res.headers.location).to.equal('/');
          done();
        });
      });

      it('should keep users that do not exist on login page', () => {
        let options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:8080/signup',
          json: {
            name: 'Wilson',
            email: 'wilson@wilson.com',
            password: '0987'
          }
        };

        requestWithSession(options, (err, res, body) => {
          expect(res.headers.location).to.equal('/login');
          done();
        });
      });
    });

    //FACEBOOK AUTH
    //===================================
    it('should redirect user from Facebook authentication to Mood.ly', () => {
      request('http://127.0.0.1:8080/auth/facebook', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
      });
    });

    // it('should create new Facebook user in the database', () => {
    //   request('http://127.0.0.1:8080/users', (err, res, body) => {
    //     expect(res.statusCode).to.equal(200);
    //   });
    // });

    //GOOGLE AUTH
    //===================================
    it('should redirect user from Google authentication to Mood.ly', () => {
      request('http://127.0.0.1:8080/auth/google', (err, res, body) => {
        expect(res.statusCode).to.equal(200);
      });
    });

    // it('should create new Google user in the database', () => {
    //   request('http://127.0.0.1:8080/users', (err, res, body) => {
    //     expect(res.statusCode).to.equal(200);
    //   });
    // });
});