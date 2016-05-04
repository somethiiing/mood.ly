import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="sign-up-content">
    <h1>sign up</h1>
      <div className="form-group">
        <label htmlFor="name"></label>
        <input className="form-control" id="name" type="text" placeholder="enter your name..." />
        <label htmlFor="email"></label>
        <input className="form-control" id="email" type="text" placeholder="enter your email..." />
        <label htmlFor="username"></label>
        <input className="form-control" id="username" type="text" placeholder="choose a username..." />
        <label htmlFor="password"></label>
        <input className="form-control" id="password" type="text" placeholder="create a password..." />
        <input type="submit" value="submit" />
      </div>
  </div>
);