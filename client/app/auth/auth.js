import $ from 'jquery';

const signup = (user, callback) => {
  console.log('A user tried to sign up.');
  $.post('/api/users/signup', user, resp => {
    callback(resp);
  });
};

const login = (user, callback) => {
  $.post('/api/users/login', user, resp => {
    callback(resp);
  });
};

export default {
  signup,
  login,
};
