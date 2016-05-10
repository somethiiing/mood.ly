import React, { PropTypes, Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
        <div>
          <ul className="navlist">
            <a>mood.ly</a>
            <br />
            <a>profile</a>
            <br />
            <a>log out</a>
          </ul>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // onLoginClick: PropTypes.func.isRequired,
  // onSignUpClick: PropTypes.func.isRequired,
};

export default Header;


//onClick={this.props.onSignUpClick}