import chai from 'chai';
import { describe, it } from 'mocha';
import Giphy from '../../server/models/giphyModel';
import '../../server/index';
import request from 'request';

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

  // CREATE GIPHYS BEFORE EACH TEST
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
    const giphyTest = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/giphys',
    };
    request(giphyTest, (err, res, body) => {
      expect(JSON.parse(body).body[0]).to.have.property('url');
      done();
    });
  });

  it('should retrieve all giphys from database', done => {
    const fetchGiphys = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/giphys',
    };
    request(fetchGiphys, (err, res, body) => {
      expect(JSON.parse(body).body.length).to.equal(3);
      done();
    });
  });
});
