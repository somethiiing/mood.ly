import chai from 'chai';
import User from '../../server/models/userModel';
import '../../server/index';
const expect = chai.expect;

describe('User model', function() {

  it('should create a new User', () => {
    let newUser = User.create();
    expect(newUser).to.be.instanceOf(Object);
  });

});