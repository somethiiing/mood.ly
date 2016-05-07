import React from 'react';

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
