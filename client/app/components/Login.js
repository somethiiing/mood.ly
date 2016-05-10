import React from 'react';

export default () => (
  <div className="login-content">
    <h1>login</h1>
    <div className="form-group">
      <label htmlFor="username"></label>
      <input
        className="form-control" id="username" type="text" placeholder="enter your username..."
      />
      <br />
      <label htmlFor="password"></label>
      <input
        className="form-control" id="password" type="password" placeholder="enter your password..."
      />
      <br />
      <br />
      <a href="/">
        <button type="submit" value="submit">submit</button>
      </a>
    </div>
    <div className="auth-buttons">
      <a href="/auth/facebook">
        <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
      </a>
      <a href="/auth/google">
        <i className="fa fa-google fa-2x" aria-hidden="true"></i>
      </a>
    </div>
  </div>
);
