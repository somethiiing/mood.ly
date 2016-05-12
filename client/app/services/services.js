import $ from 'jquery';

const apiCall = (endPoint, keyword, callback) => {
  $.get(`/${endPoint}?keyword=${keyword}`, data => {
    callback(data);
  });
};

export default apiCall;
