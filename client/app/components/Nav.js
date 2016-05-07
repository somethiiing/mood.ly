import React from 'react';
import Search from './Search';

React.createClass({
  propTypes: {
    handleSearchChange: React.PropTypes.func.isRequired,
    handleSearchButtonClick: React.PropTypes.func.isRequired,
  },
});

export default (props) => (
  <div className="searchbar">
    <div className="col-md-6 col-md-offset-3">
      <Search
        handleSearchChange={props.handleSearchChange}
        handleSearchButtonClick={props.handleSearchButtonClick}
      />
    </div>
  </div>
);
