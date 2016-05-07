import chai from 'chai';
import { describe, it } from 'mocha';
import User from '../../server/models/userModel';
import Mood from '../../server/models/moodModel';

const expect = chai.expect;

describe('Database', () => {
  const user = {
    name: 'Toby',
    email: 'toby@toby.com',
    password: '1234',
  };
  const mood = {
    name: 'happy',
    timedate: new Date(),
  };

  beforeEach(done => {
    User.findOrCreate({ where: user })
    .then(() => {
      done();
    });
  });

  xit('should return all users who have the given mood', (done) => {
    expect().to.equal(); // TODO: FILL OUT EXPECT AND EQUAL
    done();
  });

  xit('should return all quotes for each user', (done) => {
    expect().to.equal(); // TODO: FILL OUT EXPECT AND EQUAL
    done();
  });

  xit('should retrieve all users in the database', (done) => {
    expect().to.equal(); // TODO: FILL OUT EXPECT AND EQUAL
    done();
  });
});