import $ from 'jquery';

const wiki function (keyword, callback) {
  $.get('wiki?=' + keyword, function(data) {
    callback(data);
  });
}


export default wiki