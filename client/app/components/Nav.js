import React, { PropTypes, Component } from 'react';
import Search from './Search';

export default (props) => (
  <div className="searchbar">
    <div className="col-md-6 col-md-offset-3">
      <Search handleSearchChange={props.handleSearchChange} handleSearchButtonClick={props.handleSearchButtonClick} />
    </div>
  </div>
);
