import chai from 'chai';
import { describe, it } from 'mocha';
import request from 'request';
import MusicVideo from '../../server/models/musicVideoModel';
import User from '../../server/models/userModel';
import musicVideoController from '../../server/controllers/musicVideoController';
const expect = chai.expect;

describe('MusicVideo Controller', () => {
  // const user = {
  //   name: 'Wilson',
  //   email: 'wilson@wilson.com',
  //   username: 'Wilson',
  //   password: 'asdf',
  // };

  // const musicVideos = [
  //   {
  //     videoId: 'WrXexTbD3-g',
  //     mood: 'Happy',
  //   },
  //   {
  //     videoId: '',
  //     mood: 'Sentimental',
  //   },
  //   {
  //     videoId: '',
  //     mood: 'Romantic',
  //   },
  // ];

  // beforeEach(done => {
  //   User.findOrCreate({ where: user })
  //   .then(() => {
  //     musicVideos.forEach(musicVideo => {
  //       MusicVideo.findOrCreate({ where: musicVideo })
  //       .then(() => {
  //         console.log('musicVideo ', musicVideo);
  //       })
  //       .catch(err => {
  //         console.log('Error! ', err);
  //       });
  //     });
  //   });
  //   done();
  // });

  it('should retrieve all music videos from the database', done => {
    const musicVideoDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/music',
    };
    request(musicVideoDB, (err, res, body) => {
      console.log('body (music video)=========> ', body);
      expect(JSON.parse(body).length).to.equal(3);
      done();
    });
  });

  it('should return a status code of 200 after retrieving one music video', done => {
    const musicVideoDB = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/music',
    };
    request(musicVideoDB, (err, res, body) => {
      console.log('body (200)=========> ', body);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  // it('should add users musicVideo to the database', done => {
  //   const options1 = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/music',
  //     json: {
  //       user,
  //       musicVideo: musicVideo1,
  //     },
  //   };

  //   const options2 = {
  //     method: 'GET',
  //     uri: 'http://127.0.0.1:8080/api/music',
  //     json: {
  //       user,
  //     },
  //   };

  //   User.findOrCreate({ where: user })
  //   .then(() => {
  //     request(options1, (err, res, body) => {
  //       expect(res.statusCode).to.equal(201);


  //       request(options2, (err, res, body) => {
  //         expect(res.statusCode).to.equal(200);
  //         done();
  //       });
  //     });
  //   })
  //   .catch(err => {
  //     // User data already exists
  //     request(options2, (err, res, body) => {
  //       expect(res.statusCode).to.equal(200);
  //       done();
  //     });
  //   });
  // });

  // it('users should be able to have many musicVideos', done => {
  //   const options2 = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/music',
  //     json: {
  //       user,
  //       musicVideo: musicVideo2,
  //     },
  //   };
  //   const options3 = {
  //     method: 'POST',
  //     uri: 'http://127.0.0.1:8080/api/music',
  //     json: {
  //       user,
  //       musicVideo: musicVideo3,
  //     },
  //   };
  //   request(options2, (err, res, body) => {
  //     expect(res.statusCode).to.equal(201);
  //     request(options3, (err, res, body) => {
  //       expect(res.statusCode).to.equal(201);
  //       done();
  //     });
  //   });
  // });

  // it('should get all user musicVideos', done => {
  //   const options = {
  //     method: 'GET',
  //     uri: 'http://127.0.0.1:8080/api/music',
  //     json: {
  //       user,
  //     },
  //   };
  //   request(options, (err, res, body) => {
  //     expect(res.statusCode).to.equal(200);
  //     expect(body.length).to.equal(3);
  //     done();
  //   });
  // });
});
