import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="header">
  	<div>
    <ul className="nav-list">
      <li>Home</li>
      <button onClick={props.onLoginClick}>Login</button>
      <button onClick={props.onSignUpClick}>Sign Up</button>
    </ul>
    </div>
  </div>
);