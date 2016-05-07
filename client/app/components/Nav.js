import React, { React, PropTypes, Component } from 'react';
import Search from './Search';

// React.createClass({
//   propTypes: {
//     handleSearchChange: React.PropTypes.func.isRequired,
//     handleSearchButtonClick: React.PropTypes.func.isRequired,
//   },
// });

// export default (props) => (
//   <div className="searchbar">
//     <div className="col-md-6 col-md-offset-3">
//       <Search
//         handleSearchChange={props.handleSearchChange}
//         handleSearchButtonClick={props.handleSearchButtonClick}
//       />
//     </div>
//   </div>
// );


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
