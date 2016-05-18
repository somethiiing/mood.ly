// import React from 'react';

// class HelloMessage extends React.Componenet {
//   render() {
//     return <div>Hello {this.props.name}</div>;
//   }
// }
// export default HelloMessage;

var React = require('react');

var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

module.exports = HelloMessage;
