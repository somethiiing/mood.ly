import React, { PropTypes, Component } from 'react';

React.createClass({
  propTypes: {
    handleSearchButtonClick: React.PropTypes.func.isRequired,
    handleSearchChange: React.PropTypes.func.isRequired,
  };
});

export default (props) => (
  <div className="search-bar form-inline">
    <div className="form-group">
      <input
        onChange={props.handleSearchChange}
        className="form-control" type="text" placeholder="how are you feeling?"
      />
      <button onClick={props.handleSearchButtonClick} value="Submit!">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  </div>
);
