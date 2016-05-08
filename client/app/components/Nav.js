// THIS FILE IS NO LONGER NEEDED

import React, { React, PropTypes, Component } from 'react';
import Search from './Search';

class Nav extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="searchbar">
        <div className="col-md-6 col-md-offset-3">
          <Search
            handleSearchChange={this.props.handleSearchChange}
            handleSearchButtonClick={this.props.handleSearchButtonClick}
          />
        </div>
      </div>
    );
  }
}

Nav.propTypes = {
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchButtonClick: React.PropTypes.func.isRequired,
};

export default Nav;
