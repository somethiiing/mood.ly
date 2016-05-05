import chai from 'chai';
import request from 'request';
import User from '../../server/models/userModel';
import userController from '../../server/controllers/userController';
const expect = chai.expect;

describe('User Controller', () => {
  //CREATE NEW DB FOR TESTING
  var users = [
    {
      name: 'Magee',
      email: 'magee@magee.com',
      password: '1234',
    },
    {
      name: 'Dan',
      email: 'dan@dan.com',
      password: '4321',
    },
    {
      name: 'Beth',
      email: 'beth@beth.com',
      password: '5678',
    },
    {
      name: 'Sunny',
      email: 'sunny@sunny.com',
      password: '8765',
    },
    {
      name: 'Zach',
      email: 'zach@zach.com',
      password: '7890',
    }
  ];

  //CREATE USERS AND POPULATE DATABASE
  beforeEach((done) => {
    User.findOrCreate({ where: users })
    .then(() => {
      done();
    });
  });

  //RETRIEVE ALL
  it('should have a method that retrieves all users from the database', (done) => {
    let options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        users: users
      }
    };

    request(options, (err, user, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.length).to.equal(5);
      done();
    });
  });

  it('should update a user in the database given new information', (done) => {
    let options = {
      method: 'PUT',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        //UPDATED INFO
      }
    };

    request(options, (err, user, body) => {
      expect(res.statusCode).to.equal(200);
      expect().to.equal(); //NEED TO COMPLETE
      done();
    });
  });

  it('should delete a user from the database', (done) => {
    let options = {
      method: 'DELETE',
      uri: 'http://127.0.0.1:8080/api/users',
      json: {
        users: users
      }
    };

    request(options, (err, user, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.length).to.equal(4);
      done();
    });
  });

});