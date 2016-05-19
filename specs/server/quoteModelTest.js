import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import Quote from '../../server/models/quoteModel';
import '../../server/index';

const expect = chai.expect;

describe('Quote model', () => {
  const quoteFetch = {
    method: 'GET',
    uri: 'http://127.0.0.1:8080/api/quotes',
  };

  it('should have a text property', done => {
    done();
    request(quoteFetch, (err, res, body) => {
      expect(JSON.parse(body).body[0]).to.have.property('text');
    });
  });

  it('should return a status code of 200', done => {
    request(quoteFetch, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
