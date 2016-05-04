import React, { PropTypes, Component } from 'react';

export default (props) => (
  <div className="search-bar form-inline">
    <div className="form-group">
      <input onChange={props.handleSearchChange} className="form-control" type="text" placeholder="How are you feeling?"/>
      <button onClick={props.handleSearchButtonClick} value="Submit!">
      <i className="fa fa-search fa-2x" aria-hidden="true"></i>
      </button>
    </div>
  </div> 
);
