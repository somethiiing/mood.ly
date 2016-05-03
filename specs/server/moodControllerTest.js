var expect = require('chai').expect;
var Mood = require('../server/models/moodModel.js');
var moodController = require('../controllers')

describe('Mood Controller', function() {
  it('should have a method that adds a new mood to the database', function(done) {
    var newMood = {
      name: 'happy',
      timeDate: new Date()
    }
    moodController.createMood(newMood, function(err, result) {
      done();
    });
  });
});