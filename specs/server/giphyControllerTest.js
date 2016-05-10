import chai from 'chai';
import request from 'request';
import Giphy from '../../server/models/giphyModel';
import User from '../../server/models/userModel';
import giphyController from '../../server/controllers/giphyController';
const expect = chai.expect;

describe('Giphy Controller', () => {

  var user = {
    name: 'Wilson',
    email: 'wilson@wilson.com',
    password: 'asdf',
  };
  var giphy1 = {
    url: 'http://media0.giphy.com/media/xThuWp2hJABbmc20Ew/200.gif',
    mood: 'Happy',
  };
  var giphy2 = {
    url: 'http://media1.giphy.com/media/xT5LMNrx71j8dZvJra/200.gif',
    mood: 'Sentimental',
  };
  var giphy3 = {
    url: 'http://media2.giphy.com/media/l4Ki7hFz3nr9PN1C0/200.gif',
    mood: 'Romantic',
  };

  // beforeEach(done => {
  //   User.findOrCreate({where: user})
  //   .then(() => {
  //     done();
  //   });
  // });

  it('should add users giphy to the database', done => {
    let options = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/giphys',
      json: {
        user: user,
        giphy: giphy1,
      },
    };

    User.findOrCreate({ where: user })
    .then(() => {
      request(options, (err, res, body) => {
        expect(res.statusCode).to.equal(201);
        let options = {
          method: 'GET',
          uri: 'http://127.0.0.1:8080/api/giphys',
          json: {
            user: user,
          },
        };

        request(options, (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  it('users should be able to have many giphys', done => {
    let options2 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/giphys',
      json: {
        user: user,
        giphy: giphy2,
      },
    };
    let options3 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/giphys',
      json: {
        user: user,
        giphy: giphy3,
      },
    };
    request(options2, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      request(options3, (err, res, body) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should get all user giphys', done => {
    let options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/giphys',
      json: {
        user: user,
      },
    };
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.length).to.equal(3);
      done();
    });
  });
});
