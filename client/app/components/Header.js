import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="header">
  	<div>
    <ul className="nav-list">
      <li>Home</li>
      <button onClick={props.onLoginClick}>Login</button>
      <li>Sign Up</li>
    </ul>
    </div>
  </div>
);