import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="header">
    <ul className="nav-list">
      <li>Home</li>
      <li onClick={props.onLoginClick}>Login</li>
      <li>Sign Up</li>
    </ul>
  </div>
);