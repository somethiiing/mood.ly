import $ from 'jquery';

const apiCall = (endPoint, keyword, callback) => {
  $.get(`/api/${endPoint}?keyword=${keyword}`, data => {
    callback(data);
  });
};

const auth = (route, user, callback) => {
  $.post(route, user, resp => {
    callback(resp);
  });
};

export default { apiCall, auth };
