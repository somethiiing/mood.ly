var expect = require('chai').expect;
var User = require('../server/models/userModel.js');
describe('User model', function() {
  it('should create a new User', function() {
    var newUser = User.create();
    console.log(newUser);
    expect(newUser).to.be.instanceOf(User);
  });
});