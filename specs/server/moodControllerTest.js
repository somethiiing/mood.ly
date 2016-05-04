import chai from 'chai';
import request from 'request';
import Mood from '../../server/models/moodModel';
import moodController '../../server/controllers/moodController'
const expect = chai.expect;

describe('Mood Controller', function() {
  it('should add users mood to the database', function(done) {
    var user = {
      name: 'Toby',
      email: 'toby@toby.com',
      password: '1234'
    };
    var mood = {
      name: 'happy',
      timedate: new Date()
    };
    

  });
});