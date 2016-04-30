var expect = require('chai').expect;
var User = require('../server/models/userModel.js');

require(__dirname + '/../server/index.js');

describe('User model', function() {

  it('should create a new User', function() {
    var newUser = User.create();
    expect(newUser).to.be.instanceOf(Object);
  });

});