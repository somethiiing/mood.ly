import chai from 'chai';
import { describe, it } from 'mocha';
import Giphy from '../../server/models/giphyModel';
import '../../server/index';

const expect = chai.expect;

describe('Giphy model', () => {
  // CREATE TEST DATABASE OF GIPHYS
  const giphys = [
    {
      url: 'http://giphy.com/gifs/outlander-season-2-starz-l396CTgdPnnUx8L0Q',
      mood: 'happy',
    },
    {
      url: 'http://giphy.com/gifs/topgun-3o6EhQcCZmb1dMg3ug',
      mood: 'sad',
    },
    {
      url: 'http://giphy.com/gifs/3o7qDNOLb84uPBDCG4',
      mood: 'excited',
    },
  ];

  // CREATE USERS BEFORE EACH TEST
  beforeEach(done => {
    giphys.forEach(giphy => {
      Giphy.findOrCreate({ where: giphy })
      .then(() => {
        // console.log('giphy==========> ', giphy);
      })
      .catch(err => {
        console.log('Error! ', err);
      });
    });
    done();
  });
  
  it('should create a new Giphy', done => {
    const newGiphy = Giphy.create();
    expect(newGiphy).to.be.instanceOf(Object);
    done();
  });

  it('should have a property of url', done => {
    const newGiphy = Giphy.create();
    console.log('newGiphy========> ', newGiphy);
    expect(newGiphy).to.have.property('url');
    done();
  });
});
