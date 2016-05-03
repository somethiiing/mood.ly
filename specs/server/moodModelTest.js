import chai from 'chai';
import Mood from '../../server/models/moodModel';
import '../../server/index';

const expect = chai.expect;

describe('Mood model', () => {

  it('should create a new Mood', () => {
    let newMood = Mood.create();
    expect(newMood).to.be.instanceOf(Object);
  });

});