import chai from 'chai';
import { describe, it } from 'mocha';
import Mood from '../../server/models/moodModel';
import '../../server/index';

const expect = chai.expect;

describe('Mood model', () => {
  it('should create a new mood', done => {
    const newMood = Mood.create();
    expect(newMood).to.be.instanceOf(Object);
    done();
  });
});
