import $ from 'jquery';

const signup = (user, callback) => {
  $.post('/api/users/signup', user, resp => {
    callback(resp);
  });
};

const login = (user, callback) => {
  $.post('/api/users/login', user, resp => {
    callback(resp);
  });
};

const logout = (callback) => {
  $.get('/logout', resp => {
    console.log(resp.status);
    callback(resp);
  });
};

export default { signup, login, logout };
