import React, { PropTypes, Component } from 'react';

React.createClass({
  propTypes: {
    onSignUpClick: React.PropTypes.func.isRequired,
    onLoginClick: React.PropTypes.func.isRequired,
  };
});

export default (props) => (
  <div className="header">
    <div>
      <ul className="nav-list">
        <button>home</button>
        <button onClick={props.onLoginClick}>login</button>
        <button onClick={props.onSignUpClick}>sign up</button>
      </ul>
    </div>
  </div>
);
