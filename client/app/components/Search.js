import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="search-bar form-inline">
    <div className="form-group">
      <input onChange={props.handleSearchChange} className="form-control" type="text" placeholder="How are you feeling?"/>
      <button onClick={props.handleSearchButtonClick} value="Submit!">
      <span className="glyphicon glyphicon-search"></span>
      </button>
    </div>
  </div> 
);
