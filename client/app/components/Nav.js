import React, { PropTypes, Component } from 'react';
import Search from './Search';

export default (props) => (
  <nav className="navbar">
    <div className="col-md-6 col-md-offset-3">
      <Search handleSearchChange={props.handleSearchChange} handleSearchButtonClick={props.handleSearchButtonClick}/>
    </div>
  </nav>
);
