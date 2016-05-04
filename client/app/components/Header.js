import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="header">
    <ul className="nav-list">
      <li><a href="/">Home</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/signup">Sign Up</a></li>
    </ul>
  </div>
);